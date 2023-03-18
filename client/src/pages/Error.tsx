import { Alert } from "@mui/material";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return <Alert severity="error">{error.message || error.statusText}</Alert>;
}
