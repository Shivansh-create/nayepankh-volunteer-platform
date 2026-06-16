import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

export default async function VolunteerApplications() {
  const session = await auth()
  
  const applications = await prisma.application.findMany({
    where: { userId: session?.user?.id },
    include: { opportunity: true },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
        <p className="mt-2 text-sm text-gray-600">Track the status of your volunteer applications.</p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md border border-gray-100">
        {applications.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm text-gray-500 mb-4">You haven't applied to any opportunities yet.</p>
            <Link href="/opportunities" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
              Browse Opportunities
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {applications.map((app) => (
              <li key={app.id}>
                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-blue-600 truncate">
                        {app.opportunity.title}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500">
                        <span className="truncate">Applied on {new Date(app.createdAt).toLocaleDateString()}</span>
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex flex-col items-end">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${app.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 
                          app.status === 'REJECTED' ? 'bg-red-100 text-red-800' : 
                          app.status === 'REVIEW' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'}`}>
                        {app.status}
                      </span>
                      <Link href={`/opportunities/${app.opportunityId}`} className="mt-2 text-xs text-blue-500 hover:text-blue-700 flex items-center">
                        View Opportunity <ExternalLink className="w-3 h-3 ml-1" />
                      </Link>
                    </div>
                  </div>
                  {app.adminNotes && (
                    <div className="mt-4 bg-gray-50 p-3 rounded text-sm text-gray-700 border border-gray-100">
                      <span className="font-semibold text-xs text-gray-500 block mb-1">Admin Notes:</span>
                      {app.adminNotes}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
