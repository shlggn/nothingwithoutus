import Navbar from "@/components/Navbar";
import About from "@/components/About";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

const AboutPage = () => {
  useEffect(() => {
    // Handle hash scrolling on mount and hash changes
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        // Remove the # from hash
        const id = hash.substring(1);
        // Small delay to ensure content is rendered
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    };

    handleHashScroll();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashScroll);
    
    return () => {
      window.removeEventListener('hashchange', handleHashScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
      {/* Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/8 rounded-full blur-[120px]" />
        <div className="absolute top-2/3 right-0 w-80 h-80 bg-accent/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
      </div>
      <div className="relative z-10">
        <Navbar />

        {/* Page header */}
        <header className="pt-24 pb-10 px-6" style={{ background: "#3a3a39" }}>
          <div className="max-w-6xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-md font-medium text-primary-foreground hover:text-foreground glass rounded-full px-4 py-2 mb-6 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to stories
            </Link>
            <p className="text-primary font-semibold text-md tracking-widest uppercase mb-3">
              About the series
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] text-primary-foreground max-w-4xl">
              The story behind{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Nothing Without Us.
              </span>
            </h1>
            <p className="mt-6 text-primary-foreground text-base md:text-lg max-w-2xl leading-relaxed">
              A community-driven archive of lived experience — built with the people closest to the work,
              for the systems that need to hear them.
            </p>
          </div>
        </header>

        <About />
        <ContactCTA />
        <Footer />
      </div>
    </div>
  );
};

export default AboutPage;
