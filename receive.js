// receive.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// Firebase configuration
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
const db = getFirestore(app);

// Container to hold the donor cards
const donorCardsContainer = document.getElementById('donor-cards');

// Function to create a donor card
function createDonorCard(donor) {
    const card = document.createElement('div');
    card.classList.add('donor-card');
    
    card.innerHTML = `
        <h2>${donor.foodname}</h2>
        <p>Category: ${donor.category}</p>
        <p>Count: ${donor.count}</p>
        <p>Donor Location: ${donor.location}</p>
        <p>Donor Phone: ${donor.phone}</p>
        <p>Note: ${donor.note}</p>
        <button class="claim-btn" data-donor-id="${donor.donorId}">Claim Donation</button>
    `;
    
    donorCardsContainer.appendChild(card);

    // Attach event listener to the claim button
    const claimButton = card.querySelector('.claim-btn');
    claimButton.addEventListener('click', () => {
        handleClaimDonation(donor.donorId, card);
    });
}



// Fetch data from Firestore and create cards
async function fetchDonations() {
    try {
        const querySnapshot = await getDocs(collection(db, "donations"));
        
        querySnapshot.forEach((doc) => {
            const donorData = doc.data();
            createDonorCard(donorData);
        });
    } catch (error) {
        console.error("Error fetching documents: ", error);
    }
}

// Function to handle claiming a donation and deleting the card
async function handleClaimDonation(donorId, card) {
    if (confirm("Are you sure you want to claim this donation?")) {
        try {
            // Reference to the specific document to delete
            const donationRef = doc(db, "donations", donorId);

            // Delete the document from Firestore
            await deleteDoc(donationRef);

            // Remove the card from the UI
            card.remove();

            alert("Donation claimed and deleted successfully.");

            // Optionally, redirect to a confirmation page
            // window.location.href = `confirm.html?donorId=${donorId}`;
        } catch (error) {
            console.error("Error claiming and deleting donation: ", error);
            alert(`Error: ${error.message}`);
        }
    }
}

// Fetch donations when the page loads
fetchDonations();
