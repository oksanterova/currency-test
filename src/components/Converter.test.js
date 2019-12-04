import { getConvertedAmount } from "./Converter";

it("converts amount", () => {
  const amount = 1;
  const rates = [
    { rate: 0.902398, symbol: "EUR" },
    { rate: 64.151603, symbol: "RUB" },
    { rate: 9.530875, symbol: "SEK" },
    { rate: 0.769575, symbol: "GBP" },
    { rate: 0.98702, symbol: "CHF" }
  ];
  const fromCurrency = "USD";
  const toCurrency = "RUB";
  expect(getConvertedAmount(amount, rates, fromCurrency, toCurrency)).toEqual(
    64.15
  );
});
