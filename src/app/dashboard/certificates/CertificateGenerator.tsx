"use client"

import { useState } from "react"
import jsPDF from "jspdf"
import { Download } from "lucide-react"

export default function CertificateGenerator({ 
  volunteerName, 
  eventName, 
  date, 
  hours 
}: { 
  volunteerName: string, 
  eventName: string, 
  date: string, 
  hours: number 
}) {
  const [generating, setGenerating] = useState(false)

  const generatePDF = () => {
    setGenerating(true)
    
    try {
      // Create landscape A4 PDF
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4"
      })

      // Background color
      doc.setFillColor(245, 247, 250)
      doc.rect(0, 0, 297, 210, "F")

      // Border
      doc.setDrawColor(37, 99, 235) // blue-600
      doc.setLineWidth(4)
      doc.rect(10, 10, 277, 190, "S")
      doc.setLineWidth(1)
      doc.rect(12, 12, 273, 186, "S")

      // Header
      doc.setTextColor(30, 58, 138) // blue-900
      doc.setFontSize(40)
      doc.setFont("helvetica", "bold")
      doc.text("CERTIFICATE", 148.5, 50, { align: "center" })
      
      doc.setFontSize(16)
      doc.setFont("helvetica", "normal")
      doc.setTextColor(75, 85, 99) // gray-600
      doc.text("OF APPRECIATION", 148.5, 65, { align: "center" })

      // Logo / Title
      doc.setFontSize(24)
      doc.setTextColor(37, 99, 235)
      doc.setFont("helvetica", "bold")
      doc.text("NayePankh Foundation", 148.5, 30, { align: "center" })

      // Body text
      doc.setFontSize(16)
      doc.setTextColor(75, 85, 99)
      doc.setFont("helvetica", "normal")
      doc.text("This certificate is proudly presented to", 148.5, 90, { align: "center" })

      // Name
      doc.setFontSize(36)
      doc.setTextColor(17, 24, 39) // gray-900
      doc.setFont("helvetica", "bolditalic")
      doc.text(volunteerName, 148.5, 110, { align: "center" })

      // Underline name
      doc.setDrawColor(209, 213, 219)
      doc.setLineWidth(0.5)
      doc.line(70, 115, 227, 115)

      // Details
      doc.setFontSize(14)
      doc.setTextColor(75, 85, 99)
      doc.setFont("helvetica", "normal")
      doc.text(`For successfully participating in and contributing to`, 148.5, 130, { align: "center" })
      
      doc.setFontSize(18)
      doc.setTextColor(30, 58, 138)
      doc.setFont("helvetica", "bold")
      doc.text(eventName, 148.5, 145, { align: "center" })

      doc.setFontSize(14)
      doc.setTextColor(75, 85, 99)
      doc.setFont("helvetica", "normal")
      doc.text(`and completing ${hours} volunteer hours on ${new Date(date).toLocaleDateString()}.`, 148.5, 160, { align: "center" })

      // Signatures
      doc.setLineWidth(0.5)
      doc.line(50, 190, 100, 190)
      doc.setFontSize(12)
      doc.text("President", 75, 195, { align: "center" })

      doc.line(197, 190, 247, 190)
      doc.text("Coordinator", 222, 195, { align: "center" })

      // Save PDF
      doc.save(`${volunteerName.replace(/\s+/g, '_')}_Certificate.pdf`)
    } catch (err) {
      console.error(err)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <button
      onClick={generatePDF}
      disabled={generating}
      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition disabled:opacity-50"
    >
      <Download className="w-4 h-4 mr-2" />
      {generating ? "Generating..." : "Download"}
    </button>
  )
}
