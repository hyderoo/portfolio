"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import CaseStudies from "@/components/sections/CaseStudies";
import SampleWork from "@/components/sections/SampleWork";
import Skills from "@/components/sections/Skills";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const [ready, setReady] = useState(false);

  return (
    <SmoothScroll>
      <Cursor />
      <Preloader onDone={() => setReady(true)} />
      <Nav visible={ready} />
      <main>
        <Hero started={ready} />
        <Marquee />
        <About />
        <Experience />
        <Projects />
        <CaseStudies />
        <SampleWork />
        <Skills />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
