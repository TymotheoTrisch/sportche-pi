// itens menu desktop
const itensMenuDesktop = document.querySelectorAll('.itens .icon i');

// Pequena animação para quando o mouse ficar em cima do icone
itensMenuDesktop.forEach(icon => {
    icon.addEventListener('mouseover', () => {
        icon.classList.add('bx-tada-hover')
        setTimeout(
            () => {
                icon.classList.remove('bx-tada-hover')
            },
            1500
        );
    })
})

// Icons menu
const iconMenuDesktop = document.querySelector('.hamburguer')
const iconMenu = iconMenuDesktop.querySelector('i')


// Animações Desktop
iconMenuDesktop.addEventListener('click', () => {
    const itens = document.querySelector('.itens')
    if (itens.style.position === 'absolute' && itens.style.opacity === '0') {
        itens.style.position = 'inherit'
        itens.style.opacity = '1'
        itens.classList.add('openAnimationMenu')
        itens.classList.remove('closeAnimationMenu')

        iconMenu.style.paddingBottom = '25px'
        iconMenu.classList.add('active')
    } else {
        itens.style.opacity = '0'
        itens.style.position = 'absolute'
        itens.classList.remove('openAnimationMenu')
        itens.classList.add('closeAnimationMenu')
        iconMenu.style.paddingBottom = '0px'
        iconMenu.classList.remove('active')
    }

})