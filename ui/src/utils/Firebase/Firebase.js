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

    doCreateEvent = (newEvent) => {
        return this.db.collection('events').add(newEvent)
        .catch((error) => {
            console.error(error);
        })
    }

    doGetEvent = (event) => {
        
    }

    doUpdateEvent = (event) => {

    }

    doDeleteEvent = (event) => {

    }
}

export default Firebase;
