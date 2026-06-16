"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function applyForOpportunity(opportunityId: string) {
  const session = await auth()
  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  // Check if profile exists and is somewhat complete
  const profile = await prisma.volunteerProfile.findUnique({
    where: { userId: session.user.id }
  })

  if (!profile) {
    return { error: "Please complete your profile first" }
  }

  try {
    const application = await prisma.application.create({
      data: {
        userId: session.user.id,
        opportunityId: opportunityId,
        status: "PENDING"
      }
    })

    const opportunity = await prisma.opportunity.findUnique({ where: { id: opportunityId } })

    await prisma.notification.create({
      data: {
        userId: session.user.id,
        title: "Application Submitted",
        message: `Your application for "${opportunity?.title}" has been submitted successfully.`
      }
    })

    revalidatePath("/dashboard")
    revalidatePath(`/opportunities/${opportunityId}`)
    return { success: true }
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { error: "You have already applied for this opportunity" }
    }
    return { error: "Failed to apply" }
  }
}

export async function withdrawApplication(applicationId: string) {
  const session = await auth()
  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  try {
    await prisma.application.delete({
      where: {
        id: applicationId,
        userId: session.user.id // ensure they own it
      }
    })

    revalidatePath("/dashboard/applications")
    return { success: true }
  } catch (error) {
    return { error: "Failed to withdraw" }
  }
}
