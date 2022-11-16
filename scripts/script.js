/* toTwoDigits takes a number int/float and returns a string
representing a minimum two-digits number int/float: */
let toTwoDigits = num => num.
  toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });

/* toDigitalClock takes an integer (elapsed time in milliseconds)
and returns a string in digital clock format "00:00:00": */
let toDigitalClock = (elapsedTime) => {
  let hour = toTwoDigits(Math.floor(elapsedTime / 3600000));
  let minute = toTwoDigits(Math.floor(elapsedTime % 3600000 / 60000));
  let second = toTwoDigits(Math.floor(elapsedTime % 60000 / 1000));
  //don't show hour field if hour == 0:
  return parseInt(hour) ? `${hour}:${minute}:${second}` : 
    `${minute}:${second}`;
};

// marks the starting point:
let start = null;
/* marks the interval point on each setInterval() call:
also marks the pausing point on clearInterval() call */
let interval = null;
// marks the break/rest length (Date.now() - interval):
let rest = null;
// stores the ID from setInterval function call:
let intervalID = null;
// stores the clock's object:
let clock = document.getElementById("clock");
// stores the card's object:
let card = document.getElementById("card");

card.onclick = () => { 
// tests if the clock is stopped:
  if (!intervalID) {
    /* tests if start has no value, and sets now as starting point:
    otherwise, adds the resting time to the starting point
    the second part works as a discount on the total elapsed time */
    start = !start ? Date.now() : start + (rest = Date.now() - interval);
    /* calls setInterval every millisecond and updates the clock:
    ID is returned immediately, before the first call
    milliseconds has better precision than 1 second calls (1000ms) */
    intervalID = setInterval(() => {
      // marks the interval point on each setInterval() call:
      interval = Date.now();
      // stores the integer elapsed time in ms on each interval call:
      let elapsedTime = interval - start;
      // stores the string in digital clock format/display:
      let digitalClock = toDigitalClock(elapsedTime);
      // stores the string optional hundredth of a second:
      let hundredth = toTwoDigits(Math.floor(elapsedTime % 1000 / 10));
      // updates the clock's text content on each interval call:
      clock.textContent = `${digitalClock}.${hundredth}`;
      // updates the tab/title's text content on each interval call:
      document.title = digitalClock;
    }, 0);
    //i f the clock is running:
  } else {
    // stops the timer:
    clearInterval(intervalID);
    // marks the pausing point for later discount in start:
    interval = Date.now();
    // resets intervalID to null to allow next run:
    intervalID = null;
  }
};

/* resets variables to their initial value:
note: double click works as two clicks too! */
card.ondblclick = () => {
  // stops the timer if it's running:
  clearInterval(intervalID);
  start = null;
  interval = null;
  rest = null;
  intervalID = null;
  clock.textContent = "Hello World.";
  document.title = "Home";
};
