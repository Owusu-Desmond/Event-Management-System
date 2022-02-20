# Event management system App
App to manage events by
- Creating an events
- Deleting an events
- Editing an events

## Create Events
- Create form to allow user to enter Event details.
- Cupture event details.
- Store Events Details to Local Storage of your browser.
- Append event to aready exiting events to the UI.

## Delete an event
### Deleting an event from list
- Create a button on each event and add eventListener `click`.
- If that button contain a class called `delele`.
- Target the data-id which has been set for button.
- Select a query with class `event` and have the same data-id as the button.
- Add `remove()` method to the selected query to remove that event from list.

### Deleting an event form Storage
- Fetch events from storage.
- Loop through the fetch data (using `forEach` statement).
- Use `splice()` method to delete the event when eventID match the one you want to edit.
- Storage the left events.

## Edit an event
Note : The edit event takes the same proceedure as the delete method but the only difference is to collect the data you want to delete and put these data to the form for the user edit them.
