const constant = {
  allowedExpressionTypes: [
    "BinaryExpression",
    // "Identifier",
    "Literal",
  ],
  separtors: ['(', ')', '[', ']', '+', '-', '*', '/', ' ', '\n'],
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
    {
      "display":"Sector",
      "label":"sector",
      "def":null
    },
    {
      "display":"Sub-Sector",
      "label":"subindustry",
      "def":null
    },
    {
      "display":"Market Cap",
      "label":"mrktCapf",
      "def":null
    },
    {
      "display":"Close Price",
      "label":"lastPrice",
      "def":"This is the close price from the day stock last traded"
    },
    {
      "display":"1D Return",
      "label":"pr1d",
      "def":"This is the percentage change in the company's stock price over the previous day"
    },
    {
      "display":"1W Return",
      "label":"pr1w",
      "def":"This is the percentage change in the company's stock price over the previous week"
    },
    {
      "display":"1M Return",
      "label":"4wpct",
      "def":"This is the percentage change in the company's stock price over the previous 4 weeks"
    },
    {
      "display":"6M Return",
      "label":"26wpct",
      "def":"This is the percentage change in the company's stock price over the previous 26 weeks"
    },
    {
      "display":"1Y Return",
      "label":"52wpct",
      "def":"This is the percentage change in the company's stock price over the previous 52 weeks"
    },
    {
      "display":"1W Return vs Nifty",
      "label":"pr1wN",
      "def":"% change in the company's stock price minus % change in the Nifty over the previous week"
    },
    {
      "display":"1M Return vs Nifty",
      "label":"4wpctN",
      "def":"% change in the company's stock price minus % change in the Nifty over the previous 4 weeks"
    },
    {
      "display":"6M Return vs Nifty",
      "label":"6mpctN",
      "def":"% change in the company's stock price minus % change in the Nifty over the previous 26 weeks"
    },
    {
      "display":"1Y Return vs Nifty",
      "label":"12mpctN",
      "def":"% change in the company's stock price minus % change in the Nifty over the previous 52 weeks"
    },
    {
      "display":"% Away From 52W High",
      "label":"52whd",
      "def":"52W high price divided by the close price minus one"
    },
    {
      "display":"% Away From 52W Low",
      "label":"52wld",
      "def":"Close price divided by the 52W low price minus one"
    },
    {
      "display":"Daily Volume",
      "label":"acVol",
      "def":"This is the traded volume from the day stock last traded"
    },
    {
      "display":"1D Change in Volume",
      "label":"vol1dChPct",
      "def":"This is the percentage change in stocks volume over the previous day"
    },
    {
      "display":"1W Change in Volume",
      "label":"vol1wChPct",
      "def":"This is the percentage change in stock's volume over the previous week"
    },
    {
      "display":"1M Average Volume",
      "label":"vol1mAvg",
      "def":"This is the average of stocks traded volume over the past 4 weeks"
    },
    {
      "display":"3M Average Volume",
      "label":"vol3mAvg",
      "def":"This is the average of stocks traded volume over the past 13 weeks"
    },
    {
      "display":"Return on Equity",
      "label":"roe",
      "def":"Net income divided by the average common equity for the most recent financial year"
    },
    {
      "display":"5Y Avg Return on Equity",
      "label":"5Yroe",
      "def":"Average of annual return on equity for the five most recent financial years"
    },
    {
      "display":"Return on Assets",
      "label":"rtnAsts",
      "def":"Net income divided by the average total assets for the most recent financial year"
    },
    {
      "display":"5Y Avg Return on Assets",
      "label":"5YrtnAsts",
      "def":"Average of annual return on assets for the five most recent financial years"
    },
    {
      "display":"Net Profit Margin",
      "label":"pftMrg",
      "def":"Net income divided by the revenue earned for the most recent financial year "
    },
    {
      "display":"5Y Avg Net Profit Margin",
      "label":"5YpftMrg",
      "def":"Average of annual net profit margin for the five most recent financial years"
    },
    {
      "display":"Return on Investment",
      "label":"aroi",
      "def":"Net income divided by the avg of long term debt, other long term liabilities and shareholder equity"
    },
    {
      "display":"5Y Avg Return on Investment",
      "label":"5Yaroi",
      "def":"Average of annual return on investment for the five most recent financial years"
    },
    {
      "display":"Operating Profit Margin",
      "label":"aopm",
      "def":"Annual operating income divided by annual total revenue, multiplied by 100"
    },
    {
      "display":"5Y Avg Op. Profit Margin",
      "label":"opmg",
      "def":"Average of annual operating profit margin for the five most recent financial years"
    },
    {
      "display":"Long Term Debt to Equity",
      "label":"ldbtEqt",
      "def":"Total long term debt divided by the total shareholder equity"
    },
    {
      "display":"Debt to Equity",
      "label":"dbtEqt",
      "def":"Total debt divided by the total shareholder equity"
    },
    {
      "display":"Quick Ratio",
      "label":"aqui",
      "def":"Total current assets minus total inventory divided by the total current liabilities"
    },
    {
      "display":"Current Ratio",
      "label":"qcur",
      "def":"Total current assets divided by the total current liabilities"
    },
    {
      "display":"Cash Conversion Cycle",
      "label":"ccnc",
      "def":"Sum of the avg inventory days & avg receivables collection days minus avg payable payment period"
    },
    {
      "display":"Interest Coverage Ratio",
      "label":"aint",
      "def":"Ratio of earnings before interest and taxes divided by the interest expense"
    },
    {
      "display":"1Y Forward Revenue Growth",
      "label":"estrvng",
      "def":"Estimated revenue for the current fiscal year divided by the revenue for last fiscal year minus one"
    },
    {
      "display":"1Y Historical Revenue Growth",
      "label":"rvng",
      "def":"Revenue for the last fiscal year divided by the revenue for the year before that minus one"
    },
    {
      "display":"5Y Historical Revenue Growth",
      "label":"5YrevChg",
      "def":"The annual compounded growth rate of revenue over the last 5 years"
    },
    {
      "display":"1Y Forward EBITDA Growth",
      "label":"estAvg",
      "def":"Estimated EBITDA for the current fiscal year divided by the EBITDA for last fiscal year minus one"
    },
    {
      "display":"1Y Historical EBITDA Growth",
      "label":"ebitg",
      "def":"EBITDA for the current fiscal year divided by the EBITDA for the year before that minus one"
    },
    {
      "display":"5Y Historical EBITDA Growth",
      "label":"earnings",
      "def":"The annual compounded growth rate of EBITDA over the last 5 years"
    },
    {
      "display":"1Y Forward EPS Growth",
      "label":"12mEpsg",
      "def":"Estimated EPS for the current fiscal year divided by the EPS for last fiscal year minus one"
    },
    {
      "display":"1Y Historical EPS Growth",
      "label":"epsg",
      "def":"EPS for the last fiscal year divided by the EPS for the year before that minus one"
    },
    {
      "display":"5Y Historical EPS Growth",
      "label":"epsGwth",
      "def":"The annual compounded growth rate of EPS, excluding extraordinary items,  over the last 5 years"
    },
    {
      "display":"1Y Fwd Op. Cash Flow Growth",
      "label":"ecfog",
      "def":"Estimated CFO for the current fiscal year divided by the CFO for last fiscal year minus one"
    },
    {
      "display":"1Y Hist Op. Cash Flow Growth",
      "label":"cfog",
      "def":"Actual CFO for the last fiscal year divided by the actual CFO for the fiscal year before, minus one"
    },
    {
      "display":"5Y Hist Op. Cash Flow Growth",
      "label":"cfotr",
      "def":"The annual compounded growth rate of CFO, excluding extraordinary items,  over the last 5 years"
    },
    {
      "display":"3Y Historical Dividend Growth",
      "label":"3YdivGwth",
      "def":"Compound annual growth rate in dividends per share calculated for 3 years"
    },
    {
      "display":"PE Ratio",
      "label":"apef",
      "def":"Close price divided by the earnings per share, excluding extraordinary items"
    },
    {
      "display":"Forward PE Ratio",
      "label":"pef",
      "def":"Close price divided by Estimated EPS for current fiscal year"
    },
    {
      "display":"PE Premium vs Sector",
      "label":"ped",
      "def":"Stock PE ratio dividend by the corresponding sector PE ratio minus one"
    },
    {
      "display":"PB Ratio",
      "label":"pbr",
      "def":"Close price divided by the book value per share at the end of the most recent financial year"
    },
    {
      "display":"PB Premium vs Sector",
      "label":"pbd",
      "def":"Stock PB ratio dividend by the corresponding sector PB ratio minus one"
    },
    {
      "display":"Dividend Yield",
      "label":"divDps",
      "def":"Dividend Per Share for the most recent financial year divided by the close price"
    },
    {
      "display":"Dividend Yield vs Sector",
      "label":"divSec",
      "def":"Difference between the dividend yield of company and the corresponding sector"
    },
    {
      "display":"PS Ratio",
      "label":"ps",
      "def":"Close price divided by revenue for the most recent fiscal year"
    },
    {
      "display":"Forward PS Ratio",
      "label":"psf",
      "def":"Close price divided by Estimated revenue for the current fiscal year"
    },
    {
      "display":"PS Premium vs Sector",
      "label":"psfs",
      "def":"Stock PS ratio dividend by the corresponding sector PS ratio minus one"
    },
    {
      "display":"EV/EBITDA Ratio",
      "label":"evebitd",
      "def":"Enterprise value divided by the EBITDA for the last fiscal"
    },
    {
      "display":"Percentage Buy Reco’s",
      "label":"breco",
      "def":"Sum of analysts having a strong buy/buy rating divided by the total number of analysts"
    },
    {
      "display":"Percentage Upside",
      "label":"upside",
      "def":"Target price estimate for the stock divided by the close price minus one"
    },
    {
      "display":"Institutional Ownership",
      "label":"instown",
      "def":"Sum of shares held by institutions like MFs divided by the total shares outstanding"
    },
    {
      "display":"Instt. Ownership Change – 3M",
      "label":"instown3",
      "def":"Percentage change in Institutional ownership of the stock in last three months"
    },
    {
      "display":"Strategic Ownership",
      "label":"strown",
      "def":"Sum of shares held by all strategic entities in the stock divided by the total shares outstanding"
    },
    {
      "display":"Strat. Ownership Change – 3M",
      "label":"strown3",
      "def":"Percentage change in strategic ownership of the stock in last three months"
    },
    {
      "display":"Value Momentum Rank",
      "label":"valr",
      "def":"Percentile rank of the stock, based on the price momentum as well as valuation characteristics"
    },
    {
      "display":"Price Momentum Rank",
      "label":"prmr",
      "def":"Percentile rank of the stock, based on the price momentum characteristics"
    },
    {
      "display":"Earnings Quality Rank",
      "label":"erqr",
      "def":"Earnings quality rank of the stock vs all the other stocks listed on NSE"
    },
    {
      "display":"Price to Intrinsic Value Rank",
      "label":"ptir",
      "def":"Percentile rank of the stock, calculated based on the price to intrinsic value ratio"
    },
    {
      "display":"Fundamental Score",
      "label":"fundamental",
      "def":"Rank of the stock vs all others in the sector, based on different fundamental criteria"
    },
    {
      "display":"Fair Value",
      "label":"fair",
      "def":"Fair value of the stock future contract calculated using expected dividends and discount rate"
    },
    {
      "display":"Future Close Price",
      "label":"ftcp",
      "def":"Future contract close price from the day the stock future contract was last traded"
    },
    {
      "display":"Lot Size",
      "label":"ftls",
      "def":"Minimum number of stock future/option contracts that can be purchased in one transaction"
    },
    {
      "display":"Future Open Interest",
      "label":"ftoi",
      "def":"Current month stock future contract open interest from the day stock future contract last traded"
    },
    {
      "display":"1D Change in Future OI",
      "label":"1Dfoi",
      "def":"Percentage change in current month stock future contract open interest in last 1 day"
    },
    {
      "display":"1W Change in Future OI",
      "label":"1Wfoi",
      "def":"Percentage change in current month stock future contract open interest in last 1 week"
    },
    {
      "display":"Future Volume",
      "label":"ftvol",
      "def":"Current month stock future contract Volume from the day stock future contract last traded"
    },
    {
      "display":"1D Change in Future Volume",
      "label":"1Dvol",
      "def":"Percentage change in current month stock future contract volume in last 1 day"
    },
    {
      "display":"1W Change in Future Volume",
      "label":"1Wvol",
      "def":"Percentage change in current month stock future contract volume in last 1 week"
    },
    {
      "display":"Basis",
      "label":"ftbas",
      "def":"Difference betweeen the price of the future contract and stock price in cash"
    },
    {
      "display":"Fair Value Spread",
      "label":"fairsp",
      "def":"Difference between the last close price and fair value of the stock future contract"
    },
    {
      "display":"Cash & Carry Profit",
      "label":"ccrp",
      "def":"Profit that can be made by entering into a cash and carry arbitrage position"
    },
    {
      "display":"Rollover Cost",
      "label":"rolc",
      "def":"Difference between the next and current month future price divided by the current month future price"
    },
    {
      "display":"Percentage Rollover",
      "label":"rolp",
      "def":"An indication of how many current month futures contract have been rolled over to next month"
    },
    {
      "display":"Calendar Spread",
      "label":"csprd",
      "def":"Next month future contract close price minus current month future contract close price"
    },
    {
      "display":"Call Open Interest",
      "label":"opcoi",
      "def":"Sum of open interests of stock call option contracts for all the strikes"
    },
    {
      "display":"Put Open Interest",
      "label":"oppoi",
      "def":"Sum of open interests of stock put option contracts for all the strikes"
    },
    {
      "display":"1 D Change in Call OI",
      "label":"1Dcoi",
      "def":"Percentage change in stock call option open interest in last 1 day"
    },
    {
      "display":"1D Change in Put OI",
      "label":"1DPoi",
      "def":"Percentage change in stock put option open interest in last 1 day"
    },
    {
      "display":"1W Change in Call OI",
      "label":"1Wcoi",
      "def":"Percentage change in stock call option open interest in last 1 week"
    },
    {
      "display":"1W Change in Put OI",
      "label":"1Wpoi",
      "def":"Percentage change in stock put option open interest in last 1 week"
    },
    {
      "display":"Highest Call OI Strike",
      "label":"chstr",
      "def":"Strike price of the stock call option with the highest open interest"
    },
    {
      "display":"Highest Put OI Strike",
      "label":"phstr",
      "def":"Strike price of the stock put option with the highest open interest"
    },
    {
      "display":"Highest 1D OI Change CE Strike",
      "label":"1Dceoi",
      "def":"Strike price of the stock call option with the highest 1 day change in open interest"
    },
    {
      "display":"Highest 1D OI Change PE Strike",
      "label":"1Dpeoi",
      "def":"Strike price of the stock put option with the highest 1 day change in open interest"
    },
    {
      "display":"Highest 1W OI Change CE Strike",
      "label":"1Wceoi",
      "def":"Strike price of the stock call option with the highest 1 week change in open interest"
    },
    {
      "display":"Highest 1W OI Change PE Strike",
      "label":"1Wpeoi",
      "def":"Strike price of the stock put option with the highest 1 week change in open interest"
    },
    {
      "display":"Put Call Ratio",
      "label":"putcall",
      "def":"Total put open interest divided by the total call open interest"
    },
    {
      "display":"VWAP",
      "label":"vWAP",
      "def":"Volume weighted average price from the day stock last traded"
    },
    {
      "display":"% Price above 1M SMA",
      "label":"pab1Mma",
      "def":"Close price divided by the simple moving average of last 20 trading days price minus one"
    },
    {
      "display":"% Price above 1Y SMA",
      "label":"pab12Mma",
      "def":"Close price divided by the simple moving average of last 250 trading days price minus one"
    },
    {
      "display":"% Price above 1M EMA",
      "label":"prAvMonthEVA",
      "def":"Close price divided by the exponential moving average of last 22 trading days price minus one"
    },
    {
      "display":"Beta",
      "label":"beta",
      "def":"Beta is a measure of a company's stock price volatility relative to the market"
    },
    {
      "display":"Sharpe Ratio",
      "label":"3Ywsh",
      "def":"Measure of excess return per unit of risk, calculated using 104 weekly price close points"
    },
    {
      "display":"Alpha",
      "label":"3Ywal",
      "def":"Excess return of a stock relative to its benchmark, calculated using 104 weekly price close points"
    },
    {
      "display":"Relative Volume",
      "label":"relVol",
      "def":"10 days avg daily traded volume divided by the last 91 days avg daily traded volume"
    },
    {
      "display":"Volatility",
      "label":"12mVol",
      "def":"Annualised standard deviation of the daily price change for the 200 most recent trading days"
    },
    {
      "display":"Volatility vs Nifty",
      "label":"12mVolN",
      "def":"Annualised standard deviation of the stock minus annualized standard deviation of the Nifty"
    },
    {
      "display":"RSI – 14D",
      "label":"14dRsi",
      "def":"RSI measures the momentum of a stock to determine whether it is in overbought or oversold range"
    },
    {
      "display":"RSI Exponential – 14D",
      "label":"14ersi",
      "def":"Modified RSI based on exponential price averages, used to determine overbought & oversold zones"
    },
    {
      "display":"ADX Rating – Trend Strength",
      "label":"14adx",
      "def":"It indicates the strength of a trend, calculated as average between current and 14 days prior value"
    },
    {
      "display":"MACD Line 1 – Trend Indicator",
      "label":"1mac",
      "def":"It is trend indicator calculated using difference between 12 and 26 day exponential price average"
    },
    {
      "display":"MACD Line 2 – Signal Line Comp",
      "label":"2mac",
      "def":"Difference between moving average convergence divergence indicator and signal line"
    },
    {
      "display":"% From Upper Bollinger Band",
      "label":"priceUBB",
      "def":"Used to check richness in the price, calculated as close price / upper bollinger band - 1"
    },
    {
      "display":"% From Lower Bollinger Band",
      "label":"priceLBB",
      "def":"Used to check cheapness in the price, calculated as close price / lower bollinger band - 1"
    },
    {
      "display":"% From Parabolic SAR",
      "label":"parabolSAR",
      "def":"A trend indicator, calculates as close price divided by the parabolic SAR"
    },
    {
      "display":"William %R",
      "label":"williamR",
      "def":"Calculated using 14D lookback period, used to identify overbought/oversold zones"
    },
    {
      "display":"Stochastic %K",
      "label":"stochasticK",
      "def":"A momentum indicator used to identify overbought/oversold zones"
    },
    {
      "display":"Stochastic %D",
      "label":"stochasticD",
      "def":"3D simple moving average of %K used to identify overbought/oversold zones"
    },
    {
      "display":"1W Change in On Balance Volume",
      "label":"percentChangeObv",
      "def":"Percentage change in on balance voume in last 1 week"
    },
    {
      "display":"1W Change in AD Line",
      "label":"percentChangeADL",
      "def":"Percentage change in accumulation distribution line in last 1 week"
    },
    {
      "display":"Super Trend",
      "label":"superTrend",
      "def":"A trend following indicator used to generate buy/sell signals in trending market"
    }
  ],
  customfilterSyntax: {
    'number': /\b0x[\da-f]+\b|(?!\b\d+w|\b\d+W|\b\d+d|\b\d+D|\b\d+m|\b\d+M|\b\d+y|\b\d+Y)(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
    'operator': /-|\+|\*|\//,
    'punctuation': /[[\]()]/,
  }
}

module.exports = Object.freeze(constant);
