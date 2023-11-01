console.log("connected");

const COHORT = "2309-FTB-ET-WEB-FT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const list = {
    events: [],
};

const eventsList = document.querySelector("#eventList");

const addEventForm = document.querySelector("#addEvent");
addEventForm.addEventListener("submit", addEvent);

async function render() {
    await getEvents();
    renderEvents();
}
render();

async function getEvents() {
    try {
        let response = await fetch(API_URL);
        let json = await response.json();

        console.log("json.data:", json.data);
        list.events = json.data;
    } catch (err) {
        console.error(err);
    }
}

function renderEvents() {
    if (!list.events.length) {
        eventsList.innerHTML = "<li>No events!</li>";
        return;
    }

    const eventCards = list.events.map((event) => {
        const li = document.createElement("li");
        li.innerHTML = `
        <h2>${event.name}</h2>
        <p>${event.description}</p>
        <p>${event.date}</p>
        <p>${event.location}</p>`;

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "DELETE";
        deleteButton.addEventListener("click", () => {
            deleteEvent(event.id);
        });

        li.appendChild(deleteButton);

        return li;
    });

    eventsList.replaceChildren(...eventCards);
}

// async function addEvent(event)
// event.preventDefault()

async function addEvent(event) {
    event.preventDefault();

    // let name = addEventForm.name.value;
    // let description = addEventForm.description.value;
    // let date = addEventForm.date.value;
    // let location = addArtistForm.location.value;

    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            name: document.getElementById("name").value,
            description: document.getElementById("description").value,
            date: `${document.getElementById("date").value}:00.000Z`,
            location: document.getElementById("location").value,
        }),
    });

    console.log(response);

    render();
}

async function deleteEvent(id) {
    const response = await fetch(API_URL + `/${id}`, {
        method: "DELETE",
    });

    console.log("Deleted?:", response);

    render();
}
