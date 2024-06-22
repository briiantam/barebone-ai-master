"use client";

import { useGetCompanies } from "@/features/companies/api/use-get-companies";

export function CompanySummary() {
  const { data, error, isLoading } = useGetCompanies();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading companies: {error.message}</div>;
  }

  return (
    <div>
      <h1>Company Summaries</h1>
      <ul>
        {data?.map((company) => (
          <li key={company.id}>
            <h2>{company.coName}</h2>
            <p>{company.coOneLiner}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
