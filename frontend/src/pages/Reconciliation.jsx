// src/pages/Reconciliation.jsx
import React, { useState } from "react";
import { Box, Button, Typography, Accordion, AccordionSummary, AccordionDetails, Table, TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress, Alert } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { getTrades } from "../services/tradeService";

// Fallback sample data (in case fetch fails)
const sampleData = [
  {
    tradeId: "T1001",
    differences: [
      { field: "price", systemA: 100.0, systemB: 102.0 },
      { field: "quantity", systemA: 50, systemB: 50 },
    ],
  },
  {
    tradeId: "T1002",
    differences: [
      { field: "price", systemA: 200.0, systemB: 200.0 },
      { field: "quantity", systemA: 30, systemB: 25 },
    ],
  },
];

export default function Reconciliation() {
  const [lastRun, setLastRun] = useState(null);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRun = async () => {
    setLoading(true);
    setError("");
    try {
      // 1) Fetch all trades
      const trades = await getTrades();

      // 2) Record run timestamp
      setLastRun({ timestamp: new Date().toLocaleString() });

      // 3) Group by trade_id
      const map = {};
      trades.forEach((t) => {
        const id = t.trade_id;
        if (!map[id]) map[id] = [];
        map[id].push(t);
      });

      // 4) For each group, compare price & quantity
      const computed = Object.entries(map).map(([tradeId, list]) => {
        const diffs = [];
        if (list.length > 1) {
          const ref = list[0];
          list.slice(1).forEach((other) => {
            if (other.price !== ref.price) {
              diffs.push({
                field: "price",
                systemA: ref.price,
                systemB: other.price,
              });
            }
            if (other.quantity !== ref.quantity) {
              diffs.push({
                field: "quantity",
                systemA: ref.quantity,
                systemB: other.quantity,
              });
            }
          });
        }
        return { tradeId, differences: diffs };
      });

      setGroups(computed);
    } catch (e) {
      console.error("Fetch failed, using sampleData", e);
      setError("Unable to fetch trades; using sample data.");
      setLastRun({ timestamp: new Date().toLocaleString(), runId: "SAMPLE" });
      setGroups(sampleData);
    } finally {
      setLoading(false);
    }
  };

  // compute matched/unmatched
  const matchedCount = groups.filter((g) => g.differences.length === 0).length;
  const unmatchedCount = groups.length - matchedCount;

  return (
    <Box p={3} maxWidth="800px" mx="auto">
      <Typography variant="h4" gutterBottom>
        Reconciliation
      </Typography>

      {error && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Button variant="contained" color="primary" onClick={handleRun} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Run Reconciliation"}
      </Button>

      {lastRun && (
        <Box mt={2} mb={4}>
          <Typography variant="subtitle2" color="textSecondary">
            Last run: {lastRun.runId ?? ""} {lastRun.timestamp}
          </Typography>
          <Typography component="span" mr={2}>
            Matched: <strong>{matchedCount}</strong>
          </Typography>
          <Typography component="span">
            Unmatched: <strong>{unmatchedCount}</strong>
          </Typography>
        </Box>
      )}

      {groups.map((group) => (
        <Accordion key={group.tradeId}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              Trade ID: <strong>{group.tradeId}</strong> — {group.differences.length > 0 ? "⚠️ Differences found" : "✅ All match"}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Paper elevation={0} sx={{ overflowX: "auto" }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Field</TableCell>
                    <TableCell align="right">System A</TableCell>
                    <TableCell align="right">System B</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {group.differences.length > 0 ? (
                    group.differences.map(({ field, systemA, systemB }) => (
                      <TableRow key={field}>
                        <TableCell>{field}</TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            fontWeight: "bold",
                            color: "error.main",
                          }}
                        >
                          {systemA}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            fontWeight: "bold",
                            color: "error.main",
                          }}
                        >
                          {systemB}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        No differences
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Paper>
          </AccordionDetails>
        </Accordion>
      ))}

      {groups.length === 0 && !loading && (
        <Typography variant="body2" color="textSecondary" mt={2}>
          Click “Run Reconciliation” to compare the latest trades.
        </Typography>
      )}
    </Box>
  );
}
