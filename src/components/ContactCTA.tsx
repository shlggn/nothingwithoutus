import { Mail, Users, BookOpen } from "lucide-react";

const ContactCTA = () => {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="glass-strong rounded-3xl p-12 md:p-16 text-center">
          <p className="text-primary font-semibold text-md tracking-widest uppercase mb-3">
            Get Involved
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-5 font-bold leading-tight">
            Nothing about us, without us.
          </h2>
          <p className="text-muted-foreground text-base md:text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
            If you're part of a nonprofit, academic institution, accessibility advisory group, or community network —
            you can recommend someone. And if you have a story to share, we'd like to hear from you.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10 text-left">
            <div className="glass rounded-2xl p-5">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <p className="font-display text-base font-semibold text-foreground mb-1">For partners</p>
              <p className="text-md text-muted-foreground leading-relaxed">
                Recommend individuals from your community whose journeys deserve to be heard.
              </p>
            </div>
            <div className="glass rounded-2xl p-5">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <BookOpen className="w-4 h-4 text-primary" />
              </div>
              <p className="font-display text-base font-semibold text-foreground mb-1">For storytellers</p>
              <p className="text-md text-muted-foreground leading-relaxed">
                Share your own journey and become part of a growing archive of lived experience.
              </p>
            </div>
          </div>

          <a
            href="mailto:sahil@enabledtalent.ca?subject=Nothing%20Without%20Us%20Inquiry&body=General%20inquiry%20or%20recommendation%20details..."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full text-md font-semibold hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] transition-all duration-200"
          >
            <Mail className="w-4 h-4" />
            Reach out to the team
          </a>
          <p className="text-md text-muted-foreground mt-6 italic">
            Real voices. Real journeys. Real strength.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
