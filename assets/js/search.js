const iconsCloseSearch = document.querySelectorAll(".icon-close");
const iconsSearch = document.querySelectorAll(".icon-search");
const inputsSearch = document.querySelectorAll("#search");
const sectionDetails = document.querySelector('.section-details');
const section = document.querySelector(".section-list-games");
const iconCloseDetais = document.querySelector(".icon-close-section i");
const token = localStorage.getItem('token');

iconsCloseSearch.forEach((iconClose) => {
  iconClose.addEventListener("click", () => {
    iconClose.previousElementSibling.value = "";
    iconClose.style.display = "none";
    selectGeneral();
  });
});

inputsSearch.forEach((inputSearch) => {
  inputSearch.addEventListener("input", () => {
    inputSearch.nextElementSibling.style.display = "flex";
    selectGeneral()
  });
});

iconCloseDetais.addEventListener('click', () => {
  sectionDetails.style.display = "none"
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

function formatDate(date) {
  const dateMatch = new Date(date);

  const day = String(dateMatch.getUTCDate()).padStart(2, '0');
  const month = String(dateMatch.getUTCMonth() + 1).padStart(2, '0');
  const year = dateMatch.getUTCFullYear();

  return `${day}-${month}-${year}`;
}

function formatTime(time) {
  return time.substring(0, 5);
}

function formatPhoneNumber(number) {
  return number.replace(/[()\-\+\s]/g, '');
}



document.addEventListener("DOMContentLoaded", async () => {
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
    const response = await fetch("http://localhost:3000/search", {
      method: "GET",
      headers: { 'authorization': `Bearer ${token}`, "Content-Type": "application/json" }
    });

    const matchData = await response.json();
    addHTMLMatch(matchData)
  }
});

async function selectGeneral() {

  try {
    const input = Array.from(inputsSearch).map(inputSearch => inputSearch.value.toLowerCase()).join('');

    const response = await fetch("http://localhost:3000/search/name-city", {
      method: "POST",
      headers: { 'authorization': `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ name: input, city: input })
    });

    const matchData = await response.json();
    addHTMLMatch(matchData)


  } catch (e) {
    console.error("Error:", e);
  }
}

function addHTMLMatch(matchData) {

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

  section.innerHTML = Array.isArray(matchData)
    ? matchData.map(match => renderMatch(match)).join('')
    : renderMatch(matchData);
}

async function addHTMLDetailsMatch(matchId) {

  try {
    const response = await fetch("http://localhost:3000/search/id", {
      method: "POST",
      headers: { 'authorization': `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ idMatch: matchId })
    });
    const matchData = await response.json();

    sectionDetails.style.display = "flex"

    const title = document.getElementById('title-details');
    const cityState = document.getElementById('city-state-details');
    const address = document.getElementById('address');
    const description = document.getElementById('description');
    const quantPlayers = document.getElementById('quant-players-details');
    const time = document.getElementById('time-details');
    const date = document.getElementById('date');
    const btnContato = document.getElementById('btn-contato');
    const btnParticipar = document.getElementById('btn-participar');

    console.log(time);


    title.innerText = matchData[0].name || 'Título não disponível';
    cityState.innerText = matchData[0].city + ", " + matchData[0].state || 'Cidade e estado não disponíveis';
    address.innerText = matchData[0].street || 'Endereço não disponível';
    description.innerText = matchData[0].description || 'Descrição não disponível';
    quantPlayers.innerText = (matchData[0].total_players_needed - matchData[0].players_registered) || 'Quantidade de participantes não disponível';
    date.innerText = formatDate(matchData[0].date_match) || 'Horário não disponível';
    time.innerText = formatTime(matchData[0].start_match) + " - " + formatTime(matchData[0].end_of_match) || 'Horário não disponível';

    btnContato.addEventListener('click', () => {
      window.location.href = `https://wa.me/${formatPhoneNumber(matchData[0].contact_phone)}`
    });

    btnParticipar.addEventListener('click', () => {
      alert('Botão "Participar" clicado');
    });

  } catch (e) {
    console.error("Error:", e);
  }


}