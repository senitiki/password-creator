import './style.css';

// Define character set
const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVXYZ';
const numbers = '0123456789';
const symbols = '£$&()*+[]@#^-_!?';

let password = '';

const createBtn = document.querySelector('.create-btn');

const passwordLengthCtrl = document.getElementById('range-slider');
const passwordLength = document.getElementById('passwordLength');

const numOfPasswordsCtrl = document.getElementById('range-slider-1');
const numOfPasswords = document.getElementById('numOfPasswords');

const passwordsBody = document.querySelector('.passwords-body');

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

  return strength;
}

// Password generation - consolidated into single function
function generatePassword(length) {
  // Build character set based on selected options
  let chars = '';
  if (uppercaseSelected) chars += upperCase;
  if (lowercaseSelected) chars += lowerCase;
  if (numbersSelected) chars += numbers;
  if (symbolsSelected) chars += symbols;
  
  // Generate password
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  return password;
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

async function copyToClipboard(text, button) {
  try {
    await navigator.clipboard.writeText(text);
    button.textContent = 'check';
    setTimeout(() => { button.textContent = 'content_copy'; }, 2000);
  } catch (err) {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    button.textContent = 'check';
    setTimeout(() => { button.textContent = 'content_copy'; }, 2000);
  }
}

function renderPasswords(passwords){
  removeAllChildNodes(passwordsBody);

  for (let i = 0; i < passwords.length; i++){
    const row = document.createElement('div');
    row.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'gap-2', 'px-2', 'py-2');

    const passwordCreated = document.createElement('p');
    passwordCreated.textContent = passwords[i].password;
    passwordCreated.classList.add('fs-4', 'mb-0', 'font-monospace');

    // Strength badge
    const strengthBadge = document.createElement('span');
    strengthBadge.textContent = passwords[i].strength;
    strengthBadge.classList.add('badge', 'rounded-pill');

    // Color based on strength
    if (passwords[i].strength === 'Strong') {
      strengthBadge.classList.add('bg-success');
    } else if (passwords[i].strength === 'Medium') {
      strengthBadge.classList.add('bg-warning', 'text-dark');
    } else {
      strengthBadge.classList.add('bg-danger');
    }

    const copyBtn = document.createElement('i');
    copyBtn.classList.add('material-icons');
    copyBtn.textContent = 'content_copy';
    copyBtn.style.cursor = 'pointer';
    copyBtn.title = 'Copy to clipboard';
    copyBtn.addEventListener('click', () => copyToClipboard(passwords[i].password, copyBtn));

    row.appendChild(passwordCreated);
    row.appendChild(strengthBadge);
    row.appendChild(copyBtn);
    passwordsBody.appendChild(row);
  }
}

function generate() {
  const length = passwordLengthCtrl.value;
  return generatePassword(length);
}

function generateMultiple() {
  let maxNum = numOfPasswordsCtrl.value;
  
  let newPassword = '';
  let newPasswordStrength = '';
  let multiplePasswords = [];
  let i = 0;

  do {
    newPassword = generate();
      
    newPasswordStrength = testPasswordStrength(newPassword);

    multiplePasswords.push({
      password: newPassword,
      strength: newPasswordStrength
    });

    i += 1;
  } while (i < maxNum);

  renderPasswords(multiplePasswords);
}

passwordLengthCtrl.addEventListener('input', (e) => {
  passwordLength.textContent = e.target.value;
});

numOfPasswordsCtrl.addEventListener('input', (e) => {
  numOfPasswords.textContent = e.target.value;
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
});

// For all screens
createBtn.addEventListener('click', () => {
  generateMultiple();
});
