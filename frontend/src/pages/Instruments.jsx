import React, { useEffect, useState } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { getInstruments, addInstrument, updateInstrument, deleteInstrument } from "../services/instrumentService";

function Instruments() {
  const SAMPLE_INSTRUMENTS = [
    { symbol: "AAPL", name: "Apple Inc.", isin: "US0378331005" },
    { symbol: "GOOG", name: "Alphabet Inc.", isin: "US02079K3059" },
    { symbol: "MSFT", name: "Microsoft Corp.", isin: "US5949181045" },
  ];

  const [instruments, setInstruments] = useState([]);
  const [form, setForm] = useState({ symbol: "", name: "", isin: "" });
  const [editForm, setEditForm] = useState({ symbol: "", name: "", isin: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    fetchInstruments();
  }, []);

  const fetchInstruments = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getInstruments();
      setInstruments(data.length > 0 ? data : SAMPLE_INSTRUMENTS);
    } catch (err) {
      console.error("Error fetching instruments:", err);
      setError("Backend unreachable. Showing sample data.");
      setInstruments(SAMPLE_INSTRUMENTS);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddInstrument = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await addInstrument(form);
      setForm({ symbol: "", name: "", isin: "" });
      fetchInstruments();
    } catch (err) {
      console.error("Error adding instrument:", err);
      setError("Failed to add instrument. Please try again.");
    }
  };

  // Open edit dialog
  const handleEditClick = (instr) => {
    setEditForm({ ...instr });
    setIsEditOpen(true);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdateInstrument = async () => {
    setError("");
    try {
      await updateInstrument(editForm.symbol, editForm);
      setIsEditOpen(false);
      fetchInstruments();
    } catch (err) {
      console.error("Error updating instrument:", err);
      setError("Failed to update instrument. Please try again.");
    }
  };

  const handleDelete = async (symbol) => {
    setError("");
    try {
      await deleteInstrument(symbol);
      fetchInstruments();
    } catch (err) {
      console.error("Error deleting instrument:", err);
      setError("Failed to delete instrument. Please try again.");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Instrument Management
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Add Instrument Form */}
      <Box component="form" onSubmit={handleAddInstrument} sx={{ mb: 3, display: "flex", flexWrap: "wrap", gap: 2 }}>
        <TextField label="Symbol" name="symbol" value={form.symbol} onChange={handleChange} required />
        <TextField label="Name" name="name" value={form.name} onChange={handleChange} required />
        <TextField label="ISIN" name="isin" value={form.isin} onChange={handleChange} required />
        <Button type="submit" variant="contained" color="primary">
          Add Instrument
        </Button>
      </Box>

      {/* Loading Spinner */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Symbol</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>ISIN</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {instruments.length > 0 ? (
                instruments.map((instrument) => (
                  <TableRow key={instrument.symbol}>
                    <TableCell>{instrument.symbol}</TableCell>
                    <TableCell>{instrument.name}</TableCell>
                    <TableCell>{instrument.isin}</TableCell>
                    <TableCell align="center">
                      <Button color="primary" onClick={() => handleEditClick(instrument)} startIcon={<EditIcon />}>
                        Edit
                      </Button>
                      <Button color="error" onClick={() => handleDelete(instrument.symbol)} startIcon={<DeleteIcon />}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No instruments found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)}>
        <DialogTitle>Edit Instrument</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Symbol" name="symbol" value={editForm.symbol} disabled />
          <TextField label="Name" name="name" value={editForm.name} onChange={handleEditChange} required />
          <TextField label="ISIN" name="isin" value={editForm.isin} onChange={handleEditChange} required />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdateInstrument}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Instruments;
