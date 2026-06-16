"use client"

import { useState } from "react"
import { updateProfile } from "@/actions/profile"
import { Save, CheckCircle2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function ProfileForm({ initialData }: { initialData: any }) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Calculate profile completion
  const calculateCompletion = () => {
    if (!initialData) return 0
    const fields = ['phone', 'age', 'gender', 'city', 'state', 'education', 'occupation', 'skills', 'interests', 'availability', 'motivation']
    const filled = fields.filter(f => initialData[f] && String(initialData[f]).trim() !== "").length
    return Math.round((filled / fields.length) * 100)
  }

  const completion = calculateCompletion()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)
    
    const formData = new FormData(e.currentTarget)
    const res = await updateProfile(formData)
    
    if (res?.error) {
      setError(res.error)
    } else {
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="mb-8 p-4 bg-blue-50 rounded-lg flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-blue-800">Profile Completion</h3>
          <p className="text-xs text-blue-600 mt-1">Complete your profile to unlock more opportunities.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-32 h-2 bg-blue-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: `${completion}%` }} />
          </div>
          <span className="text-sm font-bold text-blue-800">{completion}%</span>
        </div>
      </div>

      <AnimatePresence>
        {success && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }}
            className="p-4 bg-green-50 text-green-700 rounded-md flex items-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            Profile updated successfully
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input type="tel" name="phone" defaultValue={initialData?.phone || ""} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 border outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input type="number" name="age" defaultValue={initialData?.age || ""} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 border outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select name="gender" defaultValue={initialData?.gender || ""} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 border outline-none">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input type="text" name="city" defaultValue={initialData?.city || ""} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 border outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">State</label>
          <input type="text" name="state" defaultValue={initialData?.state || ""} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 border outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Education</label>
          <input type="text" name="education" defaultValue={initialData?.education || ""} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 border outline-none" placeholder="e.g. B.Tech, High School" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Occupation</label>
          <input type="text" name="occupation" defaultValue={initialData?.occupation || ""} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 border outline-none" placeholder="e.g. Student, Software Engineer" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
          <input type="url" name="linkedinUrl" defaultValue={initialData?.linkedinUrl || ""} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 border outline-none" placeholder="https://linkedin.com/in/..." />
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Skills (comma separated)</label>
          <input type="text" name="skills" defaultValue={initialData?.skills || ""} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 border outline-none" placeholder="e.g. Teaching, Event Management, Coding" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Areas of Interest (comma separated)</label>
          <input type="text" name="interests" defaultValue={initialData?.interests || ""} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 border outline-none" placeholder="e.g. Child Education, Women Empowerment" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Availability</label>
          <select name="availability" defaultValue={initialData?.availability || ""} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 border outline-none">
            <option value="">Select Availability</option>
            <option value="Weekends only">Weekends only</option>
            <option value="Weekdays">Weekdays</option>
            <option value="Few hours a week">Few hours a week</option>
            <option value="Full time">Full time</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Motivation Statement</label>
          <p className="text-xs text-gray-500 mb-2">Why do you want to volunteer with NayePankh Foundation?</p>
          <textarea name="motivation" rows={4} defaultValue={initialData?.motivation || ""} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 border outline-none" />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : (
            <>
              <Save className="w-5 h-5 mr-2" />
              Save Profile
            </>
          )}
        </button>
      </div>
    </form>
  )
}
