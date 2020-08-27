import React, { useState } from "react";
import CenterModal from "../../components/CenterModal/CenterModal";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import { Form, Button } from "react-bootstrap";
import close from "../../assets/close.svg";
import { login } from "../../store/actions";
import "./Login.scss";

const Login = props => {
  const [loading, setLoading] = useState(false);

  const loginUser = async event => {
    event.preventDefault();
    const formElements = event.target.elements;
    const email = formElements.formGroupEmail.value;
    const password = formElements.formGroupPassword.value;
    setLoading(true);
    const res = await login({ email: email, password: password });
    res ? (res === 'reset' ? setLoading(false) : res === 'success' ? (function () { setLoading(false); props.location.pathname.includes('landing') ? (localStorage.getItem('startSelling') ? (function () { localStorage.removeItem('startSelling'); props.history.replace('/registerBusiness/addNew'); }()) : props.history.replace('/home/productsListing')) : props.history.replace(props.location.pathname) }()) : setLoading(false)) : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());
  };

  const temp = props => {
    return (
      <div className="login-container">
        {loading ? <CustomLoader /> : null}
        <img
          onClick={() => props.history.replace(props.location.pathname)}
          className="close"
          src={close}
          alt="close"
        ></img>
        <div className="left-section">
          <h2>Login</h2>
          <p>Get access to your Orders, Wishlist and Recommendations</p>
        </div>
        <div className="form-section">
          <Form onSubmit={e => loginUser(e)}>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Enter Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" required />
            </Form.Group>

            <Form.Group controlId="formGroupPassword">
              <Form.Label>Enter Password</Form.Label>
              <Form.Control type="password" placeholder="Password" required />
            </Form.Group>
            <Button className="login-btn" type="submit">
              Login
            </Button>
            <span
              onClick={() =>
                props.history.replace(
                  props.location.pathname + "?resetPass=true"
                )
              }
              className="forgot-pass"
            >
              {" "}
              Forgot Password ?
            </span>
          </Form>
          <div
            onClick={() =>
              props.history.replace(props.location.pathname + "?signUp=true")
            }
            className="signup-link"
          >
            New to C-Angelx? Create an account
          </div>
        </div>
      </div>
    );
  };

  let params = new URLSearchParams(props.location.search);
  return (
    params.get("login") && (
      <CenterModal
        onHide={() => {
          props.history.replace(props.location.pathname);
        }}
        component={temp(props)}
        show={true}
      />
    )
  );
};

export default Login;
