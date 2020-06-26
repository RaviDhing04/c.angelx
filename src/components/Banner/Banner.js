import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

const Banner = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {[1].map(banner => {
        return (
          <Carousel.Item key={banner}>
            <img
              className="d-block w-100"
              src="https://fullimages-products.s3.us-east-2.amazonaws.com/bannerimage1.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>{banner}</h3>
              {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default Banner;
