import time
from concurrent.futures import ThreadPoolExecutor
from utils.company_web_scraper import extract_company_name, scrape_website
from utils.articles_scraper import scrape_techcrunch

def analyze_company(company_name: str, website_url: str) -> str:
    start_time = time.time()
    
    # Extract company name
    company_name_start = time.time()
    company_name_scraped = extract_company_name(website_url)
    company_name_end = time.time()
    print(f"Time taken to extract company name: {company_name_end - company_name_start:.2f} seconds")
    
    # Scrape website and TechCrunch concurrently
    with ThreadPoolExecutor() as executor:
        website_future = executor.submit(scrape_website, website_url)
        techcrunch_future = executor.submit(scrape_techcrunch, company_name_scraped)
        techcrunch_future_alt = None
        if company_name_scraped != company_name:
            techcrunch_future_alt = executor.submit(scrape_techcrunch, company_name)
        
        # Get results
        content_website = website_future.result()
        content_techcrunch = techcrunch_future.result()
        if techcrunch_future_alt:
            content_techcrunch += techcrunch_future_alt.result()
    
    website_scrape_end = time.time()
    print(f"Time taken to scrape website and TechCrunch: {website_scrape_end - company_name_end:.2f} seconds")
    
    summary = content_website + content_techcrunch
    
    total_time = time.time() - start_time
    print(f"Total time taken: {total_time:.2f} seconds")
    
    return summary

if __name__ == "__main__":
    company_name = input("Enter the company name: ")
    website_url = input("Enter the website URL: ")
    print(f"Running analysis for: {company_name} ({website_url})")
    result = analyze_company(company_name, website_url)
    print(result)
