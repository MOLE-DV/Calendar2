import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyC1zI6uHZnQx2fuR3bC8oFCjPPvOfP9Qoc",
    authDomain: "okalendar-e64f7.firebaseapp.com",
    databaseURL: "https://okalendar-e64f7-default-rtdb.firebaseio.com",
    projectId: "okalendar-e64f7",
    storageBucket: "okalendar-e64f7.appspot.com",
    messagingSenderId: "1031413878025",
    appId: "1:1031413878025:web:317891a01f397a002fd7d8",
    measurementId: "G-JH7E6J70N8"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db }