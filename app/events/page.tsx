import Link from "next/link"
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function EventsPage() {
  const events = [
    {
      id: 1,
      title: "Quran Study Circle",
      date: "Friday, Dec 27",
      time: "7:00 PM - 8:30 PM",
      location: "Main Hall",
      attendees: 45,
      description: "Weekly Quran recitation and tafsir session for all levels.",
      category: "Learning",
    },
    {
      id: 2,
      title: "Youth Sports Night",
      date: "Saturday, Dec 28",
      time: "6:00 PM - 8:00 PM",
      location: "Sports Court",
      attendees: 32,
      description: "Football, basketball, and badminton for youth aged 15-35.",
      category: "Community",
    },
    {
      id: 3,
      title: "Islamic Finance Workshop",
      date: "Sunday, Dec 29",
      time: "3:00 PM - 5:00 PM",
      location: "Community Center",
      attendees: 28,
      description: "Learn halal investment and financial planning principles.",
      category: "Workshop",
    },
    {
      id: 4,
      title: "Community Iftar",
      date: "Wednesday, Jan 1",
      time: "6:30 PM",
      location: "Dining Hall",
      attendees: 120,
      description: "Join us for a communal breaking of fast with the whole community.",
      category: "Social",
    },
    {
      id: 5,
      title: "Sisters Circle",
      date: "Thursday, Jan 2",
      time: "7:00 PM - 8:30 PM",
      location: "Women's Hall",
      attendees: 35,
      description: "Exclusive session for women to discuss faith, life, and sisterhood.",
      category: "Community",
    },
    {
      id: 6,
      title: "Career Talk Series",
      date: "Friday, Jan 3",
      time: "6:30 PM - 8:00 PM",
      location: "Meeting Room",
      attendees: 40,
      description: "Young professionals share insights on careers and balancing faith.",
      category: "Workshop",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Header Section */}
      <section className="pt-20 pb-12 px-4 sm:px-6 bg-gradient-to-b from-secondary/20 to-background">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Upcoming Events</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Join our vibrant community for enriching experiences and meaningful connections
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event) => (
              <Link key={event.id} href={`/events/${event.id}`} className="group">
                <Card className="p-6 bg-background border-0 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl h-full">
                  {/* Category Badge */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-lg">
                      {event.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">{event.description}</p>

                  {/* Event Details */}
                  <div className="space-y-3 mb-6 text-sm">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Calendar className="w-4 h-4 flex-shrink-0 text-primary" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <span className="w-4 h-4 flex-shrink-0">⏰</span>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <MapPin className="w-4 h-4 flex-shrink-0 text-accent" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-3 font-medium text-primary">
                      <Users className="w-4 h-4 flex-shrink-0" />
                      <span>{event.attendees} registered</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button className="w-full rounded-xl font-semibold gap-2 bg-primary hover:bg-primary/90">
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
