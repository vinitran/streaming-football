import { NextResponse } from "next/server";

export default async function middleware() {
    const res = NextResponse.next();
    // const url = req.nextUrl.clone();

    // if (shouldHandleRequest(url.pathname) && !isProfile(url.pathname)) {
    //     const profile = req.cookies.get(COOKIE_PROFILE);

    //     if (!profile) {
    //         url.pathname = "/profile";
    //         return NextResponse.redirect(url);
    //     }
    // }

    return res;
}
