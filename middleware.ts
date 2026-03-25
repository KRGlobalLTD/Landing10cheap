import { NextRequest, NextResponse } from 'next/server';

function unauthorized() {
  return new NextResponse(null, {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Admin"'
    }
  });
}

export function middleware(request: NextRequest) {
  const adminUser = process.env.ADMIN_USER;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUser || !adminPassword) {
    console.error('[admin-auth] ADMIN_USER or ADMIN_PASSWORD is not configured.');
    return new NextResponse(null, { status: 503 });
  }

  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return unauthorized();
  }

  let credentials: string;
  try {
    credentials = atob(authHeader.slice(6)); // strip 'Basic '
  } catch {
    return unauthorized();
  }

  const colonIndex = credentials.indexOf(':');
  if (colonIndex === -1) {
    return unauthorized();
  }

  const username = credentials.slice(0, colonIndex);
  const password = credentials.slice(colonIndex + 1);

  if (username !== adminUser || password !== adminPassword) {
    return unauthorized();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*']
};
