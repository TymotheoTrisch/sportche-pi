const iconPassword = document.getElementById('view-password')

iconPassword.addEventListener('click', () => {
    const inputPassword = document.getElementById('password')
    if (inputPassword.type == "password") {
        inputPassword.type = "text"

        iconPassword.classList.remove('bx-show')
        iconPassword.classList.add('bx-hide')
    } else {
        inputPassword.type = "password"
        iconPassword.classList.remove('bx-hide')
        iconPassword.classList.add('bx-show')
    }

})