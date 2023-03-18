import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import AppBar from "../components/AppBar";
import useAuth from "../hooks/useAuth";
import Login from "../pages/Login";

export default function Root() {
  const { token, login, logout } = useAuth();

  if (!token) {
    return <Login setToken={login} />;
  }

  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item xs={12}>
        <AppBar logout={logout} />
        <Outlet />
      </Grid>
    </Grid>
  );
}
