const constant = {
  allowedExpressionTypes: [
    "BinaryExpression",
    "Identifier",
    "Literal",
  ],
  separtors: ['(', ')', '[', ']', '+', '-', '*', '/', ' '],
  allowedBinaryExpression: {
    "+": {
      precedence: 9,
    },
    "-": {
      precedence: 9,
    },
    "*": {
      precedence: 10,
    },
    "/": {
      precedence: 10,
    }
  },
  filters: [
    "Sector",
    "Sub-Sector",
    "Market Cap",
    "Close Price",
    "1D Return",
    "1W Return",
    "1M Return",
    "6M Return",
    "1Y Return",
    "1W Return vs Nifty",
    "1M Return vs Nifty",
    "6M Return vs Nifty",
    "1Y Return vs Nifty",
    "% Away From 52W High",
    "% Away From 52W Low",
    "Daily Volume",
    "1D Change in Volume",
    "1W Change in Volume",
    "1M Average Volume",
    "3M Average Volume",
    "Return on Equity",
    "5Y Avg Return on Equity",
    "Return on Assets",
    "5Y Avg Return on Assets",
    "Net Profit Margin",
    "5Y Avg Net Profit Margin",
    "Return on Investment",
    "5Y Avg Return on Investment",
    "Operating Profit Margin",
    "5Y Avg Op. Profit Margin",
    "Long Term Debt to Equity",
    "Debt to Equity",
    "Quick Ratio",
    "Current Ratio",
    "Cash Conversion Cycle",
    "Interest Coverage Ratio",
    "1Y Forward Revenue Growth",
    "1Y Historical Revenue Growth",
    "5Y Historical Revenue Growth",
    "1Y Forward EBITDA Growth",
    "1Y Historical EBITDA Growth",
    "5Y Historical EBITDA Growth",
    "1Y Forward EPS Growth",
    "1Y Historical EPS Growth",
    "5Y Historical EPS Growth",
    "1Y Fwd Op. Cash Flow Growth",
    "1Y Hist Op. Cash Flow Growth",
    "5Y Hist Op. Cash Flow Growth",
    "3Y Historical Dividend Growth",
    "PE Ratio",
    "Forward PE Ratio",
    "PE Premium vs Sector",
    "PB Ratio",
    "PB Premium vs Sector",
    "Dividend Yield",
    "Dividend Yield vs Sector",
    "PS Ratio",
    "Forward PS Ratio",
    "PS Premium vs Sector",
    "EV/EBITDA Ratio",
    "Percentage Buy Reco’s",
    "Percentage Upside",
    "Institutional Ownership",
    "Instt. Ownership Change – 3M",
    "Strategic Ownership",
    "Strat. Ownership Change – 3M",
    "Value Momentum Rank",
    "Price Momentum Rank",
    "Earnings Quality Rank",
    "Price to Intrinsic Value Rank",
    "Fundamental Score",
    "Future Close Price",
    "Lot Size",
    "Future Open Interest",
    "1D Change in Future OI",
    "1W Change in Future OI",
    "Future Volume",
    "1D Change in Future Volume",
    "1W Change in Future Volume",
    "Basis",
    "Fair Value Spread",
    "Fair Value",
    "Cash & Carry Profit",
    "Rollover Cost",
    "Percentage Rollover",
    "Calendar Spread",
    "Call Open Interest",
    "Put Open Interest",
    "1 D Change in Call OI",
    "1D Change in Put OI",
    "1W Change in Call OI",
    "1W Change in Put OI",
    "Highest Call OI Strike",
    "Highest Put OI Strike",
    "Highest 1D OI Change CE Strike",
    "Highest 1D OI Change PE Strike",
    "Highest 1W OI Change CE Strike",
    "Highest 1W OI Change PE Strike",
    "Put Call Ratio",
    "VWAP",
    "% Price above 1M SMA",
    "% Price above 1Y SMA",
    "% Price above 1M EMA",
    "Beta",
    "Sharpe Ratio",
    "Alpha",
    "Relative Volume",
    "Volatility",
    "Volatility vs Nifty",
    "RSI – 14D",
    "RSI Exponential – 14D",
    "ADX Rating – Trend Strength",
    "MACD Line 1 – Trend Indicator",
    "MACD Line 2 – Signal Line Comp",
    "% From Upper Bollinger Band",
    "% From Lower Bollinger Band",
    "% From Parabolic SAR",
    "William %R",
    "Stochastic %K",
    "Stochastic %D",
    "1W Change in On Balance Volume",
    "1W Change in AD Line",
    "Super Trend"
  ],
  customfilterSyntax: {
    'number': /\b0x[\da-f]+\b|(?!\b\d+w|\b\d+W|\b\d+d|\b\d+D|\b\d+m|\b\d+M|\b\d+y|\b\d+Y)(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
    'operator': /-|\+|\*|\//,
    'punctuation': /[[\]()]/,
  }
}

module.exports = Object.freeze(constant);
