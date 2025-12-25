"use client"

import { useParams, useRouter } from "next/navigation"
import { Calendar, MapPin, Users, Clock, ArrowLeft, Share2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function EventDetailPage() {
  const params = useParams()
  const router = useRouter()
  const eventId = Number.parseInt(params.id as string)

  const eventsData = [
    {
      id: 1,
      title: "Quran Study Circle",
      date: "Friday, Dec 27",
      time: "7:00 PM - 8:30 PM",
      location: "Main Hall",
      attendees: 45,
      description: "Weekly Quran recitation and tafsir session for all levels.",
      category: "Learning",
      fullDescription:
        "Join our weekly Quran study circle where we explore the meanings and lessons of the Quran together. This session is perfect for all levels - whether you're a beginner or advanced student. We cover tafsir (interpretation) and discuss how the Quranic teachings apply to our daily lives.",
      features: ["Beginner-friendly", "Weekly sessions", "Expert guidance", "Interactive Q&A"],
      speaker: "Sheikh Ahmad Al-Rashid",
      image: "bg-primary",
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
      fullDescription:
        "Get active and connect with the community! Our youth sports night features multiple sports including football, basketball, and badminton. It's a great way to stay healthy, have fun, and build friendships with fellow community members.",
      features: ["Multiple sports", "All skill levels welcome", "Free refreshments", "Social networking"],
      speaker: "Youth Coordinator",
      image: "bg-secondary",
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
      fullDescription:
        "Discover how to manage your finances according to Islamic principles. This workshop covers halal investments, savings strategies, and how to build wealth while maintaining ethical standards.",
      features: ["Financial planning", "Halal investments", "Expert speakers", "Certificate of attendance"],
      speaker: "Dr. Muhammad Hassan",
      image: "bg-accent",
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
      fullDescription:
        "Experience the spirit of community during our special iftar gathering. Share a meal with your brothers and sisters, strengthen bonds, and create lasting memories together.",
      features: ["Traditional food", "Family-friendly", "Community gathering", "Special atmosphere"],
      speaker: "Community Team",
      image: "bg-primary",
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
      fullDescription:
        "A safe and supportive space for women to connect, share experiences, and discuss topics relevant to their faith journey. Topics include balancing modern life with Islamic values and personal growth.",
      features: ["Women only", "Safe space", "Open discussion", "Spiritual growth"],
      speaker: "Dr. Aisha Al-Mansouri",
      image: "bg-secondary",
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
      fullDescription:
        "Learn from successful Muslim professionals about navigating careers while maintaining your faith and values. Get advice on interviews, promotions, workplace ethics, and professional development.",
      features: ["Industry experts", "Networking", "Q&A session", "Career tips"],
      speaker: "Professional Panel",
      image: "bg-accent",
    },
  ]

  const event = eventsData.find((e) => e.id === eventId)

  if (!event) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <div className="pt-32 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
            <p className="text-muted-foreground mb-8">The event you're looking for doesn't exist.</p>
            <Button onClick={() => router.back()} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Header with back button */}
      <section className={`${event.image} bg-gradient-to-b to-background pt-20 pb-12 px-4 sm:px-6`}>
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.back()}
            className="mb-6 flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity text-white/90"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </button>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur text-white text-xs font-semibold rounded-lg">
                {event.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{event.title}</h1>
            <p className="text-lg text-white/80">{event.description}</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              {/* About Section */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">About this Event</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{event.fullDescription}</p>
              </div>

              {/* Features */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">What to Expect</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {event.features.map((feature, idx) => (
                    <Card key={idx} className="p-4 bg-secondary/5 border-0 rounded-xl flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Speaker */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Event Host</h2>
                <Card className="p-6 bg-accent/5 border-0 rounded-2xl">
                  <p className="text-lg font-semibold text-primary">{event.speaker}</p>
                  <p className="text-sm text-muted-foreground mt-2">Leading this session with expertise and passion</p>
                </Card>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <Card className="p-6 bg-background border-2 border-secondary/20 rounded-2xl sticky top-24 space-y-6">
                {/* Date & Time */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">When</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-foreground">
                      <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="font-medium">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-foreground">
                      <Clock className="w-5 h-5 text-secondary flex-shrink-0" />
                      <span className="font-medium">{event.time}</span>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-border" />

                {/* Location */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Where</h3>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">{event.location}</p>
                      <p className="text-xs text-muted-foreground mt-1">Al-Nur Mosque, Community Area</p>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-border" />

                {/* Attendees */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Attendees
                  </h3>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="font-bold text-lg text-foreground">{event.attendees}</span>
                    <span className="text-sm text-muted-foreground">registered</span>
                  </div>
                </div>

                <div className="h-px bg-border" />

                {/* Action Buttons */}
                <div className="space-y-3 pt-2">
                  <Button className="w-full rounded-xl font-semibold bg-primary hover:bg-primary/90">
                    Register Now
                  </Button>
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 rounded-xl bg-transparent">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" className="flex-1 rounded-xl bg-transparent">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
