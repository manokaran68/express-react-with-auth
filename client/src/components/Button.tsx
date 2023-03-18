import { Button as MUIButton } from "@mui/material";
import React from "react";

type Props = {};

export default React.forwardRef(function Button(
  { children, ...props }: any,
  ref
) {
  return (
    <MUIButton
      {...props}
      sx={{
        padding: "0.25rem 1rem",
      }}
    >
      {children}
    </MUIButton>
  );
});
