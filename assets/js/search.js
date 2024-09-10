const iconsCloseSearch = document.querySelectorAll(".icon-close");
const iconsSearch = document.querySelectorAll(".icon-search");
const inputsSearch = document.querySelectorAll("#search");
const iconCloseDetais = document.querySelector(".icon-close-section i");

const filtersMobile = document.querySelectorAll(".filters-mobile div")
const filtersDesktop = document.querySelector('.filters-desktop select');

const errorMessage = document.getElementById('message-error');

const sectionDetails = document.querySelector('.section-details');
const sectionList = document.querySelector(".section-list-games");

const token = localStorage.getItem('token');

// Função para limpar a pesquisa 
iconsCloseSearch.forEach((iconClose) => {
    iconClose.addEventListener("click", () => {
        iconClose.previousElementSibling.value = "";
        iconClose.style.display = "none";
        selectGeneral();
        filtersMobile[1].classList.remove('active')
        filtersMobile[0].classList.add('active')
    });
});

// Função para quando o usuário digitar no input ele chamar a função de buscar
inputsSearch.forEach((inputSearch) => {
    inputSearch.addEventListener("input", () => {
        inputSearch.nextElementSibling.style.display = "flex";
        selectNameCity()
    });
});

// Função para fechar a modal de detalhes da partida
iconCloseDetais.addEventListener('click', () => {
    sectionDetails.style.display = "none"
});

// Filtro para as partidas no mobile
filtersMobile.forEach(option => {
    option.addEventListener('click', async () => {
        if (option.dataset.name === "todos") {
            option.closest(".filters-mobile").querySelectorAll("div")[1].classList.remove('active')
            option.classList.add('active')
            await selectGeneral()
        } else {
            option.closest(".filters-mobile").querySelectorAll("div")[0].classList.remove('active')
            option.classList.add('active')
            await selectCity()
        }
    })
})

// Função para limpar o filtro no mobile 
function limparFilters() {
    filtersMobile.forEach(option => {
        option.classList.remove('active')
    })
}

// Filtro para as partidas no desktop
filtersDesktop.addEventListener('change', async () => {
    const selectedValue = filtersDesktop.options[filtersDesktop.selectedIndex].getAttribute('data-name');

    if (selectedValue === "todos") {
        await selectGeneral()
    } else {
        await selectCity()
    }
});

//Requisições HTTP
async function getLocation() {
    try {
        const APIResponse = await fetch(`http://ip-api.com/json/`);
        if (!APIResponse.ok) {
            throw new Error("Failed to fetch location");
        }
        const matchData = await APIResponse.json();
         
        return matchData.city;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

function getSportIcon(number) {
    let iconPath;

    switch (number) {
        case 1:
            iconPath = "../img/icon_futebol.png";
            break;
        case 3:
            iconPath = "../img/icon_volei.png";
            break;
        case 2:
            iconPath = "../img/icon_basquete.png";
            break;
        case 4:
            iconPath = "../img/icon_tenis.png";
            break;
    }

    return iconPath;
}

// Função para formatar a data
function formatDate(date) {
    const dateMatch = new Date(date);

    const day = String(dateMatch.getUTCDate()).padStart(2, '0');
    const month = String(dateMatch.getUTCMonth() + 1).padStart(2, '0');
    const year = dateMatch.getUTCFullYear();

    return `${day}-${month}-${year}`;
}

// Função para formatar o horário
function formatTime(time) {
    return time.substring(0, 5);
}

// Função para formatar o número de contato
function formatPhoneNumber(number) {
    return number.replace(/[()\-\+\s]/g, '');
}


// Função para buscar as partidas pela cidade onde o usuário está
async function selectCity() {
    try {

        const city = await getLocation();
        const response = await fetch("http://localhost:3000/search", {
            method: "POST",
            headers: {
                'authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ city: city })
        });

        const matchData = await response.json();
        addHTMLMatch(matchData)

    } catch (e) {
        console.error("Error:", e);
        await selectGeneral();
    }
}

// Função para buscar todas as partidas
async function selectGeneral() {

    const response = await fetch("http://localhost:3000/search", {
        method: "GET",
        headers: { 'authorization': `Bearer ${token}`, "Content-Type": "application/json" }
    });

    const matchData = await response.json();
    addHTMLMatch(matchData)
}

// Função para buscar as partidas pelo input, (nome ou cidade)
async function selectNameCity() {
    limparFilters()


    try {
        const input = Array.from(inputsSearch).map(inputSearch => inputSearch.value.toLowerCase()).join('');

        const response = await fetch("http://localhost:3000/search/name-city", {
            method: "POST",
            headers: { 'authorization': `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({ name: input, city: input })
        });

        const matchData = await response.json();

        if (matchData.length === 0) {
            sectionList.innerHTML = '';
            sectionList.style.marginBottom = '0px';
            errorMessage.innerText = "Nenhuma partida encontrada"
            return;
        }

        addHTMLMatch(matchData)



    } catch (e) {
        console.error("Error:", e);
    }
}

// Função para renderizar as partidas na página
function addHTMLMatch(matchData) {

    errorMessage.innerText = ""
    sectionList.style.marginBottom = '100px';


    const renderMatch = (match) => `
      <div class="game-holder" onclick="addHTMLDetailsMatch(${match.id_match})">
        <div class="sport">
          <img src="${getSportIcon(match.id_sport)}" alt="">
        </div>
        <div class="content">
          <div class="game-title">
            <h3 id="title">${match.name}</h3>
            <div class="location">
              <i class="bx bx-map-pin"></i>
             <p id="city">${match.street + ", " + match.city}</p><!--   Corrigido para usar a cidade do endereço -->
            </div>
          </div>
          <div class="info-match">
            <div class="players">
              <i class='bx bx-user'></i>
              <p id="quant-players">${match.total_players_needed - match.players_registered}</p>
            </div>
            <div class="time">
              <i class='bx bx-time-five'></i>
              <p id="time">${formatTime(match.start_match)} - ${formatTime(match.end_of_match)}</p>
            </div>
          </div>
        </div>
      </div>
    `;

    sectionList.innerHTML = Array.isArray(matchData)
        ? matchData.map(match => renderMatch(match)).join('')
        : renderMatch(matchData);
}

// Função para renderizar as informações da partida em um modal
async function addHTMLDetailsMatch(matchId) {

    try {
        const response = await fetch("http://localhost:3000/search/id", {
            method: "POST",
            headers: { 'authorization': `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({ idMatch: matchId })
        });
        const matchData = await response.json();

        sectionDetails.style.display = "flex"

        const matches = {
            idMatch: document.querySelector('.content-game'),
            title: document.getElementById('title-details'),
            cityState: document.getElementById('city-state-details'),
            address: document.getElementById('address'),
            description: document.getElementById('description'),
            quantPlayers: document.getElementById('quant-players-details'),
            time: document.getElementById('time-details'),
            date: document.getElementById('date'),
            btnContato: document.getElementById('btn-contato'),
            btnParticipar: document.getElementById('btn-participar'),
        };

        matches.idMatch.dataset.id = matchData[0].id_match;
        matches.title.innerText = matchData[0].name || 'Título não disponível';
        matches.cityState.innerText = matchData[0].city + ", " + matchData[0].state || 'Cidade e estado não disponíveis';
        matches.address.innerText = matchData[0].street || 'Endereço não disponível';
        matches.description.innerText = matchData[0].description || 'Descrição não disponível';
        matches.quantPlayers.innerText = (matchData[0].total_players_needed - matchData[0].players_registered) || 'Quantidade de participantes não disponível';
        matches.date.innerText = formatDate(matchData[0].date_match) || 'Horário não disponível';
        matches.time.innerText = formatTime(matchData[0].start_match) + " - " + formatTime(matchData[0].end_of_match) || 'Horário não disponível';

        matches.btnContato.addEventListener('click', () => {
            window.location.href = `https://wa.me/55${formatPhoneNumber(matchData[0].contact_phone)}`
        });

        matches.btnParticipar.addEventListener('click', () => {
            addParticipant(matchData[0]);
        });

    } catch (e) {
        console.error("Error:", e);
    }


}

// Função para adicionar o participante a uma partida
async function addParticipant(matchData) {
    try {
        console.log(matchData);

        const response = await fetch('http://localhost:3000/search/join', {
            method: "POST",
            headers: { 'authorization': `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({
                idMatch: matchData.id_match,
                playersRegistered: matchData.players_registered
            })
        })

        const results = await response.json();

        console.log(results);

        if (response.status === 401) {
            window.location.reload()
            return alert("Você já está cadastrado nessa partida.")
        }

        if (response.status === 403) {
            window.location.reload()
            return alert("Você é o dono dessa partida, não pode se cadastrar nela.")
        }

        if (response.ok) {
            alert("Você ingressou nessa partida");
            window.location.reload()
        } else {
            alert("Ocorreu um erro ao participar na partida, atualize a página.")
        }

    } catch (e) {
        console.log("Error: ", e);
    }
}

// Ocorre quando a página é renderizada, e chama a função selectCity
selectGeneral();