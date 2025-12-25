import { Heart, TrendingUp, Users, Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function DonatePage() {
  const donationTiers = [
    {
      amount: 25,
      title: "Friend",
      description: "Support our youth programs",
      icon: "🤝",
    },
    {
      amount: 50,
      title: "Contributor",
      description: "Help fund educational initiatives",
      icon: "📚",
    },
    {
      amount: 100,
      title: "Supporter",
      description: "Sponsor events and activities",
      icon: "⭐",
    },
    {
      amount: 250,
      title: "Guardian",
      description: "Support community development",
      icon: "👑",
    },
  ]

  const impactMetrics = [
    {
      icon: Users,
      label: "Community Members Served",
      value: "800+",
    },
    {
      icon: TrendingUp,
      label: "Programs Running",
      value: "15+",
    },
    {
      icon: Heart,
      label: "Lives Impacted",
      value: "2000+",
    },
  ]

  const whyDonate = [
    {
      title: "Youth Engagement",
      description:
        "We create safe spaces where young Muslims can explore their faith, build lasting friendships, and develop leadership skills.",
    },
    {
      title: "Quality Education",
      description: "Our kajian programs are led by experienced instructors offering courses for all knowledge levels.",
    },
    {
      title: "Community Support",
      description: "We provide counseling, food assistance, and emergency support for community members in need.",
    },
    {
      title: "Inclusive Spaces",
      description: "Everyone is welcome regardless of background, experience, or current understanding of Islam.",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Header Section */}
      <section className="pt-20 pb-12 px-4 sm:px-6 bg-gradient-to-b from-primary/20 to-background">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Support Our Mission</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Your generosity helps us create meaningful experiences and educational opportunities for our community
          </p>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-16 px-4 sm:px-6 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {impactMetrics.map((metric, i) => {
              const Icon = metric.icon
              return (
                <Card
                  key={i}
                  className="p-8 bg-background border-0 shadow-sm hover:shadow-md transition-shadow rounded-2xl text-center"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-xl mb-4">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <p className="text-4xl font-bold text-primary mb-2">{metric.value}</p>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Donation Tiers */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Choose Your Way to Give</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every contribution makes a meaningful difference in our community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {donationTiers.map((tier, i) => (
              <Card
                key={i}
                className="p-6 bg-background border-0 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl text-center flex flex-col justify-between hover:scale-105"
              >
                <div className="mb-6">
                  <span className="text-4xl mb-3 block">{tier.icon}</span>
                  <p className="text-3xl font-bold text-primary mb-2">${tier.amount}</p>
                  <h3 className="font-semibold text-lg mb-2">{tier.title}</h3>
                  <p className="text-sm text-muted-foreground">{tier.description}</p>
                </div>
                <Button className="w-full rounded-xl font-semibold gap-2 bg-primary hover:bg-primary/90">
                  Donate ${tier.amount}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Card>
            ))}
          </div>

          {/* Custom Donation */}
          <Card className="p-8 bg-background border-0 shadow-sm rounded-2xl max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl font-bold mb-4">Custom Donation</h3>
            <p className="text-muted-foreground mb-6">
              Have a specific amount in mind? We welcome donations of any size to support our mission.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="number"
                placeholder="Enter amount"
                className="flex-1 px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="rounded-xl font-semibold gap-2 bg-primary hover:bg-primary/90">
                Donate
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Why Support Section */}
      <section className="py-20 px-4 sm:px-6 bg-accent/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Why Support Al-Nur?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {whyDonate.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10 text-primary">
                    <Check className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
