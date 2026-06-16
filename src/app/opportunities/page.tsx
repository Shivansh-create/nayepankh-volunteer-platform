import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Calendar, MapPin, Clock, Users } from "lucide-react"
import { auth } from "@/auth"

export default async function OpportunitiesPage() {
  const session = await auth()
  
  const opportunities = await prisma.opportunity.findMany({
    where: { status: "OPEN" },
    orderBy: { date: "asc" }
  })

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Volunteer Opportunities
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Find an opportunity that matches your skills and interests.
          </p>
        </div>

        {opportunities.length === 0 ? (
          <div className="text-center bg-white p-12 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium text-gray-900">No opportunities available</h3>
            <p className="mt-2 text-gray-500">Check back later for new volunteer opportunities.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {opportunities.map((opp) => (
              <div key={opp.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 overflow-hidden flex flex-col">
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {opp.category}
                    </span>
                    <span className="text-sm font-medium text-gray-500">{new Date(opp.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{opp.title}</h3>
                  <p className="text-sm text-gray-600 mb-6 line-clamp-2">{opp.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="flex-shrink-0 mr-2 h-4 w-4 text-gray-400" />
                      {new Date(opp.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="flex-shrink-0 mr-2 h-4 w-4 text-gray-400" />
                      {opp.time} ({opp.durationHours} hours)
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="flex-shrink-0 mr-2 h-4 w-4 text-gray-400" />
                      {opp.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="flex-shrink-0 mr-2 h-4 w-4 text-gray-400" />
                      {opp.volunteersNeeded} volunteers needed
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
                  <Link href={`/opportunities/${opp.id}`} className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
