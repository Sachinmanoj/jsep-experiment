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
      "label":"sector"
    },
    { 
      "display":"Sub-Sector",
      "label":"subindustry"
    },
    { 
      "display":"Market Cap",
      "label":"mrktCapf"
    },
    { 
      "display":"Close Price",
      "label":"lastPrice"
    },
    { 
      "display":"1D Return",
      "label":"pr1d"
    },
    { 
      "display":"1W Return",
      "label":"pr1w"
    },
    { 
      "display":"1M Return",
      "label":"4wpct"
    },
    { 
      "display":"6M Return",
      "label":"26wpct"
    },
    { 
      "display":"1Y Return",
      "label":"52wpct"
    },
    { 
      "display":"1W Return vs Nifty",
      "label":"pr1wN"
    },
    { 
      "display":"1M Return vs Nifty",
      "label":"4wpctN"
    },
    { 
      "display":"6M Return vs Nifty",
      "label":"6mpctN"
    },
    { 
      "display":"1Y Return vs Nifty",
      "label":"12mpctN"
    },
    { 
      "display":"% Away From 52W High",
      "label":"52whd"
    },
    { 
      "display":"% Away From 52W Low",
      "label":"52wld"
    },
    { 
      "display":"Daily Volume",
      "label":"acVol"
    },
    { 
      "display":"1D Change in Volume",
      "label":"vol1dChPct"
    },
    { 
      "display":"1W Change in Volume",
      "label":"vol1wChPct"
    },
    { 
      "display":"1M Average Volume",
      "label":"vol1mAvg"
    },
    { 
      "display":"3M Average Volume",
      "label":"vol3mAvg"
    },
    { 
      "display":"Return on Equity",
      "label":"roe"
    },
    { 
      "display":"5Y Avg Return on Equity",
      "label":"5Yroe"
    },
    { 
      "display":"Return on Assets",
      "label":"rtnAsts"
    },
    { 
      "display":"5Y Avg Return on Assets",
      "label":"5YrtnAsts"
    },
    { 
      "display":"Net Profit Margin",
      "label":"pftMrg"
    },
    { 
      "display":"5Y Avg Net Profit Margin",
      "label":"5YpftMrg"
    },
    { 
      "display":"Return on Investment",
      "label":"aroi"
    },
    { 
      "display":"5Y Avg Return on Investment",
      "label":"5Yaroi"
    },
    { 
      "display":"Operating Profit Margin",
      "label":"aopm"
    },
    { 
      "display":"5Y Avg Op. Profit Margin",
      "label":"opmg"
    },
    { 
      "display":"Long Term Debt to Equity",
      "label":"ldbtEqt"
    },
    { 
      "display":"Debt to Equity",
      "label":"dbtEqt"
    },
    { 
      "display":"Quick Ratio",
      "label":"aqui"
    },
    { 
      "display":"Current Ratio",
      "label":"qcur"
    },
    { 
      "display":"Cash Conversion Cycle",
      "label":"ccnc"
    },
    { 
      "display":"Interest Coverage Ratio",
      "label":"aint"
    },
    { 
      "display":"1Y Forward Revenue Growth",
      "label":"estrvng"
    },
    { 
      "display":"1Y Historical Revenue Growth",
      "label":"rvng"
    },
    { 
      "display":"5Y Historical Revenue Growth",
      "label":"5YrevChg"
    },
    { 
      "display":"1Y Forward EBITDA Growth",
      "label":"estAvg"
    },
    { 
      "display":"1Y Historical EBITDA Growth",
      "label":"ebitg"
    },
    { 
      "display":"5Y Historical EBITDA Growth",
      "label":"earnings"
    },
    { 
      "display":"1Y Forward EPS Growth",
      "label":"12mEpsg"
    },
    { 
      "display":"1Y Historical EPS Growth",
      "label":"epsg"
    },
    { 
      "display":"5Y Historical EPS Growth",
      "label":"epsGwth"
    },
    { 
      "display":"1Y Fwd Op. Cash Flow Growth",
      "label":"ecfog"
    },
    { 
      "display":"1Y Hist Op. Cash Flow Growth",
      "label":"cfog"
    },
    { 
      "display":"5Y Hist Op. Cash Flow Growth",
      "label":"cfotr"
    },
    { 
      "display":"3Y Historical Dividend Growth",
      "label":"3YdivGwth"
    },
    { 
      "display":"PE Ratio",
      "label":"apef"
    },
    { 
      "display":"Forward PE Ratio",
      "label":"pef"
    },
    { 
      "display":"PE Premium vs Sector",
      "label":"ped"
    },
    { 
      "display":"PB Ratio",
      "label":"pbr"
    },
    { 
      "display":"PB Premium vs Sector",
      "label":"pbd"
    },
    { 
      "display":"Dividend Yield",
      "label":"divDps"
    },
    { 
      "display":"Dividend Yield vs Sector",
      "label":"divSec"
    },
    { 
      "display":"PS Ratio",
      "label":"ps"
    },
    { 
      "display":"Forward PS Ratio",
      "label":"psf"
    },
    { 
      "display":"PS Premium vs Sector",
      "label":"psfs"
    },
    { 
      "display":"EV/EBITDA Ratio",
      "label":"evebitd"
    },
    { 
      "display":"Percentage Buy Reco’s",
      "label":"breco"
    },
    { 
      "display":"Percentage Upside",
      "label":"upside"
    },
    { 
      "display":"Institutional Ownership",
      "label":"instown"
    },
    { 
      "display":"Instt. Ownership Change – 3M",
      "label":"instown3"
    },
    { 
      "display":"Strategic Ownership",
      "label":"strown"
    },
    { 
      "display":"Strat. Ownership Change – 3M",
      "label":"strown3"
    },
    { 
      "display":"Value Momentum Rank",
      "label":"valr"
    },
    { 
      "display":"Price Momentum Rank",
      "label":"prmr"
    },
    { 
      "display":"Earnings Quality Rank",
      "label":"erqr"
    },
    { 
      "display":"Price to Intrinsic Value Rank",
      "label":"ptir"
    },
    { 
      "display":"Fundamental Score",
      "label":"fundamental"
    },
    { 
      "display":"Fair Value",
      "label":"fair"
    },
    { 
      "display":"Future Close Price",
      "label":"ftcp"
    },
    { 
      "display":"Lot Size",
      "label":"ftls"
    },
    { 
      "display":"Future Open Interest",
      "label":"ftoi"
    },
    { 
      "display":"1D Change in Future OI",
      "label":"1Dfoi"
    },
    { 
      "display":"1W Change in Future OI",
      "label":"1Wfoi"
    },
    { 
      "display":"Future Volume",
      "label":"ftvol"
    },
    { 
      "display":"1D Change in Future Volume",
      "label":"1Dvol"
    },
    { 
      "display":"1W Change in Future Volume",
      "label":"1Wvol"
    },
    { 
      "display":"Basis",
      "label":"ftbas"
    },
    { 
      "display":"Fair Value Spread",
      "label":"fairsp"
    },
    { 
      "display":"Cash & Carry Profit",
      "label":"ccrp"
    },
    { 
      "display":"Rollover Cost",
      "label":"rolc"
    },
    { 
      "display":"Percentage Rollover",
      "label":"rolp"
    },
    { 
      "display":"Calendar Spread",
      "label":"csprd"
    },
    { 
      "display":"Call Open Interest",
      "label":"opcoi"
    },
    { 
      "display":"Put Open Interest",
      "label":"oppoi"
    },
    { 
      "display":"1 D Change in Call OI",
      "label":"1Dcoi"
    },
    { 
      "display":"1D Change in Put OI",
      "label":"1DPoi"
    },
    { 
      "display":"1W Change in Call OI",
      "label":"1Wcoi"
    },
    { 
      "display":"1W Change in Put OI",
      "label":"1Wpoi"
    },
    { 
      "display":"Highest Call OI Strike",
      "label":"chstr"
    },
    { 
      "display":"Highest Put OI Strike",
      "label":"phstr"
    },
    { 
      "display":"Highest 1D OI Change CE Strike",
      "label":"1Dceoi"
    },
    { 
      "display":"Highest 1D OI Change PE Strike",
      "label":"1Dpeoi"
    },
    { 
      "display":"Highest 1W OI Change CE Strike",
      "label":"1Wceoi"
    },
    { 
      "display":"Highest 1W OI Change PE Strike",
      "label":"1Wpeoi"
    },
    { 
      "display":"Put Call Ratio",
      "label":"putcall"
    },
    { 
      "display":"VWAP",
      "label":"vWAP"
    },
    { 
      "display":"% Price above 1M SMA",
      "label":"pab1Mma"
    },
    { 
      "display":"% Price above 1Y SMA",
      "label":"pab12Mma"
    },
    { 
      "display":"% Price above 1M EMA",
      "label":"prAvMonthEVA"
    },
    { 
      "display":"Beta",
      "label":"beta"
    },
    { 
      "display":"Sharpe Ratio",
      "label":"3Ywsh"
    },
    { 
      "display":"Alpha",
      "label":"3Ywal"
    },
    { 
      "display":"Relative Volume",
      "label":"relVol"
    },
    { 
      "display":"Volatility",
      "label":"12mVol"
    },
    { 
      "display":"Volatility vs Nifty",
      "label":"12mVolN"
    },
    { 
      "display":"RSI – 14D",
      "label":"14dRsi"
    },
    { 
      "display":"RSI Exponential – 14D",
      "label":"14ersi"
    },
    { 
      "display":"ADX Rating – Trend Strength",
      "label":"14adx"
    },
    { 
      "display":"MACD Line 1 – Trend Indicator",
      "label":"1mac"
    },
    { 
      "display":"MACD Line 2 – Signal Line Comp",
      "label":"2mac"
    },
    { 
      "display":"% From Upper Bollinger Band",
      "label":"priceUBB"
    },
    { 
      "display":"% From Lower Bollinger Band",
      "label":"priceLBB"
    },
    { 
      "display":"% From Parabolic SAR",
      "label":"parabolSAR"
    },
    { 
      "display":"William %R",
      "label":"williamR"
    },
    { 
      "display":"Stochastic %K",
      "label":"stochasticK"
    },
    { 
      "display":"Stochastic %D",
      "label":"stochasticD"
    },
    { 
      "display":"1W Change in On Balance Volume",
      "label":"percentChangeObv"
    },
    { 
      "display":"1W Change in AD Line",
      "label":"percentChangeADL"
    },
    { 
      "display":"Super Trend",
      "label":"superTrend"
    }
  ],
  customfilterSyntax: {
    'number': /\b0x[\da-f]+\b|(?!\b\d+w|\b\d+W|\b\d+d|\b\d+D|\b\d+m|\b\d+M|\b\d+y|\b\d+Y)(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
    'operator': /-|\+|\*|\//,
    'punctuation': /[[\]()]/,
  }
}

module.exports = Object.freeze(constant);
