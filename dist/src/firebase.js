"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const firebaseConfig = {
    apiKey: "AIzaSyD9jU33xJqX8TUYx82RdYK6gGz4RUPkQhA",
    authDomain: "fullstack-challenge-f6d31.firebaseapp.com",
    projectId: "fullstack-challenge-f6d31",
    storageBucket: "fullstack-challenge-f6d31.appspot.com",
    messagingSenderId: "709568762854",
    appId: "1:709568762854:web:59c0bbfc65d0d0c7d07c27"
};
(0, app_1.initializeApp)(firebaseConfig);
const db = (0, firestore_1.getFirestore)();
exports.db = db;
//# sourceMappingURL=firebase.js.map