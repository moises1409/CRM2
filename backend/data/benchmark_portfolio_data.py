from .portfolio import Portfolio, Weight_AssetBreakdown, Position, Weight_Currency, Weight_Industry, Performance_AssetBreakdown

benchmark_data = Portfolio(
    id=2,
    portfolioNumber="BENCH-001",
    valuation=950_000,
    currency="USD",
    performance=0.1,
    historicalPerformance=[3.5, 2.7, 1.2, -0.2, 0.1],
    weight_assets_breakdown=[
        Weight_AssetBreakdown(asset_class="Cash", percentage=0),
        Weight_AssetBreakdown(asset_class="Bonds", percentage=32),
        Weight_AssetBreakdown(asset_class="Equities", percentage=47),
        Weight_AssetBreakdown(asset_class="Commodities", percentage=2),
        Weight_AssetBreakdown(asset_class="Hedge Fund", percentage=10),
        Weight_AssetBreakdown(asset_class="Real Estate", percentage=9),
    ],
    weight_currency_breakdown= [
        Weight_Currency(currency="USD", percentage=50),
        Weight_Currency(currency="EUR", percentage=10),
        Weight_Currency(currency="CHF", percentage=40),
    ],
    performance_assets_breakdown=[
        Performance_AssetBreakdown(asset_class="Cash", percentage=0),      
        Performance_AssetBreakdown(asset_class="Bonds", percentage=0.3),
        Performance_AssetBreakdown(asset_class="Equities", percentage=0.5),
        Performance_AssetBreakdown(asset_class="Commodities", percentage=0.3),
        Performance_AssetBreakdown(asset_class="Hedge Fund", percentage=-1.5),
        Performance_AssetBreakdown(asset_class="Real Estate", percentage=0.4),
    ]
)


