import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useInput, useCheckBox } from '../utils/hooks/useInput';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../utils/Firebase';

import '../styles/form.scss';

const NewEvent = ({ user, history, firebase }) => {
  const { value: eventContact, bind: bindEventContact } = useInput('');
  const { value: hostName, bind: bindHostName } = useInput('');
  const { value: hostLocation, bind: bindHostLocation } = useInput('');
  const { value: addressOne, bind: bindAddressOne } = useInput('');
  const { value: addressTwo, bind: bindAddressTwo } = useInput('');
  const { value: city, bind: bindCity } = useInput('');
  const { value: state, bind: bindState } = useInput('');
  const { value: zipcode, bind: bindZipcode } = useInput('');
  const { value: contactNumber, bind: bindContactNumber } = useInput('');
  const { value: communicationMode, bind: bindCommunicationMode } = useInput('');
  const { value: eventLink, bind: bindEventLink } = useInput('');
  const { value: eventTitle, bind: bindEventTitle } = useInput('');
  const { value: category, bind: bindCategory } = useInput('');
  const { value: cost, bind: bindCost } = useInput('');
  const { value: howToPay, bind: bindHowToPay } = useInput('');
  const { value: rsvpLink, bind: bindRsvpLink } = useInput('');
  const { value: startDate, bind: bindStartDate } = useInput('');
  const { value: endDate, bind: bindEndDate } = useInput('');
  const { value: startTime, bind: bindStartTime } = useInput('');
  const { value: endTime, bind: bindEndTime } = useInput('');
  const { value: cart, bind: bindCart } = useInput(''); 
  const { value: notes, bind: bindNotes } = useInput(''); 
  const { value: parking, bind: bindParking } = useInput(''); 
  const { value: refreshments, bind: bindRefreshments } = useInput(''); 
  const { checked: isLooped, bind: bindIsLooped } = useCheckBox(false); 
  const { checked: hasASLInterpreter, bind: bindHasASLInterpreter } = useCheckBox(false);
  const { checked: isAccessibleVenue, bind: bindIsAccessibleVenue } = useCheckBox(false); 

  const [error, setError] = useState(null);

  if (!user) {
    return (<>You must be signed in to continue</>);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // waiting on backend to be built
    const newEvent = {
      eventContact,
      hostName,
      hostLocation,
      addressOne,
      addressTwo,
      city,
      state,
      zipcode,
      contactNumber,
      communicationMode,
      hasASLInterpreter,
      eventLink,
      eventTitle,
      category,
      cost,
      howToPay,
      rsvpLink,
      startDate,
      endDate,
      startTime,
      endTime,
      cart,
      isLooped,
      notes,
      parking,
      refreshments,
      isAccessibleVenue,
    };

    firebase
      .doCreateEvent(newEvent)
        .then(()=> {
          history.push('/');
        })
        .catch((error) => {
          console.error(error);
        })
  }

  const allInputs = [
    { label: "Event Contact (email)", func: bindEventContact },
    { label: "host name", func: bindHostName },
    { label: 'event title', func: bindEventTitle },
    { label: 'host location', func: bindHostLocation },
    { label: 'address one', func: bindAddressOne },
    { label: 'address two', func: bindAddressTwo },
    { label: 'city', func: bindCity },
    { label: 'state', func: bindState },
    { label: 'zip code', func: bindZipcode },
    { label: 'contact number',func: bindContactNumber },
    { label: 'primary communication method', func: bindCommunicationMode },
    { label: 'event link', func: bindEventLink },
    { label: 'event category', func: bindCategory },
    { label: 'cost to attend', func: bindCost },
    { label: 'how to pay', func: bindHowToPay },
    { label: 'rsvp link', func: bindRsvpLink },
    { label: 'start date', func: bindStartDate, type: "date" },
    { label: 'end date', func: bindEndDate, type: "date" },
    { label: 'start time', func: bindStartTime, type: "time" },
    { label: 'end time', func: bindEndTime, type: "time" },
    { label: 'CART', func: bindCart },
    { label: 'parking', func: bindParking },
    { label: 'refreshments', func: bindRefreshments },
    { label: 'notes', func: bindNotes, type: "textarea" },
    { label: 'accessible venue', func: bindIsAccessibleVenue, type: "checkbox" },
    { label: 'asl interpreter present', func: bindHasASLInterpreter, type: "checkbox" },
    { label: 'Looped?', func: bindIsLooped, type: "checkbox" }
  ]

  return (
    <Container className="form">
      <h1 className="my-5">Create An Event</h1>
      <form onSubmit={handleSubmit}>
        <Row className="justify-content-center">
          {allInputs.map((input, index) => 
            (
              <React.Fragment key={index}>
                {InputField(input.label, input.func, input.type)} 
              </React.Fragment>
            )
            )}
          {error && <p>{error}</p>}

          <div className="form-input form-input__button">
            <input type="submit" value="Submit" className="button button--primary" />
          </div>
        </Row>
      </form>
    </Container>
  );
}

export default compose(
  withFirebase,
  withRouter,
)(NewEvent);

const InputField = (label, func, type = "text") => {
  return (
      <div className="form-input">
        <label htmlFor={`${label}`} style={{textTransform: "capitalize"}}> {label} </label>
        {type === "textarea" ? (
          <textarea id={`${label}`} {...func} rows="3"/>
        ) : (
          <input id={`${label}`} type={type} {...func} />
        )}
      </div>

  );
}
