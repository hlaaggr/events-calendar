import React, { Component } from 'react';
import { withAuthorization } from '../utils/Session';
import { withFirebase } from '../utils/Firebase';
import { compose } from 'recompose';
import DeleteEventButton from '../components/DeleteEventButton';

class Manage extends Component {
  state = {
    events: [],
  }

  componentDidMount() {
    const { firebase } = this.props;
    firebase.doGetEvents()
      .then((result) => {
        console.log(result);
        this.setState({
          events: result,
        })
      });
  }
  render() {
    // const { events } = this.state;
    return (
      <div>
        {this.state.events.map(({id, ...data}) => (
          <div key={data.eventTitle}>
            <h2>{data.eventTitle}</h2>
            <h3>{data.startDate}</h3>
            <p>{data.eventDescription}</p>
            <DeleteEventButton eventId={id} />
          </div>
        ))}
      </div>
    );
  }
}

const condition = authUser => authUser && authUser.email === "hlaa-grr@hearingloss-grr.org";

export default compose(
  withAuthorization(condition),
  withFirebase,
)(Manage);
