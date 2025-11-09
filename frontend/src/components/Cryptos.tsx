import { useContext, useEffect } from "react";
import { ContextApp } from "../context/ContextApp";
import axios from "axios";

type CryptoType = {
  id: string;
  symbol: string;
  priceUsd: string;
  changePercent24Hr: string;
};

function Cryptos() {
  const cryptoCtx = useContext(ContextApp);
  if (!cryptoCtx) return null; // prevents undefined access

  const { data, setData } = cryptoCtx;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = [
          "https://rest.coincap.io/v3/assets/bitcoin",
          "https://rest.coincap.io/v3/assets/ethereum",
          "https://rest.coincap.io/v3/assets/dogecoin",
        ];

        const responses = await Promise.all(
          urls.map((url) =>
            axios.get(url, {
              headers: {
                Authorization:
                  "Bearer 8479ad4cb63dadd4ec4ed4627190e6dadcd3936b536424c316551387821363e8",
              },
            })
          )
        );

        const cryptoArr: CryptoType[] = responses.map((res) => res.data.data);
        setData(cryptoArr);
      } catch (error) {
        console.error("Error fetching API:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);

  return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-2 m-2">
      <div className="bg-slate-600 text-white rounded-lg p-2 mb-1">
        <p>Cryptocurrency Name: {data[0]?.id}</p>
        <p>Price: {data[0]?.priceUsd}</p>
        <p>24h Change: {data[0]?.changePercent24Hr}%</p>
      </div>

      <div className="bg-slate-600 text-white rounded-lg p-2 mb-1">
        <p>Cryptocurrency Name {data[1]?.id}</p>
        <p>Price: {data[1]?.priceUsd}</p>
        <p>24h Change: {data[1]?.changePercent24Hr}%</p>
      </div>

      <div className="bg-slate-600 text-white rounded-lg p-2 mb-1">
        <p>Cryptocurrency Name {data[2]?.id}</p>
        <p>Price: {data[2]?.priceUsd}</p>
        <p>24h Change: {data[2]?.changePercent24Hr}%</p>
      </div>
    </div>
  );
}

export default Cryptos;
