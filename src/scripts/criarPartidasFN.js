async function createMatch() {
    const nome = document.getElementById('input-nome')
    const endereco = document.getElementById('input-endereco')
    const cidade = document.getElementById('input-cidade')
    const estado = document.getElementById('input-estado').dataset.id;
    const id_esporte = document.getElementById('input-esporte').dataset.id;
    const data_partida = document.getElementById('input-data')
    const total_jogadores = document.getElementById('input-total-jog')
    const jogadores_restantes = document.getElementById('input-jogadores-res')
    const horario_partida = document.getElementById('input-horario')
    const telefone_contato = document.getElementById('input-telefone')
    const descricao = document.getElementById('input-descricao')
    const criado_por = 1 
    
    
    const response = await fetch('http://localhost:3000/criarpartidas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            street: endereco,
            city: cidade,
            state: estado,
            name: nome,
            description: descricao,
            id_sport: id_esporte,
            date_match: data_partida,
            time_match: horario_partida,
            total_player: total_jogadores,
            players_needed: jogadores_restantes,
            contact_phone: telefone_contato,
            created_by: criado_por
        })
    })

    const result = await response.json();
    console.log(response);
    console.log(result);
}