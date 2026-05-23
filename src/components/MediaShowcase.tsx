import { Youtube, Mic, Film, Radio, MessageSquare, Eye, Play, Headphones, ArrowRight } from "lucide-react";
import { useRef } from "react";
import Hosts from "@/components/Hosts";

interface ContentItem {
  title: string;
  views: string;
  duration: string;
  thumbnail: string;
  link: string;
}

interface MediaSection {
  icon: React.ElementType;
  label: string;
  tagline: string;
  description: string;
  items: ContentItem[];
}

const sections: MediaSection[] = [
  {
    icon: MessageSquare,
    label: "Featured Journeys",
    tagline: "In their own words",
    description: "One-on-one conversations with persons with disabilities who've built careers, companies, and communities — told the way they actually lived them.",
    items: [
      { title: "From Engineering Rejection Letters to Leading an Accessibility Team", views: "Career", duration: "Feature", thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=225&fit=crop", link: "#" },
      { title: "She Built a Business Because No One Would Hire Her — Now She Hires Others", views: "Entrepreneurship", duration: "Feature", thumbnail: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=225&fit=crop", link: "#" },
      { title: "Navigating University With a System That Wasn't Built for Him", views: "Education", duration: "Feature", thumbnail: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400&h=225&fit=crop", link: "#" },
      { title: "The Quiet Leader Reshaping Inclusion Policy in Her City", views: "Community", duration: "Feature", thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=225&fit=crop", link: "#" },
    ],
  },
  {
    icon: Film,
    label: "Everyday Superpowers",
    tagline: "Strength in the small things",
    description: "Short, honest moments that reveal the creativity, problem-solving, and resilience built through navigating a world not designed for you.",
    items: [
      { title: "How I Solve Problems My Coworkers Don't Even See", views: "Workplace", duration: "60s", thumbnail: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=500&fit=crop", link: "#" },
      { title: "Three Things My Disability Taught Me About Leadership", views: "Insight", duration: "45s", thumbnail: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=500&fit=crop", link: "#" },
      { title: "What Resilience Actually Looks Like on a Tuesday Morning", views: "Daily life", duration: "30s", thumbnail: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&h=500&fit=crop", link: "#" },
      { title: "Adaptive Thinking Is a Skill — Here's How I Use It at Work", views: "Career", duration: "55s", thumbnail: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&h=500&fit=crop", link: "#" },
      { title: "The Workaround That Became a Better Way", views: "Innovation", duration: "40s", thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=500&fit=crop", link: "#" },
    ],
  },
  {
    icon: Mic,
    label: "Long-Form Conversations",
    tagline: "The full story",
    description: "Unhurried interviews where journeys unfold the way they're meant to — across employment, education, entrepreneurship, and the systems people had to learn to navigate.",
    items: [
      { title: "Building a Career When Every Door Has a Step", views: "Employment", duration: "52 min", thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop", link: "#" },
      { title: "Founding a Company From a Hospital Bed", views: "Entrepreneurship", duration: "48 min", thumbnail: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&h=400&fit=crop", link: "#" },
      { title: "The PhD I Wasn't Supposed to Finish", views: "Education", duration: "55 min", thumbnail: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=400&h=400&fit=crop", link: "#" },
      { title: "Leading Change in a System That Wasn't Listening", views: "Advocacy", duration: "63 min", thumbnail: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop", link: "#" },
    ],
  },
  {
    icon: Youtube,
    label: "The Documented Series",
    tagline: "Sit with us",
    description: "Longer features that follow real people through real chapters of their lives — at work, at home, in classrooms, in communities. The kind of stories the mainstream usually skips.",
    items: [
      { title: "A Day Inside an Inclusive Workplace That Actually Gets It Right", views: "Workplace", duration: "24 min", thumbnail: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=225&fit=crop", link: "#" },
      { title: "He Started a Bakery After Twelve Job Rejections", views: "Entrepreneurship", duration: "32 min", thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop", link: "#" },
      { title: "What an Accessible Classroom Could Look Like — If We Wanted It To", views: "Education", duration: "28 min", thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=225&fit=crop", link: "#" },
      { title: "The Community Centre Run Entirely by Disabled Leaders", views: "Community", duration: "19 min", thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=225&fit=crop", link: "#" },
    ],
  },
  {
    icon: Radio,
    label: "Partner Conversations",
    tagline: "With those building change",
    description: "Roundtables and live panels with the nonprofits, academic institutions, and accessibility advisors helping shape this series — and the systems it speaks to.",
    items: [
      { title: "Inclusion Roundtable: What Employers Keep Getting Wrong", views: "Panel", duration: "1h 15min", thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=225&fit=crop", link: "#" },
      { title: "Researchers and Lived Experience — A Conversation We Needed", views: "Academic", duration: "2h 05min", thumbnail: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=225&fit=crop", link: "#" },
      { title: "Advisory Voices: Designing Systems With Us, Not For Us", views: "Policy", duration: "58 min", thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=225&fit=crop", link: "#" },
    ],
  },
];

const ScrollSection = ({ section, index }: { section: MediaSection; index: number }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isReels = section.label === "Reels & TikTok";
  const isPodcast = section.label === "Podcasts";

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = direction === "left" ? -340 : 340;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <div id="media" className="py-14" style={{ background: "#6B5A4E" }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="flex items-end justify-between mb-8">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-primary-foreground backdrop-blur-sm flex items-center justify-center">
              <section.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-1">
                <h3 className="font-display text-2xl md:text-3xl text-white font-semibold">{section.label}</h3>
                <span className="font-semibold tracking-wider text-xs uppercase text-primary-foreground bg-primary px-3 py-1 rounded-full w-fit">
                  {section.tagline}
                </span>
              </div>
              <p className="text-white/90 text-md max-w-md md:max-w-full leading-relaxed">{section.description}</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-1.5">
            <button
              onClick={() => scroll("left")}
              className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:scale-105 hover:bg-white/20 transition-all text-white"
            >
              ←
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:scale-105 hover:bg-white/20 transition-all text-white"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-6 md:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {section.items.slice(0, 3).map((item) => (
          <a
            key={item.title}
            href={item.link}
            className={`group flex-shrink-0 ${
              isReels ? "w-52" : isPodcast ? "w-64" : "w-80"
            }`}
          >
            <div
              className={`relative overflow-hidden rounded-2xl bg-muted mb-3 shadow-sm ${
                isReels ? "aspect-[9/16]" : isPodcast ? "aspect-square" : "aspect-video"
              }`}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {isPodcast ? (
                  <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <Headphones className="w-5 h-5 text-primary" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <Play className="w-5 h-5 text-primary fill-primary ml-0.5" />
                  </div>
                )}
              </div>
              {/* Duration badge */}
              <span className="absolute bottom-2.5 right-2.5 text-[11px] font-medium bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 text-white">
                {item.duration}
              </span>
            </div>
            <h4 className="text-white text-md font-medium leading-snug group-hover:text-primary transition-colors line-clamp-2">
              {item.title}
            </h4>
            <p className="text-white/80 text-xs mt-1 flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {item.views}
            </p>
          </a>
        ))}

        {/* View all card */}
        <a
          href="#"
          className={`flex-shrink-0 ${
            isReels ? "w-52" : isPodcast ? "w-64" : "w-80"
          } `}
        >
          <div
            className={`w-full rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/15 flex flex-col items-center justify-center gap-3 transition-all duration-300 group/all ${
              isReels ? "aspect-[9/16]" : isPodcast ? "aspect-square" : "aspect-video"
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center group-hover/all:bg-primary/30 transition-colors">
              <ArrowRight className="w-4 h-4 text-primary" />
            </div>
            <span className="text-md text-white group-hover/all:text-primary transition-colors font-medium">
              View All
            </span>
          </div>
        </a>
      </div>
    </div>
  );
};

const MediaShowcase = () => {
  return (
    <section id="content" className="pt-60 md:pt-40" style={{ background: "#585856" }}>
      <div className="max-w-6xl mx-auto px-6 mb-4">
        <p className="text-primary-foreground font-semibold text-xs tracking-widest uppercase mb-3">
          The Series
        </p>
        <h2 className="font-display text-4xl md:text-5xl text-primary-foreground mb-4 max-w-4xl font-bold">
          Real journeys. Real strength. <a className="hidden md:block"></a>Documented as they are.
        </h2>
        <p className="text-primary-foreground max-w-4xl leading-relaxed">
          A growing archive of features, interviews, and conversations with persons with disabilities —
          across employment, education, entrepreneurship, and community leadership. Not stories of overcoming.
          Stories of capability.
        </p>
        {/* Inclusion Statement */}
        <div className="mt-20 mb-8">
          <div className="bg-primary-foreground rounded-3xl p-10 md:p-14 max-w-4xl">
            <div className="space-y-6">
              <p className="text-foreground text-foreground font-bold text-lg md:text-lg leading-relaxed">
                Because inclusion isn't charity. It isn't optics. And it isn't optional.
              </p>
              <div className="flex flex-wrap gap-3 md:gap-4">
                <span className="text-primary font-semibold text-xl md:text-xl tracking-wide">It's policy</span>
                <span className="text-primary/40">•</span>
                <span className="text-primary font-semibold text-xl md:text-xl tracking-wide">It's leadership</span>
                <span className="text-primary/40">•</span>
                <span className="text-primary font-semibold text-xl md:text-xl tracking-wide">It's design</span>
                <span className="text-primary/40">•</span>
                <span className="text-primary font-semibold text-xl md:text-xl tracking-wide">It's culture</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Hosts />

      {sections.map((section, i) => (
        <ScrollSection key={section.label} section={section} index={i} />
      ))}
    </section>
  );
};

export default MediaShowcase;
