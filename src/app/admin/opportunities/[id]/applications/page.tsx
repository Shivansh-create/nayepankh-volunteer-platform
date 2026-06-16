import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import AttendanceManager from "./AttendanceManager"

export default async function OpportunityApplications({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const opportunity = await prisma.opportunity.findUnique({
    where: { id: resolvedParams.id },
    include: {
      applications: {
        include: { user: true }
      },
      events: {
        include: { participations: true }
      }
    }
  })

  if (!opportunity) notFound()

  // For MVP, we'll create an event for this opportunity automatically if it doesn't exist,
  // or we'll assume the opportunity itself is the "event" and mark attendance directly for it.
  let event = opportunity.events[0]
  if (!event) {
    event = await prisma.event.create({
      data: {
        opportunityId: opportunity.id,
        date: opportunity.date
      },
      include: { participations: true }
    })
  }

  const approvedApplications = opportunity.applications.filter(a => a.status === 'APPROVED')

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link href="/admin/opportunities" className="text-blue-600 hover:underline text-sm font-medium">
          &larr; Back to Opportunities
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mt-4">{opportunity.title} - Attendance</h1>
        <p className="mt-2 text-sm text-gray-600">Mark attendance and award hours to approved volunteers.</p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md border border-gray-200 p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Approved Volunteers</h3>
        {approvedApplications.length === 0 ? (
          <p className="text-sm text-gray-500">No approved applications for this opportunity yet.</p>
        ) : (
          <AttendanceManager 
            eventId={event.id}
            opportunityDuration={opportunity.durationHours}
            approvedVolunteers={approvedApplications.map(a => a.user)}
            existingParticipations={event.participations}
          />
        )}
      </div>
    </div>
  )
}
