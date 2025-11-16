import { NextResponse } from 'next/server'
import { findUserByEmail, verifyPassword, createToken, stripPassword } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'E-mail en wachtwoord zijn verplicht' },
        { status: 400 }
      )
    }

    // Find user
    const user = findUserByEmail(email)
    if (!user) {
      return NextResponse.json(
        { error: 'Ongeldige inloggegevens' },
        { status: 401 }
      )
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password)
    if (!isValid) {
      return NextResponse.json(
        { error: 'Ongeldige inloggegevens' },
        { status: 401 }
      )
    }

    const authUser = stripPassword(user)
    const token = createToken(authUser)

    // Set cookie
    const response = NextResponse.json(
      { user: authUser, message: 'Succesvol ingelogd' },
      { status: 200 }
    )

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Er is een fout opgetreden bij het inloggen' },
      { status: 500 }
    )
  }
}



