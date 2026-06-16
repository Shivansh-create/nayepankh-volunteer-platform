"use client"

import { useMemo } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function AnalyticsCharts({ applicationsByStatus, users }: { applicationsByStatus: any[], users: any[] }) {
  
  const applicationData = useMemo(() => {
    return applicationsByStatus.map(status => ({
      name: status.status,
      value: status._count.status
    }))
  }, [applicationsByStatus])

  const userGrowthData = useMemo(() => {
    // Process user registration dates to get monthly counts
    const months: Record<string, number> = {}
    
    // Initialize last 6 months
    for (let i = 5; i >= 0; i--) {
      const d = new Date()
      d.setMonth(d.getMonth() - i)
      const monthStr = d.toLocaleString('default', { month: 'short' })
      months[monthStr] = 0
    }

    users.forEach(u => {
      const d = new Date(u.createdAt)
      const monthStr = d.toLocaleString('default', { month: 'short' })
      if (months[monthStr] !== undefined) {
        months[monthStr]++
      }
    })

    return Object.keys(months).map(key => ({
      month: key,
      volunteers: months[key]
    }))
  }, [users])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white shadow rounded-lg border border-gray-100 p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">Application Status Distribution</h3>
        <div className="h-80">
          {applicationData.length === 0 ? (
            <div className="h-full flex items-center justify-center text-sm text-gray-500">No application data available</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={applicationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {applicationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg border border-gray-100 p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">Volunteer Growth (Last 6 Months)</h3>
        <div className="h-80">
          {users.length === 0 ? (
            <div className="h-full flex items-center justify-center text-sm text-gray-500">No user data available</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userGrowthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <RechartsTooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="volunteers" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  )
}
