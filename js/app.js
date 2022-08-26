function getSize() {
    document.getElementById("size-value").innerHTML =
        document.getElementById("size").value;
}

function generatePassword() {
    const passwordField = document.getElementById("password");
    const copyButton = document.getElementById("copy");

    const options = [
        document.getElementById("numbers").checked,
        document.getElementById("upper-letters").checked,
        document.getElementById("lower-letters").checked,
        document.getElementById("special-char").checked,
    ];

    if (!options.includes(true)) {
        const errorField = document.getElementById("error");
        errorField.innerHTML = "&#10060; Marque pelo menos uma opção";

        setTimeout(() => {
            errorField.innerHTML = "";
        }, 2000);
    } else {
        passwordField.value = createPassword(options);
        copyButton.addEventListener("click", copyToClipboard(passwordField));
    }
}

function createPassword(options) {
    const charset = generateCharset(options);
    let password = "";
    for (let i = 0; i < document.getElementById("size").value; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    return password;
}

function generateCharset(options) {
    let charset = "";

    options[0] === true ? (charset += "0123456789") : null;
    options[1] === true ? (charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ") : null;
    options[2] === true ? (charset += "abcdefghijklmnopqrstuvwxyz") : null;
    options[3] === true ? (charset += "@!?#$%&*()[]{},._-~+=") : null;

    return charset;
}

function copyToClipboard(passwordField) {
    const toastTrigger = document.getElementById("copy");
    const toastBox = document.getElementById("success-msg");

    passwordField.select();
    passwordField.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(passwordField.value);

    if (toastTrigger) {
        toastTrigger.addEventListener("click", () => {
            const toast = new bootstrap.Toast(toastBox);
            toast.show();
        });
    }
}
