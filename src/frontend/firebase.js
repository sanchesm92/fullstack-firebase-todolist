// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9jU33xJqX8TUYx82RdYK6gGz4RUPkQhA",
  authDomain: "fullstack-challenge-f6d31.firebaseapp.com",
  projectId: "fullstack-challenge-f6d31",
  storageBucket: "fullstack-challenge-f6d31.appspot.com",
  messagingSenderId: "709568762854",
  appId: "1:709568762854:web:59c0bbfc65d0d0c7d07c27"
};

// Initialize Firebase
const firebaseInit = () => initializeApp(firebaseConfig);
export {firebaseInit}