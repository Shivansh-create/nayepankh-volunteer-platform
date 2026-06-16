"use client"

import { useState } from "react"
import { updateApplicationStatus } from "@/actions/admin-application"
import { Check, X, Search, Clock } from "lucide-react"

export default function ApplicationList({ initialApplications }: { initialApplications: any[] }) {
  const [applications, setApplications] = useState(initialApplications)
  const [loading, setLoading] = useState<string | null>(null)
  const [notes, setNotes] = useState<Record<string, string>>({})

  const handleUpdate = async (id: string, status: string) => {
    setLoading(id)
    const res = await updateApplicationStatus(id, status, notes[id] || "")
    if (res.success) {
      setApplications(applications.map(app => app.id === id ? { ...app, status, adminNotes: notes[id] || app.adminNotes } : app))
    }
    setLoading(null)
  }

  const handleNotesChange = (id: string, value: string) => {
    setNotes({ ...notes, [id]: value })
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md border border-gray-200">
      <ul className="divide-y divide-gray-200">
        {applications.map((app) => (
          <li key={app.id}>
            <div className="px-4 py-6 sm:px-6 hover:bg-gray-50 flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-900">{app.user.name}</h3>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${app.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 
                      app.status === 'REJECTED' ? 'bg-red-100 text-red-800' : 
                      app.status === 'REVIEW' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'}`}>
                    {app.status}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mb-2">
                  <span className="font-medium text-blue-600">{app.opportunity.title}</span> • Applied on {new Date(app.createdAt).toLocaleDateString()}
                </div>
                
                <div className="mt-4">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Admin Notes (optional)</label>
                  <textarea 
                    rows={2}
                    placeholder="Reason for rejection or additional info..."
                    defaultValue={app.adminNotes || ""}
                    onChange={(e) => handleNotesChange(app.id, e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-row md:flex-col gap-2">
                {app.status !== 'APPROVED' && (
                  <button
                    onClick={() => handleUpdate(app.id, 'APPROVED')}
                    disabled={loading === app.id}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                  >
                    <Check className="w-4 h-4 mr-1" /> Approve
                  </button>
                )}
                {app.status !== 'REJECTED' && (
                  <button
                    onClick={() => handleUpdate(app.id, 'REJECTED')}
                    disabled={loading === app.id}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                  >
                    <X className="w-4 h-4 mr-1" /> Reject
                  </button>
                )}
                {app.status !== 'REVIEW' && (
                  <button
                    onClick={() => handleUpdate(app.id, 'REVIEW')}
                    disabled={loading === app.id}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    <Clock className="w-4 h-4 mr-1" /> Under Review
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
        {applications.length === 0 && (
          <li className="px-4 py-8 text-center text-gray-500">No applications found.</li>
        )}
      </ul>
    </div>
  )
}
