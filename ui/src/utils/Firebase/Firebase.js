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

    // Auth API
    // doCreateUserWithEmailAndPassword = (email, password) =>
    //     this.auth.createUserWithEmailAndPassword(email, password);
    
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

    doGetUser = (authUid) => {
        return this.db.collection('user_profiles')
            .where('authUid', '==', authUid)
            .limit(1)
            .get()
            .then(snapshot => {
                if (snapshot.empty) {
                    return Promise.reject({message: "User does not exist"});
                } else {
                    const userData = snapshot.docs[0].data();
                    return Promise.resolve({
                        id: snapshot.docs[0].id,
                        ...userData
                    });
                }
            });
    }

    doGetUsers = () => {

    }

    doUpdateUser = (userId, data) => {
        return this.db.collection('user_profiles')
            .doc(userId)
            .update(data);
    }

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

    doCreateEvent = () => {
        return this.db.collection('events').add({
            // Event Fields
        })
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
