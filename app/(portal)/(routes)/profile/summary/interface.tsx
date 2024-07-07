export interface Company {
  id: string;
  userId?: string;
  coName: string;
  coOneLiner?: string | null;
  coWebsiteUrl?: string | null;
  coDescription?: string | null;
  coCountry: string;
  coCity: string;
  coProductStatus?: string | null;
  coCustomerCount?: string | null;
  coMonthlyRevenue?: string | null;
  coAnnualRevenue?: string | null;
  coAnnualExpense?: string | null;
  coExpectedValuation?: number | null;
  coFundraisingAmount?: number | null;
  coPastFundraisingInfo?: string | null;
  coFundingRound?: string | null;
  coIndustry1?: string | null;
  coIndustry2?: string | null;
  coIndustry3?: string | null;
  founderFirstName1?: string | null;
  founderLastName1?: string | null;
  founderTitle1?: string | null;
  founderBio1?: string | null;
  founderTwitterUrl1?: string | null;
  founderLinkedinUrl1?: string | null;
  founderFirstName2?: string | null;
  founderLastName2?: string | null;
  founderTitle2?: string | null;
  founderBio2?: string | null;
  founderTwitterUrl2?: string | null;
  founderLinkedinUrl2?: string | null;
  founderFirstName3?: string | null;
  founderLastName3?: string | null;
  founderTitle3?: string | null;
  founderBio3?: string | null;
  founderTwitterUrl3?: string | null;
  founderLinkedinUrl3?: string | null;
  founderFirstName4?: string | null;
  founderLastName4?: string | null;
  founderTitle4?: string | null;
  founderBio4?: string | null;
  founderTwitterUrl4?: string | null;
  founderLinkedinUrl4?: string | null;
  founderFirstName5?: string | null;
  founderLastName5?: string | null;
  founderTitle5?: string | null;
  founderBio5?: string | null;
  founderTwitterUrl5?: string | null;
  founderLinkedinUrl5?: string | null;
}

export const foundersFields = [
  {
    firstName: "founderFirstName1",
    lastName: "founderLastName1",
    title: "founderTitle1",
    bio: "founderBio1",
    twitter: "founderTwitterUrl1",
    linkedin: "founderLinkedinUrl1",
  },
  {
    firstName: "founderFirstName2",
    lastName: "founderLastName2",
    title: "founderTitle2",
    bio: "founderBio2",
    twitter: "founderTwitterUrl2",
    linkedin: "founderLinkedinUrl2",
  },
  {
    firstName: "founderFirstName3",
    lastName: "founderLastName3",
    title: "founderTitle3",
    bio: "founderBio3",
    twitter: "founderTwitterUrl3",
    linkedin: "founderLinkedinUrl3",
  },
  {
    firstName: "founderFirstName4",
    lastName: "founderLastName4",
    title: "founderTitle4",
    bio: "founderBio4",
    twitter: "founderTwitterUrl4",
    linkedin: "founderLinkedinUrl4",
  },
  {
    firstName: "founderFirstName5",
    lastName: "founderLastName5",
    title: "founderTitle5",
    bio: "founderBio5",
    twitter: "founderTwitterUrl5",
    linkedin: "founderLinkedinUrl5",
  },
];
