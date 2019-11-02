import React, { useState } from 'react';
import { compose } from 'recompose';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useInput } from '../../utils/hooks/useInput';
import { withFirebase } from '../../utils/Firebase';


const SignUpFormBase = ({ firebase, history }) => {
  const { value:email, bind:bindEmail, reset:resetEmail } = useInput('');
  const { value:passwordOne, bind:bindPasswordOne, reset:resetPasswordOne } = useInput('');
  const { value:passwordTwo, bind:bindPasswordTwo, reset:resetPasswordTwo } = useInput('');
  const [error, setError] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    firebase
    .doCreateUserWithEmailAndPassword(email, passwordOne)
    .then(authUser => {
        setError(null);
        resetEmail();
        resetPasswordOne();
        resetPasswordTwo();
        history.push('/')
      })
      .catch((error) => {
        setError(error);
      }) 
  }

  const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '';

  return (
    <div>
      <p>Create Account:</p>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="text" {...bindEmail} />
          </label>
          <label>
            Password:
            <input type="text" {...bindPasswordOne} />
          </label>
          <label>
            Confirm Password:
            <input type="text" {...bindPasswordTwo} />
          </label>
          {error && <p>{error.message}</p>}
          <button type="submit" className="button button--primary" disabled={isInvalid}>Submit</button>
        </form>
    </div>
  );
};


SignUpFormBase.propTypes = {
  
};

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpForm;
