import './style.css';

// Word list for passphrase generation (EFF short wordlist subset)
const wordList = [
  'acid', 'acorn', 'acre', 'acts', 'afar', 'affix', 'aged', 'agent', 'agile', 'aging',
  'agony', 'ahead', 'aide', 'aids', 'aim', 'ajar', 'alarm', 'alias', 'alibi', 'alien',
  'alike', 'alive', 'alley', 'allot', 'allow', 'alloy', 'ally', 'alone', 'along', 'aloof',
  'alpha', 'alps', 'altar', 'alter', 'amaze', 'amber', 'amend', 'amid', 'amp', 'angel',
  'anger', 'angle', 'angry', 'ankle', 'apart', 'apex', 'apple', 'apply', 'apron', 'arena',
  'argue', 'arise', 'armor', 'army', 'aroma', 'array', 'arrow', 'arson', 'art', 'ashen',
  'ashes', 'atlas', 'atom', 'attic', 'audio', 'avert', 'avoid', 'awake', 'award', 'awoke',
  'axis', 'bacon', 'badge', 'badly', 'bagel', 'baggy', 'baked', 'baker', 'balmy', 'banjo',
  'barge', 'baron', 'basic', 'basin', 'batch', 'bath', 'baton', 'blade', 'blank', 'blast',
  'blaze', 'bleak', 'blend', 'bless', 'blimp', 'blind', 'bliss', 'block', 'blog', 'blot',
  'blown', 'blue', 'blunt', 'blurt', 'blush', 'board', 'boat', 'body', 'bolt', 'bonus',
  'book', 'booth', 'boots', 'boss', 'botch', 'both', 'boxer', 'brain', 'branch', 'brand',
  'brass', 'brave', 'bread', 'break', 'breed', 'brick', 'bride', 'brief', 'bring', 'brink',
  'brisk', 'broad', 'broil', 'broke', 'brook', 'broom', 'brush', 'buck', 'buddy', 'budget',
  'build', 'built', 'bulge', 'bulk', 'bully', 'bunch', 'bunny', 'burden', 'burn', 'burst',
  'buyer', 'cable', 'cache', 'cadet', 'cage', 'cake', 'calm', 'camper', 'canal', 'candy',
  'cane', 'canon', 'cape', 'card', 'cargo', 'carol', 'carry', 'carve', 'case', 'cash',
  'cause', 'cave', 'cease', 'cedar', 'chain', 'chair', 'champ', 'charm', 'chart', 'chase',
  'cheap', 'check', 'cheek', 'cheer', 'chess', 'chest', 'chew', 'chief', 'child', 'chili',
  'chill', 'chip', 'choke', 'chord', 'chore', 'chunk', 'cinch', 'city', 'civic', 'civil',
];

// Define character set
const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVXYZ';
const numbers = '0123456789';
const symbols = '£$&()*+[]@#^-_!?';

function removeSimilarChars(str) {
  return str.replace(/[0O1lI]/g, '');
}

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
const similarCtrl = document.getElementById('similar');

let uppercaseSelected = true;
let lowercaseSelected = true;
let numbersSelected = true;
let symbolsSelected = true;
let avoidSimilar = false;

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
  if (uppercaseSelected) chars += avoidSimilar ? removeSimilarChars(upperCase) : upperCase;
  if (lowercaseSelected) chars += avoidSimilar ? removeSimilarChars(lowerCase) : lowerCase;
  if (numbersSelected) chars += avoidSimilar ? removeSimilarChars(numbers) : numbers;
  if (symbolsSelected) chars += symbols; // symbols don't have similar chars
  
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
  if (isPassphraseMode) {
    return generatePassphrase();
  }
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

similarCtrl.addEventListener('change', (e) => {
  avoidSimilar = e.target.checked;
});

// Passphrase controls
const typePasswordCtrl = document.getElementById('typePassword');
const typePassphraseCtrl = document.getElementById('typePassphrase');
const passphraseWords = document.getElementById('passphraseWords');
const passphraseSeparator = document.getElementById('passphraseSeparator');
const wordCountSlider = document.getElementById('wordCountSlider');
const wordCountDisplay = document.getElementById('wordCount');
const separatorSelect = document.getElementById('separatorSelect');

let isPassphraseMode = false;

// Toggle between password and passphrase mode
const quantityLabel = document.getElementById('quantityLabel');
const resultsLabel = document.getElementById('resultsLabel');

typePasswordCtrl.addEventListener('change', () => {
  isPassphraseMode = false;
  passphraseWords.style.display = 'none';
  passphraseSeparator.style.display = 'none';
  document.querySelector('.password-length-container').style.display = '';
  document.getElementById('characters-symbols-container').style.display = '';
  quantityLabel.textContent = 'Number of passwords';
  resultsLabel.textContent = 'password list';
});

typePassphraseCtrl.addEventListener('change', () => {
  isPassphraseMode = true;
  passphraseWords.style.display = '';
  passphraseSeparator.style.display = '';
  document.querySelector('.password-length-container').style.display = 'none';
  document.getElementById('characters-symbols-container').style.display = 'none';
  quantityLabel.textContent = 'Number of passphrases';
  resultsLabel.textContent = 'passphrase list';
});

wordCountSlider.addEventListener('input', (e) => {
  wordCountDisplay.textContent = e.target.value;
});

// Generate passphrase function
function generatePassphrase() {
  const wordCount = parseInt(wordCountSlider.value);
  const separator = separatorSelect.value;
  const words = [];
  
  for (let i = 0; i < wordCount; i++) {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    words.push(wordList[randomIndex]);
  }
  
  return words.join(separator);
}

// For all screens
createBtn.addEventListener('click', () => {
  generateMultiple();
});

// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeIcon = document.getElementById('darkModeIcon');

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  darkModeIcon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
}

function getPreferredTheme() {
  const stored = localStorage.getItem('theme');
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Initialize theme
setTheme(getPreferredTheme());

// Toggle on click
darkModeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

// Listen for system preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    setTheme(e.matches ? 'dark' : 'light');
  }
});
