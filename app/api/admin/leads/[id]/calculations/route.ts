import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { calculatePricing } from "@/lib/pricing";
import { prisma } from "@/lib/prisma";

function num(value: unknown) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json();
  const input = {
    purchasePrice: num(body.purchasePrice),
    deliveryCost: num(body.deliveryCost),
    buyerFee: num(body.buyerFee),
    otherExpenses: num(body.otherExpenses),
    markupPercent: num(body.markupPercent),
    fixedMarkup: num(body.fixedMarkup),
    taxPercent: num(body.taxPercent) || 6,
    discount: num(body.discount),
  };
  const result = calculatePricing(input);

  const calculation = await prisma.leadCalculation.create({
    data: {
      leadId: id,
      ...input,
      costPrice: result.costPrice,
      recommended: result.recommended,
      finalPrice: result.finalPrice,
      tax: result.tax,
      profit: result.profit,
      marginPercent: result.marginPercent,
      markupActual: result.markupActual,
    },
  });

  await prisma.lead.update({ where: { id }, data: { finalPrice: result.finalPrice, profit: result.profit } });

  return NextResponse.json({ ok: true, calculation, result });
}