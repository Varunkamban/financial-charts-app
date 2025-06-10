
Built by https://www.blackbox.ai

---

# Financial Charts

## Project Overview
Financial Charts is a web application that allows users to visualize financial data through multiple chart types, including candlestick, line, and area charts. It also provides the ability to apply technical indicators such as Moving Average (MA), Relative Strength Index (RSI), and MACD to enhance data analysis.

## Installation
To get started with Financial Charts, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd financial-charts
   ```

2. **Open `index.html` in a web browser**:
   You can simply double-click the `index.html` file, or you can serve it using a local server for a better experience.

## Usage
To use the application:
1. Open the `index.html` file in your preferred web browser.
2. Select the desired chart type (Candlestick, Line, Area) using the buttons provided.
3. Toggle indicators (MA, RSI, MACD) by clicking the corresponding buttons.
4. Adjust the time intervals to view data from different timeframes (1m, 5m, 15m, 1h, 1d).

The chart will adjust automatically based on your selection.

## Features
- **Multiple Chart Types**: Switch between candlestick, line, and area charts seamlessly.
- **Technical Indicators**: Add or remove indicators (Moving Average, RSI, MACD) to your charts for enhanced analysis.
- **Responsive Design**: The chart adjusts to fit different screen sizes.
- **Sample Data Generation**: The app generates random sample data for demonstration and testing purposes.

## Dependencies
This project uses the following dependencies:
- [Lightweight Charts](https://tradingview.github.io/lightweight-charts) - A library for creating charts; included via CDN in `index.html`.

## Project Structure
```
financial-charts/
│
├── index.html           # Main HTML file for the application
├── styles.css           # CSS styles for the application
└── script.js            # JavaScript for chart functionality and data handling
```

### File Descriptions
- **index.html**: Contains the structure of the web application along with references to the CSS file and the JavaScript library.
- **styles.css**: Contains styles for the application, ensuring that the UI is visually appealing and user-friendly.
- **script.js**: Contains the logic for generating the chart, handling user interactions, and managing the technical indicators.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.