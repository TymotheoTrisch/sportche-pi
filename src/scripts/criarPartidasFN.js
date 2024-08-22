async function createMatch() {
    const nome = document.getElementById('input-nome').value;
    const endereco = document.getElementById('input-endereco').value;
    const cidade = document.getElementById('input-cidade').value;
    const estado = document.getElementById('input-estado').dataset.id;
    const id_esporte = document.getElementById('input-esporte').dataset.id;
    const data_partida = document.getElementById('input-data').value;
    const total_jogadores = document.getElementById('input-total-jog').value
    const jogadores_restantes = document.getElementById('input-jogadores-res').value
    const inicio_partida = document.getElementById('input-inicio').value
    const termio_partida = document.getElementById('input-termino').value
    const telefone_contato = document.getElementById('input-telefone').value
    const descricao = document.getElementById('input-descricao').value
    const criado_por = 1 
    
    
    const response = await fetch('http://localhost:3000/criarpartidas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            street: endereco,
            city: cidade,
            state: parseInt(estado),
            name: nome,
            description: descricao,
            id_sport: parseInt(id_esporte),
            date_match: data_partida,
            start_match: inicio_partida,
            end_of_match: termio_partida,
            total_player: parseInt(total_jogadores),
            players_needed: parseInt(jogadores_restantes),
            contact_phone: telefone_contato,
            created_by: criado_por
        })
    })

    const result = await response.json();
    console.log(response);
    console.log(result);
}