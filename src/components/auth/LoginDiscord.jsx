import { Button, Typography } from "@mui/material";
import React from "react";
import { API_ENDPOINT } from "@/config";

export const LoginDiscord = () => {
  const from = location.state?.from.pathname || "/profile";
  const encodedRedirect = encodeURIComponent(window.location.origin + from);
  const redirectUri = `${API_ENDPOINT}/oauth/discord/strict?redirect=${encodedRedirect}`;

  return (
    <Button variant="contained" sx={{ backgroundColor: "#5865F2" }} href={redirectUri} fullWidth>
      <Typography>Login with Discord</Typography>
    </Button>
  );
};
