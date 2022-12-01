import { hamburger, openMenu, closeMenu } from './modules/navbar-hamburger.js';
import './style.css';

// Define character set
const lowerCase = 'abcdefghijklmnopqrstuvxyz';
const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVXYZ';
const numbers = '0123456789';
const symbols = '£$&()*+[]@#^-_!?';

let password = '';

const passwordLengthCtrl = document.getElementById('range-slider');
const passwordLengthInput = document.getElementById('passwordLength');
const enterBtn = document.querySelector('.enter-btn');

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

// ID matches with the Bootstrap class used for the input field
const passwordCtrl = document.getElementById('form-control');

const copyCtrl = document.querySelector('.copy-btn');

const copiedPasswordMessage = document.querySelector('.copied-password-message');

const createBtn = document.querySelector('.create-btn');

function changePasswordLength() {
  passwordLengthCtrl.value = passwordLengthInput.value;
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

  passwordCtrl.value = password;
}

function copyPassword() {
  // Select the text field
  passwordCtrl.select();
  passwordCtrl.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(passwordCtrl.value);

  copiedPasswordMessage.textContent = '"Copied to clipboard!"';
  copiedPasswordMessage.style.textAlign = 'center';
  copiedPasswordMessage.style.color = 'green';
  copiedPasswordMessage.style.fontSize = '25px';
  copiedPasswordMessage.style.marginTop = '10px';
  copiedPasswordMessage.style.marginBottom = '10px';
}

// Open Nav Menu for click
hamburger.addEventListener('click', openMenu);

// Close Nav Menu for click
document.querySelectorAll('.nav-link-mobile').forEach((n) => n.addEventListener('click', closeMenu));

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

  generate();
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

  generate();
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

  generate();
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

  generate();
});

// For mobile & tablet screens
createBtn.addEventListener('touchstart', generate);
createBtn.addEventListener('touchend', generate);

enterBtn.addEventListener('touchstart', changePasswordLength);

enterBtn.addEventListener('touchend', changePasswordLength);

passwordLengthInput.addEventListener('touchstart', (e) => {
  if (e.key === 'Enter') {
    changePasswordLength();
  }
});

passwordLengthInput.addEventListener('touchend', (e) => {
  if (e.key === 'Enter') {
    changePasswordLength();
  }
});

copyCtrl.addEventListener('touchstart', copyPassword);
copyCtrl.addEventListener('touchend', copyPassword);

// For laptop & desktop screens
createBtn.addEventListener('click', generate);

enterBtn.addEventListener('click', changePasswordLength);

passwordLengthInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
  	changePasswordLength();
  }
});

copyCtrl.addEventListener('click', copyPassword);

generate();