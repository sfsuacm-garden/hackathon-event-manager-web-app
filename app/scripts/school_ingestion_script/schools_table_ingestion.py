from dotenv import load_dotenv, dotenv_values
import os
import supabase
from supabase import create_client, Client
import json

class DBHandler:
    def __init__(self):
        load_dotenv()
        config = dotenv_values("../.env")
        
        supabase_url: str = config["SUPABASE_PUBLIC_URL"]
        supabase_private_key: str = config["SUPABASE_KEY"]

        self.supabase_client: Client = create_client(supabase_url, supabase_private_key)

class School:
    def __init__(self, name: str, country_code: str, domain: str):
        self.name = name
        self.country_code = country_code
        self.domain = domain
    def get_dict(self):
        return {
            "name": self.name,
            "country_code": self.country_code,
            "email_domain": self.domain
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
                domain=school_info["domains"][0] #returns a list but so far haven't seen any schools with more than one domain...
            )

            schools.append(school)
        return schools

    def ingest_schools_into_supabase(self, schools: list[School]):
        schools_as_dict = []
        for school in schools:
            schools_as_dict.append(school.get_dict())
        _ = (
            handler.supabase_client.table("schools").upsert(schools_as_dict).execute()
        )

if __name__ == "__main__":
    handler = DBHandler()
    ingestor = SchoolsIngestor(handler, "./world_universities_and_domains.json")    

    schools_list = ingestor.parse_schools_list()
    school_name_set = set()
    for school in schools_list:
        if school.name in school_name_set:
            print(school.name)
        else:
            school_name_set.add(school.name)

    ingestor.ingest_schools_into_supabase(schools_list)