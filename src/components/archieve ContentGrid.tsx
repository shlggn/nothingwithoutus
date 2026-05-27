import { Youtube, Mic, Film, Radio, MessageSquare, ExternalLink, Clock, Eye } from "lucide-react";

const formats = [
  {
    icon: Youtube,
    title: "YouTube Documentaries",
    description: "Long-form stories that dive deep into lived experiences with disability and accessibility.",
    sample: {
      title: "\"What It's Really Like Using a Wheelchair for 10 Years\"",
      views: "1.2M views",
      duration: "24 min",
      link: "#",
    },
  },
  {
    icon: Film,
    title: "Reels & TikTok",
    description: "Short, punchy content that sparks conversation and reaches new audiences daily.",
    sample: {
      title: "\"5 Things Never to Say to a Deaf Person\"",
      views: "3.8M views",
      duration: "60 sec",
      link: "#",
    },
  },
  {
    icon: Mic,
    title: "Podcasts",
    description: "Intimate audio conversations exploring disability, identity, culture and community.",
    sample: {
      title: "\"Ep. 47 — Invisible Disabilities & The Workplace\"",
      views: "85K listens",
      duration: "52 min",
      link: "#",
    },
  },
  {
    icon: MessageSquare,
    title: "Interviews",
    description: "One-on-one sit-downs with advocates, creators, athletes and changemakers.",
    sample: {
      title: "\"In Conversation: Haben Girma on Tech & Access\"",
      views: "420K views",
      duration: "38 min",
      link: "#",
    },
  },
  {
    icon: Radio,
    title: "Live Events",
    description: "Live-streamed panels and Q&As bridging digital and in-person communities.",
    sample: {
      title: "\"Accessible Design Summit 2025 — Full Panel\"",
      views: "62K views",
      duration: "1h 15min",
      link: "#",
    },
  },
];

const ContentGrid = () => {
  return (
    <section id="content" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-primary font-medium text-sm tracking-widest uppercase mb-3">
          What We Create
        </p>
        <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4 max-w-lg">
          Content across every platform.
        </h2>
        <p className="text-muted-foreground max-w-xl mb-16 leading-relaxed">
          From 60-second TikToks to hour-long documentaries, we meet audiences where they are — 
          with stories that educate, inspire, and shift perspectives.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formats.map((format) => (
            <div
              key={format.title}
              className="group bg-card border border-border rounded-2xl p-8 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 flex flex-col"
            >
              <format.icon className="w-8 h-8 text-primary mb-5 group-hover:scale-110 transition-transform" />
              <h3 className="font-display text-xl text-foreground mb-2">{format.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">{format.description}</p>
              
              {/* Sample content link */}
              <div className="mt-auto pt-5 border-t border-border">
                <a href={format.sample.link} className="block group/link">
                  <p className="text-foreground text-sm font-medium mb-2 group-hover/link:text-primary transition-colors leading-snug">
                    {format.sample.title}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {format.sample.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {format.sample.duration}
                    </span>
                    <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover/link:opacity-100 transition-opacity" />
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentGrid;
