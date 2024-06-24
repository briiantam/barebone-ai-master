import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Company } from "./interface";

interface EditCompanyFormProps {
  companyData: Company;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

export const EditCompanyForm: React.FC<EditCompanyFormProps> = ({
  companyData,
  onChange,
  onSave,
}) => {
  return (
    <div>
      <Input
        type="text"
        name="coName"
        value={companyData.coName}
        onChange={onChange}
        className="mb-2"
      />
      <Input
        type="text"
        name="coOneLiner"
        value={companyData.coOneLiner}
        onChange={onChange}
        className="mb-2"
      />
      <Input
        type="text"
        name="coWebsiteUrl"
        value={companyData.coWebsiteUrl || ""}
        onChange={onChange}
        className="mb-2"
      />
      <Input
        type="text"
        name="coDescription"
        value={companyData.coDescription || ""}
        onChange={onChange}
        className="mb-2"
      />
      <Input
        type="text"
        name="coCountry"
        value={companyData.coCountry}
        onChange={onChange}
        className="mb-2"
      />
      <Input
        type="text"
        name="coCity"
        value={companyData.coCity}
        onChange={onChange}
        className="mb-2"
      />
      <Input
        type="text"
        name="coProductStatus"
        value={companyData.coProductStatus}
        onChange={onChange}
        className="mb-2"
      />
      <Input
        type="text"
        name="coCustomerCount"
        value={companyData.coCustomerCount || ""}
        onChange={onChange}
        className="mb-2"
      />
      <Input
        type="text"
        name="coMonthlyRevenue"
        value={companyData.coMonthlyRevenue || ""}
        onChange={onChange}
        className="mb-2"
      />
      <Input
        type="text"
        name="coAnnualRevenue"
        value={companyData.coAnnualRevenue || ""}
        onChange={onChange}
        className="mb-2"
      />
      <Input
        type="text"
        name="coAnnualExpense"
        value={companyData.coAnnualExpense || ""}
        onChange={onChange}
        className="mb-2"
      />
      <Input
        type="number"
        name="coExpectedValuation"
        value={companyData.coExpectedValuation || ""}
        onChange={onChange}
        className="mb-2"
      />
      <Input
        type="number"
        name="coFundraisingAmount"
        value={companyData.coFundraisingAmount || ""}
        onChange={onChange}
        className="mb-2"
      />
      <Input
        type="text"
        name="coPastFundraisingInfo"
        value={companyData.coPastFundraisingInfo || ""}
        onChange={onChange}
        className="mb-2"
      />
      <Input
        type="text"
        name="coFundingRound"
        value={companyData.coFundingRound}
        onChange={onChange}
        className="mb-2"
      />
      <Input
        type="text"
        name="coIndustry1"
        value={companyData.coIndustry1 || ""}
        onChange={onChange}
        className="mb-2"
      />
      <Input
        type="text"
        name="coIndustry2"
        value={companyData.coIndustry2 || ""}
        onChange={onChange}
        className="mb-2"
      />
      <Input
        type="text"
        name="coIndustry3"
        value={companyData.coIndustry3 || ""}
        onChange={onChange}
        className="mb-2"
      />
      <Input
        type="text"
        name="founderFirstName1"
        value={companyData.founderFirstName1}
        onChange={onChange}
        className="mb-2"
      />
      <Input
        type="text"
        name="founderLastName1"
        value={companyData.founderLastName1}
        onChange={onChange}
        className="mb-2"
      />
      <Input
        type="text"
        name="founderTitle1"
        value={companyData.founderTitle1}
        onChange={onChange}
        className="mb-2"
      />
      <Input
        type="text"
        name="founderBio1"
        value={companyData.founderBio1}
        onChange={onChange}
        className="mb-2"
      />
      <Input
        type="text"
        name="founderTwitterUrl1"
        value={companyData.founderTwitterUrl1 || ""}
        onChange={onChange}
        className="mb-2"
      />
      <Input
        type="text"
        name="founderLinkedinUrl1"
        value={companyData.founderLinkedinUrl1 || ""}
        onChange={onChange}
        className="mb-2"
      />
      {/* Add other founder input fields here */}
      <Button onClick={onSave}>Save</Button>
    </div>
  );
};
