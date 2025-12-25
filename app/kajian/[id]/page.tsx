"use client"

import { useParams, useRouter } from "next/navigation"
import { User, Clock, Award, ArrowLeft, Share2, Heart, BookOpen, UsersIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function KajianDetailPage() {
  const params = useParams()
  const router = useRouter()
  const kajianId = Number.parseInt(params.id as string)

  const kajianData = [
    {
      id: 1,
      title: "Quranic Arabic Fundamentals",
      instructor: "Sheikh Ahmad Al-Rashid",
      level: "Beginner",
      description: "Learn the basics of Quranic Arabic language and grammar.",
      duration: "8 weeks",
      students: 32,
      fullDescription:
        "Master the foundational elements of Quranic Arabic with our comprehensive course. Learn to recognize and understand the unique vocabulary and grammar patterns of the Quran, enabling you to read and comprehend the divine message more deeply.",
      syllabus: [
        "Introduction to Quranic Arabic alphabet and pronunciation",
        "Basic grammar rules and sentence structure",
        "Common Quranic vocabulary and roots",
        "Simple Quranic passages analysis",
      ],
      schedule: "Every Saturday, 7:00 PM - 8:30 PM",
      image: "bg-primary",
    },
    {
      id: 2,
      title: "Tafsir of Surah Al-Kahf",
      instructor: "Dr. Fatima Al-Hassan",
      level: "Intermediate",
      description: "Deep dive into the meanings and lessons of Surah Al-Kahf.",
      duration: "10 weeks",
      students: 28,
      fullDescription:
        "Explore the profound stories and lessons within Surah Al-Kahf, one of the most significant chapters of the Quran. This course provides a detailed tafsir (exegesis) that helps you understand the context, meanings, and contemporary applications of these verses.",
      syllabus: [
        "Story of Dhul-Qarnayn",
        "The people of the cave",
        "The man with two gardens",
        "Themes of faith and trials",
      ],
      schedule: "Every Sunday, 3:00 PM - 4:30 PM",
      image: "bg-secondary",
    },
    {
      id: 3,
      title: "Islamic Ethics & Morality",
      instructor: "Ustaz Muhammad Saeed",
      level: "All Levels",
      description: "Explore Islamic principles for living a purposeful life.",
      duration: "6 weeks",
      students: 45,
      fullDescription:
        "Build character and develop a strong moral compass guided by Islamic teachings. This course explores ethical dilemmas, virtues, and how to apply Islamic principles to modern challenges.",
      syllabus: [
        "Islamic character (Akhlaq)",
        "Justice and fairness",
        "Compassion and mercy",
        "Integrity in daily life",
      ],
      schedule: "Every Wednesday, 7:30 PM - 8:30 PM",
      image: "bg-accent",
    },
    {
      id: 4,
      title: "Women in Islamic History",
      instructor: "Dr. Aisha Al-Mansouri",
      level: "All Levels",
      description: "Inspiring stories of remarkable Muslim women throughout history.",
      duration: "8 weeks",
      students: 38,
      fullDescription:
        "Discover the remarkable contributions and achievements of women throughout Islamic history. From scholars and leaders to activists and educators, learn about the Muslim women who shaped our ummah.",
      syllabus: [
        "The Prophet's wives and daughters",
        "Female scholars and jurists",
        "Women leaders and warriors",
        "Contemporary Muslim women role models",
      ],
      schedule: "Every Thursday, 7:00 PM - 8:30 PM",
      image: "bg-primary",
    },
    {
      id: 5,
      title: "Hadith Sciences & Methodology",
      instructor: "Sheikh Abdullah Al-Qahtani",
      level: "Advanced",
      description: "Understanding the science of hadith authentication and narration.",
      duration: "12 weeks",
      students: 22,
      fullDescription:
        "Dive deep into the scientific methodology of hadith collection, preservation, and authentication. Learn the criteria scholars use to evaluate hadith authenticity and reliability.",
      syllabus: [
        "Hadith terminology and grading",
        "Chain of narration (Isnad)",
        "Text analysis (Matn)",
        "Famous hadith collections",
      ],
      schedule: "Every Friday, 6:00 PM - 7:30 PM",
      image: "bg-secondary",
    },
    {
      id: 6,
      title: "Islam & Modern Challenges",
      instructor: "Dr. Hassan Al-Aziz",
      level: "Intermediate",
      description: "Navigating contemporary issues through Islamic framework.",
      duration: "8 weeks",
      students: 35,
      fullDescription:
        "Apply Islamic teachings to address modern challenges including technology, social media, mental health, and interfaith relations. Learn to find Islamic solutions to contemporary issues.",
      syllabus: ["Islam and technology", "Social media ethics", "Mental health in Islam", "Interfaith dialogue"],
      schedule: "Every Tuesday, 7:30 PM - 8:30 PM",
      image: "bg-accent",
    },
  ]

  const kajian = kajianData.find((k) => k.id === kajianId)

  if (!kajian) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <div className="pt-32 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
            <p className="text-muted-foreground mb-8">The course you're looking for doesn't exist.</p>
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

      {/* Header with back button */}
      <section className={`${kajian.image} bg-gradient-to-b to-background pt-20 pb-12 px-4 sm:px-6`}>
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.back()}
            className="mb-6 flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity text-white/90"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Kajian
          </button>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white">
            <div className="mb-4">
              <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-lg bg-white/20 text-white`}>
                {kajian.level}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{kajian.title}</h1>
            <p className="text-lg text-white/80">{kajian.description}</p>
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
                <h2 className="text-2xl font-bold mb-4">About this Course</h2>
                <p className="text-muted-foreground leading-relaxed">{kajian.fullDescription}</p>
              </div>

              {/* Syllabus */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Course Syllabus</h2>
                <div className="space-y-3">
                  {kajian.syllabus.map((topic, idx) => (
                    <Card key={idx} className="p-4 bg-secondary/5 border-0 rounded-xl flex items-start gap-3">
                      <BookOpen className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-medium">{topic}</span>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Instructor */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Instructor</h2>
                <Card className="p-6 bg-accent/5 border-0 rounded-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-foreground">{kajian.instructor}</p>
                      <p className="text-sm text-muted-foreground">Expert Instructor</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Experienced educator dedicated to making Islamic knowledge accessible and transformative.
                  </p>
                </Card>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <Card className="p-6 bg-background border-2 border-secondary/20 rounded-2xl sticky top-24 space-y-6">
                {/* Level */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Level</h3>
                  <span
                    className={`inline-block px-3 py-2 text-sm font-semibold rounded-lg ${getLevelColor(kajian.level)}`}
                  >
                    {kajian.level}
                  </span>
                </div>

                <div className="h-px bg-border" />

                {/* Schedule */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Schedule
                  </h3>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">{kajian.schedule}</p>
                      <p className="text-xs text-muted-foreground mt-1">{kajian.duration} course</p>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-border" />

                {/* Enrolled */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Enrollment
                  </h3>
                  <div className="flex items-center gap-3">
                    <UsersIcon className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="font-bold text-lg text-foreground">{kajian.students}</span>
                    <span className="text-sm text-muted-foreground">enrolled</span>
                  </div>
                </div>

                <div className="h-px bg-border" />

                {/* Certificate */}
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Certificate Included</p>
                    <p className="text-xs text-muted-foreground mt-1">Upon completion</p>
                  </div>
                </div>

                <div className="h-px bg-border" />

                {/* Action Buttons */}
                <div className="space-y-3 pt-2">
                  <Button className="w-full rounded-xl font-semibold bg-primary hover:bg-primary/90">Enroll Now</Button>
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
