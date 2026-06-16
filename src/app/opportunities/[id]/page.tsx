import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Calendar, MapPin, Clock, Users, UserCircle } from "lucide-react"
import ApplyButton from "./ApplyButton"
import { auth } from "@/auth"
import Link from "next/link"

export default async function OpportunityDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const opportunity = await prisma.opportunity.findUnique({
    where: { id: resolvedParams.id }
  })

  if (!opportunity) {
    notFound()
  }

  const session = await auth()
  let hasApplied = false

  if (session?.user?.id) {
    const existingApplication = await prisma.application.findUnique({
      where: {
        userId_opportunityId: {
          userId: session.user.id,
          opportunityId: opportunity.id
        }
      }
    })
    if (existingApplication) {
      hasApplied = true
    }
  }

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/opportunities" className="text-blue-600 hover:underline text-sm font-medium">
            &larr; Back to Opportunities
          </Link>
        </div>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 bg-gray-50 flex justify-between items-start">
            <div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-4">
                {opportunity.category}
              </span>
              <h3 className="text-2xl leading-6 font-bold text-gray-900">{opportunity.title}</h3>
              <p className="mt-2 max-w-2xl text-sm text-gray-500">Posted on {new Date(opportunity.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${opportunity.status === 'OPEN' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {opportunity.status}
              </span>
            </div>
          </div>
          
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:gap-x-8 mb-8">
              <div className="sm:col-span-1 flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <dt className="text-sm font-medium text-gray-500">Date</dt>
                  <dd className="mt-1 text-sm text-gray-900">{new Date(opportunity.date).toLocaleDateString()}</dd>
                </div>
              </div>
              <div className="sm:col-span-1 flex items-center">
                <Clock className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <dt className="text-sm font-medium text-gray-500">Time & Duration</dt>
                  <dd className="mt-1 text-sm text-gray-900">{opportunity.time} ({opportunity.durationHours} hours)</dd>
                </div>
              </div>
              <div className="sm:col-span-1 flex items-center">
                <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <dt className="text-sm font-medium text-gray-500">Location</dt>
                  <dd className="mt-1 text-sm text-gray-900">{opportunity.location}</dd>
                </div>
              </div>
              <div className="sm:col-span-1 flex items-center">
                <Users className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <dt className="text-sm font-medium text-gray-500">Volunteers Needed</dt>
                  <dd className="mt-1 text-sm text-gray-900">{opportunity.volunteersNeeded}</dd>
                </div>
              </div>
              <div className="sm:col-span-2 flex items-center">
                <UserCircle className="h-5 w-5 text-gray-400 mr-2" />
                <div>
                  <dt className="text-sm font-medium text-gray-500">Coordinator</dt>
                  <dd className="mt-1 text-sm text-gray-900">{opportunity.coordinatorName || "NayePankh Staff"}</dd>
                </div>
              </div>
              {opportunity.requiredSkills && (
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Required Skills</dt>
                  <dd className="mt-1 text-sm text-gray-900">{opportunity.requiredSkills}</dd>
                </div>
              )}
            </div>

            <div className="mb-8">
              <dt className="text-lg font-medium text-gray-900 mb-4">About this Opportunity</dt>
              <dd className="text-base text-gray-700 whitespace-pre-wrap leading-relaxed border-l-4 border-blue-200 pl-4 py-1">
                {opportunity.description}
              </dd>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 bg-gray-50 -mx-4 -mb-5 px-4 py-5 sm:px-6">
              {session ? (
                opportunity.status === 'OPEN' ? (
                  <ApplyButton opportunityId={opportunity.id} hasApplied={hasApplied} />
                ) : (
                  <p className="text-sm text-gray-500">This opportunity is no longer accepting applications.</p>
                )
              ) : (
                <div className="text-center sm:text-left flex flex-col sm:flex-row items-center justify-between">
                  <p className="text-sm text-gray-600 mb-4 sm:mb-0">Please sign in to apply for this opportunity.</p>
                  <Link href="/login" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                    Sign In to Apply
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
