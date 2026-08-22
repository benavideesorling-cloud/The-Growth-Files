import { draftMode } from "next/headers";
import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/config/site";

export async function GET() {
  (await draftMode()).disable();
  return NextResponse.redirect(new URL("/", siteConfig.url));
}
