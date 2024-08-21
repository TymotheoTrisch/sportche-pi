const iconsClose = document.querySelectorAll('.icon-close');
const iconsSearch = document.querySelectorAll('.icon-search');
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

iconsSearch.forEach(iconSearch => {
    iconSearch.addEventListener('click', async () => {
        
        const response = await fetch('http://localhost:3000/search', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email})
        })
        .then(res => {
            return res.json()
        })
        .catch(e => {
            console.log("Error: " + e);
        })
    }) 
})