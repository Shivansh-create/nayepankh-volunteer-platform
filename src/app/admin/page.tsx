import { prisma } from "@/lib/prisma"
import { Users, FileText, CheckCircle, Clock } from "lucide-react"
import AnalyticsCharts from "./AnalyticsCharts"

export default async function AdminDashboard() {
  const totalVolunteers = await prisma.user.count({ where: { role: 'VOLUNTEER' } })
  const totalApplications = await prisma.application.count()
  const approvedApplications = await prisma.application.count({ where: { status: 'APPROVED' } })
  
  const participations = await prisma.participation.findMany()
  const totalHours = participations.reduce((acc, curr) => acc + curr.hours, 0)

  // Get application stats for charts
  const applicationsByStatus = await prisma.application.groupBy({
    by: ['status'],
    _count: {
      status: true
    }
  })

  // Get volunteers registered over last few months (mocked grouping as SQLite doesn't have easy date grouping)
  // We'll just pass all users to the client and let the client process the chart data.
  const users = await prisma.user.findMany({
    where: { role: 'VOLUNTEER' },
    select: { createdAt: true }
  })

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Analytics Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">Platform overview and impact metrics.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-100 p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Volunteers</dt>
                <dd className="text-3xl font-semibold text-gray-900">{totalVolunteers}</dd>
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
                <dd className="text-3xl font-semibold text-gray-900">{totalApplications}</dd>
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
                <dd className="text-3xl font-semibold text-gray-900">{approvedApplications}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-100 p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Hours Logged</dt>
                <dd className="text-3xl font-semibold text-gray-900">{totalHours}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <AnalyticsCharts 
        applicationsByStatus={applicationsByStatus}
        users={users}
      />
    </div>
  )
}
