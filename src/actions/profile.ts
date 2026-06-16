"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function updateProfile(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    return { error: "Unauthorized" }
  }

  const phone = formData.get("phone") as string
  const age = parseInt(formData.get("age") as string) || null
  const gender = formData.get("gender") as string
  const city = formData.get("city") as string
  const state = formData.get("state") as string
  const education = formData.get("education") as string
  const occupation = formData.get("occupation") as string
  const skills = formData.get("skills") as string
  const interests = formData.get("interests") as string
  const availability = formData.get("availability") as string
  const linkedinUrl = formData.get("linkedinUrl") as string
  const motivation = formData.get("motivation") as string

  try {
    await prisma.volunteerProfile.upsert({
      where: { userId: session.user.id },
      update: {
        phone, age, gender, city, state, education, occupation,
        skills, interests, availability, linkedinUrl, motivation
      },
      create: {
        userId: session.user.id,
        phone, age, gender, city, state, education, occupation,
        skills, interests, availability, linkedinUrl, motivation
      }
    })

    revalidatePath("/dashboard/profile")
    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: "Failed to update profile" }
  }
}
