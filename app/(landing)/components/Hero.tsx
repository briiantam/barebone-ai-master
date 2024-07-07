// import Image from "next/image";
// import TestimonialsAvatars from "./TestimonialsAvatars";
import config from "@/config";
import { AuroraBackground } from "@/components/ui/aurora-background";
import Arrow from "@/components/ui/Arrow";
import React from "react";
import { HoverBorderGradient } from "@/components/ui/HoverBorderGradient";

const Hero = () => {
  const words = [
    {
      text: "Find",
    },
    {
      text: "Investors",
    },
    {
      text: "Rapidly",
    },
    {
      text: "with",
    },
    {
      text: "Barebone",
    },
  ];
  return (
    <AuroraBackground>
      <section className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
        <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-center lg:items-center">
          <h1 className="font-extrabold text-white text-4xl sm:text-6xl md:text-6xl lg:text-6xl tracking-tight md:-mb-4">
            We Help Startups Find
            <br />
            <span>Investors 10x Quicker</span>
          </h1>
          <p className="text-l md:text-2xl lg:text-2xl opacity-80 text-slate-100 leading-relaxed">
            Barebone harnesses AI and advanced predictive algorithms to
            intelligently match startups with high-potential investors, and to
            craft compelling outreach messages for optimal engagement
          </p>

          <div className="mt-10 flex justify-center text-center">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className=" text-white flex items-center space-x-2 z-[1] "
            >
              <span>Get {config.appName}</span>
            </HoverBorderGradient>
          </div>
        </div>
        {/* <div className="lg:w-full">
          <Image
            src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"
            alt="Product Demo"
            className="w-full"
            priority={true}
            width={500}
            height={500}
          />
        </div> */}
      </section>
      <section className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 ">
        <div className="flex flex-col gap-2 lg:gap-4 mt-4 items-center justify-center text-center lg:text-center lg:items-center">
          <Arrow extraStyle="md:-scale-x-350 md:-rotate-270 text-white" />
          <p className="text-l md:text-xl lg:text-xl opacity-80 text-slate-100 ">
            Scroll down for more...
          </p>
        </div>
      </section>
    </AuroraBackground>
  );
};

export default Hero;
