"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/images/barebone_logo_transparent_long.png";
import config from "@/config";
import { Button } from "@/components/ui/button";
import { HoverBorderGradient } from "@/components/ui/HoverBorderGradient";

const links = [
  {
    href: "/#problem",
    label: "Problem",
  },
  {
    href: "/#product",
    label: "Our Product",
  },
  {
    href: "/#faq",
    label: "FAQ",
  },
];

const GetStarted = () => {
  return (
    <div>
      <Link href="/dashboard" passHref>
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className="text-white flex items-center space-x-2 z-[1]"
        >
          Get Started
        </HoverBorderGradient>
      </Link>
    </div>
  );
};

const Login = () => {
  return (
    <Link href="/dashboard" passHref>
      <Button variant="ghost" className="text-white px-4 text-base font-normal">
        Login
      </Button>
    </Link>
  );
};

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="bg-slate-950 bg-opacity-20 z-10 fixed w-full">
      <nav
        className="container flex items-center justify-between px-6 py-4 mx-auto"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link
            className="flex items-center gap-2 shrink-0"
            href="/"
            title={`${config.appName} homepage`}
          >
            <Image
              src={logo}
              alt={`${config.appName} logo`}
              priority={true}
              width={140}
              height={32}
            />
          </Link>
        </div>
        {/* Burger button to open menu on mobile */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>

        <div className="hidden lg:flex lg:justify-center lg:gap-12 lg:items-center">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className="link link-hover text-white cursor-pointer font-light text-md "
              title={link.label}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:justify-end lg:flex-1">
          <Login />
          <GetStarted />
        </div>
      </nav>

      {isOpen && (
        <div className="lg:hidden">
          <div
            className={`fixed inset-y-0 right-0 z-50 w-full px-6 py-4 overflow-y-auto bg-black opacity-95 sm:max-w-sm sm:ring-1 sm:ring-neutral/10 transform origin-right transition ease-in-out duration-300`}
          >
            <div className="flex items-center justify-between">
              <Link
                className="flex items-center gap-2 shrink-0"
                title={`${config.appName} homepage`}
                href="/"
              >
                <Image
                  src={logo}
                  alt={`${config.appName} logo`}
                  priority={true}
                  width={140}
                  height={32}
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5"
                onClick={() => setIsOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-6">
              {links.map((link) => (
                <Link
                  href={link.href}
                  key={link.href}
                  className="block text-slate-100 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-6">
                <Login />
                <GetStarted />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
