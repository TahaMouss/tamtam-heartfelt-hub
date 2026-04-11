import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Shield, Heart, Users, Plus, Trash2, Sparkles } from "lucide-react";
import tamtamLogo from "@/assets/tamtam-logo.jpeg";

interface Child {
  name: string;
  age: string;
}

const FloatingShape = ({ className }: { className: string }) => (
  <div className={`absolute rounded-full opacity-15 pointer-events-none ${className}`} />
);

const RequestAccess = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+1",
    location: "",
    role: "",
    message: "",
  });
  const [children, setChildren] = useState<Child[]>([{ name: "", age: "" }]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const addChild = () => setChildren([...children, { name: "", age: "" }]);

  const removeChild = (index: number) => {
    if (children.length > 1) setChildren(children.filter((_, i) => i !== index));
  };

  const updateChild = (index: number, field: keyof Child, value: string) => {
    const updated = [...children];
    updated[index] = { ...updated[index], [field]: value };
    setChildren(updated);
  };

  const inputClass =
    "w-full px-4 py-3.5 rounded-2xl border-2 border-border/60 bg-background/80 backdrop-blur-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 text-base min-h-[52px] transition-all duration-200";

  const countryCodes = [
    { code: "+1", label: "🇺🇸 +1" },
    { code: "+44", label: "🇬🇧 +44" },
    { code: "+33", label: "🇫🇷 +33" },
    { code: "+49", label: "🇩🇪 +49" },
    { code: "+971", label: "🇦🇪 +971" },
    { code: "+966", label: "🇸🇦 +966" },
    { code: "+91", label: "🇮🇳 +91" },
    { code: "+86", label: "🇨🇳 +86" },
    { code: "+81", label: "🇯🇵 +81" },
    { code: "+61", label: "🇦🇺 +61" },
    { code: "+55", label: "🇧🇷 +55" },
    { code: "+234", label: "🇳🇬 +234" },
    { code: "+254", label: "🇰🇪 +254" },
    { code: "+27", label: "🇿🇦 +27" },
    { code: "+20", label: "🇪🇬 +20" },
    { code: "+212", label: "🇲🇦 +212" },
    { code: "+962", label: "🇯🇴 +962" },
    { code: "+961", label: "🇱🇧 +961" },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingShape className="w-64 h-64 bg-warm-yellow -top-20 -right-20 animate-float blur-3xl" />
        <FloatingShape className="w-48 h-48 bg-soft-blue top-1/3 -left-16 animate-float-slow blur-3xl" />
        <FloatingShape className="w-56 h-56 bg-soft-pink bottom-20 right-10 animate-float blur-3xl" />
        <FloatingShape className="w-32 h-32 bg-soft-green bottom-1/3 left-1/4 animate-float-slow blur-2xl" />
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-warm-yellow rounded-full animate-twinkle"
            style={{
              top: `${10 + Math.random() * 80}%`,
              left: `${5 + Math.random() * 90}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/30">
        <div className="container mx-auto px-5 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-muted/60 transition-colors"
          >
            <ArrowLeft size={22} className="text-foreground" />
          </button>
          <img src={tamtamLogo} alt="TamTam" className="h-9 w-9 rounded-lg object-contain" />
          <span className="font-heading font-extrabold text-lg text-primary">TamTam</span>
        </div>
      </div>

      <div className="container mx-auto px-5 py-8 md:py-14 max-w-xl relative z-10">
        {/* Hero */}
        <div className="text-center mb-8 space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold tracking-wide uppercase">
            <Sparkles size={14} /> Invitation Only
          </div>
          <h1 className="text-3xl md:text-[44px] font-extrabold text-foreground leading-tight">
            Join the TamTam<br />Family 💛
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-sm mx-auto leading-relaxed">
            We keep TamTam invitation-only to ensure every child is safe and supported.
          </p>
        </div>

        {/* Trust row */}
        <div className="flex justify-center gap-3 mb-8">
          {[
            { icon: Shield, label: "Safe", color: "bg-soft-blue-light text-soft-blue" },
            { icon: Heart, label: "Loved", color: "bg-soft-pink-light text-soft-pink" },
            { icon: Users, label: "Trusted", color: "bg-soft-green-light text-soft-green" },
          ].map((b) => (
            <div
              key={b.label}
              className={`flex items-center gap-1.5 ${b.color} rounded-full px-3 py-1.5 text-xs font-bold`}
            >
              <b.icon size={13} />
              {b.label}
            </div>
          ))}
        </div>

        {submitted ? (
          <div className="text-center py-14 bg-card/80 backdrop-blur-md rounded-3xl shadow-lg border border-border/30 space-y-4">
            <div className="w-20 h-20 rounded-full bg-warm-yellow-light flex items-center justify-center mx-auto">
              <span className="text-4xl">💛</span>
            </div>
            <h2 className="text-2xl font-extrabold text-foreground">Request Received!</h2>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto leading-relaxed">
              We'll review your request and send you an invitation link if approved. Usually 1–2 business days.
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold text-sm min-h-[48px] shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-card/70 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-xl border border-border/30 space-y-5"
          >
            {/* Section: About You */}
            <div className="space-y-1 mb-2">
              <h2 className="text-lg font-extrabold text-foreground">About You</h2>
              <p className="text-xs text-muted-foreground">Tell us who you are so we can welcome you properly.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-foreground/80 mb-1.5 uppercase tracking-wide">Full Name *</label>
                <input
                  required
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground/80 mb-1.5 uppercase tracking-wide">Email *</label>
                <input
                  required
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground/80 mb-1.5 uppercase tracking-wide">Phone Number *</label>
              <div className="flex gap-2">
                <select
                  value={form.countryCode}
                  onChange={(e) => setForm({ ...form, countryCode: e.target.value })}
                  className={`${inputClass} !w-[110px] flex-shrink-0 text-sm`}
                >
                  {countryCodes.map((c) => (
                    <option key={c.code} value={c.code}>{c.label}</option>
                  ))}
                </select>
                <input
                  required
                  type="tel"
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-foreground/80 mb-1.5 uppercase tracking-wide">Location *</label>
                <input
                  required
                  placeholder="City, Country"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground/80 mb-1.5 uppercase tracking-wide">I am a... *</label>
                <select
                  required
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className={inputClass}
                >
                  <option value="">Select your role</option>
                  <option value="parent">Parent / Guardian</option>
                  <option value="ngo">NGO Representative</option>
                  <option value="hospital">Hospital / Healthcare</option>
                  <option value="psychologist">Psychologist / Therapist</option>
                  <option value="donor">Donor / Supporter</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex-1 h-px bg-border/50" />
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Your Children</span>
              <div className="flex-1 h-px bg-border/50" />
            </div>

            {/* Children */}
            <div className="space-y-3">
              {children.map((child, index) => (
                <div
                  key={index}
                  className="flex gap-2 items-center bg-muted/30 rounded-2xl p-2 border border-border/30"
                >
                  <div className="w-8 h-8 rounded-full bg-warm-yellow-light flex items-center justify-center text-xs font-extrabold text-foreground flex-shrink-0">
                    {index + 1}
                  </div>
                  <input
                    required
                    placeholder="Child's name"
                    value={child.name}
                    onChange={(e) => updateChild(index, "name", e.target.value)}
                    className="flex-1 px-3 py-2.5 rounded-xl bg-background/80 border border-border/40 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm min-h-[44px] transition-all"
                  />
                  <input
                    required
                    type="number"
                    min="0"
                    max="18"
                    placeholder="Age"
                    value={child.age}
                    onChange={(e) => updateChild(index, "age", e.target.value)}
                    className="w-[70px] px-3 py-2.5 rounded-xl bg-background/80 border border-border/40 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm min-h-[44px] text-center transition-all flex-shrink-0"
                  />
                  {children.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeChild(index)}
                      className="w-9 h-9 flex items-center justify-center rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors flex-shrink-0"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addChild}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-border/50 text-sm font-bold text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all duration-200"
              >
                <Plus size={16} /> Add Another Child
              </button>
            </div>

            {/* Optional message */}
            <div>
              <label className="block text-xs font-bold text-foreground/80 mb-1.5 uppercase tracking-wide">
                Why do you want to join? <span className="font-normal normal-case text-muted-foreground">(optional)</span>
              </label>
              <textarea
                placeholder="Tell us a bit about yourself…"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={3}
                className={`${inputClass} resize-none min-h-[90px]`}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold text-base active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 min-h-[52px] shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
            >
              <Send size={18} /> Request Invitation
            </button>
            <p className="text-center text-[11px] text-muted-foreground/70 leading-relaxed">
              By requesting access you agree to our community guidelines.<br />
              We review every request to keep TamTam safe.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default RequestAccess;
