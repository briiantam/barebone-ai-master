"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { WavyBackground } from "@/components/ui/wavy-background";
import { InputLarge } from "@/components/InputLarge";
import { BackgroundGradient } from "@/components/ui/BackgroundGradient";
import axios from "axios";

enum STEPS {
  GET_STARTED = 0,
  BASIC_INFO = 1,
  ADVANCED_INFO = 2,
}

const CompanyInputs = () => {
  const [step, setStep] = useState(STEPS.GET_STARTED);
  const [showAdditionalInput, setShowAdditionalInput] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    url: "",
    location: "",
    companyDescription: "",
    industry: "",
    founderBackground: "",
    annualRevenue: "",
    annualNetIncome: "",
    numberOfEmployees: "",
    fundraisingHistory: "",
    fundraisingAmount: "",
    expectedValuation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxClick = () => {
    setShowAdditionalInput(!showAdditionalInput);
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = async () => {
    if (step === STEPS.ADVANCED_INFO) {
      // Final submit
      try {
        const response = await fetch("/api/scrape", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();
        console.log("Scraped Data:", result);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      setStep((value) => value + 1);
    }
  };

  let bodyContent = null;

  if (step === STEPS.GET_STARTED) {
    bodyContent = (
      <WavyBackground className="max-w-7xl z-0 mx-auto pb-40 mt-20">
        <div className="flex flex-col items-center text-white">
          <h1 className="mb-10 text-center font-bold text-3xl sm:text-3xl md:text-3xl lg:text-6xl">
            Connect with{" "}
            <span className="text-white">High-Potential Investors</span> Rapidly
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold py-4 text-center">
            Simply input your company details, and we will take care of the rest
          </p>
          <Button
            onClick={onNext}
            className="mt-4 rounded-full bg-neutral-800 text-white border border-white hover:bg-neutral-600"
          >
            Get Started
          </Button>
        </div>
      </WavyBackground>
    );
  }

  if (step === STEPS.BASIC_INFO) {
    bodyContent = (
      <section
        className="py-8 md:py-8 space-y-24 md:space-y-32 bg-black"
        id="product"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-20">
          <BackgroundGradient className="p-[0.5] rounded-3xl bg-zinc-900">
            <div className="max-w-7xl mx-auto rounded-3xl px-8 py-16 z-[0]">
              <div className="flex-col flex py-4 items-center text-white text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl mb-4">
                <h1>Basic Company Info</h1>
                <p className="text-lg mt-4 font-light">
                  Our AI would digest your information and find the most
                  suitable and high-potential investors for you
                </p>
              </div>
              <div className="flex-col flex gap-4 py-3 w-full">
                <div className="w-full">
                  <Input
                    placeholder="Company Name"
                    className="w-full"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col-2 gap-4 py-3 w-full">
                  <div className="w-full">
                    <Input
                      placeholder="Website URL"
                      className="w-full"
                      name="url"
                      value={formData.url}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full">
                    <Input
                      placeholder="Location"
                      className="w-full"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2 py-2 w-full">
                  <Checkbox id="terms" onClick={handleCheckboxClick} />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Don't have a website yet!
                  </label>
                </div>
                {showAdditionalInput && (
                  <div className="w-full">
                    <div className="flex-col flex items-left text-white text-lg font-bold">
                      <h1>Tell us more about you:</h1>
                    </div>
                    <div className="flex-col flex gap-4 py-3 w-full">
                      <InputLarge
                        placeholder="Company Description"
                        className="bg-black w-full"
                        name="companyDescription"
                        value={formData.companyDescription}
                        onChange={handleChange}
                      />
                      <Input
                        placeholder="Industry (Let us know all the industries you are in)"
                        className="w-full"
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-center space-x-4 mt-4">
                <Button
                  onClick={onBack}
                  className="rounded-full bg-neutral-800 text-white border border-white hover:bg-neutral-600"
                >
                  Back
                </Button>
                <Button
                  onClick={onNext}
                  className="rounded-full bg-neutral-800 text-white border border-white hover:bg-neutral-600"
                >
                  Next
                </Button>
              </div>
            </div>
          </BackgroundGradient>
        </div>
      </section>
    );
  }

  if (step === STEPS.ADVANCED_INFO) {
    bodyContent = (
      <section
        className="py-8 md:py-8 space-y-24 md:space-y-32 bg-black"
        id="product"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-20">
          <BackgroundGradient className="p-[0.5] rounded-3xl bg-zinc-900">
            <div className="max-w-7xl mx-auto rounded-3xl px-8 py-4 z-[0]">
              <div className="flex-col flex py-4 items-center text-white text-xl font-bold sm:text-2xl md:text-3xl lg:text-4xl ">
                <h1>Advanced Information</h1>
                <p className="text-lg mt-4 font-light">
                  More details about your company will result in a more accurate
                  match with investors
                </p>
              </div>
              <div className="flex-col flex gap-4 py-3 w-full">
                <div className="w-full">
                  <div className="text-white mb-1 font-bold">
                    Founder(s) Background
                  </div>
                  <InputLarge
                    placeholder="Tell us more about you: past experiences, education, and interests!"
                    className="bg-black w-full"
                    name="founderBackground"
                    value={formData.founderBackground}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      handleChange(e)
                    }
                  />
                </div>
                <div className="w-full">
                  <div className="text-white mb-1 font-bold">
                    Financials (if available)
                  </div>
                  <Input
                    placeholder="Annual Revenue (US$)"
                    className="mb-4 w-full"
                    name="annualRevenue"
                    value={formData.annualRevenue}
                    onChange={handleChange}
                  />
                  <Input
                    placeholder="Annual Net Income (US$)"
                    className="w-full"
                    name="annualNetIncome"
                    value={formData.annualNetIncome}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <div className="text-white mb-1 font-bold">
                    Operational Data
                  </div>
                  <Input
                    placeholder="Number of Employees"
                    className="mb-4 w-full"
                    name="numberOfEmployees"
                    value={formData.numberOfEmployees}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <div className="text-white mb-1 font-bold">
                    Fundraising Info
                  </div>
                  <Input
                    placeholder="Have you fundraised before?"
                    className="mb-4 w-full"
                    name="fundraisingHistory"
                    value={formData.fundraisingHistory}
                    onChange={handleChange}
                  />
                  <Input
                    placeholder="How much are you looking to raise?"
                    className="mb-4 w-full"
                    name="fundraisingAmount"
                    value={formData.fundraisingAmount}
                    onChange={handleChange}
                  />
                  <Input
                    placeholder="What is the expected valuation of your startup?"
                    className="w-full"
                    name="expectedValuation"
                    value={formData.expectedValuation}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex justify-center space-x-4 mt-4">
                <Button
                  onClick={onBack}
                  className="rounded-full bg-neutral-800 text-white border border-white hover:bg-neutral-600"
                >
                  Back
                </Button>
                <Button
                  onClick={onNext}
                  className="rounded-full bg-neutral-800 text-white border border-white hover:bg-neutral-600"
                >
                  Next
                </Button>
              </div>
            </div>
          </BackgroundGradient>
        </div>
      </section>
    );
  }

  return <div className="w-full">{bodyContent}</div>;
};

export default CompanyInputs;
