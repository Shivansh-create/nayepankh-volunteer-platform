import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import ProfileForm from "./ProfileForm"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/login")
  }

  const profile = await prisma.volunteerProfile.findUnique({
    where: { userId: session.user.id }
  })

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Volunteer Profile</h1>
        <p className="mt-2 text-sm text-gray-600">Update your information to help us match you with the best opportunities.</p>
      </div>

      <div className="bg-white shadow rounded-lg p-6 sm:p-8">
        <ProfileForm initialData={profile} />
      </div>
    </div>
  )
}
