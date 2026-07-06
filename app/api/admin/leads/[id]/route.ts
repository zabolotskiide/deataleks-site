import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json();
  const lead = await prisma.lead.update({
    where: { id },
    data: {
      status: typeof body.status === "string" ? body.status : undefined,
      managerComment: typeof body.managerComment === "string" ? body.managerComment : undefined,
    },
  });

  return NextResponse.json({ ok: true, lead });
}