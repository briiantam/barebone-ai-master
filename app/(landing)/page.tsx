import { Suspense } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import FeaturesAccordion from "./components/FeaturesAccordion";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <header className="fixed top-0 w-full z-10 ">
        <Suspense>
          <Header />
        </Suspense>
      </header>
      <main className="bg-black ">
        <Hero />
        <Problem />
        <FeaturesAccordion />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
