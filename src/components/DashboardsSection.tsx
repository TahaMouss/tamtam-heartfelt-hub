import { useState } from "react";
import { BarChart3, Brain, Building2, TrendingUp, Calendar, Heart, AlertCircle, Users, Activity } from "lucide-react";

const dashboards = [
  {
    id: "parent",
    icon: BarChart3,
    title: "Parent Dashboard",
    description: "Stay connected with your child's emotional journey. Track moods, events, and wishes — all in real time.",
    color: "bg-soft-blue-light text-soft-blue",
    activeColor: "bg-primary text-primary-foreground",
    badge: null,
    screens: [
      {
        label: "Mood Tracker",
        icon: Heart,
        content: [
          { label: "Today's Mood", value: "Happy 😊", trend: "up" },
          { label: "Weekly Average", value: "8.2/10", trend: "up" },
          { label: "Mood Streak", value: "5 days positive", trend: "up" },
        ],
      },
      {
        label: "Activity",
        icon: Calendar,
        content: [
          { label: "Events Joined", value: "3 this week", trend: "up" },
          { label: "Games Played", value: "12 sessions", trend: "up" },
          { label: "Stories Listened", value: "4 stories", trend: "up" },
        ],
      },
      {
        label: "Wishes",
        icon: Heart,
        content: [
          { label: "Active Wishes", value: "2 posted", trend: "neutral" },
          { label: "Fulfilled", value: "1 this month", trend: "up" },
          { label: "Community Rank", value: "Top 15%", trend: "up" },
        ],
      },
    ],
  },
  {
    id: "psychologist",
    icon: Brain,
    title: "Psychologist Dashboard",
    description: "AI-assisted emotional reports, session management, and real-time alerts for the children in your care.",
    color: "bg-soft-green-light text-soft-green",
    activeColor: "bg-accent text-accent-foreground",
    badge: null,
    screens: [
      {
        label: "Reports",
        icon: Activity,
        content: [
          { label: "New AI Reports", value: "5 pending", trend: "neutral" },
          { label: "Flagged Keywords", value: "2 alerts", trend: "alert" },
          { label: "Sentiment Score", value: "7.4/10 avg", trend: "up" },
        ],
      },
      {
        label: "Sessions",
        icon: Users,
        content: [
          { label: "Today's Sessions", value: "2 scheduled", trend: "neutral" },
          { label: "Completed", value: "8 this week", trend: "up" },
          { label: "Next Session", value: "2:30 PM", trend: "neutral" },
        ],
      },
      {
        label: "Alerts",
        icon: AlertCircle,
        content: [
          { label: "Critical Alerts", value: "0 active", trend: "up" },
          { label: "Monitoring", value: "12 children", trend: "neutral" },
          { label: "Response Time", value: "< 15 min avg", trend: "up" },
        ],
      },
    ],
  },
  {
    id: "ngo",
    icon: Building2,
    title: "NGO / Hospital Dashboard",
    description: "Partner with TamTam to support children in your care. Measure impact and coordinate programs.",
    color: "bg-warm-yellow-light text-warm-yellow",
    activeColor: "bg-secondary text-secondary-foreground",
    badge: "Coming Soon",
    screens: [
      {
        label: "Overview",
        icon: TrendingUp,
        content: [
          { label: "Children Enrolled", value: "-- pending", trend: "neutral" },
          { label: "Active Programs", value: "-- pending", trend: "neutral" },
          { label: "Impact Score", value: "-- pending", trend: "neutral" },
        ],
      },
    ],
  },
];

const DashboardsSection = () => {
  const [activeDashboard, setActiveDashboard] = useState(0);
  const [activeScreen, setActiveScreen] = useState(0);
  const current = dashboards[activeDashboard];

  const handleDashboardChange = (i: number) => {
    setActiveDashboard(i);
    setActiveScreen(0);
  };

  return (
    <section id="dashboards" className="py-16 md:py-20 lg:py-28 bg-soft-blue-light/20">
      <div className="container mx-auto px-5">
        <div className="text-center mb-10 md:mb-14 scroll-animate">
          <h2 className="text-[28px] md:text-4xl font-extrabold text-foreground mb-3 md:mb-4">
            Dashboards for Everyone 📊
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg">
            Real-time insights and tools for parents, professionals, and organizations.
          </p>
        </div>

        {/* Dashboard selector tabs */}
        <div className="flex justify-center gap-2 mb-8 scroll-animate">
          {dashboards.map((d, i) => (
            <button
              key={d.id}
              onClick={() => handleDashboardChange(i)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold transition-all min-h-[48px] ${
                activeDashboard === i
                  ? "bg-primary text-primary-foreground shadow-lg scale-105"
                  : "bg-card text-muted-foreground border border-border/50 hover:border-primary/30"
              }`}
            >
              <d.icon size={18} />
              <span className="hidden sm:inline">{d.title.split(" ")[0]}</span>
            </button>
          ))}
        </div>

        {/* Interactive dashboard card */}
        <div className="max-w-md mx-auto scroll-animate">
          {/* Phone mockup */}
          <div className="relative mx-auto w-full max-w-[320px]">
            <div className="bg-card rounded-[2.5rem] border-4 border-foreground/10 shadow-2xl overflow-hidden">
              {/* Status bar */}
              <div className="h-10 bg-muted/40 flex items-center justify-center">
                <div className="w-20 h-1.5 rounded-full bg-border" />
              </div>

              {/* Dashboard header */}
              <div className={`px-5 py-4 ${current.color} bg-opacity-20`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${current.color} flex items-center justify-center`}>
                    <current.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-foreground">{current.title}</h3>
                    {current.badge && (
                      <span className="text-xs font-semibold text-warm-yellow">{current.badge}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Screen tabs */}
              {current.screens.length > 1 && (
                <div className="flex gap-1 px-4 pt-3">
                  {current.screens.map((s, i) => (
                    <button
                      key={s.label}
                      onClick={() => setActiveScreen(i)}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all min-h-[40px] ${
                        activeScreen === i
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted/50"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Screen content */}
              <div className="p-4 space-y-3 min-h-[200px]">
                {current.screens[Math.min(activeScreen, current.screens.length - 1)]?.content.map((item) => (
                  <div
                    key={item.label}
                    className="bg-muted/30 rounded-xl p-4 flex items-center justify-between animate-fade-in"
                  >
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">{item.label}</p>
                      <p className="text-sm font-bold text-foreground mt-0.5">{item.value}</p>
                    </div>
                    {item.trend === "up" && <TrendingUp size={18} className="text-accent" />}
                    {item.trend === "alert" && <AlertCircle size={18} className="text-soft-pink" />}
                  </div>
                ))}
              </div>

              {/* Bottom bar */}
              <div className="h-8 bg-muted/20 flex items-center justify-center">
                <div className="w-28 h-1 rounded-full bg-border" />
              </div>
            </div>
          </div>

          {/* Description below */}
          <p className="text-center text-muted-foreground text-sm leading-relaxed mt-6 max-w-sm mx-auto">
            {current.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default DashboardsSection;
