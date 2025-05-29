export interface Positions {
    name: string;
    ticker: string;
    asset_class: string;
    industry: string;
    currency: string;
    marketValue: number;
    percentOfPortfolio: number;
    performance: number;
    trend: 'up' | 'down';
    currentPrice: number;
    targetPrice: number;
    proximity: number;
    recommendation: string;
    selection?: boolean;
}