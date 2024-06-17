"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputLarge } from "@/components/InputLarge";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosExpand } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ModalPopup from "./modalPopup";
import useCompanyInputModal from "@/hooks/useCompanyInputModal";

const industryCategories = [
  "A.I.",
  "B2B",
  "Blockchain",
  "Consumer",
  "Dev Tools",
  "eCommerce",
  "Education",
  "Fintech",
  "Government",
  "Healthcare",
  "Industrials",
  "Marketplace",
  "Real Estate",
  "Robotics",
  "SaaS",
];

const locationOptions = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "India",
  "China",
  "Japan",
  "Brazil",
  // Add more countries as needed
];

const CompanyInputs = () => {
  const placeholders = [
    "Describe your startup in one compelling sentence",
    "Share your website URL",
    "What industry and subsectors does your startup operate in?",
    "Where is your startup based?",
    "Tell us about your business and what makes it unique",
    "Provide details about your previous funding rounds",
  ];

  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [startupModalIsOpen, setStartupModalIsOpen] = useState(true); // Active by default
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const startupModalRef = useRef<HTMLDivElement>(null);

  const companyInputModal = useCompanyInputModal();

  const toggleOpenMakeListing = useCallback(() => {
    setStartupModalIsOpen((value) => !value);
  }, []);

  useEffect(() => {
    const startAnimation = () => {
      const interval = setInterval(() => {
        setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
      }, 1500);
      return () => clearInterval(interval);
    };

    startAnimation();
  }, [placeholders.length]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        startupModalRef.current &&
        !startupModalRef.current.contains(event.target as Node)
      ) {
        setStartupModalIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mt-10 flex flex-col justify-center items-center px-4">
      <h2 className="mb-6 sm:mb-10 text-2xl sm:text-3xl text-center text-white">
        Input your company details - we'll take care of the rest
      </h2>
      <Popover>
        <PopoverTrigger asChild>
          <button className="inline-flex items-center justify-start w-full h-12 rounded-full bg-neutral-900 border border-gray-600 text-gray-300 px-4 py-2 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 hover:bg-neutral-800">
            <IoIosExpand className="h-5 w-5 text-gray-400 mr-3" />
            <div className="relative w-full">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`current-placeholder-${currentPlaceholder}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "linear" }}
                  className="absolute inset-0 flex items-center text-gray-400 sm:text-base sm: text-xs md:text-sm lg:text-sm xl:text-lg"
                >
                  {placeholders[currentPlaceholder]}
                </motion.p>
              </AnimatePresence>
            </div>
          </button>
        </PopoverTrigger>

        <PopoverContent className="w-96 text-white bg-black">
          {/* ... */}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CompanyInputs;
