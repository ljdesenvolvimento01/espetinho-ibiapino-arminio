function checkBusinessStatus() {
    const badge = document.getElementById('status-badge');
    const text = document.getElementById('status-text');
    
    // Evita erros caso os elementos ainda não tenham sido renderizados na tela
    if (!badge || !text) return;

    const agora = new Date();
    const diaSemana = agora.getDay(); // 0 = Domingo, 1 = Segunda, ..., 3 = Quarta, etc.
    const hora = agora.getHours();
    const minutos = agora.getMinutes();
    const horaAtualDecimal = hora + (minutos / 60);

    // CONFIGURAÇÃO DOS HORÁRIOS:
    // Dias em que a casa abre: 3 (Quarta), 4 (Quinta), 5 (Sexta), 6 (Sábado) e 0 (Domingo)
    const diasAberto = [3, 4, 5, 6, 0];
    const horaAbertura = 18.0;   // 18:00h
    const horaFechamento = 23.5; // 23:30h

    const estaAbertoHoje = diasAberto.includes(diaSemana);
    const dentroDoHorario = horaAtualDecimal >= horaAbertura && horaAtualDecimal < horaFechamento;

    // Atualiza o visual e o texto da bolinha de status
    if (estaAbertoHoje && dentroDoHorario) {
        badge.className = "status-badge aberto";
        text.textContent = "Aberto Agora!";
    } else {
        badge.className = "status-badge fechado";
        text.textContent = "Fechado no momento";
    }
}

// Executa a checagem assim que a estrutura do HTML estiver totalmente carregada
document.addEventListener("DOMContentLoaded", () => {
    checkBusinessStatus();
    
    // Verifica o horário e atualiza o status automaticamente a cada 30 segundos
    setInterval(checkBusinessStatus, 30000);
});
