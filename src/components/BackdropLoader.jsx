import { Backdrop, CircularProgress, useTheme } from "@mui/material";
import React from "react";

export const BackdropLoader = () => {
  return (
    <div>
      <CircularProgress color="inherit" />
    </div>
  );
};

{
  /* <div>
<Backdrop
  sx={{
    color: "#000000",
    zIndex: (theme) => theme.zIndex.drawer + 1,
  }}
  open={true}
>
  <CircularProgress color="inherit" />
</Backdrop>
</div> */
}
