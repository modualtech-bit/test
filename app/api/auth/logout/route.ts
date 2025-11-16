import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json(
    { message: 'Succesvol uitgelogd' },
    { status: 200 }
  )

  response.cookies.delete('auth_token')

  return response
}



