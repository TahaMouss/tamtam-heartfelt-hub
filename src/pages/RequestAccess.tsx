import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Shield, Heart, Users, Plus, Trash2, Sparkles, ChevronDown, Check } from "lucide-react";
import tamtamLogo from "@/assets/tamtam-logo.jpeg";

interface Child {
  name: string;
  age: string;
}

const FloatingShape = ({ className }: { className: string }) => (
  <div className={`absolute rounded-full pointer-events-none ${className}`} />
);

/* ── Custom Select ── */
const CustomSelect = ({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3.5 rounded-xl border border-[hsl(38,30%,82%)] bg-[hsl(40,50%,97%)] text-foreground text-base min-h-[52px] text-left flex items-center justify-between transition-all duration-300 focus:outline-none focus:border-[hsl(32,80%,62%)] focus:shadow-[0_0_0_3px_hsl(32,80%,62%,0.15)]"
      >
        <span className={selected ? "text-foreground" : "text-muted-foreground/50"}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown size={16} className={`text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute z-50 mt-1.5 w-full bg-card rounded-xl border border-[hsl(38,30%,85%)] shadow-lg py-1 max-h-[220px] overflow-y-auto animate-slide-down">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between transition-colors ${
                value === opt.value
                  ? "bg-[hsl(32,80%,62%,0.1)] text-foreground font-semibold"
                  : "text-foreground/80 hover:bg-muted/40"
              }`}
            >
              {opt.label}
              {value === opt.value && <Check size={14} className="text-[hsl(32,80%,62%)]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const RequestAccess = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", countryCode: "+1",
    location: "", role: "", message: "",
  });
  const [children, setChildren] = useState<Child[]>([{ name: "", age: "" }]);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };
  const addChild = () => setChildren([...children, { name: "", age: "" }]);
  const removeChild = (i: number) => { if (children.length > 1) setChildren(children.filter((_, idx) => idx !== i)); };
  const updateChild = (i: number, f: keyof Child, v: string) => {
    const u = [...children]; u[i] = { ...u[i], [f]: v }; setChildren(u);
  };

  const inputCls =
    "w-full px-4 py-3.5 rounded-xl border border-[hsl(38,30%,82%)] bg-[hsl(40,50%,97%)] text-foreground placeholder:text-muted-foreground/50 text-base min-h-[52px] transition-all duration-300 focus:outline-none focus:border-[hsl(32,80%,62%)] focus:shadow-[0_0_0_3px_hsl(32,80%,62%,0.15)]";

  const countryCodes = [
    { value: "+1", label: "🇺🇸 +1" }, { value: "+44", label: "🇬🇧 +44" },
    { value: "+33", label: "🇫🇷 +33" }, { value: "+49", label: "🇩🇪 +49" },
    { value: "+971", label: "🇦🇪 +971" }, { value: "+966", label: "🇸🇦 +966" },
    { value: "+91", label: "🇮🇳 +91" }, { value: "+86", label: "🇨🇳 +86" },
    { value: "+81", label: "🇯🇵 +81" }, { value: "+61", label: "🇦🇺 +61" },
    { value: "+55", label: "🇧🇷 +55" }, { value: "+234", label: "🇳🇬 +234" },
    { value: "+254", label: "🇰🇪 +254" }, { value: "+27", label: "🇿🇦 +27" },
    { value: "+20", label: "🇪🇬 +20" }, { value: "+212", label: "🇲🇦 +212" },
    { value: "+962", label: "🇯🇴 +962" }, { value: "+961", label: "🇱🇧 +961" },
  ];

  const roleOptions = [
    { value: "parent", label: "Parent / Guardian" },
    { value: "ngo", label: "NGO Representative" },
    { value: "hospital", label: "Hospital / Healthcare" },
    { value: "psychologist", label: "Psychologist / Therapist" },
    { value: "donor", label: "Donor / Supporter" },
    { value: "other", label: "Other" },
  ];

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: "linear-gradient(168deg, hsl(42,60%,96%) 0%, hsl(36,45%,92%) 50%, hsl(30,35%,89%) 100%)" }}
    >
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <FloatingShape className="w-72 h-72 opacity-[0.08] bg-[hsl(32,80%,62%)] -top-24 -right-24 animate-float blur-3xl" />
        <FloatingShape className="w-56 h-56 opacity-[0.06] bg-soft-blue top-1/3 -left-20 animate-float-slow blur-3xl" />
        <FloatingShape className="w-60 h-60 opacity-[0.07] bg-soft-pink bottom-16 right-8 animate-float blur-3xl" />
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[hsl(32,80%,62%)] rounded-full animate-twinkle opacity-30"
            style={{ top: `${15 + Math.random() * 70}%`, left: `${10 + Math.random() * 80}%`, animationDelay: `${i * 0.6}s` }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl border-b" style={{ background: "hsla(42,60%,96%,0.8)", borderColor: "hsl(38,30%,88%)" }}>
        <div className="container mx-auto px-5 py-3 flex items-center gap-3">
          <button onClick={() => navigate("/")} className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-muted/40 transition-colors">
            <ArrowLeft size={22} className="text-foreground" />
          </button>
          <img src={tamtamLogo} alt="TamTam" className="h-9 w-9 rounded-lg object-contain" />
          <span className="font-heading font-extrabold text-lg text-primary">TamTam</span>
        </div>
      </div>

      <div className="container mx-auto px-5 py-8 md:py-14 max-w-xl relative z-10">
        {/* Hero */}
        <div className="text-center mb-8 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[hsl(32,80%,62%,0.12)] text-[hsl(32,60%,40%)] px-4 py-2 rounded-full text-xs font-bold tracking-wide">
            <Sparkles size={14} /> Invitation Only
          </div>
          <h1 className="text-3xl md:text-[44px] font-extrabold text-foreground leading-tight">
            Join the TamTam<br />Family 💛
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-sm mx-auto leading-relaxed">
            We keep TamTam invitation-only to ensure every child is safe and supported.
          </p>
        </div>

        {/* Trust pills */}
        <div className="flex justify-center gap-3 mb-8">
          {[
            { icon: Shield, label: "Safe", bg: "hsl(210,80%,94%)", color: "hsl(210,70%,45%)" },
            { icon: Heart, label: "Loved", bg: "hsl(340,70%,94%)", color: "hsl(340,60%,50%)" },
            { icon: Users, label: "Trusted", bg: "hsl(150,55%,92%)", color: "hsl(150,50%,38%)" },
          ].map((b) => (
            <div key={b.label} className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold" style={{ background: b.bg, color: b.color }}>
              <b.icon size={13} /> {b.label}
            </div>
          ))}
        </div>

        {submitted ? (
          <div
            className="text-center py-14 backdrop-blur-md rounded-3xl shadow-lg space-y-4"
            style={{ background: "hsla(0,0%,100%,0.8)", border: "1px solid hsl(38,30%,85%)" }}
          >
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto" style={{ background: "linear-gradient(135deg, hsl(42,90%,88%), hsl(32,80%,78%))" }}>
              <span className="text-4xl">💛</span>
            </div>
            <h2 className="text-2xl font-extrabold text-foreground">Request Received!</h2>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto leading-relaxed">
              We'll review your request and send you an invitation link if approved. Usually 1–2 business days.
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 text-primary-foreground px-8 py-3 rounded-full font-bold text-sm min-h-[48px] shadow-lg transition-all duration-300 hover:shadow-xl"
              style={{ background: "linear-gradient(135deg, hsl(32,75%,55%), hsl(28,80%,50%))" }}
            >
              Back to Home
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="backdrop-blur-xl rounded-3xl p-6 md:p-8 space-y-6"
            style={{
              background: "hsla(0,0%,100%,0.8)",
              border: "1px solid hsl(38,30%,85%)",
              boxShadow: "0 8px 40px -12px hsla(32,40%,40%,0.1), 0 2px 8px -2px hsla(32,40%,40%,0.06)",
              borderRadius: "24px",
            }}
          >
            {/* About You */}
            <div className="space-y-1">
              <h2 className="text-xl font-extrabold" style={{ color: "hsl(220,30%,18%)" }}>About You</h2>
              <p className="text-xs text-muted-foreground">Tell us who you are so we can welcome you properly.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[11px] font-semibold mb-2 tracking-wide" style={{ color: "hsl(30,15%,50%)" }}>Full Name <span className="text-[hsl(32,80%,62%)]">*</span></label>
                <input required placeholder="Your full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className="block text-[11px] font-semibold mb-2 tracking-wide" style={{ color: "hsl(30,15%,50%)" }}>Email <span className="text-[hsl(32,80%,62%)]">*</span></label>
                <input required type="email" placeholder="your@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold mb-2 tracking-wide" style={{ color: "hsl(30,15%,50%)" }}>Phone Number <span className="text-[hsl(32,80%,62%)]">*</span></label>
              <div className="flex gap-2">
                <CustomSelect
                  value={form.countryCode}
                  onChange={(v) => setForm({ ...form, countryCode: v })}
                  options={countryCodes}
                  placeholder="+1"
                />
                <input required type="tel" placeholder="Phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[11px] font-semibold mb-2 tracking-wide" style={{ color: "hsl(30,15%,50%)" }}>Location <span className="text-[hsl(32,80%,62%)]">*</span></label>
                <input required placeholder="City, Country" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={inputCls} />
              </div>
              <div>
                <label className="block text-[11px] font-semibold mb-2 tracking-wide" style={{ color: "hsl(30,15%,50%)" }}>I am a… <span className="text-[hsl(32,80%,62%)]">*</span></label>
                <CustomSelect value={form.role} onChange={(v) => setForm({ ...form, role: v })} options={roleOptions} placeholder="Select your role" />
              </div>
            </div>

            {/* Children divider */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex-1 h-px" style={{ background: "hsl(38,30%,85%)" }} />
              <span className="text-[11px] font-bold tracking-wider" style={{ color: "hsl(32,60%,45%)" }}>Your Children</span>
              <div className="flex-1 h-px" style={{ background: "hsl(38,30%,85%)" }} />
            </div>

            {/* Children card */}
            <div className="rounded-2xl p-4 space-y-3" style={{ background: "linear-gradient(135deg, hsl(42,55%,95%), hsl(36,45%,93%))", border: "1px solid hsl(38,35%,88%)" }}>
              {children.map((child, i) => (
                <div key={i} className="flex gap-2 items-center rounded-xl p-2" style={{ background: "hsla(0,0%,100%,0.7)" }}>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold text-primary-foreground flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, hsl(32,80%,65%), hsl(28,75%,55%))" }}
                  >
                    {i + 1}
                  </div>
                  <input
                    required placeholder="Child's name" value={child.name}
                    onChange={(e) => updateChild(i, "name", e.target.value)}
                    className="flex-1 px-3 py-2.5 rounded-lg border border-[hsl(38,30%,85%)] bg-[hsl(40,50%,98%)] text-foreground placeholder:text-muted-foreground/40 text-sm min-h-[42px] transition-all duration-300 focus:outline-none focus:border-[hsl(32,80%,62%)] focus:shadow-[0_0_0_3px_hsl(32,80%,62%,0.12)]"
                  />
                  <input
                    required type="number" min="0" max="18" placeholder="Age" value={child.age}
                    onChange={(e) => updateChild(i, "age", e.target.value)}
                    className="w-[65px] px-2 py-2.5 rounded-lg border border-[hsl(38,30%,85%)] bg-[hsl(40,50%,98%)] text-foreground placeholder:text-muted-foreground/40 text-sm min-h-[42px] text-center transition-all duration-300 focus:outline-none focus:border-[hsl(32,80%,62%)] focus:shadow-[0_0_0_3px_hsl(32,80%,62%,0.12)] flex-shrink-0"
                  />
                  {children.length > 1 && (
                    <button type="button" onClick={() => removeChild(i)} className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors flex-shrink-0">
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button" onClick={addChild}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed text-sm font-semibold transition-all duration-200"
                style={{ borderColor: "hsl(32,50%,75%)", color: "hsl(32,60%,45%)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "hsl(32,80%,62%)";
                  e.currentTarget.style.background = "hsla(32,80%,62%,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "hsl(32,50%,75%)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <Plus size={15} /> Add Another Child
              </button>
            </div>

            {/* Message */}
            <div>
              <label className="block text-[11px] font-semibold mb-2 tracking-wide" style={{ color: "hsl(30,15%,50%)" }}>
                Why do you want to join? <span className="font-normal text-muted-foreground">(optional)</span>
              </label>
              <textarea
                placeholder="Tell us a bit about yourself…"
                value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={3}
                className={`${inputCls} resize-none min-h-[90px]`}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full text-primary-foreground py-4 rounded-2xl font-bold text-base active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 min-h-[52px] hover:shadow-xl"
              style={{
                background: "linear-gradient(135deg, hsl(32,75%,55%), hsl(28,80%,48%))",
                boxShadow: "0 6px 24px -4px hsla(32,80%,45%,0.35)",
              }}
            >
              <Send size={18} /> Request Invitation
            </button>
            <p className="text-center text-[11px] text-muted-foreground/60 leading-relaxed">
              By requesting access you agree to our community guidelines.<br />We review every request to keep TamTam safe.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default RequestAccess;
