//Cancel dialogue for Taxi Booking screen
const cancelTaxiDialogue = `
Close
  appOpenAlert -> AlertProviderCancel
  userCancelBooking -> Confirm
AlertProviderCancel
  userClickClose -> ClearBooking
ClearBooking
  appCleared -> ExitScreen
ExitScreen
  appReset -> Close
Confirm
  userClickNo -> Close
  userClickYes -> Cancelling
Cancelling
  appCancelledOk -> Success
  appCancelledFail -> Error
Success
  userClickOk -> ClearBooking
Error
  userClickClose -> Close
`;

//Automatic door
const sample = `
DoorOpened
	userDoClose -> Closing
Closing
  userDoOpen -> Opening
  sensorClosed -> DoorClosed
DoorClosed
	userDoOpen -> Opening
Opening
	userDoClose -> Closing
	sensorOpened -> DoorOpened
`;

module.exports = {
	cancelTaxiDialogue,
	sample,
};
