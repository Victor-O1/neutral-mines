import Cookies from "js-cookie";
import { NextResponse } from "next/server";

export function middleware(request) {
    const user = Cookies.get("_id")
    if (!user) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    return NextResponse.next()
}


export const config = {
    matcher: []
}