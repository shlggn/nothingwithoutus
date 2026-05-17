import { ArrowRight } from "lucide-react";

const BeAGuest = () => {
  return (
    <section className="w-full px-6 md:px-14 py-24 relative" style={{ background: "#686866" }}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/10" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <p className="text-primary font-semibold border border-primary-foreground bg-primary-foreground px-4 py-2 rounded-3xl text-lg tracking-widest uppercase mb-4">
              Join the conversation
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-8">
              Be a Guest
            </h2>
            
            <h3 className="text-white text-xl font-semibold mb-4">
              Are you creating change?
            </h3>
            
            <p className="text-white/95 text-base leading-relaxed mb-6">
              We're looking for guests who are challenging systems, shaping policy, building accessible businesses, and pushing inclusion forward.
            </p>
            
            <p className="text-white text-base font-medium mb-3">
              We welcome:
            </p>
            
            <ul className="space-y-2 text-white/90 text-sm mb-6">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Government officials and policymakers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Disability advocates and activists</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Founders and business leaders</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>HR and DEI professionals</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Researchers and educators</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Individuals with lived experience and powerful stories</span>
              </li>
            </ul>
            
            <p className="text-white/90 text-sm leading-relaxed mb-8">
              If your work—or your story—is helping build a more inclusive world, we want to hear from you.
            </p>
            
            <a
              href="#apply"
              className="inline-flex items-center gap-2 text-sm font-semibold bg-primary-foreground text-foreground px-6 py-3 rounded-full hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] transition-all duration-200 uppercase tracking-wider"
            >
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Image */}
          <div className="relative group">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/Lindsey.webp" // Add your image to public folder
                alt="Be a guest on Nothing Without Us"
                className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeAGuest;
