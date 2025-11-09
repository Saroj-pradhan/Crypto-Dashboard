import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import axios from "axios";
import { useEffect, useState } from "react";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

function CryptoData() {
  const [prices, setPrices] = useState<number[]>([]);
  const [timestamps, setTimestamps] = useState<string[]>([]);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(
        "https://rest.coincap.io/v3/assets/bitcoin/history?interval=m30&limit=12",
        {
          headers: {
            Authorization:
              "Bearer 8479ad4cb63dadd4ec4ed4627190e6dadcd3936b536424c316551387821363e8",
          },
        }
      );

    
      const history = response.data.data.slice(-12);

      setPrices(history.map((entry: any) => Number(entry.priceUsd)));

      setTimestamps(
        history.map((entry: any) =>
          new Date(entry.time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        )
      );
    } catch (error) {
      console.error("Error fetching price history:", error);
    }
  };

  
  useEffect(() => {
  fetchHistory();
  const interval = setInterval(fetchHistory, 30000);
  return () => clearInterval(interval);
}, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-3">Bitcoin Price (Last 6 Hours)</h2>
      <Line
        data={{
          labels: timestamps,
          datasets: [
            {
              label: "BTC Price (USD)",
              data: prices,
              borderWidth: 2,
              pointRadius: 3,
            },
          ],
        }}
        options={{ responsive: true }}
      />
    </div>
  );
}

export default CryptoData;


