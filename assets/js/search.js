const iconsClose = document.querySelectorAll('.icon-close');
const inputsSearch = document.querySelectorAll('#search')

iconsClose.forEach(iconClose => {
    iconClose.addEventListener('click', () => {
        iconClose.previousElementSibling.value = '';
        iconClose.style.display = 'none';
    })    
})

inputsSearch.forEach(inputSearch => {
    inputSearch.addEventListener('input', () => {
        inputSearch.nextElementSibling.style.display = 'flex';
    
    })    
})

inputsSearch.forEach(inputSearch => {
    
})