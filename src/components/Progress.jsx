import * as React from "react";

import CircularProgress from "@mui/material/CircularProgress";

export default function Progress() {
  return (
    <div className="progres">
      <CircularProgress
        sx={{ animationDuration: "550ms" }}
        size={"100px"}
        disableShrink
      />
      ;
    </div>
  );
}
