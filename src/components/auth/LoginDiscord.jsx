import { Button, Typography } from "@mui/material";
import React from "react";
import { API_ENDPOINT } from "@/config";

export const LoginDiscord = () => {
  const from = location.state?.from.pathname || "/profile";
  const encodedRedirect = encodeURIComponent(window.location.origin + from);
  const redirectUri2 = `https://localhost:7218/api/Auth/externalLogin?provider=Discord&returnUrl=http%3A%2F%2Flocalhost%3A3000%2Fprofile`;

  return (
    <>
      <form
        method="POST"
        action={`https://localhost:7218/api/Auth/external-login?provider=Discord&returnUrl=http%3A%2F%2Flocalhost%3A3000%2Fprofile`}
      >
        <Button
          variant="contained"
          sx={{ backgroundColor: "#5865F2", mb: 1 }}
          fullWidth
          type="submit"
        >
          <Typography>Login with Discord</Typography>
        </Button>
      </form>
      <form
        method="POST"
        action={`https://localhost:7218/api/Auth/external-login?provider=Google&returnUrl=http%3A%2F%2Flocalhost%3A3000%2Fprofile`}
      >
        <Button
          variant="contained"
          sx={{ backgroundColor: "#5865F2", mb: 1 }}
          fullWidth
          type="submit"
        >
          <Typography>Login with Google</Typography>
        </Button>
      </form>
      <form
        method="POST"
        action={`https://localhost:7218/api/Auth/external-login?provider=GitHub&returnUrl=http%3A%2F%2Flocalhost%3A3000%2Fprofile`}
      >
        <Button
          variant="contained"
          sx={{ backgroundColor: "#5865F2", mb: 1 }}
          fullWidth
          type="submit"
        >
          <Typography>Login with Github</Typography>
        </Button>
      </form>
    </>
  );
};

{
  /* <Button
          variant="contained"
          sx={{ backgroundColor: "#5865F2" }}
          href={redirectUri2}
          fullWidth
        >
          <Typography>Login with Discord</Typography>
        </Button> */
}
