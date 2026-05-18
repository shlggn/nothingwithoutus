const About = () => {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Why This Matters */}
        <div className="glass-strong rounded-3xl p-10 md:p-16">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-primary font-semibold text-md tracking-widest uppercase mb-3">
                Why This Matters
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6 leading-tight font-bold">
                Lived experience isn't an exception. It's insight.
              </h2>
              <blockquote className="border-l-2 border-primary/40 pl-5 text-muted-foreground leading-relaxed">
                "Many individuals navigate systems that were never designed for them — and still find a way forward.
                That's not limitation. That's a different kind of strength."
              </blockquote>
            </div>
            <div className="space-y-5">
              <p className="text-muted-foreground leading-relaxed">
                Nothing Without Us is a curated series by <span className="text-foreground font-medium">Enabled Talent</span> that
                captures real journeys across employment, education, entrepreneurship, and life. These aren't outside
                narratives — they're conversations with people who've built resilience, creativity, and
                problem-solving through lived experience.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We don't just tell stories. We reveal what the world often misses — the
                superpowers built through navigating barriers, and the insights systems need but rarely hear.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-4">
                {[
                  "Bring journeys into the mainstream",
                  "Lived experience as insight, not exception",
                  "Surface superpowers built through barriers",
                  "Inform systems through real voices",
                ].map((point) => (
                  <div key={point} className="glass rounded-2xl px-4 py-3 text-md text-muted-foreground leading-snug shadow-lg">
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Who We Work With + How It Works */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-strong rounded-3xl p-10">
            <p className="text-primary font-semibold text-md tracking-widest uppercase mb-3">
              Who We Work With
            </p>
            <h3 className="font-display text-2xl md:text-3xl text-foreground mb-5 font-bold leading-tight">
              Built with the people closest to the work.
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Together, we identify and elevate individuals whose stories can shape how systems think about
              accessibility, employment, and inclusion.
            </p>
            <ul className="space-y-2.5">
              {[
                "Nonprofits and community organizations",
                "Academic institutions and research centres",
                "Accessibility advisors and advisory committees",
                "Educators, policymakers, and inclusion leaders",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-md text-muted-foreground">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-strong rounded-3xl p-10">
            <p className="text-primary font-semibold text-md tracking-widest uppercase mb-3">
              How It Works
            </p>
            <h3 className="font-display text-2xl md:text-3xl text-foreground mb-5 font-bold leading-tight">
              A simple, human process.
            </h3>
            <ol className="space-y-4">
              {[
                "Partners and communities recommend individuals",
                "The Enabled Talent team conducts one-on-one interviews",
                "Stories are documented and published as part of the series",
                "Each feature highlights both journey and strength",
              ].map((step, i) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="glass rounded-full w-7 h-7 flex items-center justify-center text-md font-semibold text-primary flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-md text-muted-foreground leading-relaxed pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Who We Feature */}
        <div className="glass-strong rounded-3xl p-10 md:p-12">
          <p className="text-primary font-semibold text-md tracking-widest uppercase mb-3">
            Who We Feature
          </p>
          <h3 className="font-display text-3xl md:text-4xl text-foreground font-bold leading-tight mb-8 max-w-3xl">
            Persons with disabilities who turn everyday challenges into unique strengths.
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { t: "Career Builders", d: "People who've built careers — or created their own paths when none existed." },
              { t: "Education Navigators", d: "Students and scholars who moved through systems differently, and succeeded anyway." },
              { t: "Community Leaders", d: "Individuals leading change in the communities they call home." },
              { t: "Everyday Strength", d: "People whose daily resilience reveals capability the world rarely sees." },
            ].map((b) => (
              <div key={b.t} className="glass rounded-2xl p-5 shadow-lg">
                <p className="font-display text-base font-semibold text-foreground mb-1.5">{b.t}</p>
                <p className="text-md text-muted-foreground leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What You Receive */}
        <div className="glass-strong rounded-3xl p-10 md:p-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <p className="text-primary font-semibold text-md tracking-widest uppercase mb-3">
                What You Receive
              </p>
              <h3 className="font-display text-3xl md:text-4xl text-foreground font-bold leading-tight">
                Recognition, visibility, and a place in the archive.
              </h3>
            </div>
            <p className="glass rounded-full px-4 py-2 text-md text-muted-foreground self-start md:self-end">
              No financial contribution required — ever.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { t: "Professional Feature", d: "A professionally written and published feature." },
              { t: "Wider Visibility", d: "Reach across Enabled Talent platforms." },
              { t: "Global Series", d: "Recognition as part of a growing global archive." },
              { t: "Future Showcases", d: "Eligibility for upcoming showcases and awards." },
            ].map((b) => (
              <div key={b.t} className="glass rounded-2xl p-5 shadow-xl">
                <p className="font-display text-base font-semibold text-foreground mb-1.5">{b.t}</p>
                <p className="text-md text-muted-foreground leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Goal */}
        <div className="relative glass-strong rounded-3xl p-10 md:p-16 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative max-w-3xl mx-auto text-center">
            <p className="text-primary font-semibold text-md tracking-widest uppercase mb-4">
              Our Goal
            </p>
            <h3 className="font-display text-3xl md:text-5xl text-foreground font-bold leading-[1.1] mb-6">
              Not stories of overcoming.
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Stories of capability.
              </span>
            </h3>
            <p className="text-muted-foreground leading-relaxed md:text-lg">
              We're building a meaningful archive of lived experience — to show that what the world
              often sees as barriers are, in many cases, superpowers in disguise.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
