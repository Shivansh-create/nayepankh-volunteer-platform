import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Clock, CheckCircle, FileText, ArrowRight } from "lucide-react"

export default async function DashboardOverview() {
  const session = await auth()
  const userId = session?.user?.id!

  const profile = await prisma.volunteerProfile.findUnique({
    where: { userId }
  })

  const applications = await prisma.application.findMany({
    where: { userId },
    include: { opportunity: true },
    orderBy: { createdAt: "desc" },
    take: 5
  })

  const participations = await prisma.participation.findMany({
    where: { userId },
    include: { event: { include: { opportunity: true } } },
    orderBy: { createdAt: "desc" },
    take: 5
  })

  const totalHours = profile?.totalHours || 0
  const applicationsCount = await prisma.application.count({ where: { userId } })
  const approvedCount = await prisma.application.count({ where: { userId, status: "APPROVED" } })

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {session?.user?.name?.split(' ')[0]}!</h1>
        <p className="mt-2 text-sm text-gray-600">Here's an overview of your volunteer journey.</p>
      </div>

      {!profile && (
        <div className="mb-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-yellow-400">⚠️</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Your profile is incomplete. Please <Link href="/dashboard/profile" className="font-medium underline hover:text-yellow-600">complete your profile</Link> to apply for opportunities.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-100 p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Hours</dt>
                <dd className="text-3xl font-semibold text-gray-900">{totalHours}</dd>
              </dl>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-100 p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Approved Applications</dt>
                <dd className="text-3xl font-semibold text-gray-900">{approvedCount}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-100 p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Applications</dt>
                <dd className="text-3xl font-semibold text-gray-900">{applicationsCount}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Applications */}
        <div className="bg-white shadow rounded-lg border border-gray-100">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Applications</h3>
            <Link href="/dashboard/applications" className="text-sm text-blue-600 hover:text-blue-500 font-medium flex items-center">
              View all <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="p-6">
            {applications.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">You haven't applied to any opportunities yet.</p>
            ) : (
              <ul className="space-y-4">
                {applications.map((app) => (
                  <li key={app.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{app.opportunity.title}</p>
                      <p className="text-xs text-gray-500">{new Date(app.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${app.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 
                        app.status === 'REJECTED' ? 'bg-red-100 text-red-800' : 
                        app.status === 'REVIEW' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'}`}>
                      {app.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Recent Activity / Participations */}
        <div className="bg-white shadow rounded-lg border border-gray-100">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-6">
            {participations.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No recent activity recorded.</p>
            ) : (
              <ul className="space-y-4">
                {participations.map((part) => (
                  <li key={part.id} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-900">Attended <span className="font-medium">{part.event.opportunity.title}</span></p>
                      <p className="text-xs text-gray-500">{part.hours} hours logged • {new Date(part.createdAt).toLocaleDateString()}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
