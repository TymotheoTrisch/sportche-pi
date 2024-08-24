const iconsClose = document.querySelectorAll(".icon-close");
const iconsSearch = document.querySelectorAll(".icon-search");
const inputsSearch = document.querySelectorAll("#search");

async function getLocation() {
  try {
    const APIResponse = await fetch(`http://ip-api.com/json/`);
    if (!APIResponse.ok) {
      throw new Error("Failed to fetch location");
    }
    const data = await APIResponse.json();
   
    return data.city
  } catch (error) {
    console.error("Error:", error);
    throw error; // Propaga o erro para ser tratado por quem chamar a função
  }
}

console.log(getLocation())

document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:3000/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ city: getLocation() }),
  })
    .then((res) => {

      console.log('Resultado:' + res);
    })
    .catch((e) => {
      console.log("Error: " + e);
    });
});

iconsClose.forEach((iconClose) => {
  iconClose.addEventListener("click", () => {
    iconClose.previousElementSibling.value = "";
    iconClose.style.display = "none";
  });
});

inputsSearch.forEach((inputSearch) => {
  inputSearch.addEventListener("input", () => {
    inputSearch.nextElementSibling.style.display = "flex";
  });
});
