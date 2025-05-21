import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Randomized stock data for demonstration
const randomData = [
  { ticker: 'AAPL', price: 150.25, change: 1.23, chartData: [150, 152, 153, 151, 150, 149, 150] },
  { ticker: 'GOOG', price: 2735.60, change: -12.45, chartData: [2735, 2740, 2745, 2730, 2725, 2715, 2730] },
  { ticker: 'AMZN', price: 3450.40, change: 25.67, chartData: [3450, 3460, 3470, 3445, 3455, 3465, 3475] },
  { ticker: 'MSFT', price: 299.70, change: -2.34, chartData: [299, 300, 298, 297, 299, 298, 300] },
  { ticker: 'TSLA', price: 750.90, change: 15.78, chartData: [750, 755, 758, 760, 765, 762, 764] },
];

// Chart options
const chartOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Stock Price Historys',
      font: { size: 18 },
      color: '#fff',
    },
  },
  scales: {
    x: { grid: { color: '#444444' } },
    y: { grid: { color: '#444444' } },
  },
};

export default function Home() {
  const [stockData, setStockData] = useState(randomData);
  const [activeTab, setActiveTab] = useState('stockData');

  // Update stock data periodically with random values for the sake of demonstration
  useEffect(() => {
    const interval = setInterval(() => {
      setStockData((prevData) => prevData.map(stock => ({
        ...stock,
        price: stock.price + (Math.random() * 5 - 2.5), // Random price change
        change: Math.random() * 10 - 5, // Random change value
      })));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen text-white font-sans">
      {/* Navigation Bar */}
      <nav className="fixed w-full top-0 left-0 bg-gradient-to-r from-teal-600 to-blue-800 text-white shadow-lg z-50 p-6 backdrop-blur-md">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-4xl font-bold text-white tracking-wide">StockTracker</span>
          <div className="flex space-x-8">
            <button
              className={`py-2 px-6 rounded-lg text-xl transition-all duration-300 ease-in-out ${activeTab === 'stockData' ? 'bg-gradient-to-r from-teal-400 to-blue-500 shadow-lg' : 'hover:bg-gradient-to-r hover:from-teal-400 hover:to-blue-500'}`}
              onClick={() => setActiveTab('stockData')}
            >
              Stocks
            </button>
            <button
              className={`py-2 px-6 rounded-lg text-xl transition-all duration-300 ease-in-out ${activeTab === 'news' ? 'bg-gradient-to-r from-teal-400 to-blue-500 shadow-lg' : 'hover:bg-gradient-to-r hover:from-teal-400 hover:to-blue-500'}`}
              onClick={() => setActiveTab('news')}
            >
              News
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto mt-32 p-6">
        {/* Tab Content */}
        {activeTab === 'stockData' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {stockData.map((stock, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-blue-800 via-purple-800 to-indigo-900 p-8 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                <h2 className="text-3xl font-semibold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">{stock.ticker}</h2>
                <p className="text-lg mt-2">Price: <span className="font-bold text-teal-300">${stock.price.toFixed(2)}</span></p>
                <p className={`text-sm mt-1 ${stock.change >= 0 ? 'text-teal-400' : 'text-red-400'}`}>
                  Change: {stock.change.toFixed(2)}%
                </p>
                <div className="mt-6">
                  <Line data={{
                    labels: ['1', '2', '3', '4', '5', '6', '7'],
                    datasets: [
                      {
                        label: stock.ticker,
                        data: stock.chartData,
                        borderColor: '#4CAF50',
                        fill: false,
                        tension: 0.4,
                        borderWidth: 2,
                      },
                    ],
                  }} options={chartOptions} />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'news' && (
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-8 rounded-lg shadow-xl mt-8">
            <h2 className="font-semibold text-2xl text-yellow-400">Latest News</h2>
            <p className="text-sm mt-4 text-gray-400">No news available (demo data)</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-800 to-indigo-800 text-white text-center py-6 mt-12 shadow-inner">
        <p className="text-sm">© 2025 StockTracker. All rights reserved.</p>
      </footer>
    </div>
  );
}
