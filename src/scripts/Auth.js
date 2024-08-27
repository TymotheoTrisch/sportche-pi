window.onload = function() {
    const token = localStorage.getItem('token');
    console.log(token);

    if (!token) {
        window.location.href = "../../index.html";
    } else {
        // fetch('/verifyToken', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${token}`
        //     }
        // }).then(response => {
        //     if (!response.ok) {
        //         window.location.href = "../../index.html";
        //     }
        // }).catch(error => {
        //     console.error('Erro ao verificar o token:', error);
        //     window.location.href = "../../index.html";
        // });
    }
};