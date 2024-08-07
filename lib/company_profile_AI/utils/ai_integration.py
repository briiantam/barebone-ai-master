import os
from openai import OpenAI
import re

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

def ai_company_profile(company_content, articles_content):
    prompt = """
  Create a compelling company summary designed to attract venture capital investors. Follow the structure below and ensure the summary is detailed, specific, and highlights the unique strengths of the company.

    YOU MUST ABSOLUTELY OUTPUT THE FOLLOWING FORMAT WITH DATA LABELS SUCH AS coIndustry1, coIndustry2, coIndustry3, etc. DO NOT CHANGE THE FORMAT. ONLY FILL IN THE BLANKS WITH THE APPROPRIATE INFORMATION.:

    Company name: [Enter the company name here]

    Industry:
    coIndustry1: [Primary Industry]
    coIndustry2: [Secondary Industry (if applicable)]
    coIndustry3: [Tertiary Industry (if applicable)]

    coTargetRegion: [Target Region - List the target region(s) the company focuses on, e.g., Global, North America, Europe, Asia, etc. If Global, state that directly.]
    coTargetMarket: [Target Market - List the target countries the company focuses on, e.g., United States, China, India, etc. If Global, ignore this section.]

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

    coMarketLandscape: [Market Landscape - Provide a brief overview of the competitive landscape, including key competitors (what type of companies they are, and what are their names), their strengths and weaknesses, and the company's unique positioning and differentiation compared to them. Summarize in 2-3 sentences.]

    coAdditionalNotes: [Include any additional information that would be relevant to (if applicable) existing investors, previous funding round, such as notable achievements, partnerships, awards, or upcoming milestones. If there are existing investors, provide a list of the most notable investors, including venture capital firms, angel investors, or strategic partners. Summarize this information in 3-4 sentences.]
    
    The following content should be used to create the summary:
    Company website content:
    {company_content}

    Articles and TechCrunch content:
    {articles_content}
    """
    
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are VC.GPT, an excellent venture capital investor focused on young, tech-based companies. You create great one-pager company summaries that are both concise and detailed with not a single sentence wasted. You are able to read between the lines of company information and also provide deeper analysis on the company. The company summaries you create are read internally by senior venture capital investors who make investment decisions based on the company one-pager and provide next steps internally. The company summaries you create follow a strict format below."},
            {"role": "user", "content": prompt.format(company_content=company_content, articles_content=articles_content)}
        ],
        temperature=0  # Setting the temperature to 0 for deterministic results
    )
    
    return response.choices[0].message.content


