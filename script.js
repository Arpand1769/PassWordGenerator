const passWordBox=document.getElementById("password");
const lengthOfPassword=12;

const upperCase="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase="abcdefghijklmnopqrstuvwxyz";
const numbers="0123456789";
const symbols="!@#$%^&*()_+-=[]{}|;:,.<>?";

const allChar=upperCase+lowerCase+numbers+symbols;

function createPass(){
    let password="";
    password+=upperCase[Math.floor(Math.random()*upperCase.length)];
    password+=lowerCase[Math.floor(Math.random()*lowerCase.length)];
    password+=numbers[Math.floor(Math.random()*numbers.length)];
    password+=symbols[Math.floor(Math.random()*symbols.length)];

    while(password.length<lengthOfPassword){
        password+=allChar[Math.floor(Math.random()*allChar.length)];
    }

    passWordBox.value=password;
}

function copyPass(){
    passWordBox.select();
    document.execCommand("copy");
}

