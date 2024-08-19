const select = document.querySelector('.select')
const options = select.querySelector(".content .options");
const selectBtn = select.querySelector('.select-btn');

$('.number-increment').click(function () {
  var $input = $(this).parents('.input-incrementor').find('#input-participantes');
  var val = parseInt($input.val(), 10);
  
  $input.val(val + 1);
});

$('.number-decrement').click(function () {
  var $input = $(this).parents('.input-incrementor').find('#input-participantes');
  var val = parseInt($input.val(), 10);
  if (val > 1) {
    $input.val(val - 1);
  }
});

const sports = [
  {
    "id": 1,
    "name": "Futebol"
  },
  {
    "id": 2,
    "name": "Basquete"
  },
  {
    "id": 3,
    "name": "Vôlei"
  },
  {
    "id": 4,
    "name": "Tênis"
  }
]

selectBtn.addEventListener("click", () => select.classList.toggle("active"));

// Função para adicionar os esportes
function addSports(selectedSport) {
  options.innerHTML = "";
  sports.forEach(sport => {
    let isSelected = sport.name == selectedSport ? "selected" : "";
    let li = `<li onclick="updateName(this)" data-id="${sport.id}" class="${isSelected}">${sport.name}</li>`;
    options.insertAdjacentHTML("beforeend", li);
  });
}

function updateName(selectedLi) {
  addSports(selectedLi.innerText);
  select.classList.remove("active");
  selectBtn.firstElementChild.innerText = selectedLi.innerText;
  selectBtn.firstElementChild.dataset.id = selectedLi.dataset.id
}

addSports();

// const itensMenuDesktop = document.querySelectorAll('.icon i');

// itensMenuDesktop.forEach(icon => {
//   icon.addEventListener('mouseover', () => {
//     icon.classList.add('bx-tada-hover')
//     setTimeout(
//       () => {
//         icon.classList.remove('bx-tada-hover')
//       },
//       1500
//     );
//   })
// })

// const iconMenuDesktop = document.getElementById('menu-desktop')
// const iconMenu = iconMenuDesktop.querySelector('i')

// iconMenuDesktop.addEventListener('click', () => {
//   console.log(iconMenu);
//   const itens = document.querySelector('.itens')
//   if(itens.style.position === 'absolute' && itens.style.opacity === '0') {
//     itens.style.position = 'inherit'
//     itens.style.opacity = '1'
//     itens.classList.add('openAnimationMenu')
//     itens.classList.remove('closeAnimationMenu')
    
//     iconMenu.style.paddingBottom = '25px'
//     iconMenu.classList.add('active')
//   } else {
//     itens.style.opacity = '0'
//     itens.style.position = 'absolute'
//     itens.classList.remove('openAnimationMenu')
//     itens.classList.add('closeAnimationMenu')
//     iconMenu.style.paddingBottom = '0px'
//     iconMenu.classList.remove('active')
//   }
  
// })