"use client";

import { useGetCompanies } from "@/features/companies/api/use-get-companies";

export const CompanySummary = () => {
  const companiesQuery = useGetCompanies();
  const companies = companiesQuery.data || [];

  if (companiesQuery.isLoading) return <div>Loading...</div>;
  if (companiesQuery.error) return <div>Error loading company data</div>;

  if (companies.length === 0) return null;

  return (
    <div className=" bg-gradient-to-br from-blue-100 via-violet-300 to-indigo-300">
      {companies.map((company) => (
        <div
          key={company.id}
          className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8"
        >
          <div className="border-b-4 border-blue-900 py-2">
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-sky-900 via-sky-900 to-indigo-700 bg-clip-text text-transparent sm:text-5xl">
              {company.coName}
            </h2>
            <p className="my-2 text-slate-800 font-semibold mb-4">
              {company.coOneLiner}
            </p>
          </div>
          <div className="flex flex-col-2 justify-between py-2 ">
            <div>
              <div className="mt-4 flex flex-wrap gap-2">
                {company.coIndustry1 && (
                  <span className="inline-block bg-sky-100 border border-sky-600 px-3 py-1 text-sm font-semibold text-gray-700 rounded-full">
                    {company.coIndustry1}
                  </span>
                )}
                {company.coIndustry2 && (
                  <span className="inline-block bg-sky-100 border border-sky-600 px-3 py-1 text-sm font-semibold text-gray-700 rounded-full">
                    {company.coIndustry2}
                  </span>
                )}
                {company.coIndustry3 && (
                  <span className="inline-block bg-sky-100 border border-sky-600 px-3 py-1 text-sm font-semibold text-gray-700 rounded-full">
                    {company.coIndustry3}
                  </span>
                )}
              </div>
            </div>
            <div>
              <p className="mt-4 text-gray-900 font-semibold">
                {company.coCountry} | {company.coCity}
              </p>
            </div>
          </div>
          <div className=" border-t mt-2 border-slate-600">
            <h3 className="mt-4 font-bold text-xl text-gray-900">
              Key Highlights
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="mt-4 w-full sm:w-1/2 pt-1">
                <h3 className="font-medium text-gray-900">
                  Learn more about {company.coName}:
                </h3>
                {company.coDescription && (
                  <p className="mt-2 text-sm text-gray-700">
                    {company.coDescription}
                  </p>
                )}
              </div>
              <div className="mt-4 w-full sm:w-1/2 flex flex-col gap-4">
                <div className="rounded-sm p-4 px-6 border border-slate-200">
                  {company.coProductStatus && (
                    <div className="flex justify-between py-2">
                      <dt className="font-medium text-gray-900">
                        Product Status
                      </dt>
                      <dd className=" font-medium text-gray-800">
                        {company.coProductStatus}
                      </dd>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {company.coCustomerCount && (
                      <div className="border-t border-gray-200 pt-2">
                        <dt className="text-md font-normal text-gray-900">
                          Customer Count
                        </dt>
                        <dd className="mt-2 text-sm text-gray-700">
                          {company.coCustomerCount}
                        </dd>
                      </div>
                    )}
                    {company.coMonthlyRevenue && (
                      <div className="border-t border-gray-200 pt-2">
                        <dt className="text-md font-normal text-gray-900">
                          Monthly Revenue
                        </dt>
                        <dd className="mt-2 text-sm text-gray-700">
                          {company.coMonthlyRevenue}
                        </dd>
                      </div>
                    )}
                    {company.coAnnualRevenue && (
                      <div className="border-t border-gray-200 pt-2">
                        <dt className="text-md font-normal text-gray-900">
                          Annual Revenue
                        </dt>
                        <dd className="mt-2 text-sm text-gray-700">
                          {company.coAnnualRevenue}
                        </dd>
                      </div>
                    )}
                    {company.coAnnualExpense && (
                      <div className="border-t border-gray-200 pt-2">
                        <dt className="text-md font-normal text-gray-900">
                          Annual Expense
                        </dt>
                        <dd className="mt-2 text-sm text-gray-700">
                          {company.coAnnualExpense}
                        </dd>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 border-t border-gray-200 pt-4">
            <h3 className="font-bold text-xl text-gray-900">Founders</h3>
            {company.founderFirstName1 && (
              <div className="mt-2">
                <div>
                  <div className="flex flex-col-2 ">
                    <div className="font-medium text-gray-900">
                      {company.founderFirstName1} {company.founderLastName1}
                    </div>
                    <div className="flex space-x-2 ml-4">
                      {company.founderTwitterUrl1 && (
                        <a
                          href={company.founderTwitterUrl1}
                          target="_blank"
                          className="text-blue-500"
                        >
                          X/Twitter
                        </a>
                      )}
                      {company.founderLinkedinUrl1 && (
                        <a
                          href={company.founderLinkedinUrl1}
                          target="_blank"
                          className="text-blue-500"
                        >
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{company.founderBio1}</p>
                </div>
              </div>
            )}
            {/* Repeat the above block for each founder (founderFirstName2, etc.) */}
          </div>
          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:gap-x-8 border-t border-gray-200 pt-4">
            {company.coFundingRound && (
              <div>
                <dt className="font-medium text-gray-900">Funding Round</dt>
                <dd className="mt-2 text-sm text-gray-700">
                  {company.coFundingRound}
                </dd>
              </div>
            )}
            {company.coExpectedValuation && (
              <div>
                <dt className="font-medium text-gray-900">
                  Expected Valuation
                </dt>
                <dd className="mt-2 text-sm text-gray-700">
                  {company.coExpectedValuation}
                </dd>
              </div>
            )}
            {company.coFundraisingAmount && (
              <div>
                <dt className="font-medium text-gray-900">
                  Fundraising Amount
                </dt>
                <dd className="mt-2 text-sm text-gray-700">
                  {company.coFundraisingAmount}
                </dd>
              </div>
            )}
          </div>
          {company.coPastFundraisingInfo && (
            <div className="mt-4 border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-900">
                Past Fundraising Info
              </dt>
              <dd className="mt-2 text-sm text-gray-700">
                {company.coPastFundraisingInfo}
              </dd>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
