import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        {/* Logo */}
        <Box component="img" src="/dblogo.jpeg" alt="DB Logo" sx={{ height: 32, mr: 1 }} />

        {/* Title */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            alignItems: "center",
          }}
        >
          Trade Reconciliation System
        </Typography>

        {/* Navigation Buttons */}
        <Button color="inherit" component={Link} to="/">
          Trades
        </Button>
        <Button color="inherit" component={Link} to="/instruments">
          Instruments
        </Button>
        <Button color="inherit" component={Link} to="/reconciliation">
          Reconciliation
        </Button>
      </Toolbar>
    </AppBar>
  );
}
