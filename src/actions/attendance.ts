"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function markAttendance(eventId: string, records: { userId: string, hours: number, status: string }[]) {
  const session = await auth()
  if (!session || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" }
  }

  try {
    // We update or create participation records for each
    for (const record of records) {
      const participation = await prisma.participation.upsert({
        where: {
          eventId_userId: { eventId, userId: record.userId }
        },
        update: {
          hours: record.hours,
          status: record.status
        },
        create: {
          eventId,
          userId: record.userId,
          hours: record.hours,
          status: record.status
        }
      })

      // Update total hours for the user
      // We will recalculate the total hours from all their ATTENDED participations
      const userParticipations = await prisma.participation.findMany({
        where: { userId: record.userId, status: "ATTENDED" }
      })
      const totalHours = userParticipations.reduce((acc, curr) => acc + curr.hours, 0)

      await prisma.volunteerProfile.update({
        where: { userId: record.userId },
        data: { totalHours }
      })
    }

    revalidatePath("/admin/opportunities")
    revalidatePath("/admin/volunteers")
    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: "Failed to mark attendance" }
  }
}
