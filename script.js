const passWordBox = document.getElementById("password");
const passwordLengthInput = document.getElementById("passwordLength");
const lengthWarning = document.getElementById("lengthWarning");
const defaultLabel = document.getElementById("defaultLabel");

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

const checkboxes = [
  document.getElementById("excludeSpecial"),
  document.getElementById("excludeNumbers"),
  document.getElementById("excludeUpper"),
  document.getElementById("excludeLower"),
];

window.addEventListener("DOMContentLoaded", () => {
  if (parseInt(passwordLengthInput.value) === 12) {
    passwordLengthInput.style.opacity = "0.5";
    defaultLabel.style.display = "inline";
    defaultLabel.style.opacity = "0.5";
  } else {
    passwordLengthInput.style.opacity = "1";
    defaultLabel.style.display = "none";
  }
});

function handleOpacity(input) {
  const val = parseInt(input.value);
  if (isNaN(val) || val < 4 || val > 20 || val === 12) {
    input.style.opacity = "0.5";
    defaultLabel.style.display = val === 12 ? "inline" : "none";
    defaultLabel.style.opacity = "0.5";
    lengthWarning.style.display = (val < 4 || val > 20) ? "block" : "none";
  } else {
    input.style.opacity = "1";
    defaultLabel.style.display = "none";
    lengthWarning.style.display = "none";
  }
}

function setDefaultIfEmpty(input) {
  const val = parseInt(input.value);
  if (!input.value || val < 4 || val > 20 || val === 12) {
    input.value = 12;
    input.style.opacity = "0.5";
    defaultLabel.style.display = "inline";
    defaultLabel.style.opacity = "0.5";
    lengthWarning.style.display = "none";
  } else {
    input.style.opacity = "1";
    defaultLabel.style.display = "none";
    lengthWarning.style.display = "none";
  }
}

passwordLengthInput.addEventListener("keydown", (e) => {
  if ((e.key === "ArrowUp" || e.key === "ArrowDown") && passwordLengthInput.value === '') {
    e.preventDefault();
    const min = parseInt(passwordLengthInput.min);
    const max = parseInt(passwordLengthInput.max);
    let newVal = e.key === "ArrowUp" ? Math.min(13, max) : Math.max(11, min);
    passwordLengthInput.value = newVal;
    passwordLengthInput.style.opacity = "1";
    defaultLabel.style.display = newVal === 12 ? "inline" : "none";
    defaultLabel.style.opacity = newVal === 12 ? "0.5" : "1";
    lengthWarning.style.display = "none";
  }
});

function limitCheckboxes() {
  const checkedCount = checkboxes.filter(cb => cb.checked).length;
  checkboxes.forEach(cb => {
    cb.disabled = !cb.checked && checkedCount >= 3;
  });
}
checkboxes.forEach(cb => cb.addEventListener("change", limitCheckboxes));

function createPass() {
  let lengthOfPassword = parseInt(passwordLengthInput.value);
  if (isNaN(lengthOfPassword) || lengthOfPassword < 4) {
    lengthOfPassword = 12;
  }

  const excludeSpecial = document.getElementById("excludeSpecial").checked;
  const excludeNumbers = document.getElementById("excludeNumbers").checked;
  const excludeUpper = document.getElementById("excludeUpper").checked;
  const excludeLower = document.getElementById("excludeLower").checked;

  const exclusions = [
    excludeSpecial,
    excludeNumbers,
    excludeUpper,
    excludeLower,
  ].filter(Boolean).length;

  if (exclusions > 3) {
    alert("You can exclude a maximum of three types. At least one type must be included.");
    return;
  }

  let charSet = "";
  let requiredChars = [];

  if (!excludeUpper) {
    charSet += upperCase;
    requiredChars.push(randomChar(upperCase));
  }
  if (!excludeLower) {
    charSet += lowerCase;
    requiredChars.push(randomChar(lowerCase));
  }
  if (!excludeNumbers) {
    charSet += numbers;
    requiredChars.push(randomChar(numbers));
  }
  if (!excludeSpecial) {
    charSet += symbols;
    requiredChars.push(randomChar(symbols));
  }

  if (charSet.length === 0) {
    alert("No character types selected. Cannot generate password.");
    return;
  }

  let password = requiredChars.join("");
  while (password.length < lengthOfPassword) {
    password += randomChar(charSet);
  }

  passWordBox.value = shuffle(password);
}

function randomChar(str) {
  return str[Math.floor(Math.random() * str.length)];
}

function shuffle(str) {
  return str.split("").sort(() => Math.random() - 0.5).join("");
}

function copyPass() {
  passWordBox.select();
  document.execCommand("copy");
}