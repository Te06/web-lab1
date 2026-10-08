const countdown = document.getElementById("countdown");
const deadline = new Date(countdown.dataset.deadline).getTime();

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

function updateCountdown() {
  const now = Date.now();
  const remaining = deadline - now;

  if (remaining <= 0) {
    daysElement.textContent = "00";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";
    return;
  }

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (remaining / (1000 * 60 * 60)) % 24
  );
  const minutes = Math.floor(
    (remaining / (1000 * 60)) % 60
  );
  const seconds = Math.floor(
    (remaining / 1000) % 60
  );

  daysElement.textContent = String(days).padStart(2, "0");
  hoursElement.textContent = String(hours).padStart(2, "0");
  minutesElement.textContent = String(minutes).padStart(2, "0");
  secondsElement.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

const form = document.getElementById("registration-form");
const submitButton = document.getElementById("submit-button");
const formStatus = document.getElementById("form-status");

let formState = "idle";

function setFormState(state) {
  formState = state;

  if (state === "idle") {
    submitButton.disabled = false;
    submitButton.textContent = "Register";
    formStatus.textContent = "Ready to register.";
  }

  if (state === "submitting") {
    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";
    formStatus.textContent = "Submitting your registration...";
  }

  if (state === "success") {
    submitButton.disabled = false;
    submitButton.textContent = "Register";
    formStatus.textContent = "Registration successful.";
  }

  if (state === "error") {
    submitButton.disabled = false;
    submitButton.textContent = "Try Again";
    formStatus.textContent = "Registration failed. Please try again.";
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (formState === "submitting") {
    return;
  }

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");

  const sanitizedName = sanitizeInput(nameInput.value);
  const sanitizedEmail = sanitizeInput(emailInput.value);

  if (!sanitizedName || !sanitizedEmail) {
    setFormState("error");
    formStatus.textContent = "Please enter valid information.";
    return;
  }

  setFormState("submitting");

  setTimeout(() => {
    const isSuccess = Math.random() > 0.3;

    if (isSuccess) {
      setFormState("success");
      form.reset();
    } else {
      setFormState("error");
    }
  }, 1000);
});


function sanitizeInput(value) {
  return value
    .trim()
    .replace(/[<>]/g, "");
}