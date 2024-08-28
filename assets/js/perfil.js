//Requisições HTTP
const token = localStorage.getItem("token");
const profileName = document.getElementById("userName");

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

    document.querySelector('.information-main').addEventListener('click', () => {
      
    })
  } catch (e) {
    console.error("Error:", e);
    // alert("Erro ao consultar o usuário")
  }
});
