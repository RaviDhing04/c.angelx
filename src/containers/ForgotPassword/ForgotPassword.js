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
    res ? (res.user_status === 'VERIFIED' ? function() {setStep2(true); setLoading(false);}() : res.user_status === 'FORCE_CHANGE_PASSWORD' ? function() {setLoading(false); alert(res.message); props.history.replace(props.location.pathname + "?signUp=true")}() : setLoading(false)) : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());
    setEmail(email);
  };

  const confirmForgotPasswordUser = async event => {
    event.preventDefault();
    const formElements = event.target.elements;
    const email = userEmail;
    const current_password = formElements.formGroupCurrentPass.value;
    const password = formElements.formGroupPassword.value;
    const confirmPassword = formElements.formGroupConfirmPassword.value;
    if (password && confirmPassword) {
      if (password === confirmPassword) {
        setLoading(true);
        const res = await confirmForgotPassword({
          email: email,
          confirmation_code: current_password,
          new_password: password
        });
        res ? setLoading(false) : (function () { setLoading(false); (alert('something went wrong, Please try again!')) }());
        props.history.replace(props.location.pathname);
      } else {
        alert('Password and Confirm Password must be same');
      }
    }
  };

  const temp = props => {
    return (
      <div className="signUp-container">
        {loading ? <CustomLoader /> : null}
        <img
          onClick={() => { props.history.replace(props.location.pathname); setStep2(false) }}
          className="close"
          src={close}
          alt="close"
        ></img>
        <div className="left-section">
          <h2>Forgot Password</h2>
          <p>We do not share your personal details with anyone.</p>
        </div>
        {step2 ? (
          <div className="form-section">
            <Form id="forgotForm" onSubmit={e => confirmForgotPasswordUser(e)} autocomplete="off">
              <Form.Group controlId="formGroupCurrentPass">
                <Form.Label>Enter Confirmation Code</Form.Label>
                <Form.Control type="text" placeholder="Enter Code" key={1} required autocomplete="off" />
                <Form.Text className="text-muted">
                  Enter the confirmation code recieved on your email.
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formGroupPassword">
                <Form.Label>Enter New Password</Form.Label>
                <Form.Control type="password" placeholder="Password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$" required autocomplete="new-password" />
                <Form.Text className="text-muted">
                  Password must contain minimum 8 charachters (uppercase charachter, lowercase charachter, number and special charachter)
              </Form.Text>
              </Form.Group>
              <Form.Group controlId="formGroupConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$" required autocomplete="new-password" />
                <Form.Text className="text-muted">
                  Password must match the above password
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
          setStep2(false);
          props.history.replace(props.location.pathname);
        }}
        component={temp(props)}
        show={true}
      />
    )
  );
};

export default ForgotPassword;
