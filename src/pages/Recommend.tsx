import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Send, Sparkles, Check } from "lucide-react";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const recommendSchema = z.object({
  nomineeName: z.string().trim().nonempty({ message: "Please share their name" }).max(100),
  nomineeEmail: z.string().trim().email({ message: "Enter a valid email" }).max(255).optional().or(z.literal("")),
  relationship: z.string().trim().nonempty({ message: "Tell us how you know them" }).max(150),
  category: z.string().trim().nonempty({ message: "Pick a focus area" }),
  story: z.string().trim().min(40, { message: "A few more sentences would help (min 40 chars)" }).max(1500),
  yourName: z.string().trim().nonempty({ message: "Your name helps us follow up" }).max(100),
  yourEmail: z.string().trim().email({ message: "Enter a valid email" }).max(255),
  organization: z.string().trim().max(150).optional().or(z.literal("")),
  consent: z.literal(true, { errorMap: () => ({ message: "Please confirm consent before sending" }) }),
});

type FormState = {
  nomineeName: string;
  nomineeEmail: string;
  relationship: string;
  category: string;
  story: string;
  yourName: string;
  yourEmail: string;
  organization: string;
  consent: boolean;
};

const initialState: FormState = {
  nomineeName: "",
  nomineeEmail: "",
  relationship: "",
  category: "",
  story: "",
  yourName: "",
  yourEmail: "",
  organization: "",
  consent: false,
};

const categories = [
  "Career & Employment",
  "Education & Research",
  "Entrepreneurship",
  "Community Leadership",
  "Everyday Strength",
];

const inputBase =
  "w-full glass rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 bg-transparent border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-all";

const Recommend = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key as string]) {
      setErrors((e) => {
        const { [key as string]: _, ...rest } = e;
        return rest;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = recommendSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0];
        if (typeof path === "string" && !fieldErrors[path]) fieldErrors[path] = issue.message;
      });
      setErrors(fieldErrors);
      toast({
        title: "A few details need a second look",
        description: "Please check the highlighted fields.",
        variant: "destructive",
      });
      return;
    }
    setSubmitted(true);
    toast({
      title: "Thank you for sharing this story with us",
      description: "Our team will review and reach out within a few days.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to stories
          </Link>

          {/* Header */}
          <div className="relative glass-strong rounded-3xl p-10 md:p-14 mb-6 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="relative">
              <p className="text-primary font-semibold text-xs tracking-widest uppercase mb-3 inline-flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                Recommend Someone
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-bold leading-[1.05] text-foreground mb-4">
                Know someone whose story
                <br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  deserves to be heard?
                </span>
              </h1>
              <p className="text-muted-foreground leading-relaxed md:text-lg max-w-xl">
                Share a few details and we'll take it from there. Every nomination is read by our team —
                no formal process, no cost, just real journeys we'd like to learn about.
              </p>
            </div>
          </div>

          {submitted ? (
            <div className="glass-strong rounded-3xl p-12 md:p-16 text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Check className="w-6 h-6 text-primary" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                Thank you — we've got it.
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-md mx-auto mb-8">
                Our team will read through your nomination carefully. If it feels like the right fit,
                we'll reach out within a few days to take the next step together.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-semibold bg-primary text-primary-foreground px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] transition-all"
              >
                Back to stories
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-strong rounded-3xl p-8 md:p-12 space-y-10" noValidate>
              {/* About them */}
              <section className="space-y-5">
                <div>
                  <p className="text-primary font-semibold text-xs tracking-widest uppercase mb-1">
                    About them
                  </p>
                  <h2 className="font-display text-xl font-bold text-foreground">The person you'd like to nominate</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Their name" error={errors.nomineeName} required>
                    <input
                      type="text"
                      className={inputBase}
                      placeholder="Full name"
                      value={form.nomineeName}
                      onChange={(e) => update("nomineeName", e.target.value)}
                      maxLength={100}
                    />
                  </Field>
                  <Field label="Their email" error={errors.nomineeEmail} hint="Optional">
                    <input
                      type="email"
                      className={inputBase}
                      placeholder="name@example.com"
                      value={form.nomineeEmail}
                      onChange={(e) => update("nomineeEmail", e.target.value)}
                      maxLength={255}
                    />
                  </Field>
                </div>

                <Field label="How do you know them?" error={errors.relationship} required>
                  <input
                    type="text"
                    className={inputBase}
                    placeholder="e.g. colleague, mentor, community member"
                    value={form.relationship}
                    onChange={(e) => update("relationship", e.target.value)}
                    maxLength={150}
                  />
                </Field>

                <Field label="What best describes their journey?" error={errors.category} required>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((c) => {
                      const active = form.category === c;
                      return (
                        <button
                          key={c}
                          type="button"
                          onClick={() => update("category", c)}
                          className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                            active
                              ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                              : "glass text-muted-foreground hover:text-foreground hover:bg-muted/60"
                          }`}
                        >
                          {c}
                        </button>
                      );
                    })}
                  </div>
                </Field>

                <Field
                  label="Tell us their story, in your words"
                  error={errors.story}
                  hint={`${form.story.length}/1500`}
                  required
                >
                  <textarea
                    className={`${inputBase} min-h-[140px] resize-y leading-relaxed`}
                    placeholder="What makes their journey worth sharing? What's the everyday superpower others might miss?"
                    value={form.story}
                    onChange={(e) => update("story", e.target.value)}
                    maxLength={1500}
                  />
                </Field>
              </section>

              <div className="h-px bg-border/40" />

              {/* About you */}
              <section className="space-y-5">
                <div>
                  <p className="text-primary font-semibold text-xs tracking-widest uppercase mb-1">
                    About you
                  </p>
                  <h2 className="font-display text-xl font-bold text-foreground">So we know who to thank</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Your name" error={errors.yourName} required>
                    <input
                      type="text"
                      className={inputBase}
                      placeholder="Full name"
                      value={form.yourName}
                      onChange={(e) => update("yourName", e.target.value)}
                      maxLength={100}
                    />
                  </Field>
                  <Field label="Your email" error={errors.yourEmail} required>
                    <input
                      type="email"
                      className={inputBase}
                      placeholder="name@example.com"
                      value={form.yourEmail}
                      onChange={(e) => update("yourEmail", e.target.value)}
                      maxLength={255}
                    />
                  </Field>
                </div>

                <Field label="Organization" error={errors.organization} hint="Optional — nonprofit, university, employer, etc.">
                  <input
                    type="text"
                    className={inputBase}
                    placeholder="Where you're writing from"
                    value={form.organization}
                    onChange={(e) => update("organization", e.target.value)}
                    maxLength={150}
                  />
                </Field>
              </section>

              {/* Consent */}
              <label className="flex items-start gap-3 glass rounded-2xl p-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => update("consent", e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded accent-primary flex-shrink-0"
                />
                <span className="text-xs text-muted-foreground leading-relaxed">
                  I confirm I have a genuine connection to this person and, where possible, their permission to share
                  their name with the Enabled Talent team. We'll always reach out before publishing anything.
                </span>
              </label>
              {errors.consent && (
                <p className="text-xs text-destructive -mt-6 ml-1">{errors.consent}</p>
              )}

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] transition-all duration-200"
                >
                  <Send className="w-4 h-4" />
                  Send recommendation
                </button>
                <p className="text-xs text-muted-foreground sm:ml-2">
                  Real voices. Real journeys. Real strength.
                </p>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

const Field = ({
  label,
  hint,
  error,
  required,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <div className="space-y-2">
    <div className="flex items-baseline justify-between gap-2">
      <label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-primary ml-1">*</span>}
      </label>
      {hint && <span className="text-[11px] text-muted-foreground/80">{hint}</span>}
    </div>
    {children}
    {error && <p className="text-xs text-destructive">{error}</p>}
  </div>
);

export default Recommend;
