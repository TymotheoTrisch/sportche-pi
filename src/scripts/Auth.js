window.onload = async function () {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = "../../index.html";
    } else {
        try {
            const response = await fetch('http://localhost:3000/verifyToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Token inválido ou expirado');
            }

            console.log('Token válido');

        } catch (error) {
            console.error('Erro ao verificar o token:', error);
            alert('Sua sessão expirou. Por favor, faça login novamente.');
            window.location.href = "../../index.html"; 
        }
    }
};