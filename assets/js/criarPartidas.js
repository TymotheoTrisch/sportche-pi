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
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{2})(\d)/, "($1) $2")
    value = value.replace(/(\d)(\d{4})$/, "$1-$2")
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
    { "id": 12, "name": "Acre" },
    { "id": 27, "name": "Alagoas" },
    { "id": 16, "name": "Amapá" },
    { "id": 13, "name": "Amazonas" },
    { "id": 29, "name": "Bahia" },
    { "id": 23, "name": "Ceará" },
    { "id": 53, "name": "Distrito Federal" },
    { "id": 32, "name": "Espírito Santo" },
    { "id": 52, "name": "Goiás" },
    { "id": 21, "name": "Maranhão" },
    { "id": 51, "name": "Mato Grosso" },
    { "id": 50, "name": "Mato Grosso do Sul" },
    { "id": 31, "name": "Minas Gerais" },
    { "id": 15, "name": "Pará" },
    { "id": 41, "name": "Paraná" },
    { "id": 25, "name": "Paraíba" },
    { "id": 26, "name": "Pernambuco" },
    { "id": 22, "name": "Piauí" },
    { "id": 33, "name": "Rio de Janeiro" },
    { "id": 24, "name": "Rio Grande do Norte" },
    { "id": 43, "name": "Rio Grande do Sul" },
    { "id": 11, "name": "Rondônia" },
    { "id": 14, "name": "Roraima" },
    { "id": 42, "name": "Santa Catarina" },
    { "id": 35, "name": "São Paulo" },
    { "id": 28, "name": "Sergipe" },
    { "id": 17, "name": "Tocantins" }
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

// Função para retirar toda a formatação do telefone de contato
function formatContact(value) {
    return value.replace(/\D/g, '');
}

// Função para verificar se a cidade digitada existe na api da IBGE
async function validateCity(stateId, cityName) {

    try {
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios`);
        if (!response.ok) throw new Error('Erro ao buscar cidades');

        const data = await response.json();

        const cityExists = data.some(city => city.nome.toLowerCase() === cityName.toLowerCase());

        return cityExists;
    } catch (error) {
        console.error('Erro:', error);
        return false;
    }
}

// Função para formatar a cidade, para a primeira letra de cada palavra seja maiúscula
function formatCity(cityName) {
    return cityName
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}


// Função para verificar e criar a partida
async function createMatch() {
    const formData = {
        nome: document.getElementById('input-nome').value,
        endereco: document.getElementById('input-endereco').value,
        cidade: formatCity(document.getElementById('input-cidade').value),
        estado: document.getElementById('input-estado').innerText,
        idEstado: document.getElementById('input-estado').dataset.id,
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

    const validateCidade = await validateCity(formData.idEstado, formData.cidade);

    if (!validateCidade) {
        alert("A cidade está incorreta, por favor digite uma cidade correspondente com o estado.")
        return;
    }


    try {
        const response = await fetch('http://localhost:3000/criarpartidas', {
            method: 'POST',
            headers: { 'authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
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