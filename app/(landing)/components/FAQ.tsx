"use client";

import { useRef, useState } from "react";
import type { JSX } from "react";
import React from "react";

// <FAQ> component is a lsit of <Item> component
// Just import the FAQ & add your FAQ content to the const faqList arrayy below.

interface FAQItemProps {
  question: string;
  answer: JSX.Element;
}

const faqList: FAQItemProps[] = [
  {
    question: "How does Barebone's AI match startups with investors?",
    answer: (
      <div className="space-y-2 text-slate-200 leading-relaxed">
        Barebone analyzes factors like industry, stage, and funding requirements
        to intelligently match startups with the most suitable investors,
        streamlining the fundraising process.
      </div>
    ),
  },
  {
    question: "What kind of outreach messages does Barebone generate?",
    answer: (
      <div className="space-y-2 text-slate-200 leading-relaxed">
        Barebone crafts personalized, compelling outreach messages that
        highlight the startup&apos;s unique value proposition and align with the
        investor&apos;s interests, increasing the chances of a positive
        response.
      </div>
    ),
  },
  {
    question: "Is Barebone suitable for startups in any industry?",
    answer: (
      <div className="space-y-2 text-slate-200 leading-relaxed">
        Yes, Barebone caters to startups across various industries, using AI
        algorithms that consider industry-specific factors for accurate matching
        and tailored messaging.
      </div>
    ),
  },
  {
    question: "How does Barebone ensure the quality of investor matches?",
    answer: (
      <div className="space-y-2 text-slate-200 leading-relaxed">
        Barebone uses advanced data analysis and machine learning, collects
        feedback, and regularly updates its investor database to continuously
        improve the quality and accuracy of investor matches.
      </div>
    ),
  },
];

const FaqItem = ({ item }: { item: FAQItemProps }) => {
  const accordion = React.useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <button
        className="relative flex gap-2 items-center w-full py-5 text-cyan-400 font-semibold text-left border-t md:text-lg border-base-content/10"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
      >
        <span
          className={`flex-1 text-slate-100 ${isOpen ? "text-cyan-400" : ""}`}
        >
          {item?.question}
        </span>
        <svg
          className={`flex-shrink-0 w-4 h-4 ml-auto fill-current`}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              isOpen && "rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              isOpen && "rotate-180 hidden"
            }`}
          />
        </svg>
      </button>

      <div
        ref={accordion}
        className={`transition-all duration-300 ease-in-out opacity-80 overflow-hidden`}
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-5 leading-relaxed">{item?.answer}</div>
      </div>
    </li>
  );
};

const FAQ = () => {
  return (
    <section className="bg-black sm:py-12 md:py-24 lg:py-24 mt-20" id="faq">
      <div className="py-12 px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        <div className="flex flex-col text-left basis-1/2">
          <p className="inline-block font-semibold text-cyan-400 mb-4">FAQ</p>
          <p className="sm:text-4xl text-3xl font-extrabold text-slate-100">
            Frequently Asked Questions
          </p>
        </div>

        <ul className="basis-1/2">
          {faqList.map((item, i) => (
            <FaqItem key={i} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
