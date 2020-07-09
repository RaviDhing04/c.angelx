import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

const Banner = props => {
  const [index, setIndex] = useState(0);
  const { banners } = props;
  const title = {
    "textAlign": "center",
    "fontSize": "38px",
    "letterSpacing": "2.66px",
    color: "#FFFFFF",
    opacity: "1",
    'fontWeight': 'Bold'
  };

  const subtitle = {
    "textAlign": "center",
    "fontSize": "20px",
    "letterSpacing": "3px",
    color: "#FFFFFF",
    opacity: "1"
  };

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {banners &&
        banners.length &&
        banners.map(banner => {
          return (
            <Carousel.Item key={banner.BannerOrder.S}>
              <img
                className="d-block w-100"
                src={banner.ImageURL.S}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3 style={title}>{banner.Title && banner.Title.S}</h3>
                <p style={subtitle} >{banner.Subtitle1 && banner.Subtitle1.S}</p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
    </Carousel>
  );
};

export default Banner;
