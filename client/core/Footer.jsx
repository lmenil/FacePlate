import React from "react";
import { Typography, Container, Box } from "@mui/material";
import teamLogo from '../assets/teamLogo.png';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        height:"auto",
        bgcolor: "#fdfdfd",
        py: 4,
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          gutterBottom
        >
          &copy; {new Date().getFullYear()} FreshPlate. All rights reserved.
        </Typography>
        <Box>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ textAlign: "center" }}
          >
            This Website is Designed by{" "}
            <img
              style={{ height: 70, width: "auto", verticalAlign: "middle" }}
              src={teamLogo}
              alt="Pseudo Squad Logo"
            />
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
