import { hamburger, openMenu, closeMenu } from './modules/navbar-hamburger.js';
import './style.css';

// Define character set
const lowerCase = 'abcdefghijklmnopqrstuvxyz';
const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVXYZ';
const numbers = '0123456789';
const symbols = '£$&()*+[]@#^-_!?';

let password = '';
let passwordStrength = '';

// ID matches with the Bootstrap class used for the input field
const passwordCtrl = document.getElementById('form-control');
const copyCtrl = document.querySelector('.copy-btn');
const copiedPasswordMessage = document.querySelector('.copied-password-message');
const strengthMeter = document.querySelector('.strength-meter');
const passwordStrengthText = document.querySelector('.password-strength-text');
const createBtn = document.querySelector('.create-btn');

const passwordLengthCtrl = document.getElementById('range-slider');
const passwordLength = document.getElementById('passwordLength');

const uppercaseCtrl = document.getElementById('uppercase');
const lowercaseCtrl = document.getElementById('lowercase');
const numbersCtrl = document.getElementById('numbers');
const symbolsCtrl = document.getElementById('symbols');

let uppercaseSelected = true;
let lowercaseSelected = true;
let numbersSelected = true;
let symbolsSelected = true;

let checkBoxChecked = 4;
const minimumChecked = 2;

/* eslint-disable */
function testPasswordStrength(password){
  let hasLower = false;
  let hasUpper = false;
  let hasNumber = false;
  let hasSymbol = false;
  let wordLength = password.length;
  let strength = '';

  for (let i = 0; i < wordLength; i++){
    if(/[a-z]/.test(password[i])){
      hasLower = true;
    } else if (/[A-Z]/.test(password[i])){
      hasUpper = true;
    } else if (/[0-9]/.test(password[i])){
      hasNumber = true;
    } else if (/[£\$&\(\)\*\+\[\]@#\^-_!\?]/.test(password[i])){
      hasSymbol = true;
    }
  }

  if (hasLower && hasUpper && hasNumber && 
    hasSymbol && wordLength >= 12){
    strength = "Strong";
  } else if ((hasLower || hasUpper) && 
    hasSymbol && wordLength >= 6 ){
    strength = "Medium";
  } else {
    strength = "Weak";
  }

  console.log(strength);
  return strength;
}

function renderPasswordStrength(passwordStrength){
  if (passwordStrength === 'Strong') {
    strengthMeter.style.backgroundColor = "green";
    strengthMeter.style.width = "95.3%";
    strengthMeter.style.transition = "0.5s";
    passwordStrengthText.style.color = "green";
    passwordStrengthText.style.fontSize = "38px";
    passwordStrengthText.style.fontWeight = "bold";
    passwordStrengthText.textContent = passwordStrength;
  } else if (passwordStrength === "Medium") {
    strengthMeter.style.backgroundColor = "#ffb914";
    strengthMeter.style.width = "61.53%";
    strengthMeter.style.transition = "0.5s";
    passwordStrengthText.style.color = "#ffb914";
    passwordStrengthText.style.fontSize = "38px";
    passwordStrengthText.style.fontWeight = "bold";
    passwordStrengthText.textContent = passwordStrength;
  } else {
    strengthMeter.style.backgroundColor = "red";
    strengthMeter.style.width = "30.76%";
    strengthMeter.style.transition = "0.5s";
    passwordStrengthText.style.color = "red";
    passwordStrengthText.style.fontSize = "38px";
    passwordStrengthText.style.fontWeight = "bold";
    passwordStrengthText.textContent = passwordStrength;
  }
}

/* eslint-disable */
function all(password, passwordLength, categories) {
  for (let i = 0; i < passwordLength; i++) {
    const charType = Math.round(Math.abs((Math.random() * categories - 1)));

    let index = 0;

    switch (charType) {
      case 0:
        index = Math.round(Math.abs((Math.random() * lowerCase.length - 1)));
        password += lowerCase[index];
        break;
      case 1:
        index = Math.round(Math.abs((Math.random() * upperCase.length - 1)));
        password += upperCase[index];
        break;
      case 2:
        index = Math.round(Math.abs((Math.random() * numbers.length - 1)));
        password += numbers[index];
        break;
      default:
        index = Math.round(Math.abs((Math.random() * symbols.length - 1)));
        password += symbols[index];
        break;
    }
  }

  return password;
}

function upperLowerNumbers(password, passwordLength, categories) {
  for (let i = 0; i < passwordLength; i++) {
    const charType = Math.round(Math.abs((Math.random() * categories - 1)));

    let index = 0;

    switch (charType) {
      case 0:
        index = Math.round(Math.abs((Math.random() * lowerCase.length - 1)));
        password += lowerCase[index];
        break;
      case 1:
        index = Math.round(Math.abs((Math.random() * upperCase.length - 1)));
        password += upperCase[index];
        break;
      default:
        index = Math.round(Math.abs((Math.random() * numbers.length - 1)));
        password += numbers[index];
        break;
    }
  }

  return password;
}

function upperLowerSymbols(password, passwordLength, categories) {
  for (let i = 0; i < passwordLength; i++) {
    const charType = Math.round(Math.abs((Math.random() * categories - 1)));

    let index = 0;

    switch (charType) {
      case 0:
        index = Math.round(Math.abs((Math.random() * lowerCase.length - 1)));
        password += lowerCase[index];
        break;
      case 1:
        index = Math.round(Math.abs((Math.random() * upperCase.length - 1)));
        password += upperCase[index];
        break;
      default:
        index = Math.round(Math.abs((Math.random() * symbols.length - 1)));
        password += symbols[index];
        break;
    }
  }

  return password;
}

function lowerNumbersSymbols(password, passwordLength, categories) {
  for (let i = 0; i < passwordLength; i++) {
    const charType = Math.round(Math.abs((Math.random() * categories - 1)));

    let index = 0;

    switch (charType) {
      case 0:
        index = Math.round(Math.abs((Math.random() * lowerCase.length - 1)));
        password += lowerCase[index];
        break;
      case 1:
        index = Math.round(Math.abs((Math.random() * numbers.length - 1)));
        password += numbers[index];
        break;
      default:
        index = Math.round(Math.abs((Math.random() * symbols.length - 1)));
        password += symbols[index];
        break;
    }
  }

  return password;
}

function upperNumbersSymbols(password, passwordLength, categories) {
  for (let i = 0; i < passwordLength; i++) {
    const charType = Math.round(Math.abs((Math.random() * categories - 1)));

    let index = 0;

    switch (charType) {
      case 0:
        index = Math.round(Math.abs((Math.random() * upperCase.length - 1)));
        password += upperCase[index];
        break;
      case 1:
        index = Math.round(Math.abs((Math.random() * numbers.length - 1)));
        password += numbers[index];
        break;
      default:
        index = Math.round(Math.abs((Math.random() * symbols.length - 1)));
        password += symbols[index];
        break;
    }
  }

  return password;
}

function upperLower(password, passwordLength, categories) {
  for (let i = 0; i < passwordLength; i++) {
    const charType = Math.round(Math.abs((Math.random() * categories - 1)));

    let index = 0;

    switch (charType) {
      case 0:
        index = Math.round(Math.abs((Math.random() * lowerCase.length - 1)));
        password += lowerCase[index];
        break;
      default:
        index = Math.round(Math.abs((Math.random() * upperCase.length - 1)));
        password += upperCase[index];
        break;
    }
  }

  return password;
}

function upperNumbers(password, passwordLength, categories) {
  for (let i = 0; i < passwordLength; i++) {
    const charType = Math.round(Math.abs((Math.random() * categories - 1)));

    let index = 0;

    switch (charType) {
      case 0:
        index = Math.round(Math.abs((Math.random() * numbers.length - 1)));
        password += numbers[index];
        break;
      default:
        index = Math.round(Math.abs((Math.random() * upperCase.length - 1)));
        password += upperCase[index];
        break;
    }
  }

  return password;
}

function upperSymbols(password, passwordLength, categories) {
  for (let i = 0; i < passwordLength; i++) {
    const charType = Math.round(Math.abs((Math.random() * categories - 1)));

    let index = 0;

    switch (charType) {
      case 0:
        index = Math.round(Math.abs((Math.random() * symbols.length - 1)));
        password += symbols[index];
        break;
      default:
        index = Math.round(Math.abs((Math.random() * upperCase.length - 1)));
        password += upperCase[index];
        break;
    }
  }

  return password;
}

function lowerNumbers(password, passwordLength, categories) {
  for (let i = 0; i < passwordLength; i++) {
    const charType = Math.round(Math.abs((Math.random() * categories - 1)));

    let index = 0;

    switch (charType) {
      case 0:
        index = Math.round(Math.abs((Math.random() * lowerCase.length - 1)));
        password += lowerCase[index];
        break;
      default:
        index = Math.round(Math.abs((Math.random() * numbers.length - 1)));
        password += numbers[index];
        break;
    }
  }

  return password;
}

function lowerSymbols(password, passwordLength, categories) {
  for (let i = 0; i < passwordLength; i++) {
    const charType = Math.round(Math.abs((Math.random() * categories - 1)));

    let index = 0;

    switch (charType) {
      case 0:
        index = Math.round(Math.abs((Math.random() * lowerCase.length - 1)));
        password += lowerCase[index];
        break;
      default:
        index = Math.round(Math.abs((Math.random() * symbols.length - 1)));
        password += symbols[index];
        break;
    }
  }

  return password;
}

function numbersSymbols(password, passwordLength, categories) {
  for (let i = 0; i < passwordLength; i++) {
    const charType = Math.round(Math.abs((Math.random() * categories - 1)));

    let index = 0;

    switch (charType) {
      case 0:
        index = Math.round(Math.abs((Math.random() * numbers.length - 1)));
        password += numbers[index];
        break;
      default:
        index = Math.round(Math.abs((Math.random() * symbols.length - 1)));
        password += symbols[index];
        break;
    }
  }

  return password;
}

function generate() {
  password = '';

  const passwordLength = passwordLengthCtrl.value;

  if (uppercaseSelected && lowercaseSelected && symbolsSelected && numbersSelected) {
    password = all('', passwordLength, 4);
  } else if (uppercaseSelected && lowercaseSelected && numbersSelected) {
    password = upperLowerNumbers('', passwordLength, 3);
  } else if (uppercaseSelected && lowercaseSelected && symbolsSelected) {
    password = upperLowerSymbols('', passwordLength, 3);
  } else if (lowercaseSelected && numbersSelected && symbolsSelected) {
    password = lowerNumbersSymbols('', passwordLength, 3);
  } else if (uppercaseSelected && numbersSelected && symbolsSelected) {
    password = upperNumbersSymbols('', passwordLength, 3);
  } else if (uppercaseSelected && lowercaseSelected) {
    password = upperLower('', passwordLength, 2);
  } else if (uppercaseSelected && numbersSelected) {
    password = upperNumbers('', passwordLength, 2);
  } else if (uppercaseSelected && symbolsSelected) {
    password = upperSymbols('', passwordLength, 2);
  } else if (lowercaseSelected && numbersSelected) {
    password = lowerNumbers('', passwordLength, 2);
  } else if (lowercaseSelected && symbolsSelected) {
    password = lowerSymbols('', passwordLength, 2);
  } else if (numbersSelected && symbolsSelected) {
    password = numbersSymbols('', passwordLength, 2);
  }

  return password;
}

async function copyPassword() {
  try {
    copiedPasswordMessage.innerHTML = `
      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header border-0">
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p class="text-center fs-3 my-3">Copied to clipboard!</p>
            </div>
            <div class="modal-footer border-0">
              <button type="button" class="btn close-btn-2 bg-seagreen fs-4" data-bs-dismiss="modal">Ok</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Select the text field
    passwordCtrl.select();
    passwordCtrl.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    await navigator.clipboard.writeText(passwordCtrl.value);
  } catch (err){
    console.error('Failed to copy: ', err);
  }
}

// Open Nav Menu for click
hamburger.addEventListener('click', openMenu);

// Close Nav Menu for click
document.querySelectorAll('.nav-link-mobile').forEach((n) => n.addEventListener('click', closeMenu));

passwordLengthCtrl.addEventListener('input', (e) => {
  passwordLength.textContent = e.target.value;
});

uppercaseCtrl.addEventListener('change', (e) => {
  if (e.target.checked) {
    checkBoxChecked += 1;
    uppercaseSelected = true;
  } else if (checkBoxChecked === minimumChecked) {
    uppercaseCtrl.checked = true;
  } else {
    checkBoxChecked -= 1;
    uppercaseSelected = false;
  }

  passwordCtrl.value = generate();

  passwordStrength = testPasswordStrength(passwordCtrl.value);

  renderPasswordStrength(passwordStrength);
});

lowercaseCtrl.addEventListener('change', (e) => {
  if (e.target.checked) {
    checkBoxChecked += 1;
    lowercaseSelected = true;
  } else if (checkBoxChecked === minimumChecked) {
    lowercaseCtrl.checked = true;
  } else {
    checkBoxChecked -= 1;
    lowercaseSelected = false;
  }

  passwordCtrl.value = generate();

  passwordStrength = testPasswordStrength(passwordCtrl.value);

  renderPasswordStrength(passwordStrength);
});

numbersCtrl.addEventListener('change', (e) => {
  if (e.target.checked) {
    checkBoxChecked += 1;
    numbersSelected = true;
  } else if (checkBoxChecked === minimumChecked) {
    numbersCtrl.checked = true;
  } else {
    checkBoxChecked -= 1;
    numbersSelected = false;
  }

  passwordCtrl.value = generate();

  passwordStrength = testPasswordStrength(passwordCtrl.value);

  renderPasswordStrength(passwordStrength);
});

symbolsCtrl.addEventListener('change', (e) => {
  if (e.target.checked) {
    checkBoxChecked += 1;
    symbolsSelected = true;
  } else if (checkBoxChecked === minimumChecked) {
    symbolsCtrl.checked = true;
  } else {
    checkBoxChecked -= 1;
    symbolsSelected = false;
  }

  passwordCtrl.value = generate();

  passwordStrength = testPasswordStrength(passwordCtrl.value);

  renderPasswordStrength(passwordStrength);
});

// For all screens
createBtn.addEventListener('click', () => {
  passwordCtrl.value = generate();

  passwordStrength = testPasswordStrength(passwordCtrl.value);

  renderPasswordStrength(passwordStrength);
});

copyCtrl.addEventListener('click', copyPassword);

passwordCtrl.value = generate();

passwordStrength = testPasswordStrength(passwordCtrl.value);