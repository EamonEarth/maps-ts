import json
import requests
import time

# Load the JSON data
with open('final_updated_locations.json', 'r') as f:
    locations = json.load(f)

# Prepare headers for Airtable API
api_key = "pat7QPQNIACB42Nu0.0f88c9fb9d9112127b0741f7cf541d531ba089e0b33f3c883c7596dc90ee5530"
base_id = 'appUeDvcFLgQAJBVj'
table_name = 'tblQ3RP55KwHJ9Lca'

headers = {
    'Authorization': f'Bearer {api_key}',
    'Content-Type': 'application/json'
}

# URL for the Airtable table
url = f'https://api.airtable.com/v0/{base_id}/{table_name}'

# Function to create records in batches
def create_airtable_records(records):
    response = requests.post(url, headers=headers, json={"records": records})
    if response.status_code == 200:
        print("Batch created successfully")
    else:
        print("Error creating batch:", response.json())

# Prepare records for Airtable
batch_size = 10
records_batch = []
for location in locations:
    fields = {
        "Stakeholder": location.get("Stakeholder"),
        "StakeholderGroup": location.get("Stakeholder Group"),
        "City": location.get("Office Location"),
        "Region": location.get("Region"),
        "Location": f'{{lat: {location["location"]["lat"]}, lng: {location["location"]["lng"]}}}',
        "CMCN": location.get("CMCN"),
        "Website": location.get("Website"),
        "Email1": location.get("Email1"),
        "Email2": location.get("Email2"),
        "Contact": location.get("Key Contact"),
        "Phone": location.get("Phone Number"),
        "Facebook": location.get("FaceBook"),
        "Instagram": location.get("Instagram"),
    }
    records_batch.append({"fields": fields})

    # Create records in batches
    if len(records_batch) == batch_size:
        create_airtable_records(records_batch)
        records_batch = []
        time.sleep(1)  # To respect Airtable API rate limits

# Create remaining records
if records_batch:
    create_airtable_records(records_batch)

print("All records have been created in Airtable.")
