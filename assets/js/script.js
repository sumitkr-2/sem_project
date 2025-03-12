
function suggestMedicine() {
    let symptoms = document.getElementById("symptoms").value.toLowerCase();
    let medicineSuggestion = document.getElementById("suggested-medicine");
    
    let medicines = {
        "fever": "Paracetamol",
        "cough": "Cough Syrup",
        "headache": "Ibuprofen",
        "cold": "Antihistamines"
    };
    
    medicineSuggestion.innerText = medicines[symptoms] || "No specific medicine found. Consult a doctor!";
}

function findDoctors() {
    let location = document.getElementById("location").value;
    alert("Searching for best doctors in " + location);
}

function initMap() {
    let map = L.map('map').setView([51.505, -0.09], 13); // Default location

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
}

