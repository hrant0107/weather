import React from "react";
import styles from "./errorMessage.module.scss";

import { Alert, AlertTitle } from "@mui/material";

const ErrorMessage = () => {
  return (
    <div className={styles.block}>
      <Alert className={styles.alert} severity="error">
        <AlertTitle>Error</AlertTitle>
        Please type correct<strong> city name!</strong>
      </Alert>
    </div>
  );
};

export default ErrorMessage;
