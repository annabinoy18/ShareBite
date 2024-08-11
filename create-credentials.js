import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIABA24iizE_UfVJoYCMvjHYW1hK7rhXc",
  authDomain: "sharebite-c04fc.firebaseapp.com",
  projectId: "sharebite-c04fc",
  storageBucket: "sharebite-c04fc.appspot.com",
  messagingSenderId: "419532187582",
  appId: "1:419532187582:web:70c35396917e2a2da77bef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth();

const submit = document.getElementById('submit');
submit.addEventListener("click", async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, username, password);
        // Signed up 
        const user = userCredential.user;
        alert("Credentials created successfully...!");
        window.location.href = "signup.html";
        // Handle successful signup here
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`Error: ${errorMessage}`);
        // Handle errors here
    }
});
