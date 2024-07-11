import OpenAI from "openai";
import { industries } from "@/components/constants";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const GenerateAISummary = async (
  companyName: string,
  companyWebsiteContent: string | null,
  companyArticlesContent: string | null,
  companyCountry: string,
  companyCity: string
): Promise<string> => {
  const industriesList = industries.join(", ");
  const aiPrompt = `Create a compelling company summary designed to attract venture capital investors. Follow the structure below and ensure the summary is detailed, specific, and highlights the unique strengths of the company.

    YOU MUST ABSOLUTELY OUTPUT THE FOLLOWING FORMAT WITH DATA LABELS SUCH AS coIndustry1, coIndustry2, coIndustry3, etc. DO NOT CHANGE THE FORMAT. ONLY FILL IN THE BLANKS WITH THE APPROPRIATE INFORMATION.:

    Company name: ${companyName}

    HQ Location (Country/Market, City): ${companyCountry}, ${companyCity}

    Industry: pick from the following list of industries: ${industriesList}
    coIndustry1: [Primary Industry]
    coIndustry2: [Secondary Industry (if applicable)]
    coIndustry3: [Tertiary Industry (if applicable)]

    coTargetRegion: [Target Region - List the target region(s) the company focuses on, e.g., Global, North America, Europe, Asia, etc. If Global, state that directly.]
    coTargetMarket: [Target Market - List the target countries the company focuses on, e.g., United States, China, India, etc. If Global, ignore this section and MUST NOT output "coTargetMarket" to prevent parsing errors. Refer to the company's HQ Location to provide a more accurate target market.]

    coOneLiner: [Company Vision/One-liner: If available, use the existing vision statement. If not, provide a concise, 10-word one-liner describing what the company does. Avoid overly salesy/marketing-heavy language.]

    Company Description:
    coDescription1: [Provide a brief overview of the company, its mission, and core values. Summarize eloquently in 1-2 sentences.] 
    coDescription2: [Highlight the company's unique selling points and core competencies. Summarize eloquently in 1-2 sentences.] 
    coDescription3: [Describe the company's business model, including revenue streams, pricing strategies, and key partnerships. Summarize eloquently in 1-2 sentences.] 

    coTargetCustomerProfile: [Target Customer Profile - Provide a concise yet detailed description of the ideal and target customer for the company, including demographics, psychographics, and relevant information. Specifically, consider whether customers are businesses, consumers, governments, or a combination. Summarize eloquently in 1-2 sentences.]

    Pain Points: [Identify and elaborate on the critical pain points from the company's proposed customer profile, particularly (and please prioritize) pain points which potential customers would be willing to pay a lot of money to solve. The best pain points should be problems that are extremely painful, and also highly recurring. Highlight the urgency and impact of these issues. There should be a minimum of 2 pain points and a maximum of 3.]

    coCustomerProblem1: [Detailed and impactful description]
    coCustomerProblem2: [Detailed and impactful description]
    coCustomerProblem3: [Detailed and impactful description (if applicable)]

    Products: [List the products and services the company offers. To be clear, this should be specific revenue streams or key features / categories, not details on small products since a company may have millions of products. Exercise judgment. Be concise and clear, with 2-3 bullets matching the number of pain points. Describe each product, highlighting how it addresses the respective pain points.]

    coProduct1: [Name and description, addressing Pain Point 1]
    coProduct2: [Name and description, addressing Pain Point 2]
    coProduct3: [Name and description, addressing Pain Point 3,  (if applicable)]

    Differentiation: [Provide 1-4 compelling points on why this company is special and deserves investment. Highlight technological innovations, market positioning, team strengths, or untapped market opportunities. For each differentiation, provide a header and a concise, detailed explanation.]

    coDifferentiation1: [Header, focusing on the most compelling point, with detailed explanation]
    coDifferentiation2: [Header, with detailed explanation]
    coDifferentiation3: [Header, with detailed explanation, (if applicable)]

    coMarketSize: [Potential Market Size - Identify the potential market size using the formula: total number of potential customers * average revenue per customer. Jsutify and provide rationale on why such numbers were used. Denote specific currency used, such as USD, RMB, GBP, etc. If the company is a B2B business, would be helpful to provide or guesstimate total enterprise expenditure on that service to show the potential of capturing that demand. Include relevant statistics, figures, or data points, but only doing so if accuracy is guaranteed. Summarize the market size and calculation rationale in 2-3 sentences.]

    coMarketLandscape: [Market Landscape - Provide a brief overview of the competitive landscape, including both global and regional key competitors (what type of companies they are, and their relative names), their strengths and weaknesses, and the company's unique positioning and differentiation compared to them. Summarize in 2-3 sentences.]

    coExecutiveSummary: [In one sentence, summarize what the company does and why it is a compelling investment opportunity (without explicitly saying this is a compelling investment opportunity to prevent being too salesy). This should be a high-level overview that captures the essence of the company and its potential based on responses above, so that the reader immediately understands what this company does, represents, and why it is special.]
    
    The following content should be used to create the summary:
    Company website content:
    ${companyWebsiteContent}

    Articles and TechCrunch content:
    ${companyArticlesContent}`;

  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content:
          "You are VC.GPT, an excellent venture capital investor focused on young, tech-based companies. You create great one-pager company summaries that are both concise and detailed with not a single sentence wasted. You are able to read between the lines of company information and also provide deeper analysis on the company. The company summaries you create are read internally by senior venture capital investors who make investment decisions based on the company one-pager and provide next steps internally. The company summaries you create follow a strict format below.",
      },
      { role: "user", content: aiPrompt },
    ],
    temperature: 0, // Higher = more creative
  });

  const summary = chatCompletion.choices[0].message.content;
  return summary !== null ? summary : "";
};
