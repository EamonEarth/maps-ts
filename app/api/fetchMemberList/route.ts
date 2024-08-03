// app/api/fetchAirtableRecords/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { MemberRecord } from '@/app/member-list/page';


const airtableApiKey = process.env.AIRTABLE_API_KEY;
export async function GET(req: NextRequest) {

  if (!airtableApiKey) {
    return NextResponse.json({ error: 'AIRTABLE_API_KEY is not defined' }, { status: 500 });
  }

  const baseUrl = "https://api.airtable.com/v0/appUeDvcFLgQAJBVj/tblUDr7zpyO8IxAGm";
  const headers = {
    Authorization: `Bearer ${airtableApiKey}`,
    "Content-Type": "application/json",
  };

  let allRecords: MemberRecord[] = [];
  let offset: string | undefined;

  try {
    do {
      const params = new URLSearchParams();
      if (offset) {
        params.append("offset", offset);
      }
      params.append("pageSize", "100"); // Maximum page size
      params.append("sort[0][field]", "Name"); // Sort by Name field
      params.append("sort[0][direction]", "asc"); // Sort direction (ascending)

      const url = `${baseUrl}?${params.toString()}`;
      console.log("member list url", url)
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
