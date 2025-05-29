from .portfolio import Portfolio, Weight_AssetBreakdown, Position, Weight_Currency, Weight_Industry, Performance_AssetBreakdown

portfolio_data = Portfolio(
    id=1,
    portfolioNumber="123456",
    valuation=1_000_000,
    currency="CHF",
    performance=3.5,
    historicalPerformance=[2.2, 1.8, 0.5, -2, 3.5],
    weight_assets_breakdown=[
        Weight_AssetBreakdown(asset_class="Cash", percentage=1),
        Weight_AssetBreakdown(asset_class="Bonds", percentage=29),
        Weight_AssetBreakdown(asset_class="Equities", percentage=50),
        Weight_AssetBreakdown(asset_class="Commodities", percentage=3),
        Weight_AssetBreakdown(asset_class="Hedge Fund", percentage=0),
        Weight_AssetBreakdown(asset_class="Real Estate", percentage=17),
    ],
    weight_industry_breakdown= [
        Weight_Industry(industry="Energy", percentage=0),
        Weight_Industry(industry="Materials", percentage=4),
        Weight_Industry(industry="Industry", percentage=6),
        Weight_Industry(industry="HealthCare", percentage=70),
        Weight_Industry(industry="Technology", percentage=2),
        Weight_Industry(industry="Services", percentage=8),
        Weight_Industry(industry="Others", percentage=10)   
    ],
    weight_currency_breakdown= [
        Weight_Currency(currency="USD", percentage=6),
        Weight_Currency(currency="EUR", percentage=4),
        Weight_Currency(currency="CHF", percentage=90),
    ],
    performance_assets_breakdown=[
        Performance_AssetBreakdown(asset_class="Cash", percentage=-1),      
        Performance_AssetBreakdown(asset_class="Bonds", percentage=0.3),
        Performance_AssetBreakdown(asset_class="Equities", percentage=3),
        Performance_AssetBreakdown(asset_class="Commodities", percentage=0.2),
        Performance_AssetBreakdown(asset_class="Hedge Fund", percentage=0),
        Performance_AssetBreakdown(asset_class="Real Estate", percentage=1),
    ],
    positions= [
        Position(
            name="Apple Inc.",
            ticker="AAPL",
            asset_class = "Equities",
            industry = "Healthcare",
            currency = "CHF",
            marketValue=200_000,
            percentOfPortfolio=20,
            performance=12,
            trend="up",
            currentPrice=150.00,
            targetPrice=160.00,
            proximity=0.05,
            recommendation="Sell",
            selected_to_sell=False
        ),
        Position(
            name="Microsoft Corp.",
            ticker="MSFT",
            asset_class = "Equities",
            industry = "Healthcare",
            currency = "CHF",
            marketValue=150_000,
            percentOfPortfolio=15,
            performance=10,
            trend="up",
            currentPrice=300.00,
            targetPrice=310.00,
            proximity=0.03,
            recommendation="Hold",
            selected_to_sell=False,
        ),
    ]

)