import React from 'react';

// create a function that take a path and then return HOC
// const withAuthProtection = redirectPath => HOC
const withAuthProtection = (firebase, redirectPath) => WrappedComponent => {
    class WithAuthProtection extends React.Component {
      componentDidMount() {
        // use history from parent.
        const { history } = this.props;
        console.log(firebase.auth().currentUser);
        if (!firebase.auth().currentUser) {
          // no auth at the beginning of the app, redirect them to login.
          return history.push(redirectPath)
        }
      }
      componentWillReceiveProps(nextProps) {
        const { user, history } = this.props;
        const { user: nextUser } = nextProps;
        if (user && !nextUser) {
          // this case is a must,
          // if user stay at auth route while they signing out
          // we must take them to login again immediately.
          history.push(redirectPath)
        }
      }
      render() {
        const { user } = this.props;
        if (!user) {
          // don't render anything if no auth
          return null
        }
        return <WrappedComponent {...this.props} />
      }
    }
     
    return WithAuthProtection
  }

  export default withAuthProtection;