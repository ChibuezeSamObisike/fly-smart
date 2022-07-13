import React from "react";
import { BallTriangle } from "react-loader-spinner";

export const LoaderSmall = () => (
  <div className="loader">
    <BallTriangle
      heigth="100"
      width="100"
      color="grey"
      ariaLabel="loading-indicator"
    />
  </div>
);
