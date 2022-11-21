import './style.css';

// Define character set
const lowerCase = 'abcdefghijklmnopqrstuvxyz';
const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVXYZ';
const integers = '0123456789';
const specialCharacters = '£$&()*+[]@#^-_!?';
const charCategories = 4;

let password = '';

let password_length_ctrl = document.getElementById('password-length-slider');
let easy_to_say_ctrl = document.getElementById('easy-to-say');
let easy_to_read_ctrl = document.getElementById('easy-to-read');
let all_characters_ctrl = document.getElementById('all-characters');
let uppercase_ctrl = document.getElementById('uppercase');
let plowercase_ctrl = document.getElementById('lowercase');
let numbers_ctrl = document.getElementById('numbers');
let symbols_ctrl = document.getElementById('symbols');

let loop_ctrl = document.getElementById('loop');
let password_ctrl = document.getElementById('password');

loop_ctrl.addEventListener('click', generate);

function generate() {
    password = '';

    const passwordLength = password_length_ctrl.value;

    for (let i=0; i < passwordLength; i++) {
        let charType = Math.round(Math.abs((Math.random()*charCategories-1)));

        let index = 0;

        switch (charType) {
            case 0:
                index = Math.round(Math.abs((Math.random()*lowerCase.length-1)));
                password += lowerCase[index];
                break;
            case 1:
                index = Math.round(Math.abs((Math.random()*upperCase.length-1)));
                password += upperCase[index];
                break;
            case 2:
                index = Math.round(Math.abs((Math.random()*integers.length-1)));
                password += integers[index];
                break;
            default:
                index = Math.round(Math.abs((Math.random()*specialCharacters.length-1)));
                password += specialCharacters[index];
                break;
        }
    }

    password_ctrl.value = password;

    /*console.log(password);
    alert(password);*/
}

generate();

/*function easyToSay(cb) {
    display("Clicked, new value = " + cb.checked);
}

function easyToRead(cb) {
    display("Clicked, new value = " + cb.checked);
}

function all(cb) {
    display("Clicked, new value = " + cb.checked);
}*/