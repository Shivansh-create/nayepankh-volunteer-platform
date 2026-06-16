"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Heart, Users, Calendar, Award } from "lucide-react"

export default function Home() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-blue-50 py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-poppins font-extrabold text-gray-900 tracking-tight mb-8 leading-tight">
              "If we all do something, then together there is no problem that we cannot solve!"
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Join NayePankh Foundation's volunteer network. Discover opportunities, track your impact, and help us build a better tomorrow for everyone.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-full text-white bg-blue-600 hover:bg-blue-700 transition shadow-lg hover:shadow-xl">
                Become a Volunteer
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="/opportunities" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-full text-blue-600 bg-white border-2 border-blue-100 hover:border-blue-600 transition">
                View Opportunities
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative background shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-100 blur-3xl opacity-50"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-blue-200 blur-3xl opacity-50"></div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Active Volunteers", value: "5,000+", icon: Users },
              { label: "Communities Reached", value: "120+", icon: Heart },
              { label: "Events Organized", value: "450+", icon: Calendar },
              { label: "Certificates Awarded", value: "10,000+", icon: Award },
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                  <stat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-poppins font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                NayePankh Foundation is a UP Government registered NGO and one of the biggest student organizations in India. We have helped over 2 lakh underprivileged people by providing free food, sanitary pads, clothes and education.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Our volunteer management platform ensures that every hour you contribute is tracked, recognized, and impactful. From local food drives to educational workshops, your effort matters.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-96 rounded-2xl overflow-hidden bg-gray-800"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 mix-blend-overlay z-10" />
              <img 
                src="https://assets.zyrosite.com/YKbL494Mv8Ip3qgy/whatsapp-image-2023-01-31-at-9.40.45-pm-dWxpDb2pNbCaxERZ.jpeg" 
                alt="NayePankh Impact" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white mb-6"
          >
            Ready to make a difference?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-100 mb-10"
          >
            Join thousands of volunteers who are already creating positive change in their communities.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/register" className="inline-block px-10 py-4 text-lg font-bold rounded-full text-blue-600 bg-white hover:bg-gray-50 transition shadow-xl hover:shadow-2xl">
              Start Volunteering Today
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} NayePankh Foundation. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
