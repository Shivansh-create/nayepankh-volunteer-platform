import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Heart, Globe, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-50 py-20 lg:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900 mb-6">
            About NayePankh Foundation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are a UP Government registered NGO and one of the biggest student-led organizations in India. We believe in providing the wings to fly for those who need it most.
          </p>
        </div>
        
        {/* Decorative background shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-96 h-96 rounded-full bg-blue-100 blur-3xl opacity-50"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 rounded-full bg-blue-200 blur-3xl opacity-50"></div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-6">Why Volunteer With Us?</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At NayePankh Foundation, volunteers are the heartbeat of our organization. Our volunteer platform connects passionate individuals with impactful opportunities in local communities. 
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Whether you're helping distribute food to underprivileged families, teaching children in our weekend workshops, or raising awareness about health and hygiene, your time and effort directly change lives. We track all your volunteer hours through this platform, awarding certificates of appreciation to honor your dedication to social change.
              </p>
              
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
                      <Heart className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-medium text-gray-900">Make a Real Impact</h3>
                    <p className="mt-2 text-gray-600">Our drives and events directly benefit those in severe need, providing food, education, and basic necessities.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
                      <Users className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-medium text-gray-900">Join a Community</h3>
                    <p className="mt-2 text-gray-600">Work alongside thousands of other passionate students and young professionals across India.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
                      <Globe className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-medium text-gray-900">Earn Certificates</h3>
                    <p className="mt-2 text-gray-600">Build your profile and resume. Every hour you log is automatically tracked by our platform and certified.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-gray-100">
              <img 
                src="https://assets.zyrosite.com/YKbL494Mv8Ip3qgy/whatsapp-image-2023-01-31-at-9.40.45-pm-dWxpDb2pNbCaxERZ.jpeg" 
                alt="Volunteers at NayePankh Foundation" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-poppins font-bold text-white mb-6">
            Ready to give them wings to fly?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Create an account today, complete your volunteer profile, and start exploring opportunities in your area.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-bold rounded-full text-blue-600 bg-white hover:bg-gray-50 transition shadow-md">
              Register as Volunteer
            </Link>
            <Link href="/opportunities" className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-base font-bold rounded-full text-white hover:bg-blue-700 transition">
              Browse Opportunities
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
