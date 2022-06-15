const passwordField = document.getElementById("password");
const copyButton = document.getElementById("copy");
const sizePassword = document.getElementById("size");
const sizePasswordValue = document.getElementById("size-value");

//Mostra o tamanho de senha escolhido a cada alteração
//Shows the chosen password length with each change
sizePassword.oninput = function() {
    sizePasswordValue.innerHTML = sizePassword.value;
}

function generatePassword() {
    //Opções disponíveis para senha
    //Available password options
    const numbers = document.getElementById("numbers").checked;
    const upperLetters = document.getElementById("upper-letters").checked;
    const lowerLetters = document.getElementById("lower-letters").checked;
    const specialChars = document.getElementById("special-char").checked;

    const options = [];
    options["numbers"] = numbers;
    options["upper"] = upperLetters;
    options["lower"] = lowerLetters;
    options["specialchar"] = specialChars;

    const countFalses = validateOneRequired(options); //Quantidade de campos desmarcados / Number of fields deselected
    const charset = generateCharsetFromOptions(options); /*Conjunto de caracteres para gerar a senha / Character set 
    to generate the password */

    if (countFalses === 4) {
        //Aqui é feita uma verificação, se o usuário não selecionou nenhuma opção ele gera erro
        //Here a check is made, if the user has not selected any option it generates an error
        const errorField = document.getElementById("error");
        errorField.innerHTML = "&#10060; Marque pelo menos uma opção";

        setTimeout(() => {
            errorField.innerHTML = "";
        }, 2000);
    } else {
        //Lógica para gerar a senha, o loop itera em cima do tamanho selecionado
        //Logic to generate the password, the loop iterates over the selected length
        let password = "";
        for (let i = 0, x = charset.length; i < sizePassword.value; i++) {
            password += charset.charAt(Math.floor(Math.random() * x)); /*Aqui ele seleciona um caractere 
            aleatório com base no charset e adiciona na senha*/
            //Here it selects a character random based on charset and add to password
        }

        passwordField.value = password;

        copyButton.addEventListener("click", copyToClipboard(passwordField));
    }

}

function validateOneRequired(options) {
    //Essa função conta quantos opções ficou desmarcada
    //This function counts how many options were unchecked
    let count = 0;
    for (const value in options) {
        if(options[value] === false) {
            count += 1;
        }
    }

    return count;
}

function countTrueOptions(options) {
    //Essa função pega as opções marcadas e adiciona em um array
    //This function takes the marked options and adds them to an array
    let trueArray = [];
    for (const value in options) {
        if(options[value] === true) {
            trueArray.push(value);
        }
    }

    return trueArray;
}

function generateCharsetFromOptions(options) {
    /*Essa função recebe o array de opções e com auxílio da função countTrueOptions 
    retorna o charset de acordo com as opções escolhidas*/
    /*This function receives the options array and with the help of the countTrueOptions function
     returns the charset according to the chosen options*/

    let charset = "";
    const charsetLower = "abcdefghijklmnopqrstuvwxyz";
    const charsetUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charsetNumbers = "0123456789";
    const charsetSpecialChar = "@!?#$%&*()[]{},._-~+=";

    const trueArray = countTrueOptions(options);

    trueArray.includes("numbers") ? charset += charsetNumbers : null;
    trueArray.includes("upper") ? charset += charsetUpper : null;
    trueArray.includes("lower") ? charset += charsetLower : null;
    trueArray.includes("specialchar") ? charset += charsetSpecialChar : null;

    return charset;
}

function copyToClipboard(passwordField) {
    //Essa função é responsável pela funcionalidade de copiar a senha e pela notificação
    //This role is responsible for the copy password functionality and notification

    const toastTrigger = document.getElementById('copy');
    const toastBox = document.getElementById('success-msg');
    
    passwordField.select();
    passwordField.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(passwordField.value);

    //Ativação do toast componente do bootstrap
    //Activating the bootstrap toast component
    if (toastTrigger) {
        toastTrigger.addEventListener('click', () => {
          const toast = new bootstrap.Toast(toastBox);
          toast.show();
        });
    }
}