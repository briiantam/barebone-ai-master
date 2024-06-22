"use client";

import React from "react";
import { ProfileForm } from "./form/profile-form";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { BackgroundGradient } from "@/components/ui/BackgroundGradient";
import { CompanySummary } from "./summary/company-summary";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <div className="flex flex-col lg:flex-row h-screen mt-16">
      {/* Form Input */}
      <div className="w-full lg:w-5/12 p-4 text-white flex flex-col">
        {/* Profile Information Header */}

        <h2 className="text-3xl font-bold m-4 ml-2">Company Profile</h2>
        <h2 className="text-md font-light mb-4 ml-2">
          Your inputs help our AI create a brief company summary and pinpoint
          potential investors. More data yields more accurate results!
        </h2>

        {/* Card around ProfileForm with fixed height and scroll */}
        <div className="flex-1  px-2">
          <BackgroundGradient className="bg-slate-950 rounded-3xl">
            <div className="rounded-3xl bg-slate-950 p-2">
              <Card className="max-h-[1000px] bg-slate-950 border-none overflow-y-auto py-8">
                <CardContent>
                  <ProfileForm />
                </CardContent>
                <CardFooter>
                  {/* You can add any footer content here if needed */}
                </CardFooter>
              </Card>
            </div>
          </BackgroundGradient>
        </div>
      </div>

      {/* Form Output */}
      <div className="w-full lg:w-7/12 p-4 bg-neutral-900">
        <div className="h-full border-2 border-dashed border-gray-400 flex items-center justify-center">
          <span>
            <CompanySummary />
          </span>
        </div>
      </div>
    </div>
  );
}
