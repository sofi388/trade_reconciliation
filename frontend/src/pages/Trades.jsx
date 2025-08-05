// frontend/src/pages/Trades.jsx
import React, { useEffect, useState } from "react";
import { getTrades, addTrade, deleteTrade } from "../services/tradeService";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function Trades() {
  // Add this sample data near the top of Trades.jsx
const SAMPLE_TRADES = [
  {
    id: 1,
    trade_id: "T1001",
    instrument: "AAPL",
    price: 185.5,
    quantity: 100,
    source_system: "Bloomberg",
    trade_date: "2025-07-25",
  },
  {
    id: 2,
    trade_id: "T1002",
    instrument: "GOOG",
    price: 2730.0,
    quantity: 50,
    source_system: "Reuters",
    trade_date: "2025-07-28",
  },
  {
    id: 3,
    trade_id: "T1003",
    instrument: "MSFT",
    price: 310.25,
    quantity: 200,
    source_system: "InternalSystem",
    trade_date: "2025-07-29",
  },
];

  // State
  const [trades, setTrades] = useState([]);
  const [form, setForm] = useState({
    trade_id: "",
    instrument: "",
    price: "",
    quantity: "",
    source_system: "",
    trade_date: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load trades on component mount
  useEffect(() => {
    fetchTrades();
  }, []);

 // Fetch trades from backend
const fetchTrades = async () => {
  setLoading(true);
  setError("");
  try {
    const data = await getTrades();
    // If backend returns an empty array, use sample data
    setTrades(data.length > 0 ? data : SAMPLE_TRADES);
  } catch (err) {
    console.error("Error fetching trades:", err);
    setError("Backend unreachable. Showing sample data.");
    setTrades(SAMPLE_TRADES); // fallback
  } finally {
    setLoading(false);
  }
};


  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add a new trade
  const handleAddTrade = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await addTrade(form);
      setForm({
        trade_id: "",
        instrument: "",
        price: "",
        quantity: "",
        source_system: "",
        trade_date: "",
      });
      fetchTrades();
    } catch (err) {
      console.error("Error adding trade:", err);
      setError("Failed to add trade. Please try again.");
    }
  };

  // Delete a trade
  const handleDelete = async (id) => {
    setError("");
    try {
      await deleteTrade(id);
      fetchTrades();
    } catch (err) {
      console.error("Error deleting trade:", err);
      setError("Failed to delete trade. Please try again.");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Trade Management
      </Typography>

      {/* Error message */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Add Trade Form */}
      <Box component="form" onSubmit={handleAddTrade} sx={{ mb: 3, display: "flex", flexWrap: "wrap", gap: 2 }}>
        <TextField label="Trade ID" name="trade_id" value={form.trade_id} onChange={handleChange} required />
        <TextField label="Instrument" name="instrument" value={form.instrument} onChange={handleChange} required />
        <TextField label="Price" name="price" type="number" value={form.price} onChange={handleChange} required />
        <TextField label="Quantity" name="quantity" type="number" value={form.quantity} onChange={handleChange} required />
        <TextField label="Source System" name="source_system" value={form.source_system} onChange={handleChange} required />
        <TextField
          label="Trade Date"
          name="trade_date"
          type="date"
          value={form.trade_date}
          onChange={handleChange}
          required
          InputLabelProps={{ shrink: true }}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Trade
        </Button>
      </Box>

      {/* Loading State */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Trade ID</TableCell>
                <TableCell>Instrument</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Source System</TableCell>
                <TableCell>Trade Date</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {trades.length > 0 ? (
                trades.map((trade) => (
                  <TableRow key={trade.id}>
                    <TableCell>{trade.trade_id}</TableCell>
                    <TableCell>{trade.instrument}</TableCell>
                    <TableCell>{trade.price}</TableCell>
                    <TableCell>{trade.quantity}</TableCell>
                    <TableCell>{trade.source_system}</TableCell>
                    <TableCell>{trade.trade_date}</TableCell>
                    <TableCell align="center">
                      <Button
                        color="error"
                        onClick={() => handleDelete(trade.id)}
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No trades found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default Trades;
