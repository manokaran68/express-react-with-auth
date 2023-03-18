import React from "react";
import { TextField } from "@mui/material";

export default React.forwardRef(function TextInput(
  { label, defaultValue, required, type, ...props }: any,
  ref
) {
  return (
    <TextField
      required={required}
      label={label}
      defaultValue={defaultValue}
      type={type}
      {...props}
      size="small"
    />
  );
});
