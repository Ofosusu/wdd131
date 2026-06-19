const attractions = [
    {
        name: "Cape Coast Castle",
        region: "Central Region",
        category: "Historical",
        imageUrl: "images/cape-coast-castle.jpg"
    },
    {
        name: "Kakum National Park",
        region: "Central Region",
        category: "Nature",
        imageUrl: "images/kakum-national-park.jpg"
    },
    {
        name: "Wli Waterfalls",
        region: "Volta Region",
        category: "Nature",
        imageUrl: "images/wli-waterfalls.jpg"
    },
    {
        name: "Mole National Park",
        region: "Savannah Region",
        category: "Wildlife",
        imageUrl: "images/mole-national-park.jpg"
    },
    {
        name: "Kwame Nkrumah Mausoleum",
        region: "Greater Accra Region",
        category: "Historical",
        imageUrl: "images/nkrumah-mausoleum.jpg"
    }
];

function displayGreeting() {
    const greeting = document.querySelector("#greeting");

    if (!greeting) return;

    const hour = new Date().getHours();

    if (hour < 12) {
        greeting.textContent = "Good Morning! Welcome to Discover Ghana.";
    } else if (hour < 18) {
        greeting.textContent = "Good Afternoon! Welcome to Discover Ghana.";
    } else {
        greeting.textContent = "Good Evening! Welcome to Discover Ghana.";
    }
}

function createAttractionCard(attraction) {
    const card = document.createElement("section");

    card.classList.add("card");

    card.innerHTML = `
        <img src="${attraction.imageUrl}" alt="${attraction.name}" loading="lazy">
        <h3>${attraction.name}</h3>
        <p><strong>Region:</strong> ${attraction.region}</p>
        <p><strong>Category:</strong> ${attraction.category}</p>
    `;

    return card;
}

function displayAttractions() {
    const container = document.querySelector("#attractions-container");

    if (!container) return;

    attractions.forEach((attraction) => {
        const card = createAttractionCard(attraction);
        container.appendChild(card);
    });
}

function saveTravelPlan(event) {
    event.preventDefault();

    const visitorName = document.querySelector("#name").value;
    const attraction = document.querySelector("#attraction").value;

    localStorage.setItem("visitorName", visitorName);
    localStorage.setItem("favoriteAttraction", attraction);

    document.querySelector("#confirmation").textContent =
        `Thank you ${visitorName}. Your travel plan has been saved.`;
}

function displayReturningVisitor() {
    const visitorName = localStorage.getItem("visitorName");
    const welcomeBack = document.querySelector("#welcome-back");

    if (visitorName && welcomeBack) {
        welcomeBack.textContent = `Welcome back, ${visitorName}!`;
    }
}

displayGreeting();
displayAttractions();
displayReturningVisitor();

const plannerForm = document.querySelector("#plannerForm");

if (plannerForm) {
    plannerForm.addEventListener("submit", saveTravelPlan);
}