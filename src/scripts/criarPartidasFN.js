const token = localStorage.getItem("token");

async function createMatch() {
    const formData = {
        nome: document.getElementById('input-nome').value,
        endereco: document.getElementById('input-endereco').value,
        cidade: document.getElementById('input-cidade').value,
        estado: parseInt(document.getElementById('input-estado').dataset.id),
        esporte: parseInt(document.getElementById('input-esporte').dataset.id),
        data: document.getElementById('input-data').value,
        pendentes: parseInt(document.getElementById('input-pendentes').value),
        inicio: document.getElementById('input-inicio').value,
        termino: document.getElementById('input-termino').value,
        telefone: document.getElementById('input-telefone').value,
        descricao: document.getElementById('input-descricao').value,
        criado_por: 1
    };

    for (const key in formData) {
        if (!formData[key] && formData[key] !== 'criado_por') {
            const inputId = `input-${key.replace('_', '-')}`;
            const $input = document.getElementById(inputId);

            if ($input) {
                const $error = $input.closest('.div-partida').querySelector('.error');
                if ($error) {
                    $error.style.display = 'flex';
                    if ($input.tagName != 'SPAN') {

                        $input.style.outline = '1px solid red';
                    } else {
                        $input.closest('.select-btn').style.outline = '1px solid red';
                    }
                }
            }
            return;
        }
    }

    if (formData.inicio >= formData.termino) {
        alert("O horário de início deve ser anterior ao horário de término.");
        return;
    }

    const formatContact = (value) => {
        return value.replace(/\D/g, '');
    }
    
    console.log(formatContact(formData.telefone));


    try {
        const response = await fetch('http://localhost:3000/criarpartidas', {
            method: 'POST',
            headers: {'authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                street: formData.endereco,
                city: formData.cidade,
                state: formData.estado,
                name: formData.nome,
                description: formData.descricao,
                id_sport: formData.esporte,
                date_match: formData.data,
                start_match: formData.inicio,
                end_of_match: formData.termino,
                total_players_needed: formData.pendentes,
                players_registered: 0,
                contact_phone: formData.telefone,
                created_by: formData.criado_por
            })
        });

        const result = await response.json();
        console.log(result);

        if (response.ok) {
            alert("Partida criada com sucesso!");
        } else {
            alert("Erro ao criar partida: " + result.message);
        }
    } catch (error) {
        console.error("Erro ao enviar os dados:", error);
        alert("Ocorreu um erro ao criar a partida.");
    }
}