import React from "react";
import Spinner from "react-bootstrap/Spinner";

import "./LoadingIndicator.css";

export default function LoadingIndicator() {
  return (
    <div className="my-3 LoadingIndicator">
      <Spinner animation="border" variant="primary" />
    </div>
  );
}
