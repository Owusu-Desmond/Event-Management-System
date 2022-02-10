function addEvent(){
    // cupture event details
    const event_name = document.querySelector("#eventName").value;
    const event_start_date = document.querySelector("#startDate").value;
    const event_end_date = document.querySelector("#endDate").value;
    const event_total_expect_registration = document.querySelector("#totalExRgs").value;
    const event_type = document.querySelector("#typeOfEvent").value;
    const event_host_name = document.querySelector("#hostName").value;
    const event_speaker_name = document.querySelector("#eventName").value;
    
    let events = fetchStudentFromStorage();
    if (events === null) {
        events = []
    }
    events.push({
        event_name,
        event_start_date,
        event_end_date,
        event_total_expect_registration,
        event_type,
        event_host_name,
        event_speaker_name
    });
    addEventsToStorage(events)
    console.log(events);
    
}
function fetchStudentFromStorage() {
    return JSON.parse(localStorage.getItem("events"));
}
function addEventsToStorage(events){
    let data = JSON.stringify(events)
    return localStorage.setItem('events',data)
}
document.querySelector("#event_form").addEventListener("submit", event => {
    event.preventDefault();
    addEvent()
})