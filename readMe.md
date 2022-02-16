# Event management system App
App to manage events by
- Creating an events
- Deleting an events
- Editing an events

## Creating Events
- Creating form to allow user to enter Event details.
- Cupture event details.
- Store Events Details to Local Storage of your browser.
- Append event to aready exiting events to the UI.

## Deleting an event
### Deleting an event from list
- Create a button on each event and add eventListener `click`.
- If that button contain a class called `delele`.
- Target the data-id which has been set for button.
- Select a query with class `event` and have the same data-id as the button.
- Add `remove()` method to the selected query to remove that event from list.
