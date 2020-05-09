import React from "react";
import "./ProductRowShimmer.scss";

const ProductRowShimmer = () => {
  return (
    <React.Fragment>
      <div className="shimmer">
        <div className="heading-card br">
          <div className="wrapper">
            <div className="comment br animate w80"></div>
          </div>
        </div>

        <div className="card br">
          <div className="wrapper">
            <div className="comment br animate"></div>
            <div className="comment br animate"></div>
            <div className="comment br animate"></div>
            <div className="comment br animate"></div>
            <div className="comment br animate"></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductRowShimmer;
