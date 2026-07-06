import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json();
  const text = String(body.text || "").trim();
  if (!text) return NextResponse.json({ ok: false, message: "Пустая заметка" }, { status: 400 });

  const note = await prisma.leadNote.create({ data: { leadId: id, text } });
  return NextResponse.json({ ok: true, note });
}