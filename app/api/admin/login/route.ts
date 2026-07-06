import { NextResponse } from "next/server";
import { adminCredentials, createAdminToken, setAdminCookie } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const login = String(formData.get("login") || "").trim();
  const password = String(formData.get("password") || "");
  const expected = adminCredentials();

  if (login !== expected.login || password !== expected.password) {
    return NextResponse.redirect(new URL("/admin/login?error=1", request.url), { status: 303 });
  }

  await setAdminCookie(createAdminToken(login));
  return NextResponse.redirect(new URL("/admin", request.url), { status: 303 });
}