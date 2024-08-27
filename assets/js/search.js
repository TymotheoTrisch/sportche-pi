const iconsClose = document.querySelectorAll(".icon-close");
const iconsSearch = document.querySelectorAll(".icon-search");
const inputsSearch = document.querySelectorAll("#search");
const token = localStorage.getItem('token');

iconsClose.forEach((iconClose) => {
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


document.addEventListener("DOMContentLoaded", async () => {
  try {

    const city = await getLocation();
    const response = await fetch("http://localhost:3000/search", {
      method: "POST",
      headers: { 
        'authorization': `Bearer ${token}`,
        "Content-Type": "application/json" },
      body: JSON.stringify({ city: city })
    });
    
    console.log(response);

    const matchData = await response.json();
    addHTML(matchData)
    

  } catch (e) {
    console.error("Error:", e);
    const response = await fetch("http://localhost:3000/search", {
      method: "GET",
      headers: {'authorization': `Bearer ${token}`, "Content-Type": "application/json" }
    });
    

    const matchData = await response.json();
    addHTML(matchData)
  }
});

async function selectGeneral() {

  try {
    const inputName = Array.from(inputsSearch).map(inputSearch => inputSearch.value.toLowerCase()).join('');

    const response = await fetch("http://localhost:3000/search", {
      method: "POST",
      headers: {'authorization': `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ name: inputName })
    });

    const matchData = await response.json();
    addHTML(matchData)


  } catch {
    console.error("Error:", e);
  }
}

function addHTML(matchData) {
  const section = document.querySelector(".section-list-games");

    const renderMatch = (match) => `
      <div class="game-holder">
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
              <p id="time">${match.start_match} - ${match.end_of_match}</p>
            </div>
          </div>
        </div>
      </div>
    `;

    section.innerHTML = Array.isArray(matchData)
      ? matchData.map(match => renderMatch(match)).join('')
      : renderMatch(matchData);
}

