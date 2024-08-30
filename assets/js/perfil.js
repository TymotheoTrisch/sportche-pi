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
        const modal = document.querySelector("dialog")
        modal.showModal();

        const current_city = await getLocation();

        const name = document.getElementById("name");
        const email = document.getElementById("email-in-use");
        const city = document.getElementById("current-city");
        const date = document.getElementById("date");

        console.log(matchData[0].created_at);

        console.log(current_city)

        name.innerHTML = matchData[0].username;
        email.innerHTML = `<b>Email atual:</b><p>${matchData[0].email}</p>`;
        city.innerHTML = `<b>Cidade atual:</b><p>${current_city}</p> ` ;
        date.innerHTML = `<b>Criado em:</b><p>${convertDate(matchData[0].created_at)}</p>`;

        document.getElementById('close').addEventListener('click', () => {
          modal.close()
        });

      });
  } catch (e) {
    console.error("Error:", e);
    // alert("Erro ao consultar o usuário")
  }
});
