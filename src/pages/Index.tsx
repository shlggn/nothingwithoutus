import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MediaShowcase from "@/components/MediaShowcase";
import Hosts from "@/components/Hosts";
import BeAGuest from "@/components/BeAGuest";
import AboutTeaser from "@/components/AboutTeaser";
import Footer from "@/components/Footer";

const Index = () => {
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
        {/* <Navbar /> */}
        <Hero />
        <MediaShowcase />
        <BeAGuest />
        <AboutTeaser />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
