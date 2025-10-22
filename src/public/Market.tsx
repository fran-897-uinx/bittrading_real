"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

type Market = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
};

export default function MarketTable() {
  const [markets, setMarkets] = React.useState<Market[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
      );
      const data = await res.json();
      setMarkets(data);
    } catch (error) {
      console.error("Error fetching market data:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // refresh every 1 min
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="market" className="py-16 bg-white">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
        Live Market Data
      </h2>

      <div className="max-w-6xl mx-auto overflow-x-auto px-4">
        {loading ? (
          <div className="grid gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-md" />
            ))}
          </div>
        ) : (
          <Table>
            <TableCaption>Updated every 60 seconds</TableCaption>
            <TableHeader>
              <TableRow className="">
                <TableHead className="w-[200px]">Asset</TableHead>
                <TableHead>Price (USD)</TableHead>
                <TableHead>Change (24h)</TableHead>
                <TableHead>Market Cap</TableHead>
                <TableHead>Volume (24h)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {markets.map((coin) => (
                <TableRow
                  key={coin.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="flex items-center gap-2 font-medium">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span>
                      {coin.name} ({coin.symbol.toUpperCase()})
                    </span>
                  </TableCell>
                  <TableCell>${coin.current_price.toLocaleString()}</TableCell>
                  <TableCell
                    className={`font-semibold ${
                      coin.price_change_percentage_24h < 0
                        ? "text-red-500"
                        : "text-green-600"
                    }`}
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </TableCell>
                  <TableCell>${coin.market_cap.toLocaleString()}</TableCell>
                  <TableCell>${coin.total_volume.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </section>
  );
}
