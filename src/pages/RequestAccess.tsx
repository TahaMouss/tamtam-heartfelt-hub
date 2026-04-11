import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Shield, Heart, Users, Plus, Trash2 } from "lucide-react";
import tamtamLogo from "@/assets/tamtam-logo.jpeg";

interface Child {
  name: string;
  age: string;
}

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

  const addChild = () => {
    setChildren([...children, { name: "", age: "" }]);
  };

  const removeChild = (index: number) => {
    if (children.length > 1) {
      setChildren(children.filter((_, i) => i !== index));
    }
  };

  const updateChild = (index: number, field: keyof Child, value: string) => {
    const updated = [...children];
    updated[index] = { ...updated[index], [field]: value };
    setChildren(updated);
  };

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl border border-border bg-muted/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-base min-h-[52px]";

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
              <label className="block text-sm font-semibold text-foreground mb-1.5">Phone Number *</label>
              <div className="flex gap-2">
                <select
                  value={form.countryCode}
                  onChange={(e) => setForm({ ...form, countryCode: e.target.value })}
                  className={`${inputClass} !w-[120px] flex-shrink-0`}
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

            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">Location *</label>
              <input
                required
                placeholder="City, Country"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
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

            {/* Children section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-foreground">Children *</label>
                <button
                  type="button"
                  onClick={addChild}
                  className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  <Plus size={16} /> Add Child
                </button>
              </div>
              {children.map((child, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <div className="flex-1">
                    <input
                      required
                      placeholder={`Child ${index + 1} name`}
                      value={child.name}
                      onChange={(e) => updateChild(index, "name", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div className="w-[90px] flex-shrink-0">
                    <input
                      required
                      type="number"
                      min="0"
                      max="18"
                      placeholder="Age"
                      value={child.age}
                      onChange={(e) => updateChild(index, "age", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  {children.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeChild(index)}
                      className="min-w-[48px] min-h-[52px] flex items-center justify-center rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
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
