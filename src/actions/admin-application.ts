"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function updateApplicationStatus(id: string, status: string, adminNotes?: string) {
  const session = await auth()
  if (!session || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" }
  }

  try {
    const application = await prisma.application.update({
      where: { id },
      data: { status, adminNotes },
      include: { opportunity: true }
    })
    
    await prisma.notification.create({
      data: {
        userId: application.userId,
        title: `Application ${status}`,
        message: `Your application for "${application.opportunity.title}" has been ${status.toLowerCase()}. ${adminNotes ? `Admin Notes: ${adminNotes}` : ""}`
      }
    })
    
    revalidatePath("/admin/applications")
    revalidatePath("/admin/opportunities")
    
    return { success: true }
  } catch (error) {
    return { error: "Failed to update application" }
  }
}
