import { NextResponse } from 'next/server';
// import { verifyToken } from '../lib/verifyToken';

export async function middleware(req, ev) {
    // const token = req ? req.cookies?.token : null;
    // const userId = await verifyToken(token);
    // const { pathname, origin } = req.nextUrl;

    // if (
    //     userId ||
    //     pathname.includes('/api/login') ||
    //     pathname.includes('/static')
    // ) {
    return NextResponse.next();
    // }

    // if (!token && pathname !== '/login') {
    //     return NextResponse.rewrite(`${origin}/login`);
    // }
}
