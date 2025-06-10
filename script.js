// Chart initialization
const chart = LightweightCharts.createChart(document.getElementById('chart'), {
    width: document.getElementById('chart').clientWidth,
    height: document.getElementById('chart').clientHeight,
    layout: {
        background: { color: '#1e222d' },
        textColor: '#ffffff',
    },
    grid: {
        vertLines: { color: '#2B2B43' },
        horzLines: { color: '#2B2B43' },
    },
    crosshair: {
        mode: LightweightCharts.CrosshairMode.Normal,
    },
    rightPriceScale: {
        borderColor: '#2B2B43',
    },
    timeScale: {
        borderColor: '#2B2B43',
    },
});

// Generate sample data
function generateData() {
    const data = [];
    const today = new Date();
    let time = today.getTime();
    let basePrice = 200;
    let lastClose = basePrice;

    for (let i = 0; i < 500; i++) {
        const open = lastClose + (Math.random() - 0.5) * 10;
        const high = open + Math.random() * 5;
        const low = open - Math.random() * 5;
        const close = (high + low) / 2;

        data.push({
            time: time / 1000,
            open: open,
            high: high,
            low: low,
            close: close,
        });

        lastClose = close;
        time -= 60000; // 1 minute back
    }

    return data.reverse();
}

// Create series
const candlestickSeries = chart.addCandlestickSeries({
    upColor: '#26a69a',
    downColor: '#ef5350',
    borderVisible: false,
    wickUpColor: '#26a69a',
    wickDownColor: '#ef5350',
});

// Add data
const data = generateData();
candlestickSeries.setData(data);

// Add Moving Average
function addMA(period) {
    const maData = data.map((d, i) => {
        if (i < period - 1) return { time: d.time };
        const sum = data.slice(i - period + 1, i + 1).reduce((acc, val) => acc + val.close, 0);
        return {
            time: d.time,
            value: sum / period,
        };
    });

    const maSeries = chart.addLineSeries({
        color: '#2962FF',
        lineWidth: 2,
    });
    maSeries.setData(maData);
    return maSeries;
}

// Add RSI
function addRSI(period) {
    const rsiData = [];
    let gains = [];
    let losses = [];

    // Calculate gains and losses
    for (let i = 1; i < data.length; i++) {
        const difference = data[i].close - data[i - 1].close;
        gains.push(difference > 0 ? difference : 0);
        losses.push(difference < 0 ? Math.abs(difference) : 0);

        if (i >= period) {
            const avgGain = gains.slice(-period).reduce((a, b) => a + b) / period;
            const avgLoss = losses.slice(-period).reduce((a, b) => a + b) / period;
            const rs = avgGain / avgLoss;
            const rsi = 100 - (100 / (1 + rs));

            rsiData.push({
                time: data[i].time,
                value: rsi,
            });
        }
    }

    const rsiSeries = chart.addLineSeries({
        color: '#ff9800',
        lineWidth: 2,
    });
    rsiSeries.setData(rsiData);
    return rsiSeries;
}

// Add MACD
function addMACD() {
    const fastPeriod = 12;
    const slowPeriod = 26;
    const signalPeriod = 9;
    const macdData = [];
    
    // Calculate EMAs
    const fastEMA = [];
    const slowEMA = [];
    const macdLine = [];
    const signalLine = [];

    data.forEach((d, i) => {
        if (i === 0) {
            fastEMA[i] = d.close;
            slowEMA[i] = d.close;
            return;
        }

        // Calculate EMAs
        const fastMultiplier = 2 / (fastPeriod + 1);
        const slowMultiplier = 2 / (slowPeriod + 1);
        
        fastEMA[i] = (d.close - fastEMA[i-1]) * fastMultiplier + fastEMA[i-1];
        slowEMA[i] = (d.close - slowEMA[i-1]) * slowMultiplier + slowEMA[i-1];

        if (i >= slowPeriod - 1) {
            const macd = fastEMA[i] - slowEMA[i];
            macdLine.push(macd);

            if (macdLine.length >= signalPeriod) {
                const signalMultiplier = 2 / (signalPeriod + 1);
                const signal = macdLine.slice(-signalPeriod).reduce((a, b) => a + b) / signalPeriod;
                
                macdData.push({
                    time: d.time,
                    value: macd - signal,
                });
            }
        }
    });

    const macdSeries = chart.addHistogramSeries({
        color: '#2962FF',
    });
    macdSeries.setData(macdData);
    return macdSeries;
}

// Event Listeners
let currentSeries = candlestickSeries;
let maSeries = null;
let rsiSeries = null;
let macdSeries = null;

document.getElementById('candlestick').addEventListener('click', () => {
    if (currentSeries) currentSeries.setData([]);
    currentSeries = candlestickSeries;
    currentSeries.setData(data);
});

document.getElementById('line').addEventListener('click', () => {
    const lineData = data.map(d => ({
        time: d.time,
        value: d.close,
    }));
    
    if (currentSeries) currentSeries.setData([]);
    currentSeries = chart.addLineSeries({
        color: '#2962FF',
        lineWidth: 2,
    });
    currentSeries.setData(lineData);
});

document.getElementById('area').addEventListener('click', () => {
    const areaData = data.map(d => ({
        time: d.time,
        value: d.close,
    }));
    
    if (currentSeries) currentSeries.setData([]);
    currentSeries = chart.addAreaSeries({
        topColor: 'rgba(41, 98, 255, 0.3)',
        bottomColor: 'rgba(41, 98, 255, 0)',
        lineColor: 'rgba(41, 98, 255, 1)',
        lineWidth: 2,
    });
    currentSeries.setData(areaData);
});

document.getElementById('ma').addEventListener('click', () => {
    if (maSeries) {
        chart.removeSeries(maSeries);
        maSeries = null;
    } else {
        maSeries = addMA(20);
    }
});

document.getElementById('rsi').addEventListener('click', () => {
    if (rsiSeries) {
        chart.removeSeries(rsiSeries);
        rsiSeries = null;
    } else {
        rsiSeries = addRSI(14);
    }
});

document.getElementById('macd').addEventListener('click', () => {
    if (macdSeries) {
        chart.removeSeries(macdSeries);
        macdSeries = null;
    } else {
        macdSeries = addMACD();
    }
});

// Responsive chart
window.addEventListener('resize', () => {
    chart.applyOptions({
        width: document.getElementById('chart').clientWidth,
    });
});
