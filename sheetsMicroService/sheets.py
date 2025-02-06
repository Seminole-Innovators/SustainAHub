import gspread
from google.oauth2.service_account import Credentials
import json

scopes = ["https://www.googleapis.com/auth/spreadsheets"]
creds = Credentials.from_service_account_file("credentials.json", scopes=scopes)
client = gspread.authorize(creds)

sheet_id = "168SG3XFFuA4laHlhLX4Woj-v2nn-d3mKwNa4t8PzMHA"

sheet = client.open_by_key(sheet_id)

worksheet = sheet.sheet1

# Get all values from the sheet (list of lists, each inner list is a row) 
rows = worksheet.get_all_values()

# Convert rows to a dictionary (optional, you could customize this)
data = []
header = rows[0]  # Assuming the first row is the header
for row in rows[1:]:  # Skip the header row
    record = {header[i]: row[i] for i in range(len(header))}
    data.append(record)

# Save the data to a JSON file
with open('data.json', 'w') as json_file:
    json.dump(data, json_file, indent=4)
