class ID {
    /**
     * Create an array of numbers
     * @param {number} start 
     * @param {number} end 
     * @returns an array of numbers
     */
    static createArrayOfNumbers(start, end) {
        let array = [];
        for (let i = start; i <= end; i += 25) {
            array.push("OAD" + i);
        }
        return array;
    }

    /**
     * @param {number} min 
     * @param {number} max 
     * @returns random index of array
     */
    static getRandomIndexOfArray(min, max) {
        let step1 = max - min + 1;
        let step2 = Math.random() * step1;
        let result = Math.floor(step2) + min;
        return result;
    }

    // Set IDs
    static setEventsIds() {
        // Get the fields
        let ids = localStorage.getItem("event_ids");

        // Check whether the localStorage field is not set
        if (ids === null) {
            ids = ID.createArrayOfNumbers(100, 999)

            // Set the field
            localStorage.setItem("event_ids", JSON.stringify(ids));
        }
    }
}

// UI
class UI {
    constructor(storage) {
        this.storage = storage;
    }
    addEvent() {
        // cupture event details
        const event_name = document.querySelector("#eventName").value,
            event_start_date = document.querySelector("#startDate").value,
            event_end_date = document.querySelector("#endDate").value,
            event_total_expect_registration = document.querySelector("#totalExRgs").value,
            event_type = document.querySelector("#typeOfEvent").value,
            event_host_name = document.querySelector("#hostName").value,
            event_speaker_name = document.querySelector("#speakerName").value;

        // clear form after submit
        this.clearForm();

        // automatically get event id ramdomly and delete from store
        let event_ids = this.storage.fetchEventsId();
        let randomIndex = ID.getRandomIndexOfArray(0, event_ids.length - 1);
        let event_id = event_ids[randomIndex];

        // delecting used Id From event_ids
        event_ids.forEach((eventId, index) => {
            if (event_id == eventId) {
                event_ids.splice(index, 1);
                this.storage.addEventIds(event_ids);
                alert('this event Id deleted From store');
            }
        })


        let events = this.storage.fetchEvents();
        if (events === null) {
            events = []

        }
        events.push({
            event_id,
            event_name,
            event_start_date,
            event_end_date,
            event_total_expect_registration,
            event_type,
            event_host_name,
            event_speaker_name
        });
        this.storage.addEvents(events)
        this.appendEvent(event_id, event_name, event_start_date, event_end_date, event_total_expect_registration, event_type, event_host_name, event_speaker_name)
    }

    /**
     * Clear the form
     */
    clearForm() {
        // Clear all values
        document.querySelector("#eventName").value =
            document.querySelector("#startDate").value =
            document.querySelector("#endDate").value =
            document.querySelector("#totalExRgs").value =
            document.querySelector("#typeOfEvent").value =
            document.querySelector("#hostName").value =
            document.querySelector("#speakerName").value = "";
    }

    appendEvent(
        event_id,
        event_name,
        event_start_date,
        event_end_date,
        event_total_expect_registration,
        event_type,
        event_host_name,
        event_speaker_name
    ) {
        const eventsMainContainer = document.querySelector("#events_list");
        const eventContainer = document.createElement('div');
        eventContainer.dataset.id = event_id;
        eventContainer.classList.add("event");
        eventContainer.innerHTML = `
        <div class="card text-dark mt-3 mb-3" style="max-width: 100%;">
            <div class="card-header fs-3 text-primary">${event_name} 
                <span class="badge bg-info rounded-pill">${event_id}</span>
                <a class="btn btn-outline-primary btn-sm float-end">
                    <i class="bi bi-trash3 fs-5 delete" data-id="${event_id}"></i>
                </a>
                <a class="btn btn-outline-secondary btn-sm">
                    <i class="bi bi-pencil-square fs-5 edit" data-id="${event_id}"></i>
                </a>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-6">
                        <h5 class="card-title"><span class="text-info">Host Name </span>: 
                            <span class="text-warning">${event_host_name}</span>
                        </h5>
                        <p><b>Start Date</b> : 
                            <span class="badge bg-info rounded-pill">${event_start_date}</span>
                        </p>
                    </div>
                    <div class="col-6">
                        <h5 class="card-title">
                            <span class="text-info">Speaker Name</span>: 
                            <span class="text-warning">${event_speaker_name}</span>
                        </h5>
                        <div><b>End Date</b> : 
                            <span class="badge bg-info rounded-pill">${event_end_date}</span>
                        </div>
                    </div>
                </div>
                <p class="fs-5"><b>Type of event : </b> <span>${event_type}</span></p>
                <p class="fs-5"><b>Total expected registration : </b> <span>${event_total_expect_registration}</span></p>
            </div>
        </div>
        `;
        eventsMainContainer.appendChild(eventContainer);
    }

    listEvents() {
        let events = this.storage.fetchEvents();
        if (events === null)
            return;

        events.forEach(event => {
            this.appendEvent(
                event.event_id, event.event_name, event.event_start_date,
                event.event_end_date, event.event_total_expect_registration,
                event.event_type, event.event_host_name, event.event_speaker_name
            )
        });
    }

    deleteEvent(event) {
        if (event.target.classList.contains('delete')) {
            const eventId = event.target.dataset.id;
            document.querySelector(`.event[data-id="${eventId}"`).remove()
            this.storage.deleteEvent(eventId);
        }

    }
    editEvent(event) {
        if (event.target.classList.contains('edit')) {
            const eventId = event.target.dataset.id;
            document.querySelector(`.event[data-id="${eventId}"`).remove()

            let events = this.storage.fetchEvents();
            events.forEach(event => {
                if (eventId == event.event_id) {
                    document.querySelector("#eventName").value = event.event_name;
                    document.querySelector("#startDate").value = event.event_start_date;
                    document.querySelector("#endDate").value = event.event_end_date;
                    document.querySelector("#totalExRgs").value = event.event_total_expect_registration;
                    document.querySelector("#typeOfEvent").value = event.event_type;
                    document.querySelector("#hostName").value = event.event_host_name;
                    document.querySelector("#speakerName").value = event.event_speaker_name;
                }
            })
            this.storage.deleteEvent(eventId);
        }
    }
}

class EventStore {
    fetchEventsId() {
        return JSON.parse(localStorage.getItem("event_ids"));
    }

    addEventIds(eventIds) {
        return localStorage.setItem('event_ids', JSON.stringify(eventIds));
    }
    fetchEvents() {
        return JSON.parse(localStorage.getItem("events"));
    }

    addEvents(events) {
        return localStorage.setItem('events', JSON.stringify(events));
    }

    deleteEvent(eventId) {
        let events = this.fetchEvents();
        events.forEach((event, index) => {
            if (eventId === event.event_id)
                events.splice(index, 1);
        });
        this.addEvents(events);
    }
}

const ui = new UI(new EventStore());
// when form submit
document.querySelector("#event_form").addEventListener("submit", event => {
    event.preventDefault();
    // add event
    ui.addEvent();
})
// when Document loads
document.addEventListener('DOMContentLoaded', () => {
    // load events from Storage and list them
    ui.listEvents();
    // Set events Id`s
    ID.setEventsIds();
});
//delete and edit an event
document.querySelector("#events_list").addEventListener('click', event => {
    // delete an event
    ui.deleteEvent(event);
    // edit an event
    ui.editEvent(event);
})
