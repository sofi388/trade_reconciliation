// frontend/src/services/tradeService.js
import api from "./api";

export const getTrades = async () => {
  const res = await api.get("/trades");
  return res.data;
};

export const addTrade = async (trade) => {
  const res = await api.post("/trades", trade);
  return res.data;
};

export const deleteTrade = async (id) => {
  await api.delete(`/trades/${id}`);
};
