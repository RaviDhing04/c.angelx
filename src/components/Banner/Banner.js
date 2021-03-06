import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useHistory } from "react-router-dom";
import apple from "../../assets/apple.svg";
import android from "../../assets/android.svg";
import {
  isMobile
} from "react-device-detect";

const Banner = props => {
  const [index, setIndex] = useState(0);
  const { banners } = props;
  const history = useHistory();
  const title = {
    "textAlign": "center",
    "fontSize": "2.375rem",
    "letterSpacing": "2.66px",
    color: "#FFFFFF",
    opacity: "1",
    'fontWeight': 'Bold'
  };

  const subtitle = {
    "textAlign": "center",
    "fontSize": "1.25rem",
    "letterSpacing": "3px",
    "color": "#FFFFFF",
    opacity: "1"
  };

  const imgHolder = {
    "width": "100%",
    "position": "relative",
    "height": "19.5rem",
    "background": "#d0d0d0"
  }

  const imgHolderLanding = {
    "width": "100%",
    "position": "relative",
    "height": "29rem",
    "background": "#d0d0d0"
  }

  const mobileStyleimgHolderLanding = {
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
    "marginTop": "1px"
  }

  const shop = () => {
    history.push('/home/productsListing');
  }
  const sell = () => {
    localStorage.setItem('startSelling', true);
    history.push('/registerBusiness/addNew');
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
              {window.location.href.includes('landing') ? <div style={isMobile ? mobileStyleimgHolderLanding : imgHolderLanding} >
                <img
                  className="d-block w-100"
                  style={{"height": "29rem"}}
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
                {banner.BannerName && banner.BannerName.S === "Landingpage" ? (
                  <React.Fragment>
                    <h3 style={title}>{banner.Title && banner.Title.S}</h3>
                    <p style={subtitle} >{banner.Subtitle1 && banner.Subtitle1.S}</p>
                  </React.Fragment>
                ) : null}
                {banner.BannerName && banner.BannerName.S === "Landingpage" ? (
                  <React.Fragment>
                    <div style={btnLandingDiv}>
                    {!isMobile ? <button className="startshopping" onClick={shop}>Start Shopping</button> : null}
                    {!isMobile ? <button className="startselling" onClick={sell}>Start Business</button> : null}
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
