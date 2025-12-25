import { Clock, User, Award, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function KajianPage() {
  const kajianSessions = [
    {
      id: 1,
      title: "Quranic Arabic Fundamentals",
      instructor: "Sheikh Ahmad Al-Rashid",
      level: "Beginner",
      description: "Learn the basics of Quranic Arabic language and grammar.",
      duration: "8 weeks",
      students: 32,
    },
    {
      id: 2,
      title: "Tafsir of Surah Al-Kahf",
      instructor: "Dr. Fatima Al-Hassan",
      level: "Intermediate",
      description: "Deep dive into the meanings and lessons of Surah Al-Kahf.",
      duration: "10 weeks",
      students: 28,
    },
    {
      id: 3,
      title: "Islamic Ethics & Morality",
      instructor: "Ustaz Muhammad Saeed",
      level: "All Levels",
      description: "Explore Islamic principles for living a purposeful life.",
      duration: "6 weeks",
      students: 45,
    },
    {
      id: 4,
      title: "Women in Islamic History",
      instructor: "Dr. Aisha Al-Mansouri",
      level: "All Levels",
      description: "Inspiring stories of remarkable Muslim women throughout history.",
      duration: "8 weeks",
      students: 38,
    },
    {
      id: 5,
      title: "Hadith Sciences & Methodology",
      instructor: "Sheikh Abdullah Al-Qahtani",
      level: "Advanced",
      description: "Understanding the science of hadith authentication and narration.",
      duration: "12 weeks",
      students: 22,
    },
    {
      id: 6,
      title: "Islam & Modern Challenges",
      instructor: "Dr. Hassan Al-Aziz",
      level: "Intermediate",
      description: "Navigating contemporary issues through Islamic framework.",
      duration: "8 weeks",
      students: 35,
    },
  ]

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-accent/10 text-accent"
      case "Intermediate":
        return "bg-secondary/10 text-secondary"
      case "Advanced":
        return "bg-primary/10 text-primary"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Header Section */}
      <section className="pt-20 pb-12 px-4 sm:px-6 bg-gradient-to-b from-accent/20 to-background">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Kajian Sessions</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Deepen your Islamic knowledge with expert instructors and structured courses
          </p>
        </div>
      </section>

      {/* Kajian Grid */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {kajianSessions.map((kajian) => (
              <Card
                key={kajian.id}
                className="p-6 bg-background border-0 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl flex flex-col"
              >
                {/* Level Badge */}
                <div className="mb-4">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-lg ${getLevelColor(kajian.level)}`}
                  >
                    {kajian.level}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-semibold mb-2">{kajian.title}</h3>
                <p className="text-sm text-muted-foreground mb-6 flex-grow">{kajian.description}</p>

                {/* Instructor & Details */}
                <div className="space-y-3 mb-6 text-sm border-t border-border pt-4">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <User className="w-4 h-4 flex-shrink-0 text-primary" />
                    <span className="font-medium">{kajian.instructor}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Clock className="w-4 h-4 flex-shrink-0 text-accent" />
                    <span>{kajian.duration}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Award className="w-4 h-4 flex-shrink-0 text-secondary" />
                    <span>{kajian.students} students enrolled</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Button className="w-full rounded-xl font-semibold gap-2 bg-primary hover:bg-primary/90">
                  Enroll Now
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
