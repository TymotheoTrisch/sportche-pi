const iconPassword = document.querySelectorAll('.view-password')

iconPassword.forEach(icon => {
    icon.addEventListener('click', () => {
        const inputPassword = icon.previousElementSibling
        console.log(inputPassword);
        if (inputPassword.type == "password") {
            inputPassword.type = "text"
        
            icon.classList.remove('bx-show')
            icon.classList.add('bx-hide')
        } else {
            inputPassword.type = "password"
            icon.classList.remove('bx-hide')
            icon.classList.add('bx-show')
        }
    
    })
})

// variaveis dos botões
const botaoCadastrar = document.getElementById('botaoCadastrar') 
const botaoEntrar = document.getElementById('botaoEntrar')
const botaoEntrarLogin = document.getElementById('botaoEntrarLogin')
// variaveis dos botões

// variaveis do cadastro
const mainCadastro = document.getElementById('mainCadastro')
const headerCadastro = document.getElementById('headerCadastro')
// variaveis do cadastro

// variaveis do login
const mainLogin = document.getElementById('mainLogin')
const headerLogin = document.getElementById('headerLogin')
// variaveis do login



botaoCadastrar.addEventListener('click',()=>{
        mainLogin.style.display = "none"
        headerLogin.style.display = "none"

        if(mainLogin.style.display === "none" && headerLogin.style.display === "none"){
            mainCadastro.style.display = "block" 
            headerCadastro.style.display = "block"
        }
})


botaoEntrar.addEventListener('click',()=>{
    mainCadastro.style.display = "none"
    headerCadastro.style.display = "none"

    if(mainCadastro.style.display === "none" && headerCadastro.style.display === "none"){
        mainLogin.style.display = "block" 
        headerLogin.style.display = "block"
    }
    if(email.value.lenght === 0){
        emailInvalidError.style.display = "block"
    }
})


function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

const form = {
    email: () => document.getElementById("email"),
    emailInvalidError: () => document.getElementById("email-invalid-error"),
    emailRequiredError: () => document.getElementById("email-required-error"),
    loginButton: () => document.getElementById("login-button"),
    password: () => document.getElementById("password"),
    passwordRequiredError: () => document.getElementById("password-required-error"),
}

let divInputEmail = document.querySelector(".email")

botaoEntrarLogin.addEventListener('click',()=>{
    verificarEmail(form.email())
    verificarSenha(form.password())
    
})

function verificarEmail(email) {
    if (email.value == "") {
        form.emailRequiredError().style.display = "block";
        // form.emailRequiredError().style.color = "#ff0000";
        form.emailInvalidError().style.display = "none";

    } else if(!validateEmail(email.value)) {
        form.emailInvalidError().style.display = "block";
        form.emailRequiredError().style.display = "none";
    } else {
        form.emailRequiredError().style.display = "none";
        form.emailInvalidError().style.display = "none";
    }
}

function verificarSenha(senha) {
    if(senha.value === "") {
        form.passwordRequiredError().style.display = "block"
    } else {
        form.passwordRequiredError().style.display = "none"
    }
}

