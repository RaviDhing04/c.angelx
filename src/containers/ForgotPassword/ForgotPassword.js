import React, { useState, useEffect } from "react";
import CenterModal from "../../components/CenterModal/CenterModal";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import { Form, Button } from "react-bootstrap";
import close from "../../assets/close.svg";
import { forgotPassword, confirmForgotPassword } from "../../store/actions";
import "./ForgotPassword.scss";

const ForgotPassword = props => {
  const [step2, setStep2] = useState(false);
  const [userEmail, setEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      setStep2(false);
    };
  }, []);

  const forgotPasswordUser = async event => {
    event.preventDefault();
    const formElements = event.target.elements;
    const email = formElements.formGroupEmail.value;
    // const password = formElements.formGroupPassword.value;
    setLoading(true);
    const res = await forgotPassword({ email: email });
    res ? setLoading(false) : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());
    setEmail(email);
    if (res.user_status === "FORCE_CHANGE_PASSWORD") {
      setStep2(true);
    }
  };

  const confirmForgotPasswordUser = async event => {
    event.preventDefault();
    const formElements = event.target.elements;
    const email = userEmail;
    const current_password = formElements.formGroupCurrentPass.value;
    const password = formElements.formGroupPassword.value;
    setLoading(true);
    const res = await confirmForgotPassword({
      email: email,
      current_password: current_password,
      new_password: password
    });
    res ? setLoading(false) : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());
    props.history.replace(props.location.pathname);
  };

  const temp = props => {
    return (
      <div className="signUp-container">
        {loading ? <CustomLoader /> : null}
        <img
          onClick={() => props.history.replace(props.location.pathname)}
          className="close"
          src={close}
          alt="close"
        ></img>
        <div className="left-section">
          <h2>Signup</h2>
          <p>We do not share your personal details with anyone.</p>
        </div>
        {step2 ? (
          <div className="form-section">
            <Form onSubmit={e => confirmForgotPasswordUser(e)}>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Enter Confirmation Code</Form.Label>
                <Form.Control type="text" placeholder="Enter Code" required />
                <Form.Text className="text-muted">
                  Enter the confirmation code recieved on your email.
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formGroupPassword">
                <Form.Label>Enter New Password</Form.Label>
                <Form.Control type="password" placeholder="Password" required />
                <Form.Text className="text-muted">
                  Password must contain minimum 8 charachters (uppercase charachter, lowercase charachter, number and special charachter)
              </Form.Text>
              </Form.Group>

              <Button className="signUp-btn" type="submit">
                Signup
              </Button>
            </Form>
          </div>
        ) : (
            <div className="form-section">
              <Form onSubmit={e => forgotPasswordUser(e)}>
                <Form.Group controlId="formGroupEmail">
                  <Form.Label>Enter Registered Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" required />
                </Form.Group>
                <Button type="submit" className="signUp-btn">
                  Continue
              </Button>
              </Form>
            </div>
          )}
      </div>
    );
  };

  let params = new URLSearchParams(props.location.search);
  return (
    params.get("resetPass") && (
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

export default ForgotPassword;
