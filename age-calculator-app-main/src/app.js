/* ---------- get inputs from client ----------*/
let submit_btn = document.getElementById("submit");

let errorMessages = document.querySelectorAll(".error-message");
let labels = document.getElementsByTagName("label");
let dayInput = document.getElementById("day");
let monthInput = document.getElementById("month");
let yearInput = document.getElementById("year");
let results = document.querySelectorAll(".result");

submit_btn.addEventListener("click", (e) => {
  resetStyles();

  let dayValue = parseInt(dayInput.value);
  let monthValue = parseInt(monthInput.value);
  let yearValue = parseInt(yearInput.value);

  if (isValid(dayValue, monthValue, yearValue))
    calculateAge(dayValue, monthValue, yearValue);
});

function resetStyles() {
  for (let i = 0; i < 3; i++) {
    errorMessages[i].textContent = "";
    labels[i].classList.remove("red-color");
  }
  dayInput.classList.remove("invalid-input");
  monthInput.classList.remove("invalid-input");
  yearInput.classList.remove("invalid-input");
}

function errorDisplay(message, input, numberOfInput) {
  errorMessages[numberOfInput].textContent = message;
  labels[numberOfInput].classList.add("red-color");
  input.classList.add("invalid-input");
}

function isValid(day, month, year) {
  let isValid = true;

  if (isNaN(day)) {
    errorDisplay("This Field is required", dayInput, 0);
    isValid = false;
  } else {
    let inputDate = new Date(year, month - 1, day);
    if (inputDate.getDate() != day) {
      errorDisplay("Must be a valid day", dayInput, 0);
      isValid = false;
    }
  }

  if (isNaN(month)) {
    errorDisplay("This Field is required", monthInput, 1);
    isValid = false;
  } else if (month > 12 || month <= 0) {
    errorDisplay("Must be a valid month", monthInput, 1);
    isValid = false;
  }

  if (isNaN(year)) {
    errorDisplay("This Field is required", yearInput, 2);
    isValid = false;
  } else if (`${year}`.length != 4) {
    errorDisplay("Must be a valid year", yearInput, 2);
    isValid = false;
  } else {
    let currentDate = new Date();
    if (year > currentDate.getFullYear()) {
      errorDisplay("Must be in the past", yearInput, 2);
      isValid = false;
    }
  }

  return isValid;
}

function calculateAge(day, month, year) {
  let currentDate = new Date();
  let birthDate = new Date(year, month - 1, day);

  let years = currentDate.getFullYear() - birthDate.getFullYear();
  let months = currentDate.getMonth() - birthDate.getMonth() - 1;
  let days = currentDate.getDate() - birthDate.getDate();

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  if (days < 0) {
    days += new Date(year, month - 1, 0).getDate() - 1;
  }

  results[0].setAttribute("data-value", years);
  results[1].setAttribute("data-value", months);
  results[2].setAttribute("data-value", days);

  counter();
}

/* --------------- number counting animation --------------- */
function counter() {
  let interval = 700;

  results.forEach((result) => {
    let startPoint = 0;
    let endPoint = parseInt(result.getAttribute("data-value"));
    let duration = Math.floor(interval / endPoint);

    let counter = setInterval(() => {
      startPoint += 1;
      result.textContent = startPoint;
      if (startPoint === endPoint) clearInterval(counter);
    }, duration);
  });
}
