import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import config from './config';

class Firebase {
    constructor() {
      app.initializeApp(config);
      this.auth = app.auth();
      this.db = app.firestore();
    }

    doSignInWithGoogle = () => {
        const provider = this.auth.GoogleAuthProvider();
        return this.auth.signInWithPopup(provider)
            .then(function(result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // var token = result.credential.accessToken;
                // The signed-in user info.
                // var user = result.user;
                // ...
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
    }
    
    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
    
    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    doCreateUser = (email, password, phoneNumber, notificationPreference) => {
        return this.auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                return this.db.collection('user_profiles').add({
                    authUid: authUser.user.uid,
                    email: authUser.user.email,
                    phoneNumber: phoneNumber,
                    notificationPreference: notificationPreference,
                })
                .catch((error) => {
                    console.error(error);
                });
            })
            .catch((error) => {
                console.error(error);
            })
    }

    doGetUser = (user) => {
        
    }

    doGetUsers = () => {

    }

    // Not Tested
    doUpdateUser = (user, data) => {
        return user.update(data)
            .catch((error) => {
                console.log(error);
            });
    }

    // Not Tested
    doDeleteUser = (user) => {
        return user.delete()
            .then(() => {
                return this.db.collection('user_profiles').delete()
                    .catch((error) => {
                        console.error(error);
                    });
            }).catch((error) => {
                console.error(error);
            })
    }

    // Needs testing
    doCreateEvent = (newEvent) => {
        return this.db.collection('events').add(newEvent)
        .catch((error) => {
            console.error(error);
        });
    }

    // Tested and working
    doGetEvents = () => {
        return this.db.collection('events').get()
            .then((results) => {
                return results.docs.map((doc) => {
                    const data = doc.data();
                    // Return an object with the ID and event Data, as they are not grouped together
                    // in firebase
                    return {
                        id: doc.id,
                        ...data,
                    }
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    doUpdateEvent = (event) => {

    }

    // Tested and working
    doDeleteEvent = (eventId) => {
        console.log(eventId);
        return this.db.collection('events').doc(eventId).delete()
            .catch((error) => {
                console.error(error);
            })
    }
}

export default Firebase;
