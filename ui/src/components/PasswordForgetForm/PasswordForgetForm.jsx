import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { withFirebase } from '../../utils/Firebase';

const INITIAL_STATE = {
  email: '',
  error: null,
};
class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    const { email } = this.state;
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { email, error } = this.state;
    const isInvalid = email === '';
    return (
      <Container className="form">
        <Row className="justify-content-center">
          <Col xs={10} md={6}>
            <h1>Reset your password</h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-input form-input__email">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  type="text"
                />
              </div>
              <div className="form-input form-input__button">
                <input disabled={isInvalid} type="submit" value="Reset" className="button button--primary"/>
              </div>
              {error && <p>{error.message}</p>}
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);
export default PasswordForgetForm;