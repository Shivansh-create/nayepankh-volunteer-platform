"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createOpportunity(formData: FormData) {
  const session = await auth()
  if (!session || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" }
  }

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const category = formData.get("category") as string
  const location = formData.get("location") as string
  const dateStr = formData.get("date") as string
  const time = formData.get("time") as string
  const requiredSkills = formData.get("requiredSkills") as string
  const volunteersNeeded = parseInt(formData.get("volunteersNeeded") as string) || 1
  const durationHours = parseInt(formData.get("durationHours") as string) || 1
  const coordinatorName = formData.get("coordinatorName") as string

  try {
    await prisma.opportunity.create({
      data: {
        title,
        description,
        category,
        location,
        date: new Date(dateStr),
        time,
        requiredSkills,
        volunteersNeeded,
        durationHours,
        coordinatorName,
        status: "OPEN"
      }
    })

    revalidatePath("/admin/opportunities")
    revalidatePath("/opportunities")
  } catch (error) {
    return { error: "Failed to create opportunity" }
  }
  
  redirect("/admin/opportunities")
}

export async function updateOpportunityStatus(id: string, status: string) {
  const session = await auth()
  if (!session || session.user.role !== "ADMIN") {
    return { error: "Unauthorized" }
  }

  try {
    await prisma.opportunity.update({
      where: { id },
      data: { status }
    })
    revalidatePath("/admin/opportunities")
    revalidatePath("/opportunities")
    revalidatePath(`/opportunities/${id}`)
    return { success: true }
  } catch (error) {
    return { error: "Failed to update status" }
  }
}
