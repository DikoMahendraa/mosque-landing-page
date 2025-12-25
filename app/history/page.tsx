import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "History | Al-Nur Community",
  description: "Explore the rich history and heritage of Al-Nur mosque community.",
}

export default function HistoryPage() {
  const historyEvents = [
    {
      year: "2015",
      title: "Community Foundation",
      description: "Al-Nur community mosque was established with the vision of serving the local Muslim community.",
      color: "bg-accent",
    },
    {
      year: "2017",
      title: "First Hajj Program",
      description: "Organized our first collective Hajj program for community members.",
      color: "bg-secondary",
    },
    {
      year: "2019",
      title: "Youth Education Center",
      description: "Launched the youth education center with Quran memorization and Islamic studies programs.",
      color: "bg-accent",
    },
    {
      year: "2021",
      title: "Community Kitchen Expansion",
      description: "Expanded our community kitchen to serve meals during Ramadan and special occasions.",
      color: "bg-secondary",
    },
    {
      year: "2023",
      title: "Digital Platform Launch",
      description: "Launched our digital platform for better community engagement and event management.",
      color: "bg-accent",
    },
    {
      year: "2024",
      title: "Community Outreach",
      description: "Expanded our outreach programs to support families in need and strengthen community bonds.",
      color: "bg-secondary",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 border-b border-border/40 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Our History</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover the milestones and heritage of Al-Nur community mosque since our establishment.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-secondary/50"></div>

            {/* Timeline items */}
            <div className="space-y-12">
              {historyEvents.map((event, index) => (
                <div key={index} className="relative pl-24">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-2 w-16 h-16 rounded-full bg-white border-4 border-primary flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{event.year}</span>
                  </div>

                  {/* Content card */}
                  <div className="rounded-2xl p-6 sm:p-8 bg-white border border-border/40 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">{event.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
