import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { useInput } from '../../utils/hooks/useInput';
import { withFirebase } from '../../utils/Firebase';

const LoginFormBase = ({ firebase, history }) => {
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
        setError(error);
      });
  }
  return (
    <div>
      <p>Please sign in:</p>
      <form onSubmit={handleSubmit}>
        {/* <button type="button" onClick={signInWithGoogle}>Sign in with Google</button> */}
        <label>
          Email:
          <input type="text" {...bindEmail} />
        </label>
        <label>
          Password:
          <input type="password" {...bindPassword} />
        </label>
        {error && <p>{error.message}</p>}
        <input type="submit" value="Submit" className="button button--primary" />
      </form>
    </div>
  );
};


LoginFormBase.propTypes = {
  
};

const LoginForm = compose(
  withRouter,
  withFirebase,
)(LoginFormBase);

export default LoginForm;
