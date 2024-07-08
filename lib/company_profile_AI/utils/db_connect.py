import os
from dotenv import load_dotenv
import psycopg2
from psycopg2.extras import RealDictCursor

# Load the specified .env file
load_dotenv(dotenv_path='.env.local')  # Adjust the path if needed

# Get the DATABASE_URL from environment variables
DATABASE_URL = os.getenv('DATABASE_URL')

def fetch_companies(user_id):
    try:
        with psycopg2.connect(DATABASE_URL) as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("""
                    SELECT id, co_name, co_website_url
                    FROM companies
                    WHERE user_id = %s
                """, (user_id,))
                companies = cur.fetchall()
        return companies
    except (Exception, psycopg2.Error) as error:
        print("Error while connecting to PostgreSQL", error)
        return None

def get_company_names(user_id):
    companies = fetch_companies(user_id)
    if companies:
        return [company['co_name'] for company in companies]
    return []

def get_company_websites(user_id):
    companies = fetch_companies(user_id)
    if companies:
        return [company['co_website_url'] for company in companies]
    return []

def insert_company_ai_summary(company_id, summary):
    try:
        with psycopg2.connect(DATABASE_URL) as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    UPDATE companies_AI
                    SET summary = %s
                    WHERE company_id = %s
                    RETURNING id
                """, (summary, company_id))
                updated_row = cur.fetchone()
                if updated_row:
                    return updated_row[0]
                else:
                    cur.execute("""
                        INSERT INTO companies_AI (company_id, summary)
                        VALUES (%s, %s)
                        RETURNING id
                    """, (company_id, summary))
                    return cur.fetchone()[0]
    except (Exception, psycopg2.Error) as error:
        print("Error while inserting/updating AI summary", error)
        return None