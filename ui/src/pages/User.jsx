import React, { useState, useEffect, Fragment } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { withAuthorization } from '../utils/Session';
import { useInput } from '../utils/hooks/useInput';

import '../styles/form.scss'

const nullUser = {
  authUid: '',
  email: '',
  displayName: '',
  phoneNumber: '',
  notificationPreference: ''
}

// TODO: Improve data fetching, loading display, and error handling
const User = ({ user, firebase }) => {
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(nullUser);
  useEffect(() => {
    if (loading) {
      firebase.doGetUser(user.uid)
        .then(user => {
          setUserProfile(user);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  });

  const saveUserProfile = (profileData) => {
    return firebase.doUpdateUser(
      profileData.id,
      { ...profileData }
    )
  }

  return (
    <Container>
      {
        loading ?
          <Fragment>Loading...</Fragment>
          :
          <UserProfile profile={userProfile} saveChanges={saveUserProfile} />
      }
    </Container>
  );
};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(User);

// TODO: Move this into a separate profile
const UserProfile = ({ profile, saveChanges }) => {
  const [isFormEnabled, enableEdit] = useState(false);
  const isFormDisabled = !isFormEnabled;

  const { value: displayName, bind: bindDisplayName } = useInput(profile.displayName || '');
  const { value: phoneNumber, bind: bindPhoneNumber } = useInput(profile.phoneNumber || '');
  const { value: notificationPreference, bind: bindNotificationPreference } = useInput(profile.notificationPreference || '');

  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    saveChanges({
      id: profile.id,
      displayName,
      phoneNumber,
      notificationPreference
    }).then(() => {
      enableEdit(false);
    }).catch(error => {
      setError(error.message);
    });
  }

  return (
    <Fragment>
      <h1>Account Details</h1>

      <Form className="form user-profile-form" onSubmit={handleSubmit}>
        {
          isFormDisabled ?
            <Button
              key="toggle"
              variant="primary"
              type="button"
              onClick={enableEdit}
            >
              Edit
        </Button>
            :
            <Button
              key="submit"
              variant="primary"
              type="submit"
              disabled={isFormDisabled}
            >
              Save
        </Button>
        }

        {
          error &&
          <div className="invalid">
            {error}
          </div>
        }

        <Form.Group controlId="userEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" defaultValue={profile.email} disabled={true} />
        </Form.Group>
        <Form.Group controlId="userDisplayName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Name" {...bindDisplayName} disabled={isFormDisabled} />
        </Form.Group>
        <Form.Group controlId="userPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" placeholder="(555) 555-5555" {...bindPhoneNumber} disabled={isFormDisabled} />
        </Form.Group>
        <Form.Group controlId="userNotificationPreference">
          <Form.Label>Notification Preference</Form.Label>
          <Form.Control type="text" placeholder="Email, SMS, or Phone Call" {...bindNotificationPreference} disabled={isFormDisabled} />
        </Form.Group>

      </Form>
    </Fragment>
  )
}
