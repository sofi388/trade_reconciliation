import React from "react";
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        mt: "auto",
        backgroundColor: (theme) => theme.palette.primary.main,
        color: (theme) => theme.palette.primary.contrastText,
        textAlign: "center",
      }}
    >
      <Typography variant="body2">{new Date().getFullYear()} - DB Team 5</Typography>
    </Box>
  );
}
