import type { Metadata } from "next"
import { Poppins, DM_Sans } from "next/font/google"
import "./globals.css"
import Providers from "@/components/Providers"
import Navbar from "@/components/Navbar"

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: '--font-poppins',
})

const dmSans = DM_Sans({ 
  weight: ['400', '500', '700'],
  subsets: ["latin"],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: "NayePankh Foundation | Volunteer Platform",
  description: "Join NayePankh Foundation to make a difference. Register as a volunteer, participate in events, and track your impact.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${dmSans.variable}`}>
      <body className={`${dmSans.className} font-sans`}>
        <Providers>
          <Navbar />
          <div className="pt-16">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
