import { initializeApp, getApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA4D6mUpt98kdKtdGy0DqHoY2W09KQI46Y',
  authDomain: 'chat-app-f401b.firebaseapp.com',
  projectId: 'chat-app-f401b',
  storageBucket: 'chat-app-f401b.appspot.com',
  messagingSenderId: '1042363916345',
  appId: '1:1042363916345:web:28355cda3e23fce360ede8',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = initializeFirestore(app, {experimentalForceLongPolling: true});

export { db, auth };
