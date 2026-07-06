import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const formData = await request.formData();
  const get = (name: string) => String(formData.get(name) || "").trim();
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    create: {
      id: "default",
      phone: get("phone"),
      email: get("email"),
      workTime: get("workTime"),
      vk: get("vk"),
      telegram: get("telegram"),
      max: get("max"),
      region: get("region"),
      paymentMethods: get("paymentMethods"),
      logo: get("logo"),
      heroTitle: get("heroTitle"),
      seoTitle: get("seoTitle"),
      seoDescription: get("seoDescription"),
      ipName: get("ipName"),
      inn: get("inn"),
      ogrnip: get("ogrnip"),
      legalDetails: get("legalDetails"),
    },
    update: {
      phone: get("phone"),
      email: get("email"),
      workTime: get("workTime"),
      vk: get("vk"),
      telegram: get("telegram"),
      max: get("max"),
      region: get("region"),
      paymentMethods: get("paymentMethods"),
      logo: get("logo"),
      heroTitle: get("heroTitle"),
      seoTitle: get("seoTitle"),
      seoDescription: get("seoDescription"),
      ipName: get("ipName"),
      inn: get("inn"),
      ogrnip: get("ogrnip"),
      legalDetails: get("legalDetails"),
    },
  });

  return NextResponse.redirect(new URL("/admin/settings?saved=1", request.url), { status: 303 });
}