import sys
import time
from utils.articles_scraper import scrape_techcrunch

def analyze_techcrunch(company_name: str) -> str:
    start_time = time.time()
    
    # Scrape TechCrunch
    techcrunch_scrape_start = time.time()
    content_techcrunch = scrape_techcrunch(company_name)
    techcrunch_scrape_end = time.time()
    print(f"Time taken to scrape TechCrunch: {techcrunch_scrape_end - techcrunch_scrape_start:.2f} seconds")
    
    total_time = time.time() - start_time
    print(f"Total time taken: {total_time:.2f} seconds")
    
    return content_techcrunch

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python main_techcrunch_scraper.py <company_name>")
        sys.exit(1)
    
    company_name = sys.argv[1]
    print(f"Running TechCrunch analysis for: {company_name}")
    result = analyze_techcrunch(company_name)
    print("TechCrunch Content:\n", result)
