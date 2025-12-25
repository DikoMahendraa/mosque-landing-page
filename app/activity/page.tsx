import { Clock, MapPin, ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Daily Activity | Al-Nur Community",
  description: "Check out our daily activities and prayer times at Al-Nur mosque.",
}

export default function ActivityPage() {
  const dailyActivities = [
    {
      day: "Sunday",
      activities: [
        { time: "6:00 AM", title: "Fajr Prayer", location: "Main Prayer Hall" },
        { time: "10:00 AM", title: "Youth Quran Class", location: "Education Center" },
        { time: "1:00 PM", title: "Dhuhr Prayer", location: "Main Prayer Hall" },
        { time: "4:00 PM", title: "Community Volunteer Work", location: "Community Center" },
        { time: "6:00 PM", title: "Asr Prayer", location: "Main Prayer Hall" },
        { time: "7:30 PM", title: "Maghrib & Isha Prayer", location: "Main Prayer Hall" },
      ],
    },
    {
      day: "Monday",
      activities: [
        { time: "6:00 AM", title: "Fajr Prayer", location: "Main Prayer Hall" },
        { time: "12:00 PM", title: "Dhuhr Prayer", location: "Main Prayer Hall" },
        { time: "3:00 PM", title: "Islamic Studies Class", location: "Education Center" },
        { time: "6:00 PM", title: "Asr Prayer", location: "Main Prayer Hall" },
        { time: "7:30 PM", title: "Maghrib & Isha Prayer", location: "Main Prayer Hall" },
      ],
    },
    {
      day: "Tuesday to Thursday",
      activities: [
        { time: "6:00 AM", title: "Fajr Prayer", location: "Main Prayer Hall" },
        { time: "12:00 PM", title: "Dhuhr Prayer", location: "Main Prayer Hall" },
        { time: "6:00 PM", title: "Asr Prayer", location: "Main Prayer Hall" },
        { time: "7:30 PM", title: "Maghrib & Isha Prayer + Taraweeh", location: "Main Prayer Hall" },
      ],
    },
    {
      day: "Friday",
      activities: [
        { time: "6:00 AM", title: "Fajr Prayer", location: "Main Prayer Hall" },
        { time: "1:00 PM", title: "Jumu'ah (Friday Prayer)", location: "Main Prayer Hall" },
        { time: "6:00 PM", title: "Asr Prayer", location: "Main Prayer Hall" },
        { time: "7:30 PM", title: "Maghrib & Isha Prayer", location: "Main Prayer Hall" },
      ],
    },
    {
      day: "Saturday",
      activities: [
        { time: "6:00 AM", title: "Fajr Prayer", location: "Main Prayer Hall" },
        { time: "10:00 AM", title: "Children's Islamic Class", location: "Education Center" },
        { time: "1:00 PM", title: "Dhuhr Prayer", location: "Main Prayer Hall" },
        { time: "6:00 PM", title: "Asr Prayer", location: "Main Prayer Hall" },
        { time: "7:30 PM", title: "Maghrib & Isha Prayer", location: "Main Prayer Hall" },
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 border-b border-border/40 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Daily Activity</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Stay connected with our daily activities, prayer times, and community programs throughout the week.
          </p>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid gap-8 md:gap-10">
            {dailyActivities.map((daySchedule, index) => (
              <div
                key={index}
                className="rounded-2xl overflow-hidden border border-border/40 hover:shadow-lg transition-shadow"
              >
                {/* Day header */}
                <div className="bg-gradient-to-r from-primary/20 to-secondary/20 px-6 sm:px-8 py-4 border-b border-border/40">
                  <h2 className="text-2xl font-bold text-foreground">{daySchedule.day}</h2>
                </div>

                {/* Activities list */}
                <div className="bg-white p-6 sm:p-8">
                  <div className="space-y-4">
                    {daySchedule.activities.map((activity, actIndex) => (
                      <div
                        key={actIndex}
                        className="flex items-start gap-4 pb-4 border-b border-border/20 last:border-b-0 last:pb-0"
                      >
                        <div className="flex-shrink-0 w-16 font-bold text-primary text-sm">{activity.time}</div>
                        <div className="flex-grow">
                          <h3 className="font-semibold text-foreground text-lg">{activity.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                            <MapPin className="w-4 h-4" />
                            <span>{activity.location}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info Box */}
          <div className="mt-12 rounded-2xl bg-accent/10 border border-accent/40 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Prayer Times</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Prayer times are displayed in local time (GMT+5:30). Join us for congregational prayers throughout the
                  day. Our community welcomes everyone to participate in our spiritual and educational activities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
