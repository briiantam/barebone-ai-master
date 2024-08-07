import React, { useState } from "react";
import Link from "next/link";
import { useGetCompanies } from "@/features/companies/api/use-get-companies";
import { useGetCompaniesAI } from "@/features/companiesAI/api/use-get-companiesAI";
import { useEditCompany } from "@/features/companies/api/use-edit-company";
import { formatNumber } from "@/utils/number";
import { Company, CompanyAI, foundersFields } from "../interface";
import { EditCompanyForm } from "./edit-company-form";
import { RiTwitterXLine } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Form } from "@/components/ui/form";
import { useProfileForm } from "../form/use-profile-form";
import { Button } from "@/components/ui/button";
import { useDeleteCompany } from "@/features/companies/api/use-delete-company";

interface CompanySummaryProps {
  company: Company;
  companyAI?: CompanyAI;
  hasOperationalDetails: boolean;
  gridCols: string;
}

export const CompanySummary: React.FC<CompanySummaryProps> = ({
  company,
  companyAI,
  hasOperationalDetails,
  gridCols,
}) => {
  const { form } = useProfileForm();
  const [isEditing, setIsEditing] = useState(false);
  const [editCompanyData, setEditCompanyData] = useState<Company | null>(null);
  const companiesQuery = useGetCompanies();
  const companiesAIQuery = useGetCompaniesAI();
  const companies: Company[] = companiesQuery.data || [];
  const companiesAI: CompanyAI[] = companiesAIQuery.data || [];

  const editCompany = useEditCompany(editCompanyData?.id);
  const deleteCompany = useDeleteCompany(companies[0]?.id);

  if (companiesQuery.isLoading) return <div>Loading...</div>;
  if (companiesQuery.error) return <div>Error loading company data</div>;
  if (companies.length === 0) return null;

  const handleEditClick = (company: Company) => {
    setEditCompanyData(company);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editCompanyData) {
      editCompany.mutate(editCompanyData, {
        onSuccess: () => {
          setIsEditing(false);
        },
      });
    }
  };

  const handleDelete = () => {
    if (companies[0]?.id) {
      deleteCompany.mutate(undefined, {
        onSuccess: () => {
          // Handle successful deletion, e.g., redirect or update UI
        },
      });
    }
  };

  return (
    <>
      <div className="flex flex-col-2 gap-4">
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogTrigger asChild>
            <Button
              onClick={() => handleEditClick(companies[0])}
              className=" flex mb-4 px-6 py-2 bg-black border border-white text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 hover:bg-neutral-700"
              variant="outline"
            >
              Edit Company Details
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[800px] overflow-hidden">
            <DialogHeader className="flex flex-col space-y-4 px-4">
              <div className="flex justify-between items-start">
                <div>
                  <DialogTitle className="text-2xl">
                    Edit Company Profile
                  </DialogTitle>
                  <DialogDescription>
                    Make changes to your company profile here. Click save when
                    you're done.
                  </DialogDescription>
                </div>
                <Button
                  onClick={handleSave}
                  className="bg-indigo-600 border border-indigo-500 text-white px-4 py-2 mr-6 rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 hover:bg-indigo-400"
                >
                  Save
                </Button>
              </div>
            </DialogHeader>
            <div className="overflow-y-auto max-h-[calc(800px-6rem)] pr-4">
              <Form {...form}>
                {editCompanyData && (
                  <EditCompanyForm
                    control={form.control}
                    companyData={editCompanyData}
                    onChange={(e) =>
                      setEditCompanyData({
                        ...editCompanyData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    setValue={form.setValue}
                    onSave={handleSave}
                  />
                )}
              </Form>
            </div>
          </DialogContent>
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger className=" flex mb-4 px-6 py-2 bg-red-600 border border-white text-white text-sm items-center rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 hover:bg-red-700">
            Delete Company
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                company profile and remove your data from our server.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-500 text-white font-bold"
              >
                Delete Company
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="bg-gradient-to-l from-gray-200 via-fuchsia-200 to-stone-100 rounded-3xl p-4">
        {companies.map((company) => {
          const companyAI = companiesAI.find(
            (ai) => ai.companyId === company.id
          );
          return (
            <CompanyDetails
              key={company.id}
              company={company}
              companyAI={companyAI}
            />
          );
        })}
      </div>
    </>
  );
};

const CompanyDetails = ({
  company,
  companyAI,
}: {
  company: Company;
  companyAI?: CompanyAI;
}) => {
  const hasOperationalDetails =
    company.coCustomerCount ||
    company.coMonthlyRevenue ||
    company.coAnnualRevenue ||
    company.coAnnualExpense;

  const detailsCount = [
    company.coCustomerCount,
    company.coMonthlyRevenue,
    company.coAnnualRevenue,
    company.coAnnualExpense,
  ].filter(Boolean).length;

  const gridCols =
    detailsCount === 4
      ? "grid-cols-2"
      : detailsCount === 3
      ? "grid-cols-3"
      : detailsCount === 2
      ? "grid-cols-2"
      : "grid-cols-1";

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 lg:w-[80rem] lg:max-w-[80rem] lg:px-8">
      <CompanyHeader company={company} companyAI={companyAI} />
      <CompanyExecSummary company={company} companyAI={companyAI} />

      <CompanyKeyHighlights company={company} companyAI={companyAI} />
      <CompanyMarket company={company} companyAI={companyAI} />
      <CompanyOperations
        company={company}
        companyAI={companyAI}
        hasOperationalDetails={true}
        gridCols={gridCols}
      />
      <CompanyFounders company={company} />
      <CompanyFundraising company={company} />
    </div>
  );
};

const CompanyExecSummary = ({
  company,
  companyAI,
}: {
  company: Company;
  companyAI?: CompanyAI;
}) => (
  <>
    <div className="border-t mt-2 border-slate-600">
      <div className="py-2 flex flex-col justify-between">
        <h3 className="font-bold text-xl text-center text-gray-900">
          {companyAI?.coExecutiveSummary}
        </h3>
      </div>
    </div>
  </>
);

const CompanyHeader = ({
  company,
  companyAI,
}: {
  company: Company;
  companyAI?: CompanyAI;
}) => (
  <>
    <div className="py-2">
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-2">
        {company.coName}
      </h2>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-slate-800 ">
        <p className="font-semibold">
          {companyAI?.coOneLiner || company.coOneLiner}
        </p>
        {company.coWebsiteUrl && (
          <Link
            href={
              company.coWebsiteUrl.startsWith("http")
                ? company.coWebsiteUrl
                : `https://${company.coWebsiteUrl}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            {
              new URL(
                company.coWebsiteUrl.startsWith("http")
                  ? company.coWebsiteUrl
                  : `https://${company.coWebsiteUrl}`
              ).hostname
            }
          </Link>
        )}
      </div>
    </div>
    <div className="flex flex-col sm:flex-row sm:justify-between mb-4 gap-4 sm:gap-2">
      <div className="flex flex-wrap gap-2">
        {[
          company.coIndustry1 || companyAI?.coIndustry1,
          company.coIndustry2 || companyAI?.coIndustry2,
          company.coIndustry3 || companyAI?.coIndustry3,
        ]
          .filter(Boolean)
          .map((industry, index) => (
            <span
              key={index}
              className="inline-block bg-sky-100 border border-sky-600 px-3 py-1 text-sm font-semibold text-gray-700 rounded-full"
            >
              {industry}
            </span>
          ))}
      </div>
      <div className="sm:text-right">
        <p className="text-gray-900 font-semibold">
          {company.coCountry} | {company.coCity}
        </p>
      </div>
    </div>
  </>
);

const CompanyKeyHighlights = ({
  company,
  companyAI,
}: {
  company: Company;
  companyAI?: CompanyAI;
}) => (
  <div className="border-t mt-2 border-slate-600">
    <div className="mt-4 flex flex-col justify-between">
      <h3 className="font-bold text-xl text-gray-900">Key Highlights</h3>
      {(company.coProductStatus ||
        companyAI?.coTargetRegion ||
        companyAI?.coTargetMarket) && (
        <div className="flex py-1">
          <span className="font-medium text-gray-900">
            {company.coProductStatus && (
              <>
                <span className="text-gray-900">Product Status:</span>{" "}
                <span className="font-normal text-gray-600">
                  {company.coProductStatus}
                </span>
              </>
            )}
            {companyAI?.coTargetRegion && (
              <>
                {" | "}
                <span className="text-gray-900">Target Region:</span>{" "}
                <span className="font-normal text-gray-600">
                  {companyAI.coTargetRegion}
                </span>
              </>
            )}
            {companyAI?.coTargetMarket && (
              <>
                {" | "}
                <span className="text-gray-900">Target Market:</span>{" "}
                <span className="font-normal text-gray-600">
                  {companyAI.coTargetMarket}
                </span>
              </>
            )}
          </span>
        </div>
      )}
    </div>
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="mt-4 w-full sm:w-1/2 pt-1">
        <h3 className="font-semibold text-gray-900">
          Summarizing {company.coName}:
        </h3>
        <div className="mt-2 text-md text-gray-700">
          {companyAI?.coDescription1 ||
          companyAI?.coDescription2 ||
          companyAI?.coDescription3 ? (
            <ul className="list-disc list-outside ml-4">
              {companyAI?.coDescription1 && (
                <li className="mb-2">
                  <span className="leading-tight">
                    {companyAI.coDescription1}
                  </span>
                </li>
              )}
              {companyAI?.coDescription2 && (
                <li className="mb-2">
                  <span className="leading-tight">
                    {companyAI.coDescription2}
                  </span>
                </li>
              )}
              {companyAI?.coDescription3 && (
                <li className="mb-2">
                  <span className="leading-tight">
                    {companyAI.coDescription3}
                  </span>
                </li>
              )}
            </ul>
          ) : company.coDescription ? (
            <p>{company.coDescription}</p>
          ) : (
            <p>Please provide your company description!</p>
          )}
        </div>
      </div>
      <div className="mt-4 w-full sm:w-1/2 pt-1">
        <h3 className="font-semibold text-gray-900">
          {company.coName}'s Differentiation:
        </h3>
        <div className="mt-2 text-md text-gray-700">
          {companyAI?.coDifferentiation1 ||
          companyAI?.coDifferentiation2 ||
          companyAI?.coDifferentiation3 ? (
            <ul className="list-disc list-outside ml-4">
              {companyAI?.coDifferentiation1 && (
                <li className="mb-2">
                  <span className="leading-tight">
                    {companyAI.coDifferentiation1}
                  </span>
                </li>
              )}
              {companyAI?.coDifferentiation2 && (
                <li className="mb-2">
                  <span className="leading-tight">
                    {companyAI.coDifferentiation2}
                  </span>
                </li>
              )}
              {companyAI?.coDifferentiation3 && (
                <li className="mb-2">
                  <span className="leading-tight">
                    {companyAI.coDifferentiation3}
                  </span>
                </li>
              )}
            </ul>
          ) : (
            <p>
              Please let us know how your company is differentiated from anyone
              else!
            </p>
          )}
        </div>
      </div>
    </div>
  </div>
);

const CompanyMarket = ({
  company,
  companyAI,
}: {
  company: Company;
  companyAI?: CompanyAI;
}) => (
  <div className="border-t mt-2 border-slate-600">
    <div className="mt-4 flex flex-col justify-between">
      <h3 className="font-bold text-xl text-gray-900">
        Addressable Market and Customer Profile
      </h3>
    </div>
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="mt-4 w-full sm:w-1/2 pt-1">
        <h3 className="font-semibold text-gray-900">
          Market Sizing and Landscape
        </h3>
        <div className="mt-2 text-md text-gray-700">
          {companyAI?.coMarketSize || companyAI?.coMarketLandscape ? (
            <ul className="list-disc list-outside ml-4">
              {companyAI?.coMarketSize && (
                <li className="mb-2">
                  <span className="font-semibold leading-tight">
                    Potential Market Size:{" "}
                  </span>
                  <span className="leading-tight">
                    {companyAI.coMarketSize}
                  </span>
                </li>
              )}
              {companyAI?.coMarketLandscape && (
                <li className="mb-2">
                  <span className="font-semibold leading-tight">
                    Current Market Landscape:{" "}
                  </span>
                  <span className="leading-tight">
                    {companyAI.coMarketLandscape}
                  </span>
                </li>
              )}
            </ul>
          ) : (
            <p>
              Please provide any write-up on potential market size and current
              market landscape!
            </p>
          )}
        </div>
      </div>
      <div className="mt-4 w-full sm:w-1/2 pt-1">
        <h3 className="font-semibold text-gray-900">Customer Profile</h3>
        <div className="mt-2 text-md text-gray-700">
          {companyAI?.coTargetCustomerProfile ? (
            <ul className="list-disc list-outside ml-4">
              {companyAI?.coTargetCustomerProfile && (
                <li className="mb-2">
                  <span className="leading-tight">
                    {companyAI.coTargetCustomerProfile}
                  </span>
                </li>
              )}
            </ul>
          ) : (
            <p>Please provide your company's customer profile and problems!</p>
          )}
        </div>

        <h3 className="font-semibold mt-2 text-gray-900">Customer Problems</h3>
        <div className="mt-2 text-md text-gray-700">
          {companyAI?.coCustomerProblem1 ||
          companyAI?.coCustomerProblem2 ||
          companyAI?.coCustomerProblem3 ? (
            <ul className="list-disc list-outside ml-4">
              {companyAI?.coCustomerProblem1 && (
                <li className="mb-2">
                  <span className="leading-tight">
                    {companyAI.coCustomerProblem1}
                  </span>
                </li>
              )}
              {companyAI?.coCustomerProblem2 && (
                <li className="mb-2">
                  <span className="leading-tight">
                    {companyAI.coCustomerProblem2}
                  </span>
                </li>
              )}
              {companyAI?.coCustomerProblem3 && (
                <li className="mb-2">
                  <span className="leading-tight">
                    {companyAI.coCustomerProblem3}
                  </span>
                </li>
              )}
            </ul>
          ) : (
            <p>Please provide your company's customer profile and problems!</p>
          )}
        </div>
      </div>
    </div>
  </div>
);

const CompanyOperations = ({
  company,
  companyAI,
  hasOperationalDetails,
  gridCols,
}: {
  company: Company;
  companyAI?: CompanyAI;
  hasOperationalDetails: boolean;
  gridCols: string;
}) => (
  <div className="border-t mt-2 border-slate-600">
    <div className="mt-4 flex flex-col justify-between">
      <h3 className="font-bold text-xl text-gray-900">
        Product and Operations
      </h3>
    </div>
    <div
      className={`flex flex-col ${
        hasOperationalDetails ? "sm:flex-row" : ""
      } gap-4`}
    >
      <div
        className={`mt-4 w-full ${
          hasOperationalDetails ? "sm:w-1/2" : ""
        } pt-1`}
      >
        <h3 className="font-semibold text-gray-900">Key Products</h3>
        <div className="mt-2 text-md text-gray-700">
          {companyAI?.coProduct1 ||
          companyAI?.coProduct2 ||
          companyAI?.coProduct3 ? (
            <ul className="list-disc list-outside ml-4">
              {companyAI?.coProduct1 && (
                <li className="mb-2">
                  <span className="leading-tight">{companyAI.coProduct1}</span>
                </li>
              )}
              {companyAI?.coProduct2 && (
                <li className="mb-2">
                  <span className="leading-tight">{companyAI.coProduct2}</span>
                </li>
              )}
              {companyAI?.coProduct3 && (
                <li className="mb-2">
                  <span className="leading-tight">{companyAI.coProduct3}</span>
                </li>
              )}
            </ul>
          ) : (
            <p>Please provide details about your products!</p>
          )}
        </div>
      </div>
      {hasOperationalDetails && (
        <div className="mt-4 w-full sm:w-1/2 pt-1">
          <h3 className="font-semibold text-gray-900">
            Key Operational Details
          </h3>
          <OperationalDetails company={company} gridCols={gridCols} />
        </div>
      )}
    </div>
  </div>
);

const OperationalDetails = ({
  company,
  gridCols,
}: {
  company: Company;
  gridCols: string;
}) => (
  <div className="py-2 mt-1 w-full flex flex-col gap-4">
    <div className="rounded-sm  w-full">
      <div className={`grid ${gridCols} gap-4 `}>
        {company.coCustomerCount && (
          <DetailItem title="Customer Count" value={company.coCustomerCount} />
        )}
        {company.coMonthlyRevenue && (
          <DetailItem
            title="Monthly Revenue"
            value={company.coMonthlyRevenue}
          />
        )}
        {company.coAnnualRevenue && (
          <DetailItem title="Annual Revenue" value={company.coAnnualRevenue} />
        )}
        {company.coAnnualExpense && (
          <DetailItem title="Annual Expense" value={company.coAnnualExpense} />
        )}
      </div>
    </div>
  </div>
);

const DetailItem = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => (
  <div className="pt-2">
    <dt className="text-md font-normal text-gray-900">{title}</dt>
    <dd className="mt-2 text-sm text-gray-700">{value}</dd>
  </div>
);

const CompanyFounders = ({ company }: { company: Company }) => (
  <div className="mt-4 border-t border-slate-600 pt-4">
    <h3 className="font-bold text-xl text-gray-900">Founders</h3>
    {foundersFields.map((field, index) => {
      const firstName = company[field.firstName as keyof Company];
      const lastName = company[field.lastName as keyof Company];
      const title = company[field.title as keyof Company];
      const bio = company[field.bio as keyof Company];
      const twitter = company[field.twitter as keyof Company];
      const linkedin = company[field.linkedin as keyof Company];

      if (!firstName) return null;

      return (
        <div className="mt-2" key={index}>
          <div className="flex flex-col-2 items-center">
            <div className="font-medium text-gray-900">
              <span>
                {firstName} {lastName} ({title})
              </span>
            </div>
            <div className="flex space-x-2 ml-4">
              {twitter && (
                <SocialLink
                  href={String(twitter)}
                  icon={<RiTwitterXLine size={20} />}
                />
              )}
              {linkedin && (
                <SocialLink
                  href={String(linkedin)}
                  icon={<FaLinkedin size={20} />}
                />
              )}
            </div>
          </div>
          <p className="text-md py-1 text-gray-700">{bio}</p>
        </div>
      );
    })}
  </div>
);

const SocialLink = ({
  href,
  icon,
}: {
  href: string;
  icon: React.ReactNode;
}) => (
  <Link href={href} target="_blank" className="text-gray-700">
    {icon}
  </Link>
);

const CompanyFundraising = ({ company }: { company: Company }) => (
  <div className="mt-4 border-t border-slate-600 pt-4">
    <h3 className="font-bold text-xl text-gray-900">Fundraising Details</h3>
    <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:gap-x-8  pt-4">
      {company.coFundingRound && (
        <FundraisingDetail
          title="Funding Round"
          value={company.coFundingRound}
        />
      )}
      {company.coExpectedValuation && (
        <FundraisingDetail
          title="Expected Valuation (USD)"
          value={formatNumber(company.coExpectedValuation)}
        />
      )}
      {company.coFundraisingAmount && (
        <FundraisingDetail
          title="Fundraising Amount (USD)"
          value={formatNumber(company.coFundraisingAmount)}
        />
      )}
    </div>
    {company.coPastFundraisingInfo && (
      <div className="mt-4 border-t border-gray-100 pt-4">
        <dt className="font-medium text-gray-900">Past Fundraising Info</dt>
        <dd className="mt-2 text-sm text-gray-700">
          {company.coPastFundraisingInfo}
        </dd>
      </div>
    )}
  </div>
);

const FundraisingDetail = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => (
  <div>
    <dt className="font-medium text-gray-900">{title}</dt>
    <dd className="mt-2 text-sm text-gray-700">{value}</dd>
  </div>
);
