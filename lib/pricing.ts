export type PricingInput = {
  purchasePrice: number;
  deliveryCost: number;
  buyerFee: number;
  otherExpenses: number;
  markupPercent: number;
  fixedMarkup: number;
  taxPercent: number;
  discount: number;
};

export function getDetaleksMarkupRule(costPrice: number) {
  if (costPrice <= 500) return { percent: 40, minMarkup: 250 };
  if (costPrice <= 1500) return { percent: 35, minMarkup: 350 };
  if (costPrice <= 5000) return { percent: 30, minMarkup: 600 };
  if (costPrice <= 15000) return { percent: 25, minMarkup: 1200 };
  if (costPrice <= 30000) return { percent: 20, minMarkup: 2000 };
  return { percent: 15, minMarkup: 3500 };
}

function roundClientPrice(value: number) {
  const step = value <= 5000 ? 50 : 100;
  return Math.ceil(value / step) * step;
}

export function calculateDetaleksClientPrice(purchasePrice: number) {
  const rule = getDetaleksMarkupRule(purchasePrice);
  const markup = Math.max(purchasePrice * (rule.percent / 100), rule.minMarkup);
  const clientPrice = roundClientPrice(purchasePrice + markup);
  return {
    purchasePrice,
    markup,
    markupPercent: rule.percent,
    clientPrice,
  };
}

export function recommendMarkup(costPrice: number) {
  const rule = getDetaleksMarkupRule(costPrice);
  return { percent: rule.percent, minProfit: rule.minMarkup };
}

export function calculatePricing(input: PricingInput) {
  const costPrice = input.purchasePrice + input.deliveryCost + input.buyerFee + input.otherExpenses;
  const percentMarkup = input.markupPercent > 0 ? costPrice * (input.markupPercent / 100) : 0;
  const markup = input.fixedMarkup > 0 ? input.fixedMarkup : percentMarkup;
  const recommendedBeforeDiscount = costPrice + markup;
  const finalPrice = Math.max(0, recommendedBeforeDiscount - input.discount);
  const tax = finalPrice * ((input.taxPercent || 6) / 100);
  const profit = finalPrice - costPrice - tax;
  const marginPercent = finalPrice > 0 ? (profit / finalPrice) * 100 : 0;
  const markupActual = costPrice > 0 ? ((finalPrice - costPrice) / costPrice) * 100 : 0;

  return {
    costPrice,
    recommended: recommendedBeforeDiscount,
    finalPrice,
    tax,
    profit,
    marginPercent,
    markupActual,
    warning: profit < recommendMarkup(costPrice).minProfit,
  };
}

export function calculateRecommendedPrice(costPrice: number) {
  const rule = getDetaleksMarkupRule(costPrice);
  return roundClientPrice(costPrice + Math.max(costPrice * (rule.percent / 100), rule.minMarkup));
}