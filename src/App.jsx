import { GlobalStyles, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { Route, Routes } from "react-router-dom";
import { Home } from "./views/Home";
import { theme } from "./theme/index";
import { Register } from "./views/auth/Register";
import { AuthProvider } from "./contexts/AuthProvider";
import { Login } from "./views/auth/Login";
import { Profile } from "./views/profile";
import { RequireAuth } from "./components/RequireAuth";

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
            <Route index element={<Register />} />
            <Route path="login" element={<Login />} />

            <Route element={<RequireAuth />}>
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
