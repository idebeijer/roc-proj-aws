import { Box, Container } from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardNavbar } from "./DashboardNavbar";

const drawerWidth = 240;

export const DashboardLayout = () => {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <DashboardHeader
        open={open}
        setOpen={setOpen}
        drawerwidth={drawerWidth}
        toggleDrawer={toggleDrawer}
      />
      <DashboardNavbar
        open={open}
        setOpen={setOpen}
        drawerwidth={drawerWidth}
        toggleDrawer={toggleDrawer}
      />

      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Box sx={{ mt: 14 /* this should be set to height of the header */ }}></Box>

        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};
