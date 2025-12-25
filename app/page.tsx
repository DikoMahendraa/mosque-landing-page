"use client"

import Link from "next/link"
import { Calendar, Users, BookOpen, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-40 md:pb-32 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-pretty leading-tight">Al-Nur Mosque</h1>
              <p className="text-xl md:text-2xl text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed">
                A vibrant community space for youth, learning, and spiritual growth
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Link href="/events" className="w-full sm:w-auto">
                <Button size="lg" className="w-full rounded-xl font-semibold">
                  <Calendar className="w-5 h-5 mr-2" />
                  Explore Events
                </Button>
              </Link>
              <Link href="/kajian" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full rounded-xl font-semibold bg-card border-border hover:bg-card/80"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Kajian
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 px-4 sm:px-6 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-8 text-center bg-background border-0 shadow-sm hover:shadow-md transition-shadow rounded-2xl">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-xl mb-4">
                <Calendar className="w-7 h-7 text-primary" />
              </div>
              <div className="text-4xl font-bold text-primary mb-2">15+</div>
              <p className="text-muted-foreground">Events Monthly</p>
            </Card>
            <Card className="p-8 text-center bg-background border-0 shadow-sm hover:shadow-md transition-shadow rounded-2xl">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-accent/10 rounded-xl mb-4">
                <Users className="w-7 h-7 text-accent" />
              </div>
              <div className="text-4xl font-bold text-accent mb-2">800+</div>
              <p className="text-muted-foreground">Community Members</p>
            </Card>
            <Card className="p-8 text-center bg-background border-0 shadow-sm hover:shadow-md transition-shadow rounded-2xl">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-secondary/20 rounded-xl mb-4">
                <BookOpen className="w-7 h-7 text-secondary" />
              </div>
              <div className="text-4xl font-bold text-secondary mb-2">50+</div>
              <p className="text-muted-foreground">Kajian Sessions</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-2">Upcoming Events</h2>
            <p className="text-muted-foreground">Join our community for meaningful experiences</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[
              {
                title: "Quran Study Circle",
                date: "Friday, Dec 27",
                time: "7:00 PM",
                attendees: "45 registered",
                category: "Learning",
              },
              {
                title: "Youth Sports Night",
                date: "Saturday, Dec 28",
                time: "6:00 PM",
                attendees: "32 registered",
                category: "Community",
              },
              {
                title: "Islamic Finance Workshop",
                date: "Sunday, Dec 29",
                time: "3:00 PM",
                attendees: "28 registered",
                category: "Workshop",
              },
              {
                title: "Community Iftar",
                date: "Wednesday, Jan 1",
                time: "6:30 PM",
                attendees: "120 registered",
                category: "Social",
              },
            ].map((event, i) => (
              <Link key={i} href="/events" className="group">
                <Card className="p-6 bg-background border-0 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl h-full">
                  <div className="flex items-start justify-between mb-4">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-lg">
                      {event.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-4 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <div className="space-y-2 mb-6">
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> {event.date}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-4 h-4">⏰</span> {event.time}
                    </p>
                    <p className="text-sm font-medium text-primary flex items-center gap-2">
                      <Users className="w-4 h-4" /> {event.attendees}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full rounded-xl border-primary/20 hover:bg-primary/5 text-primary font-medium bg-transparent"
                  >
                    Learn More
                  </Button>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/events">
              <Button variant="ghost" size="lg" className="text-primary hover:bg-primary/10 font-semibold">
                View All Events →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 px-4 sm:px-6 bg-primary/10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-bold">Make a Difference</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Support our community initiatives and help us create meaningful experiences for everyone
          </p>
          <Link href="/donate">
            <Button size="lg" className="rounded-xl font-semibold gap-2">
              <Heart className="w-5 h-5" />
              Donate Now
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
