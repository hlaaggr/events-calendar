import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { useInput } from '../../utils/hooks/useInput';
import { withFirebase } from '../../utils/Firebase';

import '../../styles/form.scss'

const SignUpFormBase = ({ firebase, history, ...props }) => {
  const { value:email, bind:bindEmail, reset:resetEmail } = useInput('');
  const { value:passwordOne, bind:bindPasswordOne, reset:resetPasswordOne } = useInput('');
  const { value:passwordTwo, bind:bindPasswordTwo, reset:resetPasswordTwo } = useInput('');
  const { value:phoneNumber, bind:bindPhoneNumber, reset:resetPhoneNumber } = useInput('');
  const { value:notificationPreference, bind:bindNotificationPreference, reset:resetNotificationPreference } = useInput('');

  const [error, setError] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    firebase
      .doCreateUser(email, passwordOne, phoneNumber, notificationPreference)
        .then(() => {
          history.push("/");
        })
        .catch((error) => {
          setError(error.message);
        })
  }

  const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      phoneNumber === '' ||
      notificationPreference === '';

  return (
    <Container className="form">
      <Row className="justify-content-center">
        <Col xs={10} md={6}>
          <h1>Sign Up Here</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-input form-input__email">
              <label htmlFor="email">Email</label>
              <input id="email" type="text" {...bindEmail} />
            </div>

            <div className="form-input form-input__password">
              <label htmlFor="password"> Password </label>
              <input id="password" type="password" {...bindPasswordOne} />
            </div>

            <div className="form-input form-input__password">
              <label htmlFor="password-confirm"> Confirm Password </label>
              <input id="password-confirm" type="password" {...bindPasswordTwo} />
            </div>
            
            <div className="form-input form-input__phone-number">
              <label htmlFor="password-confirm"> Phone Number </label>
              <input id="phone-number" type="input" {...bindPhoneNumber} />
            </div>

            <div className="form-input form-input__phone-number">
              <label htmlFor="password-confirm"> Notification Preference </label>
              <input id="notification-preference" type="input" {...bindNotificationPreference} />
            </div>

            {error && <p>{error}</p>}

            <div className="form-input form-input__button">
              <input type="submit" value="submit" className="button button--primary" disabled={isInvalid}/>
            </div>
          </form>
          <div className="form__helper-text">
            Already have an account?
            <a onClick={() => props.setIsLoginPage(true)} className="cta"> Sign in here! </a>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

SignUpFormBase.propTypes = {
  
};

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpForm;
