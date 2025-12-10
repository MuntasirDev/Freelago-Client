// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYJHU5FVbpjdMGB0tmZ9QTK19VXB0O1Zo",
  authDomain: "freelago-c070c.firebaseapp.com",
  projectId: "freelago-c070c",
  storageBucket: "freelago-c070c.firebasestorage.app",
  messagingSenderId: "385510109708",
  appId: "1:385510109708:web:215f6df443b63e34903429"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default auth;