import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plus } from "lucide-react"

export default async function AdminOpportunities() {
  const opportunities = await prisma.opportunity.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { applications: true }
      }
    }
  })

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Opportunities</h1>
          <p className="mt-2 text-sm text-gray-600">Create, edit, and monitor volunteer opportunities.</p>
        </div>
        <Link href="/admin/opportunities/create" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          <Plus className="w-5 h-5 mr-2" />
          New Opportunity
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md border border-gray-200">
        <ul className="divide-y divide-gray-200">
          {opportunities.map((opp) => (
            <li key={opp.id}>
              <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-blue-600 truncate">{opp.title}</h3>
                  <div className="mt-2 flex text-sm text-gray-500 space-x-4">
                    <span>{new Date(opp.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{opp.location}</span>
                    <span>•</span>
                    <span className="font-medium text-gray-900">{opp._count.applications} applications</span>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${opp.status === 'OPEN' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {opp.status}
                  </span>
                  <div className="flex space-x-2">
                    <Link href={`/admin/opportunities/${opp.id}/edit`} className="text-xs text-blue-600 hover:text-blue-900">Edit</Link>
                    <Link href={`/admin/opportunities/${opp.id}/applications`} className="text-xs text-purple-600 hover:text-purple-900">View Apps</Link>
                  </div>
                </div>
              </div>
            </li>
          ))}
          {opportunities.length === 0 && (
            <li className="px-4 py-8 text-center text-gray-500">No opportunities found.</li>
          )}
        </ul>
      </div>
    </div>
  )
}
