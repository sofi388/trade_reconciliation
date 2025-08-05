import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Trades from "./pages/Trades";
import Instruments from "./pages/Instruments";
import Reconciliation from "./pages/Reconciliation";
import { Container, Box } from "@mui/material";
import Footer from "./pages/Footer";
import "./App.css";
import Navbar from "./pages/Navbar";

function App() {
  return (
    <Router>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        <Container sx={{ mt: 4, mb: 2, flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Trades />} />
            <Route path="/instruments" element={<Instruments />} />
            <Route path="/reconciliation" element={<Reconciliation />} />
          </Routes>
        </Container>

        <Footer />
      </Box>
    </Router>
  );
}

export default App;
