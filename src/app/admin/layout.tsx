import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, Users, Calendar, FileText, Settings, Award, Shield } from "lucide-react"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  
  if (!session || session.user.role !== "ADMIN") {
    redirect("/dashboard")
  }

  const navigation = [
    { name: 'Analytics', href: '/admin', icon: LayoutDashboard },
    { name: 'Volunteers', href: '/admin/volunteers', icon: Users },
    { name: 'Opportunities', href: '/admin/opportunities', icon: Calendar },
    { name: 'Applications', href: '/admin/applications', icon: FileText },
    { name: 'Certificates', href: '/admin/certificates', icon: Award },
  ]

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-gray-900 text-white border-r border-gray-800 hidden md:block">
        <div className="h-full flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="px-4 mb-6 flex items-center text-purple-400 font-bold">
            <Shield className="w-5 h-5 mr-2" />
            Admin Portal
          </div>
          <nav className="mt-2 flex-1 px-2 space-y-1 bg-gray-900">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center px-2 py-3 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition"
              >
                <item.icon
                  className="mr-3 flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-300 transition"
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
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
