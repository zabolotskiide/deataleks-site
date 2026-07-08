import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const lead = await prisma.lead.findUnique({
    where: { id },
    select: { fileData: true, fileName: true, fileMime: true },
  });

  if (!lead?.fileData || !lead.fileName) {
    return NextResponse.json({ ok: false, message: "Файл не найден" }, { status: 404 });
  }

  const encodedName = encodeURIComponent(lead.fileName);
  return new NextResponse(lead.fileData, {
    headers: {
      "Content-Type": lead.fileMime || "application/octet-stream",
      "Content-Disposition": `attachment; filename*=UTF-8''${encodedName}`,
      "Cache-Control": "private, no-store",
    },
  });
}
