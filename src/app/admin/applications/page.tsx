import { prisma } from "@/lib/prisma"
import ApplicationList from "./ApplicationList"

export default async function AdminApplications() {
  const applications = await prisma.application.findMany({
    include: {
      user: {
        select: { name: true, email: true }
      },
      opportunity: {
        select: { title: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Application Management</h1>
        <p className="mt-2 text-sm text-gray-600">Review and manage volunteer applications.</p>
      </div>

      <ApplicationList initialApplications={applications} />
    </div>
  )
}
