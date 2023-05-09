const getColorForPriceChange = (priceStatus) => {
    switch(priceStatus) {
      case 1: return 'green'
      case -1: return 'red'
      case 0: return ''
    }
}

const formatPriceShort = (price) => 
    Intl.NumberFormat('en-US', {
        notation: "compact",
        maximumSignificantDigits: 4,
        maximumFractionDigits: 2,
        style: 'currency', 
        currency: 'USD'
    }).format(price)

const formatNumber = (number) => 
    Intl.NumberFormat('en-US', {        
        maximumSignificantDigits: 8,
    }).format(number)

const formatPercent = (percent) => 
    Intl.NumberFormat('en-US', {
        notation: "compact",
        maximumFractionDigits: 2,
        signDisplay: "exceptZero"
    }).format(percent) + '%'
    

export { getColorForPriceChange, formatPriceShort, formatPercent, formatNumber }
