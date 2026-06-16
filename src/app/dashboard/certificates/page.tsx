import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import CertificateGenerator from "./CertificateGenerator"

export default async function VolunteerCertificates() {
  const session = await auth()
  
  const participations = await prisma.participation.findMany({
    where: { 
      userId: session?.user?.id,
      status: "ATTENDED"
    },
    include: {
      event: {
        include: { opportunity: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  // We can also fetch previously generated certificates if we stored them,
  // but for MVP, we will allow them to generate a certificate for any attended event.

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Certificates</h1>
        <p className="mt-2 text-sm text-gray-600">Download certificates for the volunteer events you have attended.</p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md border border-gray-100">
        {participations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm text-gray-500">You haven't attended any events yet.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {participations.map((part) => (
              <li key={part.id}>
                <div className="px-4 py-6 sm:px-6 hover:bg-gray-50 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Certificate of Participation</h3>
                    <p className="text-sm text-blue-600 font-medium mb-1">{part.event.opportunity.title}</p>
                    <p className="text-xs text-gray-500">
                      Attended on {new Date(part.event.date).toLocaleDateString()} • {part.hours} hours logged
                    </p>
                  </div>
                  <div className="ml-4">
                    <CertificateGenerator 
                      volunteerName={session?.user?.name || "Volunteer"}
                      eventName={part.event.opportunity.title}
                      date={part.event.date.toISOString()}
                      hours={part.hours}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
