import { Button, Container } from "@mui/material";
import React from "react";
import { useRefreshToken } from "../hooks/useRefreshToken";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export const Profile = () => {
  const refresh = useRefreshToken();
  const axiosPrivate = useAxiosPrivate();

  return (
    <Container maxWidth="sm">
      <Button onClick={() => refresh()}>Refresh</Button>
    </Container>
  );
};
