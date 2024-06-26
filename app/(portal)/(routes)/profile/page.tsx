"use client";

import React from "react";
import { ProfileForm } from "./form/profile-form";
import { Card, CardContent } from "@/components/ui/card";
import { BackgroundGradient } from "@/components/ui/BackgroundGradient";
import { CompanySummary } from "./summary/company-summary";
import { useGetCompanies } from "@/features/companies/api/use-get-companies";

export const dynamic = "force-dynamic";

export default function CompanyProfilePage() {
  const companiesQuery = useGetCompanies();
  const companies = companiesQuery.data || [];
  const hasCompany = companies.length > 0;
  const company = hasCompany ? companies[0] : null;

  if (companiesQuery.isLoading)
    return <div className="text-white">Loading...</div>;
  if (companiesQuery.error) return <div>Error loading company data</div>;

  return (
    <div className="flex mt-16 items-center justify-center">
      {/* Conditionally render based on company existence */}
      {hasCompany && company ? (
        <div className="p-8 mt-4">
          <CompanySummary
            company={company}
            hasOperationalDetails={true}
            gridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          />
        </div>
      ) : (
        <div className="w-full mt-16 sm:w-3/4 md:w-2/3 lg:w-2/3 max-w-4xl p-2 text-white flex flex-col">
          {/* Profile Information Header */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold m-4 ml-2">Company Profile</h2>
            <h2 className="text-md font-light mb-4 ml-2">
              Your inputs help our AI create a brief company summary and
              pinpoint potential investors. More data yields more accurate
              results!
            </h2>
          </div>

          {/* Card around ProfileForm with fixed height and scroll */}
          <div className="flex-1 px-2">
            <BackgroundGradient className="bg-slate-950 rounded-3xl">
              <div className="rounded-3xl bg-slate-950 p-2">
                <Card className="max-h-[1000px] bg-slate-950 border-none overflow-y-auto py-8">
                  <CardContent>
                    <ProfileForm />
                  </CardContent>
                </Card>
              </div>
            </BackgroundGradient>
          </div>
        </div>
      )}
    </div>
  );
}
