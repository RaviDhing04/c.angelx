import React, { useState } from "react";
import "./ProductSlider.scss";
import defaultImg from "../../assets/default-prod.png";

const ProductSlider = ({ images }) => {
  const imageRef = React.createRef();
  const [img, setImg] = useState(images[0]);
  const [aItem, setAItem] = useState(0);

  const cumulativeOffSet = element => {
    let top = 0,
      left = 0;
    do {
      top += element.offsetTop || 0;
      left += element.offsetLeft || 0;
      element = element.offsetParent;
    } while (element);

    return {
      top: top,
      left: left
    };
  };

  const handleImageChange = e => {
    const currentX = e.clientX - cumulativeOffSet(imageRef.current).left;

    console.dir(imageRef.current);

    const part = imageRef.current.clientWidth / images.length;
    console.log(Math.ceil(currentX / part) - 1);

    let imgIndex = Math.ceil(currentX / part) - 1;
    if (imgIndex < 0) {
      imgIndex = 0;
    }

    if (imgIndex >= images.length) {
      imgIndex = images.length - 1;
    }
    setAItem(imgIndex);
    setImg(images[imgIndex]);
  };

  const handleMouseOut = e => {
    setImg(images[0]);
    setAItem(0);
  };

  const changeImage = i => {
    setImg(images[i]);
    setAItem(i);
  };

  return (
    <div className="col-sm-4 product-slider-container">
      <article className="gallery-wrap">
        <div className="img-big-wrap">
          <div style={{ padding: "2rem" }}>
            <a>
              <img alt="item-gallery"
                ref={imageRef}
                onMouseMove={handleImageChange}
                onMouseOut={handleMouseOut}
                src={img? img : defaultImg}
                style={{ width: "85%", height: "85%", "marginLeft": "1.5rem" }}
              />
            </a>
          </div>
        </div>
        <div className="img-small-wrap">
          {images.map((img, i) => (
            <div key={i}
              className="item-gallery"
              onClick={() => {
                changeImage(i);
              }}
            >
              <img alt="img-small" src={img? img : defaultImg} />
            </div>
          ))}
        </div>
      </article>
    </div>
  );
};

export default ProductSlider;
