import React, { useState, useEffect } from "react";
import CenterModal from "../../components/CenterModal/CenterModal";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import { Form, Button } from "react-bootstrap";
import close from "../../assets/close.svg";
import "./Logout.scss";

const Logout = props => {

  const logoutUser = () => {
    localStorage.clear();
    setTimeout(() => {
      props.history.replace('/landing');
    }, 1000)
  }

  const temp = props => {
    return (
      <div className="logout-container">
        <img
          onClick={() => props.history.replace('/landing')}
          className="close"
          src={close}
          alt="close"
        ></img>
        <div className="section">
          <h2>Logout</h2>
          <p>Are you sure you want to logout</p>
          <div className="buttons">
            <button className="logout-btn" onClick={logoutUser}> Yes </button>
            <button className="logout-btn" onClick={() =>
              props.history.replace(props.location.pathname)} > No </button>
          </div>
        </div>
      </div>
    );
  };

  let params = new URLSearchParams(props.location.search);
  return (
    params.get("logout") && (
      <CenterModal
        onHide={() => {
          props.history.replace('/landing');
        }}
        component={temp(props)}
        show={true}
      />
    )
  );
};

export default Logout;
