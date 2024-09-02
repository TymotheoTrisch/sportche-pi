//Requisições HTTP
const token = localStorage.getItem("token");
const profileName = document.getElementById("userName");

function convertDate(isoDate) {
  const date = new Date(isoDate);

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}

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

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:3000/profile", {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const matchData = await response.json();
    profileName.innerHTML = matchData[0].username;

    document.querySelector(".access-main").addEventListener("click", () => {
      let confirmation = confirm("Quer realmente sair da conta?");

      if (confirmation) {
        localStorage.removeItem("token");
        window.location.href = "../../index.html";
      }
    });

    document
      .querySelector(".information-main")
      .addEventListener("click", async () => {
        const modal = document.querySelector("dialog");
        modal.showModal();

        const current_city = await getLocation();

        const name = document.getElementById("name");
        const email = document.getElementById("email-in-use");
        const city = document.getElementById("current-city");
        const date = document.getElementById("date");

        name.innerHTML = matchData[0].username;
        email.innerHTML = `<b>Email atual:</b><p>${matchData[0].email}</p>`;
        city.innerHTML = `<b>Cidade atual:</b><p>${current_city}</p> `;
        date.innerHTML = `<b>Criado em:</b><p>${convertDate(
          matchData[0].created_at
        )}</p>`;

        document.getElementById("close").addEventListener("click", () => {
          modal.close();
        });
      });
  } catch (e) {
    console.error("Error:", e);
    // alert("Erro ao consultar o usuário")
  }
});

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

function formatTime(time) {
  return time.substring(0, 5);
}

const myMatches = document.getElementById("myMatches");

myMatches.addEventListener("click", async () => {
  try {
    const response = await fetch("http://localhost:3000/profile/myMatches", {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);

    const list = document.getElementById("minhas-partidas");
    data.forEach((match) => {
      console.log(match);

      let li = document.createElement("li");
      li.innerHTML = `
        <div class="my-item-list">
          <img src=${getSportIcon(match.id_sport)}>
          <div class="nameTimeAndAdress">
            <h4>${match.name.toUpperCase()}</h4>
            <div class ="timeAndCtt">
              <h3>${formatTime(match.start_match)} - ${formatTime(match.end_of_match)}</h3>
              <h3>${match.street}</h3>
            </div>
          </div> 
        </div>
      `;
      list.appendChild(li);
    });

    document.getElementById("modalMyMatches").showModal();

    document.getElementById("closeMM").addEventListener("click", () => {
      list.innerHTML = "";
      document.getElementById("modalMyMatches").close();
    });
  } catch (e) {
    console.error("Error:", e);
    // alert("Erro ao consultar o usuário")
  }
});

const schedule = document.getElementById("schedule");

schedule.addEventListener("click", async () => {
  try {
    const response = await fetch(
      "http://localhost:3000/profile/joined-matches",
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);

    const list = document.getElementById("partidas-agendadas");
    data.forEach((match) => {
      console.log(match);

      let li = document.createElement("li");
      li.innerHTML = `
        <div class="item-list-match">
          <img class="ball" src=${getSportIcon(match.id_sport)}>
          <div class="nameTimeAndAdress">
            <h3>${match.name.toUpperCase()}</h3>
            <div class ="timeAndCtt">
              <h3 class = "time">${match.start_match} - ${match.end_of_match}</h3>
              <h3>${match.city}</h3>
              <h3>${match.street}</h3>
            </div>
          </div>
          <img class="whats" src="../img/whats.png" alt="">   
        </div>
      `;
      list.appendChild(li);
    });

    document.getElementById("modalSchedule").showModal();

    document.getElementById("closeS").addEventListener("click", () => {
      list.innerHTML = "";
      document.getElementById("modalSchedule").close();
    });
  } catch (err) {
    console.error(err);
  }
});
