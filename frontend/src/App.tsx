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
  const API_URL = import.meta.env.VITE_API_URL

  const fetchCurrencies = () => {
    axios.get(`${API_URL}/cryptocurrencies`).then((r) => {
      const currenciesResponse = r.data;
      const menuItems: any = [
        getItem(
          "Список криптовалют",
          "g1",
          null,
          currenciesResponse.map((c: any) => {
            return { label: c.name, key: c.id };
          }),
          "group",
        ),
      ];
      setCurrencies(menuItems);
    });
  };

  const fetchCurrency = () => {
    axios
      .get(`${API_URL}/cryptocurrencies/${currencyId}`)
      .then((r) => {
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
  };

  return (
    <div className="flex ">
      <Menu
        onClick={onClick}
        style={{
          width: 256,
        }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={currencies}
        className="h-screen overflow-scroll"
      />
      <div className="mx-auto my-auto">
        {currencyData ? (
          <CryptocurrencyCard currency={currencyData} />
        ) : (
          <Spin size="large" />
        )}
      </div>
    </div>
  );
};
export default App;
