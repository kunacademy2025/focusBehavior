import { NextRequest, NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages, cookieName } from "@i18n/settings";

export const config = {
  // matcher: '/:lng*'
  matcher: [
    "/((?!api|_next/static|_next/image|assets|media|favicon.ico|sw.js|sitemap.xml).*)",
  ],
};

export function middleware(req: NextRequest) {
  const headers = new Headers(req.headers);
  headers.set("x-current-path", req.url);
  const pathname = req.nextUrl.pathname;
  const searchParams = req.nextUrl.searchParams;

  let lng = fallbackLng || "en";

  const pathnameParts = pathname.split("/").filter(Boolean); // Remove empty segments
  if (pathnameParts.length > 0 && languages.includes(pathnameParts[0])) {
    lng = pathnameParts[0]; // Use the detected language
  }

  headers.set("x-i18n-lang", lng);

  if (pathname.startsWith("/uploads/")) {
    return NextResponse.redirect(
      new URL(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${pathname}`),
      { status: 308 }
    );
  }

  if (languages.length > 1) {
    let lng;
    if (req.cookies.has(cookieName))
      lng = acceptLanguage.get(req?.cookies?.get(cookieName)?.value || "");
    if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
    if (!lng) lng = fallbackLng;

    // Redirect if lng in path is not supported
    if (
      lng !== fallbackLng &&
      !languages.some((loc: string) => pathname.startsWith(`/${loc}`)) &&
      !pathname.startsWith("/_next")
    ) {
      console.log("redirect lng not supported");
      return NextResponse.redirect(
        new URL(`/${lng}${pathname}${getParams(searchParams)}`, req.url),
        { status: 308 }
      );
    }

    if (
      lng === fallbackLng &&
      (pathname.startsWith(`/${lng}/`) || pathname === `/${lng}`)
    ) {
      return NextResponse.redirect(
        new URL(
          `${pathname.replace(
            `/${lng}`,
            pathname === `/${lng}` ? "/" : ""
          )}${getParams(searchParams)}`,
          req.url
        ),
        { status: 308 }
      );
    }

    const pathnameIsMissingLocale = languages.every(
      (locale: string) =>
        !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    if (pathnameIsMissingLocale) {
      return NextResponse.rewrite(
        new URL(
          `/${fallbackLng}${pathname}${getParams(searchParams)}`,
          req.url
        ),
        { request: { headers } }
      );
    }
  }

  return NextResponse.next({ request: { headers } });
}

const getParams = (searchparams: URLSearchParams) => {
  let params: Array<string> = [];
  searchparams.forEach((item: string, key: string) => {
    params = [...params, `${key}=${item}`];
  });
  return params.length > 0 ? `?${params.join("&")}` : "";
};
