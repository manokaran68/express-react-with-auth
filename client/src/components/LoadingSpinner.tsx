import { CircularProgress, Stack, Typography } from "@mui/material";

export default function ({
  message,
  size = "small",
}: {
  message?: string;
  size?: "small" | "medium" | "large";
  bgColor?: string;
}) {
  const circleSize =
    size === "small" ? "1rem" : size === "medium" ? "2rem" : "3rem";
  return (
    <Stack alignItems="center">
      <CircularProgress size={circleSize} />
      {message && <Typography variant="subtitle1">{message}</Typography>}
    </Stack>
  );
}
