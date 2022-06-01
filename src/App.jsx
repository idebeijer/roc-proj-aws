import { GlobalStyles, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { Route, Routes } from "react-router-dom";
import { Home } from "./views/Home";
import { theme } from "./theme/index";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <GlobalStyles
          styles={{
            body: { backgroundColor: theme.palette.primary.background },
          }}
        />
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
