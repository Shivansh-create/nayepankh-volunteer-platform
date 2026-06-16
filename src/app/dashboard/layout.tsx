import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, UserCircle, Calendar, FileText, Award } from "lucide-react"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  
  if (!session) {
    redirect("/login")
  }

  const role = session.user.role

  // If Admin, they should probably go to /admin, but we can allow them to see the dashboard too, 
  // or redirect them. For now, we'll just show the volunteer sidebar.
  const navigation = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Profile', href: '/dashboard/profile', icon: UserCircle },
    { name: 'Opportunities', href: '/opportunities', icon: Calendar },
    { name: 'My Applications', href: '/dashboard/applications', icon: FileText },
    { name: 'Certificates', href: '/dashboard/certificates', icon: Award },
  ]

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white border-r border-gray-200 hidden md:block">
        <div className="h-full flex flex-col pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-2 space-y-1 bg-white">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center px-2 py-3 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition"
              >
                <item.icon
                  className="mr-3 flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-blue-600 transition"
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
            {role === "ADMIN" && (
              <Link
                href="/admin"
                className="group flex items-center px-2 py-3 text-sm font-medium rounded-md text-purple-600 hover:bg-purple-50 transition mt-4 border border-purple-100 bg-purple-50"
              >
                <LayoutDashboard
                  className="mr-3 flex-shrink-0 h-5 w-5 text-purple-600"
                  aria-hidden="true"
                />
                Admin Dashboard
              </Link>
            )}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}
