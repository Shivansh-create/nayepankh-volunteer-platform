"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export default function Navbar() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-poppins font-bold text-2xl text-blue-600 flex items-center"
              >
                <img 
                  src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=32,h=32,fit=crop,f=png/YKbL494Mv8Ip3qgy/logo-AVLW2LLWZkI8v845.png" 
                  alt="NayePankh Logo" 
                  className="w-8 h-8 mr-2"
                />
                NayePankh
              </motion.span>
            </Link>
          </div>
          
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition px-3 py-2 text-sm font-medium">Home</Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600 transition px-3 py-2 text-sm font-medium">About</Link>
            {session ? (
              <>
                <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 transition px-3 py-2 text-sm font-medium">Dashboard</Link>
                <button 
                  onClick={() => signOut()}
                  className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-full text-sm font-medium transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-600 hover:text-blue-600 transition px-3 py-2 text-sm font-medium">Login</Link>
                <Link href="/register" className="bg-blue-600 text-white hover:bg-blue-700 px-5 py-2 rounded-full text-sm font-medium transition shadow-sm hover:shadow-md">
                  Join Us
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="sm:hidden bg-white border-b border-gray-100"
        >
          <div className="pt-2 pb-3 space-y-1 px-4">
            <Link href="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">Home</Link>
            <Link href="/about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">About</Link>
            {session ? (
              <>
                <Link href="/dashboard" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">Dashboard</Link>
                <button 
                  onClick={() => signOut()}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">Login</Link>
                <Link href="/register" className="block px-3 py-2 text-base font-medium text-blue-600 hover:bg-blue-50 rounded-md">Join Us</Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  )
}
