import { Heart, Shield, Sparkles, Users } from "lucide-react";
import tamtamPeeking from "@/assets/tamtam-peeking.png";

const stats = [
  { value: "1,000+", label: "Children Supported", icon: Users },
  { value: "24/7", label: "Always Available", icon: Heart },
  { value: "100%", label: "Safe & Moderated", icon: Shield },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-16 md:py-20 lg:py-28 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-60 h-60 bg-warm-yellow/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-5 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-14 max-w-5xl mx-auto">
          {/* Image with floating elements */}
          <div className="w-full lg:flex-1 scroll-animate relative">
            <img
              src={tamtamPeeking}
              alt="TamTam companion"
              loading="lazy"
              width={500}
              height={500}
              className="w-full max-w-xs md:max-w-sm mx-auto drop-shadow-xl animate-bob"
            />
            {/* Floating badges around image */}
            <div className="absolute top-4 right-4 md:right-10 bg-card rounded-full px-3 py-1.5 shadow-lg border border-border/50 flex items-center gap-1.5 text-xs font-bold text-primary animate-float">
              <Heart size={12} className="fill-primary" /> Built with Love
            </div>
            <div className="absolute bottom-8 left-0 md:left-6 bg-card rounded-full px-3 py-1.5 shadow-lg border border-border/50 flex items-center gap-1.5 text-xs font-bold text-accent animate-float-slow">
              <Sparkles size={12} /> AI-Powered
            </div>
          </div>

          {/* Content */}
          <div className="lg:flex-1 scroll-animate space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-warm-yellow/15 text-foreground px-4 py-2 rounded-full text-sm font-bold">
              💛 Our Mission
            </div>
            <h2 className="text-[28px] md:text-4xl font-extrabold text-foreground leading-tight">
              Every child deserves to feel <span className="text-primary">heard</span>, <span className="text-accent">safe</span>, and <span className="text-warm-yellow">never alone</span>.
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              TamTam was built for the little fighters — children facing illness, stress, or emotional hardship. We combine <strong>AI-powered empathy</strong> with <strong>real human care</strong> to create something truly special: a companion that listens, a community that cares, and tools that help them heal.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {stats.map((s) => (
                <div key={s.label} className="bg-card rounded-xl p-3 border border-border/50 text-center">
                  <s.icon size={18} className="mx-auto text-primary mb-1" />
                  <p className="text-lg md:text-xl font-extrabold text-foreground">{s.value}</p>
                  <p className="text-[11px] text-muted-foreground font-medium leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
