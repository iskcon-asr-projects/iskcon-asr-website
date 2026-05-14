"use client";

import Header from "../Components/Header";
import HeroSlider from "../Components/Heroslider";
import UpcomingEvents from "../Components/UpcomingEvents";
import AboutIskcon from "../Components/AboutIskcon";
import SocialFeed from "../Components/SocialFeed";
import TempleSection from "../Components/TempleSection";
import CommunitiesSection from "../Components/CommunitiesSection";
import SocialInitiatives from "../Components/SocialInitiatives";
import Guesthouse from "../Components/Guesthouse";
import StaggeredEntry from "../Components/StaggeredEntry";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-[#050505] flex flex-col selection:bg-[#C5A059]/30 selection:text-[#C5A059] overflow-clip">
      
      {/* 1. Header fades in first */}
      <StaggeredEntry delay={0}>
        <Header />
      </StaggeredEntry>

      {/* 2. Hero Slider fades in next */}
      <StaggeredEntry delay={0.2} className="w-full block">
        <HeroSlider />
      </StaggeredEntry>

      {/* 3. Upcoming Events section follows */}
      <StaggeredEntry delay={0.4} className="w-full block">
        <div className="h-10 md:h-10 w-full shrink-0" />
        <div id="events-section" className="scroll-mt-[100px]">
          <UpcomingEvents />
        </div>
      </StaggeredEntry>

      {/* 4. The rest of the site content cascades in */}
      <StaggeredEntry delay={0.6} className="w-full block">
        <div className="h-10 md:h-10 w-full shrink-0" />
        <AboutIskcon />

        <div className="h-10 md:h-10 w-full shrink-0" />
        <SocialFeed />

        <div className="h-10 md:h-10 w-full shrink-0" />
        <TempleSection />

        <div className="h-10 md:h-10 w-full shrink-0" />
        <SocialInitiatives />

        <div className="h-10 md:h-10 w-full shrink-0" />
        <Guesthouse />

        <div className="h-10 md:h-10 w-full shrink-0" />
        <CommunitiesSection />
      </StaggeredEntry>
      
    </main>
  );
}
