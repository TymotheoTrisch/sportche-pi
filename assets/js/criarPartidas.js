const selectSport = document.querySelector('.select-sport')
const optionsSport = selectSport.querySelector(".content-sport .options");
const selectBtnSport = selectSport.querySelector('.select-btn-sport');

const selectState = document.querySelector('.select-state')
const optionsState = selectState.querySelector(".content-state .options");
const selectBtnState = selectState.querySelector('.select-btn-state');

$('.number-increment').click(function () {
  var $input = $(this).parents('.input-incrementor').find('#input-pendentes');
  var val = parseInt($input.val(), 10);
  
  $input.val(val + 1);
});

$('.number-decrement').click(function () {
  var $input = $(this).parents('.input-incrementor').find('#input-pendentes');
  var val = parseInt($input.val(), 10);
  if (val > 1) {
    $input.val(val - 1);
  }
});

$('.div-partida input').on('blur', function () {
  var $error = $(this).siblings('.error');
  
  if (!$(this).val()) { 
      $error.css('display', 'flex');
      $(this).css('outline', '1px solid red');
  } else {
      $error.css('display', 'none');
      $(this).css('outline', '0px');
      
  }
});

$('.div-partida textarea').on('blur', function () {
  var $error = $(this).siblings('.error');
  
  if (!$(this).val()) { 
      $error.css('display', 'flex');
      $(this).css('outline', '1px solid red');
  } else {
      $error.css('display', 'none');
      $(this).css('outline', '0px');
      
  }
});
$('.select-btn').on('click', function () {
  var $span = $(this).find('span');
  var $error = $(this).closest('.div-partida').find('.error');
  
  const $parent = $(this).closest('.select');
    
  if ($parent.hasClass('activeted') && $span.attr('data-id') === "") {
      $error.css('display', 'flex');
      $(this).css('outline', '1px solid red');
  } else {
      $error.css('display', 'none');
      $(this).css('outline', '0px');
  }
});

const handlePhone = (event) => {
  let input = event.target
  input.value = phoneMask(input.value)
}

const phoneMask = (value) => {
  if (!value) return ""
  value = value.replace(/\D/g,'')
  value = value.replace(/(\d{2})(\d)/,"($1) $2")
  value = value.replace(/(\d)(\d{4})$/,"$1-$2")
  return value
}

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

const states = [
  { "id": 1, "name": "Acre" },
  { "id": 2, "name": "Alagoas" },
  { "id": 3, "name": "Amapá" },
  { "id": 4, "name": "Amazonas" },
  { "id": 5, "name": "Bahia" },
  { "id": 6, "name": "Ceará" },
  { "id": 7, "name": "Distrito Federal" },
  { "id": 8, "name": "Espírito Santo" },
  { "id": 9, "name": "Goiás" },
  { "id": 10, "name": "Maranhão" },
  { "id": 11, "name": "Mato Grosso" },
  { "id": 12, "name": "Mato Grosso do Sul" },
  { "id": 13, "name": "Minas Gerais" },
  { "id": 14, "name": "Pará" },
  { "id": 15, "name": "Paraíba" },
  { "id": 16, "name": "Paraná" },
  { "id": 17, "name": "Pernambuco" },
  { "id": 18, "name": "Piauí" },
  { "id": 19, "name": "Rio de Janeiro" },
  { "id": 20, "name": "Rio Grande do Norte" },
  { "id": 21, "name": "Rio Grande do Sul" },
  { "id": 22, "name": "Rondônia" },
  { "id": 23, "name": "Roraima" },
  { "id": 24, "name": "Santa Catarina" },
  { "id": 25, "name": "São Paulo" },
  { "id": 26, "name": "Sergipe" },
  { "id": 27, "name": "Tocantins" }
];


selectBtnState.addEventListener("click", () => selectState.classList.toggle("activeted"));

// Função para adicionar os estados
function addStates(selectedState) {
  optionsState.innerHTML = "";
  states.forEach(state => {
    let isSelected = state.name == selectedState ? "selected" : "";
    let li = `<li onclick="updateNameState(this)" data-id="${state.id}" class="${isSelected}">${state.name}</li>`;
    optionsState.insertAdjacentHTML("beforeend", li);
  });
}

function updateNameState(selectedLi) {
  addStates(selectedLi.innerText);
  selectState.classList.remove("activeted");
  selectBtnState.firstElementChild.innerText = selectedLi.innerText;
  selectBtnState.firstElementChild.dataset.id = selectedLi.dataset.id
}

addStates();

selectBtnSport.addEventListener("click", () => selectSport.classList.toggle("activeted"));

// Função para adicionar os esportes
function addSport(selectedSport) {
  optionsSport.innerHTML = "";
  sports.forEach(sport => {
    let isSelected = sport.name == selectedSport ? "selected" : "";
    let li = `<li onclick="updateNameSport(this)" data-id="${sport.id}" class="${isSelected}">${sport.name}</li>`;
    optionsSport.insertAdjacentHTML("beforeend", li);
  });
}

function updateNameSport(selectedLi) {
  addSport(selectedLi.innerText);
  selectSport.classList.remove("activeted");
  selectBtnSport.firstElementChild.innerText = selectedLi.innerText;
  selectBtnSport.firstElementChild.dataset.id = selectedLi.dataset.id
}

addSport();


// Requisições HTTP
const token = localStorage.getItem("token");

function formatContact(value) {
  return value.replace(/\D/g, '');
}

async function createMatch() {
    const formData = {
        nome: document.getElementById('input-nome').value,
        endereco: document.getElementById('input-endereco').value,
        cidade: document.getElementById('input-cidade').value,
        estado: document.getElementById('input-estado').innerText,
        esporte: parseInt(document.getElementById('input-esporte').dataset.id),
        data: document.getElementById('input-data').value,
        pendentes: parseInt(document.getElementById('input-pendentes').value),
        inicio: document.getElementById('input-inicio').value,
        termino: document.getElementById('input-termino').value,
        telefone: formatContact(document.getElementById('input-telefone').value),
        descricao: document.getElementById('input-descricao').value,
    };
    

    for (const key in formData) {
        if (formData[key] === null || formData[key] === "" || typeof formData[key] === "undefined") {
            const inputId = `input-${key.replace('_', '-')}`;
            const $input = document.getElementById(inputId);
    
            if ($input) {
                const $error = $input.closest('.div-partida').querySelector('.error');
                if ($error) {
                    $error.style.display = 'flex';
                    if ($input.tagName !== 'SPAN') {
                        $input.style.outline = '1px solid red';
                    } else {
                        $input.closest('.select-btn').style.outline = '1px solid red';
                    }
                }
            }
            return;
        }
    }

    if (formData.inicio >= formData.termino) {
        alert("O horário de início deve ser anterior ao horário de término.");
        return;
    }

    
    // console.log(formatContact(formData.telefone));


    try {
        const response = await fetch('http://localhost:3000/criarpartidas', {
            method: 'POST',
            headers: {'authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                street: formData.endereco,
                city: formData.cidade,
                state: formData.estado,
                name: formData.nome,
                description: formData.descricao,
                id_sport: formData.esporte,
                date_match: formData.data,
                start_match: formData.inicio,
                end_of_match: formData.termino,
                total_players_needed: formData.pendentes,
                players_registered: 0,
                contact_phone: formData.telefone
            })
        });

        const result = await response.json();
        console.log(result);

        if (response.ok) {
            alert("Partida criada com sucesso!");
            window.location.href = "./search.html"
        } else {
          
            alert("Erro ao criar partida: " + result.message);
        }
    } catch (error) {
        console.error("Erro ao enviar os dados:", error);
        alert("Ocorreu um erro ao criar a partida.");
    }
}