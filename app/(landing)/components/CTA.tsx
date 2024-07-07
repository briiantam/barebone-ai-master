"use client";
import React from "react";
import config from "@/config";
import { BackgroundBeams } from "@/components/ui/BackgroundBeams";
import { HoverBorderGradient } from "@/components/ui/HoverBorderGradient";

export function CTA() {
  return (
    <div className="h-[20rem] w-full bg-black relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="font-extrabold text-white text-4xl lg:text-6xl tracking-tight md:-mb-4 text-center mb-20">
          Save Time Reaching Out to Investors Today
        </h1>

        {/* <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          Welcome to MailJet, the best transactional email service on the web.
          We provide reliable, scalable, and customizable email solutions for
          your business. Whether you&apos;re sending order confirmations,
          password reset emails, or promotional campaigns, MailJet has got you
          covered.
        </p> */}
        {/* <input
          type="text"
          placeholder="Let us know your email"
          className=" rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative  py-2 mt-20  bg-neutral-950 placeholder:text-neutral-4500 placeholder:text-center text-neutral-200 text-center font-semibold text-sm md:text-lg "
        /> */}
      </div>
      <div className="mt-10 flex justify-center text-center">
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className=" text-white flex items-center space-x-2 z-[1] "
        >
          <span>Get {config.appName}</span>
        </HoverBorderGradient>
      </div>

      <BackgroundBeams />
    </div>
  );
}

export default CTA;
