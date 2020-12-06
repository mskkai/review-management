import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";

const Loader = () => (
  <div className="loader">
    <ProgressSpinner style={{ width: "5rem", height: "5rem" }} />
  </div>
);

export default Loader;
