import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Shield, Heart, Users } from "lucide-react";
import tamtamLogo from "@/assets/tamtam-logo.jpeg";

const RequestAccess = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl border border-border bg-muted/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-base min-h-[52px]";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-5 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="min-w-[48px] min-h-[48px] flex items-center justify-center rounded-xl hover:bg-muted transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <img src={tamtamLogo} alt="TamTam" className="h-10 w-10 rounded-lg object-contain" />
          <span className="font-heading font-extrabold text-xl text-primary">TamTam</span>
        </div>
      </div>

      <div className="container mx-auto px-5 py-10 md:py-16 max-w-2xl">
        {/* Hero text */}
        <div className="text-center mb-8 space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
            <Shield size={16} /> Invitation-Only Access
          </div>
          <h1 className="text-[32px] md:text-5xl font-extrabold text-foreground leading-tight">
            Join the TamTam Family 💛
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto">
            TamTam is available by invitation only to ensure a safe, trusted environment for every child.
          </p>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {[
            { icon: Shield, label: "Safe & Secure" },
            { icon: Heart, label: "Built with Love" },
            { icon: Users, label: "Trusted Community" },
          ].map((b) => (
            <div key={b.label} className="flex items-center gap-2 bg-card rounded-full px-4 py-2 border border-border/50 text-sm font-medium text-muted-foreground">
              <b.icon size={16} className="text-primary" />
              {b.label}
            </div>
          ))}
        </div>

        {submitted ? (
          <div className="text-center py-16 bg-card rounded-2xl shadow-sm border border-border/50 space-y-4">
            <div className="text-6xl">💛</div>
            <h2 className="text-2xl font-bold text-foreground">Request Received!</h2>
            <p className="text-muted-foreground text-base max-w-sm mx-auto">
              We'll review your request and send you an invitation link if approved. This usually takes 1-2 business days.
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold text-base min-h-[48px]"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-5 md:p-8 shadow-sm border border-border/50 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Full Name *</label>
              <input
                required
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Email *</label>
              <input
                required
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">I am a... *</label>
              <select
                required
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className={inputClass}
              >
                <option value="">Select your role</option>
                <option value="parent">Parent / Guardian</option>
                <option value="ngo">NGO Representative</option>
                <option value="hospital">Hospital / Healthcare Provider</option>
                <option value="psychologist">Psychologist / Therapist</option>
                <option value="donor">Donor / Supporter</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Why do you want to join? (optional)</label>
              <textarea
                placeholder="Tell us a bit about yourself..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={3}
                className={`${inputClass} resize-none min-h-[100px]`}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-4 rounded-full font-bold text-base active:opacity-80 transition-opacity flex items-center justify-center gap-2 min-h-[52px]"
            >
              <Send size={18} /> Request Invitation
            </button>
            <p className="text-center text-xs text-muted-foreground">
              By requesting access, you agree to our community guidelines. We review every request to keep TamTam safe.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default RequestAccess;
