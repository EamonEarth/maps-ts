// app/api/googleApiKey/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const googleApiKey = process.env.GOOGLE_API_KEY;

  if (!googleApiKey) {
    return NextResponse.json({ error: 'Google API key not found' }, { status: 500 });
  }

  return NextResponse.json({ googleApiKey });
}
