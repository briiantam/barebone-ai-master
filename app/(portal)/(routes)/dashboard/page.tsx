"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  // const data = await getData();

  return (
    <main className="pb-24">
      <div className="h-screen max-w-full mx-auto py-20 px-6 sm:px-8 lg:px-20 flex items-center justify-center">
        <div className="w-full text-white">
          {/* <CompanyInputs /> */}
          dashboard
        </div>
      </div>
    </main>
  );
}
