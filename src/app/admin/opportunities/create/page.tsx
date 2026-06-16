"use client"

import { useState } from "react"
import { createOpportunity } from "@/actions/opportunity"
import Link from "next/link"

export default function CreateOpportunity() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    const res = await createOpportunity(formData)
    
    if (res?.error) {
      setError(res.error)
      setLoading(false)
    }
    // Success redirects automatically
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create Opportunity</h1>
          <p className="mt-2 text-sm text-gray-600">Fill in the details for the new volunteer event.</p>
        </div>
        <Link href="/admin/opportunities" className="text-sm font-medium text-blue-600 hover:text-blue-500">
          Cancel
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg p-6 sm:p-8 border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input required type="text" name="title" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 border outline-none" placeholder="e.g. Weekend Food Drive" />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea required name="description" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 border outline-none" placeholder="Details about what volunteers will do..." />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select required name="category" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 border outline-none">
                <option value="">Select Category</option>
                <option value="Education">Education</option>
                <option value="Environment">Environment</option>
                <option value="Health">Health</option>
                <option value="Community Service">Community Service</option>
                <option value="Disaster Relief">Disaster Relief</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input required type="text" name="location" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 border outline-none" placeholder="e.g. City Community Center" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input required type="date" name="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 border outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Time</label>
              <input required type="text" name="time" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 border outline-none" placeholder="e.g. 10:00 AM" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Duration (Hours)</label>
              <input required type="number" min="1" name="durationHours" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 border outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Volunteers Needed</label>
              <input required type="number" min="1" name="volunteersNeeded" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 border outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Coordinator Name</label>
              <input type="text" name="coordinatorName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 border outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Required Skills</label>
              <input type="text" name="requiredSkills" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 border outline-none" placeholder="e.g. First Aid, Teaching" />
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Opportunity"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
