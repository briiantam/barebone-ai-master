import sys
import time
from utils.company_web_scraper import extract_company_name, scrape_website

def analyze_company_website(website_url: str) -> str:
    start_time = time.time()
    
    # Extract company name
    company_name_start = time.time()
    company_name_scraped = extract_company_name(website_url)
    company_name_end = time.time()
    print(f"Time taken to extract company name: {company_name_end - company_name_start:.2f} seconds")
    
    # Scrape website
    website_scrape_start = time.time()
    content_website = scrape_website(website_url)
    website_scrape_end = time.time()
    print(f"Time taken to scrape website: {website_scrape_end - website_scrape_start:.2f} seconds")
    
    total_time = time.time() - start_time
    print(f"Total time taken: {total_time:.2f} seconds")
    
    return content_website

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python main_co_web_scraper.py <website_url>")
        sys.exit(1)
    
    website_url = sys.argv[1]
    print(f"Running website analysis for: {website_url}")
    result = analyze_company_website(website_url)
    print("Website Content:\n", result)
