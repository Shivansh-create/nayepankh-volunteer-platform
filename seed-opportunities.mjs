import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const opportunities = [
    {
      title: "Weekly Food Distribution Drive",
      description: "Join us in distributing nutritious meals to the homeless and underprivileged families across local neighborhoods. We will be packing and delivering food packets. Wear comfortable shoes and bring a water bottle.",
      category: "Community Service",
      location: "Lucknow Main Square",
      date: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // Next week
      time: "10:00 AM",
      requiredSkills: "Empathy, Good Communication, Physical Stamina",
      volunteersNeeded: 50,
      durationHours: 4,
      coordinatorName: "Amit Kumar",
      status: "OPEN"
    },
    {
      title: "Weekend Education Workshop",
      description: "Help us teach basic literacy, math, and hygiene to children from slum areas. Volunteers will be assigned small groups of children. Teaching materials will be provided.",
      category: "Education",
      location: "NayePankh Learning Center",
      date: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000), // Two weeks from now
      time: "02:00 PM",
      requiredSkills: "Teaching, Patience, Local Language Fluency",
      volunteersNeeded: 20,
      durationHours: 3,
      coordinatorName: "Sneha Verma",
      status: "OPEN"
    },
    {
      title: "Sanitary Pad Distribution & Awareness",
      description: "Participate in our monthly menstrual health awareness campaign. Volunteers will help distribute sanitary pads and educate young women about menstrual hygiene in rural areas.",
      category: "Health",
      location: "Rural Outskirts, UP",
      date: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      time: "09:00 AM",
      requiredSkills: "Communication, Empathy, Health Knowledge (Optional)",
      volunteersNeeded: 30,
      durationHours: 5,
      coordinatorName: "Priya Singh",
      status: "OPEN"
    }
  ]

  console.log("Seeding opportunities...")
  
  for (const opp of opportunities) {
    await prisma.opportunity.create({
      data: opp
    })
    console.log(`Created opportunity: ${opp.title}`)
  }

  console.log("Seeding complete!")
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
