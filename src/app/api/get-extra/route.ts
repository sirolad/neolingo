import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const extraCookie = req.cookies.get('extra')?.value;
  const extra = extraCookie ? JSON.parse(extraCookie) : null;

  return NextResponse.json({ extra });
}
