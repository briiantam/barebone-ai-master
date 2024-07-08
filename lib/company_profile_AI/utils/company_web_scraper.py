import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup, Comment
from urllib.parse import urljoin, urlparse
from config.settings import CHROME_OPTIONS
from constants.constants import LINK_KEYWORDS, EXCLUDE_LINK_KEYWORDS, IRRELEVANT_PHRASES
import nltk
import re

def ensure_nltk_data():
    try:
        nltk.data.find('tokenizers/punkt')
        nltk.data.find('corpora/stopwords')
    except LookupError:
        nltk.download('punkt', quiet=True)
        nltk.download('stopwords', quiet=True)

ensure_nltk_data()

# Adjusted tag_visible function
def tag_visible(element):
    if element.parent.name in ['style', 'script', 'title', 'meta', '[document]', 'head']:
        return False
    if isinstance(element, Comment):
        return False
    if element.parent.name == 'span' in str(element.parent):
        return True
    return True

# Adjusted text_from_html function
def text_from_html(body):
    soup = BeautifulSoup(body, 'html.parser')
    texts = soup.findAll(string=True)
    visible_texts = filter(tag_visible, texts)
    return re.sub(r'\s+', ' ', " ".join(t.strip() for t in visible_texts))
def clean_irrelevant_sentences(text):
    sentences = nltk.sent_tokenize(text)
    filtered_sentences = []
    seen_sentences = set()
    for sentence in sentences:
        if not any(phrase in sentence.lower() for phrase in IRRELEVANT_PHRASES):
            if sentence not in seen_sentences:
                filtered_sentences.append(sentence)
                seen_sentences.add(sentence)
    return " ".join(filtered_sentences)

def extract_links(soup, base_url):
    links = set()
    base_netloc = urlparse(base_url).netloc
    for link in soup.find_all('a', href=True):
        full_url = urljoin(base_url, link.get('href'))
        link_text = link.get_text().lower()
        parsed_url = urlparse(full_url)
        if (base_netloc == parsed_url.netloc and len(parsed_url.path.strip('/').split('/')) <= 1 and
            any(keyword in link_text for keyword in LINK_KEYWORDS) and not any(exclude_keyword in link_text for exclude_keyword in EXCLUDE_LINK_KEYWORDS)):
            links.add(full_url)
    return links

def extract_company_name(url):
    domain_parts = urlparse(url).netloc.split('.')
    domain_parts = [part for part in domain_parts if part != "www"]
    company_name = domain_parts[0].split('-')[0]
    return company_name

def scrape_website(url):
    content = ""
    try:
        # Set up Chrome options
        chrome_options = Options()
        chrome_options.add_argument('--headless')
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')

        driver = webdriver.Chrome(options=chrome_options)
        
        start_time = time.time()
        driver.get(url)
        WebDriverWait(driver, 0.5).until(EC.presence_of_element_located((By.TAG_NAME, "body")))
        page_source = driver.page_source
        visible_text = text_from_html(page_source)
        content += visible_text
        print(f"Time taken to scrape main page: {time.time() - start_time:.2f} seconds")
        
        soup = BeautifulSoup(page_source, 'html.parser')
        links = extract_links(soup, url)
        
        link_times = []
        for link in links:
            link_start_time = time.time()
            driver.get(link)
            WebDriverWait(driver, 0.5).until(EC.presence_of_element_located((By.TAG_NAME, "body")))
            linked_page_source = driver.page_source
            content += text_from_html(linked_page_source)
            link_times.append(time.time() - link_start_time)
        
        print(f"Time taken to scrape additional links: {sum(link_times):.2f} seconds")
        
        additional_keywords = ["news", "about", "about_us"]
        additional_times = []
        for keyword in additional_keywords:
            additional_start_time = time.time()
            additional_url = urljoin(url, '/' + keyword)
            driver.get(additional_url)
            WebDriverWait(driver, 0.5).until(EC.presence_of_element_located((By.TAG_NAME, "body")))
            additional_page_source = driver.page_source
            content += text_from_html(additional_page_source)
            additional_times.append(time.time() - additional_start_time)
        
        print(f"Time taken to scrape additional URLs: {sum(additional_times):.2f} seconds")
        
        driver.quit()
    except Exception as e:
        print(f"An error occurred: {e}")
    
    return clean_irrelevant_sentences(content)
