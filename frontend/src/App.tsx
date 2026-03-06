import { useEffect, useState } from "react";
import { Menu, Spin } from "antd";
import axios from "axios";
import CryptocurrencyCard from "./components/CryptoCurrencyCard";

function getItem(label: any, key: any, icon: any, children: any, type: any) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [currencyId, setCurrencyId] = useState(1);
  const [currencyData, setCurrencyData] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const fetchCurrencies = () => {
    axios.get(`${API_URL}/cryptocurrencies`).then((r) => {
      const currenciesResponse = r.data;

      const menuItems: any = [
        getItem(
          "Список криптовалют",
          "g1",
          null,
          currenciesResponse.map((c: any) => ({
            label: c.name,
            key: c.id,
          })),
          "group",
        ),
      ];

      setCurrencies(menuItems);
    });
  };

  const fetchCurrency = () => {
    axios.get(`${API_URL}/cryptocurrencies/${currencyId}`).then((r) => {
      setCurrencyData(r.data);
    });
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  useEffect(() => {
    setCurrencyData(null);
    fetchCurrency();
  }, [currencyId]);

  const onClick = (e: any) => {
    setCurrencyId(e.key);
    setMenuOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      <div
        className={`
        fixed md:static
        top-0 left-0
        h-full
        w-64
        bg-white
        shadow-lg
        z-40
        transform
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        transition-transform duration-300
        `}
      >
        <Menu
          onClick={onClick}
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={currencies}
          className="h-full overflow-y-auto"
        />
      </div>

        <div className="flex-1 max-w-312 mt-37 flex justify-center p-4 sm:p-6 md:p-10">
        <div className="w-full fixed max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl">
          {currencyData ? (
            <CryptocurrencyCard currency={currencyData} />
          ) : (
            <div className="flex justify-center">
              <Spin size="large" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
