var alphabetArray = 'abcdefghijklmnopqrstuvwxyz'.split('');
var symbols = '!@#$%^&*()_+-=[]{};,./`~'.split('');

var user;

async function newToken(usr){
    var token = "";
    user = usr;
    for(var i = 0; i < 9; i++){
        switch(Math.floor(Math.random() * (4 - 1 + 1)) + 1){
            case 1:
                token += alphabetArray[Math.floor(Math.random() * ((alphabetArray.length - 1) + 1))]
                break;
            case 2:
                token += alphabetArray[Math.floor(Math.random() * ((alphabetArray.length - 1) + 1))].toUpperCase();
                break;
            case 3:
                token += Math.floor(Math.random() * (9 + 1))
                break;
            case 4:
                token += symbols[Math.floor(Math.random() * ((symbols.length - 1) + 1))]
                break;
        }
    }
    return token;
}

export {newToken};