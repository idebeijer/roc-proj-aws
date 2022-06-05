import { GlobalStyles, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./views/Home";
import { theme } from "./theme/index";
import { Register } from "./views/auth/Register";
import { AuthProvider } from "./contexts/AuthProvider";
import { Login } from "./views/auth/Login";
import { Profile } from "./views/profile";
import { RequireAuth } from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import { Missing } from "./views/Page404";

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
            <Route index element={<Navigate to="/login" />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth />}>
                <Route path="profile" element={<Profile />} />
              </Route>
            </Route>

            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
