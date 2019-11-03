import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useInput } from '../utils/hooks/useInput';

import '../styles/form.scss';

const NewEvent = ({ user }) => {
  const { value: email, bind: bindEmail } = useInput('');
  const { value: hostName, bind: bindHostName } = useInput('');
  const { value: hostLocation, bind: bindHostLocation } = useInput('');
  const { value: addressOne, bind: bindAddressOne } = useInput('');
  const { value: addressTwo, bind: bindAddressTwo } = useInput('');
  const { value: city, bind: bindCity } = useInput('');
  const { value: state, bind: bindState } = useInput('');
  const { value: zipcode, bind: bindZipcode } = useInput('');
  const { value: contactNumber, bind: bindContactNumber } = useInput('');
  const { value: communicationMode, bind: bindCommunicationMode } = useInput('');
  const { value: hasASLInterpreter, bind: bindHasASLInterpreter } = useInput('');
  const { value: eventLink, bind: bindEventLink } = useInput('');
  const { value: eventDescription, bind: bindEventDescription } = useInput('');
  const { value: category, bind: bindCategory } = useInput('');
  const { value: cost, bind: bindCost } = useInput('');
  const { value: howToPay, bind: bindHowToPay } = useInput('');
  const { value: rsvpLink, bind: bindRsvpLink } = useInput('');
  const { value: startDate, bind: bindStartDate } = useInput('');
  const { value: endDate, bind: bindEndDate } = useInput('');
  const { value: startTime, bind: bindStartTime } = useInput('');
  const { value: endTime, bind: bindEndTime } = useInput('');
  const { value: cart, bind: bindCart } = useInput(''); 
  const { value: isLooped, bind: bindIsLooped } = useInput(''); 
  const { value: notes, bind: bindNotes } = useInput(''); 
  const { value: parking, bind: bindParking } = useInput(''); 
  const { value: refreshments, bind: bindRefreshments } = useInput(''); 
  const { value: isAccessibleVenue, bind: bindIsAccessibleVenue } = useInput(''); 

  const [error, setError] = useState(null);

  if (!user) {
    return (<>You must be signed in to continue</>);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // waiting on backend to be built
  }

  const allInputs = [
    {
      label: "email",
      func: bindEmail
    },
    {
      label: "host name",
      function: bindHostName
    },
    {
      label: 'host location',
      function: bindHostLocation
    },
    {
      label: 'address one',
      function: bindAddressOne
    },
    {
      label: 'address two',
      function: bindAddressTwo
    },
    {
      label: 'city',
      function: bindCity
    },
    {
      label: 'state',
      function: bindState
    },
    {
      label: 'zip code',
      function: bindZipcode
    },
    {
      label: 'contact number',
      function: bindContactNumber
    },
    {
      label: 'primary communication method',
      function: bindCommunicationMode
    },
    {
      label: 'event link',
      function: bindEventLink
    },
    {
      label: 'event description',
      function: bindEventDescription
    },
    {
      label: 'event category',
      function: bindCategory
    },
    {
      label: 'cost to attend',
      function: bindCost
    },
    {
      label: 'how to pay',
      function: bindHowToPay
    },
    {
      label: 'rsvp link',
      function: bindRsvpLink
    },
    {
      label: 'start date',
      function: bindStartDate,
      type: "date"
    },
    {
      label: 'end date',
      function: bindEndDate,
      type: "date"
    },
    {
      label: 'start time',
      function: bindStartTime,
      type: "time"
    },
    {
      label: 'end time',
      function: bindEndTime,
      type: "time"
    },
    {
      label: 'CART',
      function: bindCart
    },
    {
      label: 'notes',
      function: bindNotes
    },
    {
      label: 'parking',
      function: bindParking
    },
    {
      label: 'refreshments',
      function: bindRefreshments
    },
    {
      label: 'accessible venue',
      function: bindIsAccessibleVenue,
      type: "checkbox"
    },
    {
      label: 'asl interpreter present',
      function: bindHasASLInterpreter,
      type: "checkbox"
    },
    {
      label: 'Looped?',
      function: bindIsLooped,
      type: "checkbox"
    },
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

export default NewEvent;

const InputField = (label, func, type = "text") => {
  return (
      <div className="form-input">
        <label htmlFor={`${label}`} style={{textTransform: "capitalize"}}> {label} </label>
        <input id={`${label}`} type={type} {...func} />
      </div>

  );
}
