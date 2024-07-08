from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from config.settings import CHROME_OPTIONS
from constants.constants import BREAKPOINTS
from utils.company_web_scraper import text_from_html

def filter_irrelevant_content(text):
    for breakpoint in BREAKPOINTS:
        if breakpoint in text:
            return text.split(breakpoint)[0]
    return text

def scrape_techcrunch(company_name):
    content = ""
    try:
        search_url = f"https://techcrunch.com/tag/{company_name}"
        driver = webdriver.Chrome(options=CHROME_OPTIONS)
        driver.get(search_url)
        WebDriverWait(driver, 0.5).until(EC.presence_of_element_located((By.TAG_NAME, "body")))
        
        soup = BeautifulSoup(driver.page_source, 'html.parser')
        articles = [a.get('href') for a in soup.find_all('a', {'data-module': 'Query', 'target': '_self'})][:3]
        
        for link in articles:
            driver.get(link)
            WebDriverWait(driver, 0.5).until(EC.presence_of_element_located((By.TAG_NAME, "body")))
            article_text = text_from_html(driver.page_source)
            content += filter_irrelevant_content(article_text)
        
        driver.quit()
    except Exception as e:
        print(f"An error occurred while scraping TechCrunch: {e}")
    
    return content
