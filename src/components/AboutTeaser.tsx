import { Link } from "react-router-dom";
import { ArrowRight, Mail, Users, DollarSign, Heart, Globe, Sparkles } from "lucide-react";

const AboutTeaser = () => {
  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass border border-primary/20 shadow-lg">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary font-semibold text-sm tracking-wide uppercase">
              Nothing about us, without us
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] text-foreground mb-6">
            Not stories of{" "}
            <span className="relative inline-block">
              <span className="relative z-10">overcoming</span>
              <span className="absolute bottom-2 left-0 w-full h-3 bg-red-500/20 -rotate-2" />
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
              Stories of capability.
            </span>
          </h2>
          <p className="text-muted-foreground leading-relaxed text-xl mb-10 max-w-3xl mx-auto">
            A curated series by Enabled Talent — capturing real journeys across employment, education,
            entrepreneurship, and life. Built with communities, partners, and the people closest to the work.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/about"
              className="group inline-flex items-center gap-2 text-base font-semibold bg-primary text-primary-foreground px-8 py-3.5 rounded-full hover:shadow-2xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300 border-2 border-primary"
            >
              Learn about the series
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/recommend"
              className="group inline-flex items-center gap-2 text-base font-semibold text-foreground glass px-8 py-3.5 rounded-full hover:bg-muted/80 hover:shadow-xl transition-all duration-300 border-2 border-border/50"
            >
              <Mail className="w-5 h-5" />
              Recommend someone
            </a>
          </div>
        </div>

        {/* Feature Cards - Bento Grid Style */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {[
            { 
              k: "Lived experience", 
              v: "as insight, not exception",
              icon: Users,
              color: "from-blue-500 to-cyan-500",
              bgColor: "bg-blue-500/5"
            },
            { 
              k: "No cost", 
              v: "to be featured — ever",
              icon: DollarSign,
              color: "from-green-500 to-emerald-500",
              bgColor: "bg-green-500/5"
            },
            { 
              k: "Community-led", 
              v: "nominations & partnerships",
              icon: Heart,
              color: "from-pink-500 to-rose-500",
              bgColor: "bg-pink-500/5"
            },
            { 
              k: "Global archive", 
              v: "of capability & strength",
              icon: Globe,
              color: "from-purple-500 to-violet-500",
              bgColor: "bg-purple-500/5"
            },
          ].map((s, idx) => {
            const Icon = s.icon;
            return (
              <div 
                key={s.k}
                style={{ animationDelay: `${idx * 100}ms` }}
                className="group relative glass rounded-3xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/10 animate-fade-in-up"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 ${s.bgColor} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative flex flex-col gap-4">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                  </div>
                  
                  {/* Text */}
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {s.k}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {s.v}
                    </p>
                  </div>
                </div>

                {/* Corner Accent */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500 rounded-full`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutTeaser;
