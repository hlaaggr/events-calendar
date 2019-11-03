import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'recompose';
import { useInput } from '../../utils/hooks/useInput';
import { withFirebase } from '../../utils/Firebase';

import '../../styles/form.scss'

const LoginFormBase = ({ firebase, history, ...props }) => {
  const { value:email, bind:bindEmail, reset:resetEmail } = useInput('');
  const { value:password, bind:bindPassword, reset:resetPassword } = useInput('');
  const [error, setError] = useState(null);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(authUser => {
        setError(null);
        resetEmail();
        resetPassword();
        history.push('/');
      })
      .catch(error => {
        setError(error.message);
      });
  }
  return (
    <Container className="form">
      <Row className="justify-content-center">
        <Col xs={10} md={6}>
          <h1>Sign In Here</h1>
          <form onSubmit={handleSubmit}>
            {/* <button type="button" onClick={signInWithGoogle}>Sign in with Google</button> */}
            <div className="form-input form-input__email">
              <label htmlFor="email"> Email </label>
              <input id="email" type="text" {...bindEmail} />
            </div>

            <div className="form-input form-input__password">
              <label htmlFor="password"> Password </label>
              <input id="password" type="password" {...bindPassword} />
            </div>

            {error && <p>{error}</p>}
            <div className="form-input form-input__button">
              <input type="submit" value="Submit" className="button button--primary" />
            </div>
          </form>
          <div className="form__helper-text">
            Don't have an account? 
            <a onClick={() => props.setIsLoginPage(false)} className="cta"> Sign up here! </a>
          </div>
          <div className="form__helper-text">
            <Link to="/forgot" className="cta--secondary"> Forgot your password?</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const LoginForm = compose(
  withRouter,
  withFirebase,
)(LoginFormBase);

export default LoginForm;
