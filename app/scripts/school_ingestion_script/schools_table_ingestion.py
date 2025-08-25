from dotenv import load_dotenv, dotenv_values
import os
import supabase
from supabase import create_client, Client
import json
import uuid

class DBHandler:
    def __init__(self):
        load_dotenv()
        config = dotenv_values("../.env")
        
        supabase_url: str = config["SUPABASE_PUBLIC_URL"]
        supabase_private_key: str = config["SUPABASE_KEY"]

        self.supabase_client: Client = create_client(supabase_url, supabase_private_key)

class School:
    def __init__(self, name: str, country_code: str, domains: list[str]):
        self.name = name
        self.country_code = country_code
        self.domains = domains

    def get_dict(self):
        return {
            "name": self.name,
            "country_code": self.country_code,
            "email_domain": self.domains
        }

class SchoolsIngestor:
    def __init__(self, handler: DBHandler, schools_fpath: str):
        self.handler = handler
        self.schools_fpath = schools_fpath
    
    def parse_schools_list(self) -> list[School]:
        schools: list[School] = []
        with open(self.schools_fpath, "r", encoding='utf-8') as file:
            schools_json = json.load(file)
        
        for school_info in schools_json:
            school: School = School(
                name=school_info["name"],
                country_code=school_info["alpha_two_code"],
                domains=school_info["domains"]
            )

            schools.append(school)
        return schools

    def ingest_schools_into_supabase(self, schools: list[School]):
        school_id_to_domains : dict[str, str] = {}
        schools_as_dict = []
        # we explicitly generate a random uuid s.t we have a visible link in the code between school
        # and school domain. This is needed because we are bulk inserting for performance. We cannot assume returned ids
        # from supabase insert query will be in the same order that the list of dictionaries of schools is when we pass it in  
        for school in schools: # ingest schools
            school_id = str(uuid.uuid4())
            schools_as_dict.append({
                "id": school_id,
                "name":school.name,
                "country_code": school.country_code
            })

            school_id_to_domains[school_id] = school.domains

        _ = (
            handler.supabase_client.table("schools").insert(schools_as_dict).execute()
        )

        # ingest school domains
        all_schools_and_domains = []
        for school_id in school_id_to_domains:
            
            all_domains = school_id_to_domains[school_id]
            for domain in all_domains:
                all_schools_and_domains.append({
                "school_id": school_id,
                "domain": domain
            })
        
        _ = (
            handler.supabase_client.table("school_email_domains").insert(all_schools_and_domains).execute()
        )

if __name__ == "__main__":
    handler = DBHandler()
    ingestor = SchoolsIngestor(handler, "./world_universities_and_domains.json")    

    schools_list = ingestor.parse_schools_list()

    ingestor.ingest_schools_into_supabase(schools_list)