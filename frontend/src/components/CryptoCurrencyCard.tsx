import { Card } from "antd";
import numberWithCommas from "../utils";

function CryptocurrencyCard({ currency }: any) {
  const priceChangeColor =
    currency.quote.USD.percent_change_24h > 0
      ? "text-green-500"
      : "text-red-500";

  const formattedPrice = numberWithCommas(Math.round(currency.quote.USD.price));

  const formattedMarketCap = numberWithCommas(
    Math.round(currency.quote.USD.market_cap / 1_000_000_000),
  );

  const priceChange =
    Math.round(100 * currency.quote.USD.percent_change_24h) / 100;

  return (
    <Card bordered={false} className="w-full shadow-xl rounded-2xl text-center">
      <div className="flex flex-col items-center gap-4">
        <img
          src={`https://s2.coinmarketcap.com/static/img/coins/128x128/${currency.id}.png`}
          alt="logo"
          className="w-16 sm:w-20 md:w-24"
        />

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          {currency.name}
        </h1>

        <p className="text-lg sm:text-xl">
          Цена: <span className="font-semibold">${formattedPrice}</span>
        </p>

        <p className="text-lg sm:text-xl">
          Изменение 24ч:{" "}
          <span className={`${priceChangeColor} font-semibold`}>
            {priceChange}%
          </span>
        </p>

        <p className="text-lg sm:text-xl">
          Капитализация: ${formattedMarketCap}B
        </p>
      </div>
    </Card>
  );
}

export default CryptocurrencyCard;
