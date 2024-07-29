import http from "../httpService";

export async function getAllStocksData() {
  const { data } = await http.get(`/stocks/all-stocks`);
  return data;
}
