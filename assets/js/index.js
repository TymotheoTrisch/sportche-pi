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


