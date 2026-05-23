import { Link } from "react-router-dom";
import { ArrowRight, Mail } from "lucide-react";

const AboutTeaser = () => {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="relative glass-strong rounded-3xl p-10 md:p-16 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary font-semibold text-xs tracking-widest uppercase mb-4">
                Nothing about us, without us
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.05] text-foreground mb-5">
                Not stories of overcoming.
                <br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Stories of capability.
                </span>
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                A curated series by Enabled Talent — capturing real journeys across employment, education,
                entrepreneurship, and life. Built with communities, partners, and the people closest to the work.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold bg-primary text-primary-foreground px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] transition-all duration-200"
                >
                  Learn about the series
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="/recommend"
                  className="inline-flex items-center gap-2 text-sm font-medium text-foreground shadow-lg glass px-5 py-2.5 rounded-full hover:bg-muted/60 transition-all"
                >
                  <Mail className="w-4 h-4" />
                  Recommend someone
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { k: "Lived experience", v: "as insight, not exception" },
                { k: "No cost", v: "to be featured — ever" },
                { k: "Community-led", v: "nominations & partnerships" },
                { k: "Global archive", v: "of capability & strength" },
              ].map((s) => (
                <div key={s.k} className="glass rounded-2xl p-5 shadow-lg">
                  <p className="font-display text-lg font-semibold text-foreground mb-1">{s.k}</p>
                  <p className="text-md text-muted-foreground leading-relaxed">{s.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTeaser;
