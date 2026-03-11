export type AssetCategory =
  | "stocks"
  | "mutual_funds"
  | "real_estate"
  | "gold"
  | "fd"
  | "crypto"
  | "bonds"
  | "other";

export type LiabilityCategory = 
  | "home_loan"
  | "car_loan"
  | "personal_loan"
  | "credit_card"
  | "other";

export interface Asset {
  id: string;
  name: string;
  category: AssetCategory;
  currentValue: number;
  purchasePrice: number;
  purchaseDate: string;
  liquid: boolean;
}

export interface Liability {
  id: string;
  name: string;
  category: LiabilityCategory;
  currentBalance: number;
  interestRate: number;
  dueDate: string;
}

export const CATEGORY_META: Record<
  AssetCategory,
  { label: string; color: string; text: string }
> = {
  stocks: { label: "Stocks", color: "#dcfce7", text: "#166534" },
  mutual_funds: { label: "Mutual Funds", color: "#e0f2fe", text: "#075985" },
  real_estate: { label: "Real Estate", color: "#ede9fe", text: "#5b21b6" },
  gold: { label: "Gold", color: "#fef3c7", text: "#92400e" },
  fd: { label: "Fixed Deposits", color: "#e0e7ff", text: "#3730a3" },
  crypto: { label: "Crypto", color: "#fee2e2", text: "#991b1b" },
  bonds: { label: "Bonds", color: "#dbeafe", text: "#1e40af" },
  other: { label: "Other", color: "#f3f4f6", text: "#374151" },
};

export const LIABILITY_META: Record<
  LiabilityCategory,
  { label: string; color: string; text: string }
> = {
  home_loan: { label: "Home Loan", color: "#fee2e2", text: "#991b1b" },
  car_loan: { label: "Car Loan", color: "#ffedd5", text: "#9a3412" },
  personal_loan: { label: "Personal Loan", color: "#fef3c7", text: "#92400e" },
  credit_card: { label: "Credit Card", color: "#fce7f3", text: "#9d174d" },
  other: { label: "Other", color: "#f3f4f6", text: "#374151" },
};

export const DUMMY_ASSETS: Asset[] = [
  // Stocks
  { id: "a1", name: "HDFC Bank Ltd.", category: "stocks", currentValue: 145000, purchasePrice: 112000, purchaseDate: "2024-02-10", liquid: true },
  { id: "a2", name: "Reliance Industries", category: "stocks", currentValue: 198000, purchasePrice: 165000, purchaseDate: "2023-08-15", liquid: true },
  { id: "a3", name: "Tata Motors Ltd.", category: "stocks", currentValue: 87000, purchasePrice: 72000, purchaseDate: "2024-05-20", liquid: true },
  // Mutual Funds
  { id: "a4", name: "NIFTY 50 Index Fund", category: "mutual_funds", currentValue: 285000, purchasePrice: 230000, purchaseDate: "2023-04-12", liquid: true },
  { id: "a5", name: "Mirae Asset Large Cap", category: "mutual_funds", currentValue: 163000, purchasePrice: 140000, purchaseDate: "2024-01-08", liquid: true },
  { id: "a6", name: "SBI Bluechip Fund", category: "mutual_funds", currentValue: 91000, purchasePrice: 80000, purchaseDate: "2024-06-15", liquid: true },
  // Gold
  { id: "a7", name: "Sovereign Gold Bond 2023", category: "gold", currentValue: 148000, purchasePrice: 118000, purchaseDate: "2023-11-20", liquid: true },
  // Fixed Deposits
  { id: "a8", name: "SBI Fixed Deposit 1Y", category: "fd", currentValue: 250000, purchasePrice: 230000, purchaseDate: "2024-09-10", liquid: false },
  { id: "a9", name: "ICICI Bank FD 2Y", category: "fd", currentValue: 115000, purchasePrice: 100000, purchaseDate: "2024-03-01", liquid: false },
  // Real Estate
  { id: "a10", name: "Residential Flat – Pune", category: "real_estate", currentValue: 4200000, purchasePrice: 3500000, purchaseDate: "2021-06-10", liquid: false },
  // Bonds
  { id: "a11", name: "RBI Floating Rate Bond", category: "bonds", currentValue: 200000, purchasePrice: 195000, purchaseDate: "2024-07-01", liquid: false },
  // Other / NPS  
  { id: "a12", name: "NPS Tier-1 Account", category: "other", currentValue: 320000, purchasePrice: 240000, purchaseDate: "2022-01-01", liquid: false },
  // Crypto
  { id: "a13", name: "Bitcoin (0.012 BTC)", category: "crypto", currentValue: 68000, purchasePrice: 35000, purchaseDate: "2023-03-15", liquid: true },
];

export const DUMMY_LIABILITIES: Liability[] = [
  { id: "l1", name: "HDFC Home Loan", category: "home_loan", currentBalance: 3500000, interestRate: 8.5, dueDate: "2025-04-05" },
  { id: "l2", name: "ICICI Car Loan", category: "car_loan", currentBalance: 450000, interestRate: 9.2, dueDate: "2025-04-10" },
  { id: "l3", name: "SBI Credit Card", category: "credit_card", currentBalance: 28500, interestRate: 36, dueDate: "2025-03-25" },
  { id: "l4", name: "HDFC Credit Card", category: "credit_card", currentBalance: 14200, interestRate: 40.8, dueDate: "2025-04-02" },
  { id: "l5", name: "Bajaj Finserv Personal Loan", category: "personal_loan", currentBalance: 180000, interestRate: 14.5, dueDate: "2025-04-15" },
];

export function sumAssets(assets: Asset[]) {
  return assets.reduce((s, a) => s + (a.currentValue || 0), 0);
}

export function sumLiabilities(liabilities: Liability[]) {
  return liabilities.reduce((s, l) => s + (l.currentBalance || 0), 0);
}

export type Timeframe = "1M" | "3M" | "6M" | "1Y";

export function getNetWorthHistory(assets: Asset[], liabilities: Liability[], timeframe: Timeframe) {
  const totalAssets = sumAssets(assets);
  const totalLiabilities = sumLiabilities(liabilities);
  const currentNetWorth = totalAssets - totalLiabilities;

  const pointsCount = timeframe === "1M" ? 30 : timeframe === "3M" ? 12 : timeframe === "6M" ? 6 : 12;
  const now = new Date();
  const data = [];

  for (let i = pointsCount - 1; i >= 0; i--) {
    let date;
    if (timeframe === "1M") {
      date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    } else {
      date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    }

    const label = timeframe === "1M" ? date.getDate().toString() : date.toLocaleString("en-US", { month: "short" });
    
    // Deterministic progression for demo
    const progress = (pointsCount - 1 - i) / (pointsCount - 1);
    const baseValue = currentNetWorth * (0.85 + 0.15 * progress);
    const noise = (Math.sin(i * 0.8) * 0.02) * currentNetWorth;
    
    data.push({
      date: label,
      value: Math.round(baseValue + noise),
    });
  }

  return data;
}

export function sumCurrentValue(assets: Asset[]) {
  return sumAssets(assets);
}

export function allocationDonutData(assets: Asset[]) {
  const byCat = new Map<AssetCategory, number>();
  for (const a of assets) {
    const cat = a.category ?? "other";
    byCat.set(cat, (byCat.get(cat) ?? 0) + (a.currentValue || 0));
  }
  return Array.from(byCat.entries())
    .filter(([, v]) => v > 0)
    .map(([cat, v]) => ({
      key: cat,
      name: CATEGORY_META[cat].label,
      value: Math.round(v),
      color: CATEGORY_META[cat].text,
    }))
    .sort((a, b) => b.value - a.value);
}

export function categoryBarData(assets: Asset[]) {
  const donut = allocationDonutData(assets);
  return donut.map((d) => ({
    name: d.name,
    value: d.value,
    color: d.color,
  }));
}

function monthLabel(d: Date) {
  return d.toLocaleString("en-US", { month: "short" });
}

export function portfolioGrowthData(assets: Asset[]) {
  const total = sumAssets(assets);
  const now = new Date();
  const months = 6;
  const points: { month: string; value: number }[] = [];

  const start = Math.max(0, total * 0.82);
  const step = months > 1 ? (total - start) / (months - 1) : 0;

  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const base = start + step * (months - 1 - i);
    const wave = (Math.sin((months - i) * 1.3) + 1) * 0.015 * total;
    points.push({ month: monthLabel(d), value: Math.round(base + wave) });
  }

  return points;
}

