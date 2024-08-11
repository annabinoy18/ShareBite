// donate.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// Your web app's Firebase configuration (same as in your login.js)
const firebaseConfig = {
    apiKey: "AIzaSyDIABA24iizE_UfVJoYCMvjHYW1hK7rhXc",
    authDomain: "sharebite-c04fc.firebaseapp.com",
    projectId: "sharebite-c04fc",
    storageBucket: "sharebite-c04fc.appspot.com",
    messagingSenderId: "419532187582",
    appId: "1:419532187582:web:70c35396917e2a2da77bef",
    databaseURL: "https://sharebite-c04fc-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Handle the donation form submission
document.getElementById('donationForm')?.addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Collect form data
    const category = document.getElementById('category').value;
    const foodname = document.getElementById('food-item').value;
    const location = document.getElementById('address').value;
    const phone= document.getElementById('phone').value;
    const count = document.getElementById('count').value;
    const note = document.getElementById('notes').value;

    try {
        const user = auth.currentUser;
        console.log(user);
        
        if (!user) {
            alert('You must be logged in to donate food.');
            return;
        }

        // Prepare the data to be saved to Firestore
        const donationData = {
            category: category,
            foodname: foodname,
            location: location,
            phone:phone,
            count: count,
            note: note,
            donorId: user.uid,
            timestamp: Date.now()
        };

        // Add the donation data to Firestore
        await addDoc(collection(db, "donations"), donationData);

        // Redirect to thank you page
        window.location.href = 'thankyou.html';
    } catch (error) {
        console.error("Error adding donation: ", error);
        alert(`Error: ${error.message}`);
    }
});
