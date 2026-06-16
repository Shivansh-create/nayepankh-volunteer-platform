"use client"

import { useState } from "react"
import { applyForOpportunity } from "@/actions/application"
import { useRouter } from "next/navigation"

export default function ApplyButton({ opportunityId, hasApplied }: { opportunityId: string, hasApplied: boolean }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  if (hasApplied) {
    return (
      <button disabled className="w-full sm:w-auto px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-blue-800 bg-blue-100 cursor-not-allowed">
        Application Submitted
      </button>
    )
  }

  const handleApply = async () => {
    setLoading(true)
    setError(null)
    const res = await applyForOpportunity(opportunityId)
    
    if (res?.error) {
      setError(res.error)
    } else {
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <div>
      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
      <button
        onClick={handleApply}
        disabled={loading}
        className="w-full sm:w-auto px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:opacity-50"
      >
        {loading ? "Applying..." : "Apply Now"}
      </button>
    </div>
  )
}
