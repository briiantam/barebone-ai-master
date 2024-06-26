"use client";

import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link"; // Import the Link component
import logo from "@/images/barebone_logo_transparent_long.png";
import { UserButton } from "@clerk/nextjs";
// import ButtonAccount from "../../components/ButtonAccount";

export const dynamic = "force-dynamic";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "/dashboard", current: true },
  { name: "Company Profile", href: "/profile", current: false },
  { name: "Find Investors", href: "/investors", current: true },
  { name: "Outreach", href: "/outreach", current: false },
  // { name: "Info", href: "/info", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PortalNavbar() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const router = useRouter();

  useEffect(() => {
    setActiveItem(window.location.pathname);
  }, []);

  const handleNavigation = (name, href) => {
    setActiveItem(name);
    router.push(href);
  };

  return (
    <>
      <div className="min-h-full ">
        <Disclosure as="nav" className="bg-neutral-950">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-4 border-b border-neutral-800">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Image
                        className="h-8 w-auto"
                        src={logo}
                        alt="Your Company"
                      />
                    </div>
                    <div className="hidden lg:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            passHref
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavigation(item.name, item.href);
                            }}
                            className={classNames(
                              item.name === activeItem
                                ? "bg-gray-700 text-white font-extrabold"
                                : "text-gray-300 hover:bg-gray-500 hover:text-white hover:font-semibold",
                              "rounded-md px-3 py-2 text-l font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden lg:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <UserButton afterSignOutUrl="/" />
                    </div>
                  </div>
                  <div className="-mr-2 flex lg:hidden">
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-black p-2 text-gray-200 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="lg:hidden border-b border-t  border-gray-200">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(item.name, item.href);
                      }}
                      className={classNames(
                        item.name === activeItem
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-800 pb-3 pt-4">
                  <div className="py-2space-y-1 px-2">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
}
