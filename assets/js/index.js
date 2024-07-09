const iconPassword = document.querySelectorAll('#view-password')

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
})



