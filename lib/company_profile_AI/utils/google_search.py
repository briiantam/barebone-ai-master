import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from urllib.parse import quote
from config.settings import CHROME_OPTIONS
from utils.company_web_scraper import text_from_html

def search_google_and_scrape(query):
    try:
        search_url = f"https://www.google.com/search?q={quote(query)}"
        print(f"Searching Google with URL: {search_url}")
        
        driver = webdriver.Chrome(options=CHROME_OPTIONS)
        driver.get(search_url)
        
        WebDriverWait(driver, 0.5).until(EC.presence_of_element_located((By.TAG_NAME, "body")))
        time.sleep(5)
        
        anchor_tags = driver.find_elements(By.TAG_NAME, "a")
        crunchbase_link = None
        for anchor in anchor_tags:
            href = anchor.get_attribute("href")
            if href and "crunchbase.com/organization" in href:
                crunchbase_link = href
                print(f"Found Crunchbase link: {href}")
                break
        
        if crunchbase_link:
            driver.get(crunchbase_link)
            WebDriverWait(driver, 0.5).until(EC.presence_of_element_located((By.TAG_NAME, "body")))
            time.sleep(5)
            
            page_source = driver.page_source
            visible_text = text_from_html(page_source)
            print("Scraped Content from Crunchbase:")
            print(visible_text)
        
        driver.quit()
    
    except Exception as e:
        print(f"An error occurred while searching Google: {e}")
