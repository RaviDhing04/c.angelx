import React from "react";
import { aboutUsText, aboutUsGrid } from "../../constants/constants";
import "./AboutUs.scss";

const AboutUs = () => {
  return (
    <React.Fragment>
      <div className="aboutus-container">
        <div className="heading"> About Us </div>
        <p className="aboutus-text">{aboutUsText[0]}</p>
        <p className="aboutus-text">{aboutUsText[1]}</p>
        <div className="heading"> Tell Me More </div>
        <div className="aboutus-grid">
          {aboutUsGrid.map((gridItem, index) => {
            const i = index + 1;
            return (
              <div className="grid-flex">
                <div
                  className={
                    [1, 2, 3].includes(i) ? "bottomLine grid-item" : "grid-item"
                  }
                >
                  <img
                    className="grid-image"
                    alt={gridItem.image + "name"}
                    src={require(`../../assets/${gridItem.image}.svg`)}
                  ></img>
                  <span className="grid-title">{gridItem.title}</span>
                  <p className="grid-text">{gridItem.text}</p>
                </div>
                <hr className={i % 3 ? "rightLine" : "none"} />
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default AboutUs;
