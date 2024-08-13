// pages/api/fetchAirtableRecords.ts
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { AirtableRecord } from '@/app/page';



const airtableApiKey = process.env.AIRTABLE_API_KEY;

export async function GET(req: NextRequest, res: NextResponse) {

  if (!airtableApiKey) {
    return NextResponse.json({ error: 'AIRTABLE_API_KEY is not defined' }, { status: 500 });
  }

  const baseUrl = "https://api.airtable.com/v0/appUeDvcFLgQAJBVj/tblQ3RP55KwHJ9Lca";
  const headers = {
    Authorization: `Bearer ${airtableApiKey}`,
    "Content-Type": "application/json",
  };

  let allRecords: AirtableRecord[] = [];
  let offset: string | undefined;

  try {
    do {
      const params = new URLSearchParams();
      if (offset) {
        params.append("offset", offset);
      }
      params.append("pageSize", "100"); // Maximum page size
      params.append("sort[0][field]", "Stakeholder"); // Sort by Stakeholders field
      params.append("sort[0][direction]", "asc"); // Sort direction (ascending)

      const url = `${baseUrl}?${params.toString()}`;
      const response = await axios.get(url, { headers });

      allRecords = [...allRecords, ...response.data.records];
      offset = response.data.offset; // Get the offset for the next page, if any
    } while (offset); // Continue fetching if there's an offset


    return NextResponse.json(allRecords, { status: 200 });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
