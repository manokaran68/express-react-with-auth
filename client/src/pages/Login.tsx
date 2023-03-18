import { Alert, Box, Grid, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Form, useLocation } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import LoadingSpinner from "../components/LoadingSpinner";

export default function LoginPage({
  setToken,
}: {
  setToken: (token: string) => void;
}) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (username && password) {
      setLoading(true);
      try {
        const { data } = await axios.post(`/api/login`, {
          username,
          password,
        });
        setToken(data.token);
      } catch (error: any) {
        setError(error?.response?.data?.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
  }

  function reset() {
    setUsername("");
    setPassword("");
    setError("");
    setLoading(false);
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid
        item
        border="solid 1px"
        padding="1rem"
        borderColor="divider"
        borderRadius="0.25rem"
      >
        <Box width="20rem">
          <Form onSubmit={login}>
            <Stack spacing={2}>
              <Typography
                variant="h6"
                component="span"
                fontSize="1rem"
                textAlign="center"
              >
                AUGREGATOR
              </Typography>
              <TextInput
                label="Username"
                type="text"
                required
                value={username}
                onChange={(e: any) => setUsername(e.target.value?.trim())}
              />
              <TextInput
                label="Password"
                type="password"
                required
                value={password}
                onChange={(e: any) => setPassword(e.target.value?.trim())}
              />
              {error ? (
                <Alert severity="error" sx={{ padding: "0.25rem 0.5rem" }}>
                  {error}
                </Alert>
              ) : null}
              <Stack spacing={1} direction="row" justifyContent="center">
                <Button
                  variant="contained"
                  disabled={!(username && password) || loading}
                  type="submit"
                >
                  {loading ? <LoadingSpinner /> : "Log in"}
                </Button>
                <Button onClick={reset} variant="outlined">
                  Reset
                </Button>
              </Stack>
            </Stack>
          </Form>
        </Box>
      </Grid>
    </Grid>
  );
}
