const token = localStorage.getItem('token')

document.addEventListener("DOMContentLoaded", async () => {
    try {
      const response = await fetch("http://localhost:3000/profile", {
        method: "GET",
        headers: { 
          'authorization': `Bearer ${token}`,
          "Content-Type": "application/json" },
      });
  
      const matchData = await response.json();
      console.log(matchData);
  
    } catch (e) {
      console.error("Error:", e);
      alert("Erro ao consultar o usuário")
    }
  });