import heroImage from "@/assets/hero.jpg";
import { ArrowDown } from "lucide-react";
import Navbar from "./Navbar";
import hero from "/Hero-4.png"

const Hero = () => {
  return (
    <section className="relative hero-gradient min-h-screen flex items-end pb-24 pt-32 px-6">
      {/* Navbar with high z-index */}
      <div className="absolute top-5 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Background image */}
      <div className="absolute md:left-[35rem] inset-0 z-0">
        <img
          src={hero}
          alt="Diverse group of people laughing together, including person in wheelchair"
          className="w-full h-full object-cover"
        />
        
        {/* <div className="absolute inset-0 bg-background/10 backdrop-blur-[2px]" /> */}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />

      

      <div className="relative top-72 md:top-44 z-10 max-w-6xl mx-auto w-full">
        <div className="glass-strong rounded-3xl p-10 md:p-14 max-w-2xl">
          <p className="text-primary font-semibold text-xs tracking-widest uppercase mb-4">
            Lived Experience Series · by Enabled Talent
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.95] text-foreground mb-6 font-bold">
            
            <span className="relative inline-block">
              <span className="relative z-10">What looks like</span>
              <span className="absolute bottom-2 left-0 w-full h-3 bg-red-500/20 -rotate-2" />
            </span>
            <br />
            a barrier is often
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">a superpower.</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-lg mb-8 leading-relaxed">
            Nothing About Us is explores disability, accessibility, inclusion 
            and the policies that shape our communities, workplaces, and everyday lives.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a href="#content" className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground bg-primary px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] transition-all duration-200">
              Meet the people behind the series
              <ArrowDown className="w-4 h-4" />
            </a>
            <a href="/about" className="inline-flex items-center gap-2 text-sm font-medium text-foreground glass px-5 py-2.5 rounded-full hover:bg-muted/60 transition-all">
              About the series
            </a>
          </div>
          <p className="mt-6 text-xs tracking-wider uppercase text-muted-foreground/80 font-medium">
            Nothing about us, without us.
          </p>
        </div>

        
      </div>
    </section>
  );
};

export default Hero;
