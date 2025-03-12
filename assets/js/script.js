function suggestMedicine() {
    let symptoms = document.getElementById("symptoms").value.toLowerCase();
    let medicineSuggestion = document.getElementById("descr"); // Shows medicine name
    let cautionDiv = document.getElementById("medi_caution"); // Shows detailed info

    // Load medicines.json
    fetch("data/medicines.json")
        .then(response => response.json())
        .then(medicines => {
            let medicine = medicines[symptoms];

            if (medicine) {
                medicineSuggestion.innerText = medicine; // Show medicine name
                
                // Now fetch descriptions.json to get detailed description
                fetch("data/descriptions.json")
                    .then(response => response.json())
                    .then(descriptions => {
                        if (descriptions[medicine]) {
                            let details = descriptions[medicine]; // Fetch full object

                            // Display all details in caution div
                            cautionDiv.innerHTML = `
                                <strong>Description:</strong> ${details.description} <br>
                                <strong>Who should take:</strong> ${details.who_should_take} <br>
                                <strong>Who should avoid:</strong> ${details.who_should_avoid} <br>
                                <strong>Precautions:</strong> ${details.precautions}
                            `;
                        } else {
                            cautionDiv.innerText = "No description available.";
                        }
                    })
                    .catch(error => {
                        console.error("Error fetching description data:", error);
                        cautionDiv.innerText = "Unable to load description.";
                    });

            } else {
                medicineSuggestion.innerText = "No specific medicine found. Consult a doctor!";
                cautionDiv.innerText = ""; // Clear previous description
            }
        })
        .catch(error => {
            console.error("Error fetching medicine data:", error);
            medicineSuggestion.innerText = "Error fetching data.";
            cautionDiv.innerText = "";
        });
}


function fetchWikipediaDescription(medicineName) {
    let descriptionDiv = document.getElementById("details"); // Ensure this exists in your HTML

    let apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(medicineName)}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.extract) {
                descriptionDiv.innerText = data.extract;
            } else {
                descriptionDiv.innerText = "No description available.";
            }
        })
        .catch(error => {
            console.error("Error fetching Wikipedia description:", error);
            descriptionDiv.innerText = "Unable to load description.";
        });
}

// function findDoctors() {
//     let location = document.getElementById("location").value;
//     alert("Searching for best doctors in " + location);
// }

// // function initMap() {
// //     let map = L.map('map').setView([51.505, -0.09], 13); // Default location

// //     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// //         attribution: '© OpenStreetMap contributors'
// //     }).addTo(map);
// // }

// function toggleSection() {
//     var section = document.getElementById("medicine-suggester");
//     section.style.display = (section.style.display === "none" || section.style.display === "") ? "block" : "none";
// }