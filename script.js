function createArrayOfNumbers(start,end) {
    let array = [];
    for (let i = start; i <= end; i += 25) {
        array.push("OAD" + i);
    }
    return array;    
}
function getRandomIndexOfArray(min, max) {
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result =  Math.floor(step2) + min;
    return result;
}
function setEventsIds(){
    let ids = localStorage.getItem("event_ids");
    if (ids === null){
        ids = createArrayOfNumbers(100,999)
        localStorage.setItem("event_ids", JSON.stringify(ids));
    }
}
setEventsIds();
function fetchEventIdFromStore() {
    return JSON.parse(localStorage.getItem("event_ids"));
}
function clearForm() {
    document.querySelector("#eventName").value = '';
    document.querySelector("#startDate").value = '';
    document.querySelector("#endDate").value = '';
    document.querySelector("#totalExRgs").value = '';
    document.querySelector("#typeOfEvent").value = '';
    document.querySelector("#hostName").value = '';
    document.querySelector("#speakerName").value = '';

}
function addEvent(){
    // cupture event details
    const event_name = document.querySelector("#eventName").value;
    const event_start_date = document.querySelector("#startDate").value;
    const event_end_date = document.querySelector("#endDate").value;
    const event_total_expect_registration = document.querySelector("#totalExRgs").value;
    const event_type = document.querySelector("#typeOfEvent").value;
    const event_host_name = document.querySelector("#hostName").value;
    const event_speaker_name = document.querySelector("#speakerName").value;
    // clear form after submit
    clearForm();

    //automatically  get event id ramdomly and delete from store
    let event_ids = fetchEventIdFromStore();
    console.log(fetchEventIdFromStore());
    let randomIndex = getRandomIndexOfArray(0, event_ids.length - 1);
    let event_id = event_ids[randomIndex];
    
    event_ids.splice(randomIndex, 1);

    
    let events = fetchStudentFromStorage();
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
    addEventsToStorage(events)
    addEventslists(event_id,event_name,event_start_date,event_end_date,event_total_expect_registration,event_type,event_host_name,event_speaker_name)
    console.log(events);
    
}
function addEventslists(event_id,event_name,event_start_date,event_end_date,event_total_expect_registration,event_type,event_host_name,event_speaker_name) {
    const eventsMainContainer = document.querySelector("#events_list");
    const eventContainer = document.createElement('div');
    eventContainer.innerHTML = `
    <div class="card text-dark mt-3 mb-3" style="max-width: 100%;">
    <div class="card-header fs-3 text-primary">${event_name} <span class="badge bg-info rounded-pill">${event_id}</span></div>
    <div class="card-body">
      <div class="row">
        <div class="col-6">
            <h5 class="card-title text-warning">${event_host_name}</h5>
            <p><b>Start Date</b> : <span class="badge bg-info rounded-pill">${event_start_date}</span></p>
        </div>
        <div class="col-6">
            <h5 class="text-warning">${event_speaker_name}</h5>
            <div><b>End Date</b> : <span class="badge bg-info rounded-pill">${event_end_date}</span></div>
        </div>
      </div>
      <p class="fs-5"><b>Type of event : </b> <span>${event_type}</span></p>
      <p class="fs-5"><b>Total expected registration : </b> <span>${event_total_expect_registration}</span></p>
      
    </div>
    </div>
    `;
    eventsMainContainer.appendChild(eventContainer);
}
function fetchStudentFromStorage() {
    return JSON.parse(localStorage.getItem("events"));
}
function addEventsToStorage(events){
    let data = JSON.stringify(events)
    return localStorage.setItem('events',data)
}
function loadEventFromStoreAndListThem(){
    let events = fetchStudentFromStorage();
    if (events === null) {
        return;
    }
    events.forEach(event => {
    const eventsMainContainer = document.querySelector("#events_list");
    const eventContainer = document.createElement('div');
    eventContainer.innerHTML = `
    <div class="card text-dark mt-3 mb-3" style="max-width: 100%;">
    <div class="card-header fs-3 text-primary">${event.event_name} <span class="badge bg-info rounded-pill">${event.event_id}</span></div>
    <div class="card-body">
      <div class="row">
        <div class="col-6">
            <h5 class="card-title text-warning">${event.event_host_name}</h5>
            <p><b>Start Date</b> : <span class="badge bg-info rounded-pill">${event.event_start_date}</span></p>
        </div>
        <div class="col-6">
            <h5 class="text-warning">${event.event_speaker_name}</h5>
            <div><b>End Date</b> : <span class="badge bg-info rounded-pill">${event.event_end_date}</span></div>
        </div>
      </div>
      <p class="fs-5"><b>Type of event : </b> <span>${event.event_type}</span></p>
      <p class="fs-5"><b>Total expected registration : </b> <span>${event.event_total_expect_registration}</span></p>
      
    </div>
    </div>
    `;
    eventsMainContainer.appendChild(eventContainer);
    });
} 
loadEventFromStoreAndListThem();

document.querySelector("#event_form").addEventListener("submit", event => {
    event.preventDefault();
    addEvent()
})
