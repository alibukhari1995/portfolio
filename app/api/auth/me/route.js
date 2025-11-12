import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { findUserById } from '@/lib/users';

const JWT_SECRET = new TextEncoder().encode(
  'your-super-secret-jwt-key-min-32-characters-long'
);

export async function GET(request) {
  try {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const verified = await jwtVerify(token, JWT_SECRET);
    const user = findUserById(verified.payload.userId);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }
}