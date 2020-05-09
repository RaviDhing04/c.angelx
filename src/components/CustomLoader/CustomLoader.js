import React from "react";
import "./CustomLoader.scss";

const CustomLoader = props => {
  return (
    <React.Fragment>
      <div className="wrapper"></div>
      <div className="overlay show"></div>
      <div className="spanner show">
        <div className="loader"></div>
        <p>{props.message}</p>
      </div>
    </React.Fragment>
  );
};

export default CustomLoader;
