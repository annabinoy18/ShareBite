import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIABA24iizE_UfVJoYCMvjHYW1hK7rhXc",
  authDomain: "sharebite-c04fc.firebaseapp.com",
  projectId: "sharebite-c04fc",
  storageBucket: "sharebite-c04fc.appspot.com",
  messagingSenderId: "419532187582",
  appId: "1:419532187582:web:70c35396917e2a2da77bef",
  databaseURL: "https://sharebite-c04fc-default-rtdb.firebaseio.com/",  // Make sure this URL matches your Realtime Database
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Realtime Database
const auth = getAuth(app);
const db = getFirestore(app);

const submit = document.getElementById('submit');
submit?.addEventListener("click", async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, username, password);
        // Successfully signed in
        const user = userCredential.user;
        alert("Successfully logged in!");
        window.location.href = "dashboard.html";
    } catch (error) {
        const errorMessage = error.message;
        alert(`Error: ${errorMessage}`);
    }
});

const signup = document.getElementById('signup');

signup?.addEventListener("click", async function(event) {
    console.log("Click is working....");
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const place = document.getElementById('place').value;
    const district = document.getElementById('district').value;
    const state = document.getElementById('state').value;
    // const password = document.getElementById('password').value;

    try {
        // const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // const user = userCredential.user;
        const user = auth.currentUser;
        
        console.log(user);
        // const databaseRef = ref(database, 'users/' + user.uid);
        // console.log(databaseRef);
        
        const userData = {
            name: name,
            email: email,
            phone: phone,
            address: address,
            place: place,
            district: district,
            state: state,
            last_login: Date.now(),
            userId: user.uid
        };

        await addDoc(collection(db, "users"), userData);
        window.location.href = "login.html";

        // alert("Successfully signed up!");
        // window.location.href = "login.html";
    } catch (error) {
        const errorMessage = error.message;
        alert(`Error: ${errorMessage}`);
    }
});

