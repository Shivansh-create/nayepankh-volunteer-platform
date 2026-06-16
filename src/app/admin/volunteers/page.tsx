import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Mail, Phone } from "lucide-react"

export default async function AdminVolunteers() {
  const volunteers = await prisma.user.findMany({
    where: { role: "VOLUNTEER" },
    include: {
      volunteerProfile: true,
      _count: {
        select: { applications: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Volunteer Management</h1>
          <p className="mt-2 text-sm text-gray-600">View and manage registered volunteers.</p>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applications
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Hours
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {volunteers.map((vol) => (
                <tr key={vol.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{vol.name}</div>
                    <div className="text-sm text-gray-500">Joined {new Date(vol.createdAt).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <Mail className="w-4 h-4 mr-2" />
                      <a href={`mailto:${vol.email}`} className="hover:text-blue-600">{vol.email}</a>
                    </div>
                    {vol.volunteerProfile?.phone && (
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Phone className="w-4 h-4 mr-2" />
                        {vol.volunteerProfile.phone}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {vol.volunteerProfile?.city ? `${vol.volunteerProfile.city}, ${vol.volunteerProfile.state || ''}` : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {vol._count.applications}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {vol.volunteerProfile?.totalHours || 0} hrs
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {volunteers.length === 0 && (
            <div className="px-6 py-8 text-center text-gray-500">No volunteers registered yet.</div>
          )}
        </div>
      </div>
    </div>
  )
}
