// Financial calculation utilities for 1CR Club

// Format as Indian Rupee
export function formatRupee(amount: number): string {
    if (isNaN(amount) || !isFinite(amount)) return "₹0";
    const absAmount = Math.abs(amount);
    let formatted: string;

    if (absAmount >= 10000000) {
        formatted = (absAmount / 10000000).toFixed(2) + " Cr";
    } else if (absAmount >= 100000) {
        formatted = (absAmount / 100000).toFixed(2) + " L";
    } else {
        formatted = absAmount.toLocaleString("en-IN");
    }

    return (amount < 0 ? "-₹" : "₹") + formatted;
}

// EMI Calculator
export function calculateEMI(
    principal: number,
    annualRate: number,
    tenureMonths: number
): number {
    const r = annualRate / 12 / 100;
    if (r === 0) return principal / tenureMonths;
    return (
        (principal * r * Math.pow(1 + r, tenureMonths)) /
        (Math.pow(1 + r, tenureMonths) - 1)
    );
}

// SIP Future Value
export function calculateSIP(
    monthly: number,
    annualReturn: number,
    years: number
): number {
    const r = annualReturn / 12 / 100;
    const n = years * 12;
    if (r === 0) return monthly * n;
    return monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
}

// Lumpsum Future Value
export function calculateLumpsum(
    principal: number,
    annualReturn: number,
    years: number
): number {
    return principal * Math.pow(1 + annualReturn / 100, years);
}

// Future Value with Inflation
export function calculateFutureValue(
    amount: number,
    inflationRate: number,
    years: number
): number {
    return amount * Math.pow(1 + inflationRate / 100, years);
}

// Amortization schedule
export function generateAmortizationSchedule(
    principal: number,
    annualRate: number,
    tenureMonths: number
): { month: number; emi: number; principal: number; interest: number; balance: number }[] {
    const emi = calculateEMI(principal, annualRate, tenureMonths);
    const r = annualRate / 12 / 100;
    let balance = principal;
    const schedule = [];

    for (let month = 1; month <= tenureMonths && balance > 0; month++) {
        const interest = balance * r;
        const principalPaid = emi - interest;
        balance = Math.max(0, balance - principalPaid);
        schedule.push({
            month,
            emi,
            principal: principalPaid,
            interest,
            balance,
        });
    }
    return schedule;
}

// Debt Payoff (Avalanche)
export function calculateAvalanchePayoff(
    debt: number,
    rate: number,
    monthlyPayment: number
): { months: number; totalInterest: number } {
    let balance = debt;
    let months = 0;
    let totalInterest = 0;
    const monthlyRate = rate / 12 / 100;

    while (balance > 0 && months < 600) {
        const interest = balance * monthlyRate;
        totalInterest += interest;
        balance = balance + interest - monthlyPayment;
        if (balance < 0) balance = 0;
        months++;
    }
    return { months, totalInterest };
}

export interface FinancialData {
    hasInsurance: boolean;
    hasEmergencyFund: boolean;
    debtToIncomeRatio: number;
    hasGoals: boolean;
    portfolioValue: number;
}

// Health Score (0-100)
export function calculateHealthScore(data: FinancialData): number {
    let score = 0;
    if (data.hasInsurance) score += 20;
    if (data.hasEmergencyFund) score += 20;
    if (data.debtToIncomeRatio < 0.3) score += 20;
    if (data.hasGoals) score += 20;
    if (data.portfolioValue > 0) score += 20;
    return score;
}

export function getScoreLabel(score: number): string {
    if (score <= 40) return "Needs Attention";
    if (score <= 70) return "Building Momentum";
    return "Financially Fit";
}

export function getScoreColor(score: number): string {
    if (score <= 40) return "#ef4444";
    if (score <= 70) return "#f4a261";
    return "#2d6a4f";
}

export function getScoreBg(score: number): string {
    if (score <= 40) return "var(--score-low-bg)";
    if (score <= 70) return "var(--score-mid-bg)";
    return "var(--score-high-bg)";
}
