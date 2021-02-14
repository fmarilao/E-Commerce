import React from "react";
import { Alert } from "@material-ui/lab";

const NotFoundPage = () => {
  return (
    <>
      <Alert severity="error">
        You do not have permissions to access this url
      </Alert>
    </>
  );
};

export default NotFoundPage;
