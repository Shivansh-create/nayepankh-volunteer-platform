"use client"

import { useState } from "react"
import { markAttendance } from "@/actions/attendance"
import { Save } from "lucide-react"

export default function AttendanceManager({
  eventId,
  opportunityDuration,
  approvedVolunteers,
  existingParticipations
}: {
  eventId: string,
  opportunityDuration: number,
  approvedVolunteers: any[],
  existingParticipations: any[]
}) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialize state based on existing participations
  const [records, setRecords] = useState<Record<string, { status: string, hours: number }>>(() => {
    const init: Record<string, { status: string, hours: number }> = {}
    approvedVolunteers.forEach(v => {
      const existing = existingParticipations.find(p => p.userId === v.id)
      if (existing) {
        init[v.id] = { status: existing.status, hours: existing.hours }
      } else {
        init[v.id] = { status: "ATTENDED", hours: opportunityDuration }
      }
    })
    return init
  })

  const handleChange = (userId: string, field: 'status' | 'hours', value: string | number) => {
    setRecords(prev => ({
      ...prev,
      [userId]: { ...prev[userId], [field]: value }
    }))
  }

  const handleSave = async () => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    const payload = Object.keys(records).map(userId => ({
      userId,
      status: records[userId].status,
      hours: Number(records[userId].hours)
    }))

    const res = await markAttendance(eventId, payload)
    
    if (res?.error) {
      setError(res.error)
    } else {
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }
    setLoading(false)
  }

  return (
    <div>
      {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">{error}</div>}
      {success && <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md text-sm">Attendance saved successfully!</div>}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volunteer</th>
              <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours Awarded</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {approvedVolunteers.map(v => (
              <tr key={v.id}>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{v.name}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  <select
                    value={records[v.id].status}
                    onChange={(e) => handleChange(v.id, 'status', e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="ATTENDED">Attended</option>
                    <option value="NO_SHOW">No Show</option>
                  </select>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  <input
                    type="number"
                    min="0"
                    value={records[v.id].hours}
                    onChange={(e) => handleChange(v.id, 'hours', e.target.value)}
                    disabled={records[v.id].status === 'NO_SHOW'}
                    className="mt-1 block w-24 pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? "Saving..." : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Attendance
            </>
          )}
        </button>
      </div>
    </div>
  )
}
