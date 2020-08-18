import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useHistory } from "react-router-dom";
import apple from "../../assets/apple.svg";
import android from "../../assets/android.svg";

const Banner = props => {
  const [index, setIndex] = useState(0);
  const { banners } = props;
  const history = useHistory();
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
    "color": "#FFFFFF",
    opacity: "1"
  };

  const imgHolder = {
    "width": "100%",
    "position": "relative",
    "height": "20rem",
    "background": "#d0d0d0"
  }

  const imgHolderLanding = {
    "width": "100%",
    "position": "relative",
    "height": "29rem",
    "background": "#d0d0d0"
  }

  const circleImgGreen = {
    "width": "2rem",
    "height": "2rem",
    "background": "#93C01D",
    "borderRadius": "50%",
    "marginLeft": "0.5rem"
  }

  const circleImgGrey = {
    "width": "2rem",
    "height": "2rem",
    "background": "#989898",
    "borderRadius": "50%",
    "marginLeft": "0.5rem"
  }

  const btnLandingDiv = {
    "display": "flex",
    "justifyContent": "center",
    "marginBottom": "1rem"
  }

  const img = {
    "width": "1.5rem",
    "height": "1.5rem",
    "borderRadius": "50%",
    "marginTop": "3px"
  }

  const shop = () => {
    history.push('/home');
  }
  const sell = () => {
    history.push('/home');
  }

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
              {window.location.href.includes('landing') ? <div style={imgHolderLanding}>
                <img
                  className="d-block w-100"
                  src={banner.ImageURL.S}
                  alt="First slide"
                />
              </div> : <div style={imgHolder}>
                  <img
                    className="d-block w-100"
                    src={banner.ImageURL.S}
                    alt="First slide"
                  />
                </div>}
              <Carousel.Caption>
                <h3 style={title}>{banner.Title && banner.Title.S}</h3>
                <p style={subtitle} >{banner.Subtitle1 && banner.Subtitle1.S}</p>
                {banner.BannerName && banner.BannerName.S === "Landingpage" ? (
                  <React.Fragment>
                    <div style={btnLandingDiv}>
                      <button className="startshopping" onClick={shop}>Start Shopping</button>
                      <button className="startselling" onClick={sell}>Start Selling</button>
                      <div style={circleImgGreen}><img style={img} src={android} alt="playstore"></img></div>
                      <div style={circleImgGrey}><img style={img} src={apple} alt="appstore"></img></div>
                    </div>
                    <div>See how it works</div>
                  </React.Fragment>
                ) : null}
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
    </Carousel>
  );
};

export default Banner;
