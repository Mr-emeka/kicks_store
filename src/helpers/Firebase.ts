import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const {
  REACT_APP_apiKey,
  REACT_APP_authDomain,
  REACT_APP_databaseURL,
  REACT_APP_projectId,
  REACT_APP_storageBucket,
  REACT_APP_messagingSenderId,
  REACT_APP_appId,
  // REACT_APP_measurementId,
} = process.env;

const config = {
  apiKey: REACT_APP_apiKey,
  authDomain: REACT_APP_authDomain,
  databaseURL: REACT_APP_databaseURL,
  projectId: REACT_APP_projectId,
  storageBucket: REACT_APP_storageBucket,
  messagingSenderId: REACT_APP_messagingSenderId,
  appId: REACT_APP_appId,
  // measurementId: REACT_APP_measurementId,
};

export default class Firebase {
  auth: app.auth.Auth;
  db: app.firestore.Firestore;
  bucket: app.storage.Storage;
  googleProvider = new app.auth.GoogleAuthProvider();
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
    this.bucket = app.storage();
    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.googleProvider.setCustomParameters({ prompt: "select_account" });
  }

  createUserProfileDocument = async (userAuth: any, additionalData: any) => {
    if (!userAuth) return;
    const userRef = this.db.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData,
        });
      } catch (err) {
        console.log("error creating user", err.message);
      }
    }
    return userRef;
  };

  addCollectionAndDocuments = async (collectionKey: any, objectsToAdd: any) => {
    const collectionRef = this.db.collection(collectionKey);
    const batch = this.db.batch();
    objectsToAdd.forEach((obj: any) => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj);
    });
    await batch.commit();
  };

  convertCollectionSnapshotToMap = (collections: any) => {
    const transformedCollections = collections.docs.map((doc: any) => {
      const { title, items } = doc.data();
      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items,
      };
    });
    return transformedCollections.reduce((acc: any, collection: any) => {
      acc[collection.title.toLowerCase()] = collection;
      return acc;
    }, {});
  };

  getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = this.auth.onAuthStateChanged((userAuth) => {
        unsubscribe();
        resolve(userAuth);
      }, reject);
    });
  };

  isAdmin = async (uid: string) => {
    const userRef = await this.db.doc(`users/${uid}`);
    const snapShot = userRef.get();
    const data = snapShot.then((doc) => {
      return doc.data();
    });
    return data;
  };

  signInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);
}
