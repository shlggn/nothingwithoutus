const Hosts = () => {
  const hosts = [
    {
      img: "/Lindsey-1.webp", // Add your image to public folder
      name: "Lindsey Maza",
      title: "Founder. Lawyer. Speaker. Disability Advocate.",
      bio: "Lindsey is a lawyer, entrepreneur, inclusion strategist, and mentor whose work sits at the intersection of leadership, accessibility, and systems change. Through her lived experience and professional expertise, she helps organizations move beyond performative diversity and build cultures rooted in equity, access, and belonging. \n\nHer work challenges traditional leadership models and calls people into deeper, more honest conversations about what true inclusion requires.",
    },
    {
      img: "/Amandip.webp", // Add your image to public folder
      name: "Amandipp Singh",
      title: "Founder. Innovator. Accessibility Leader.",
      bio: "Amandipp is the Founder of Enabled Talent, an organization committed to advancing employment accessibility and creating pathways for disabled talent to thrive. His work focuses on breaking barriers in hiring, workplace culture, and leadership. \n\nThrough advocacy, innovation, and action, he is helping reshape the future of inclusive employment.",
    },
  ];

  return (
    <section className="w-full px-6 md:px-14 py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/20" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-10 md:gap-14">
          {/* Label */}
          <div>
            <p className="text-primary font-semibold text-lg border-b border-primary bg-primary-foreground px-4 tracking-widest uppercase">
              Our Hosts
            </p>
          </div>

          {/* Hosts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            {hosts.map((host) => (
              <article key={host.name} className="group">
                <div className="relative overflow-hidden rounded-2xl mb-6 shadow-lg">
                  <img
                    src={host.img}
                    alt={host.name}
                    className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      // Fallback to placeholder if image not found
                      e.currentTarget.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=900&fit=crop";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <h3 className="font-display text-3xl text-primary-foreground font-semibold">
                  {host.name}
                </h3>
                
                <p className="mt-2 text-primary-foreground/70 text-md font-medium tracking-wide border-b">
                  {host.title}
                </p>
                
                <p className="mt-4 text-primary-foreground/90 text-lg leading-relaxed whitespace-pre-line">
                  {host.bio}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hosts;
