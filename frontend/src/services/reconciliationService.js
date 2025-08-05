import api from "./api";

export const startReconciliation = async () => {
  // POST /api/reconciliation/start → returns runId (string)
  const res = await api.post("/reconciliation/start");
  return res.data;
};

export const getReconciliationStatus = async (runId) => {
  // GET /api/reconciliation/status/{runId} → returns status (e.g. "IN_PROGRESS", "COMPLETED")
  const res = await api.get(`/reconciliation/status/${runId}`);
  return res.data;
};

export const getReconciliationDifferences = async (runId) => {
  // GET /api/reconciliation/differences/{runId} → returns array of { tradeId, fieldName, valueSystemA, valueSystemB, ... }
  const res = await api.get(`/reconciliation/differences/${runId}`);
  return res.data;
};
