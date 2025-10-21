// Lógica para navegação entre seções
const homeSection = document.getElementById('home-section');
const dashboardSection = document.getElementById('dashboard-section');
const simularBtn = document.getElementById('simular-btn');

simularBtn.addEventListener('click', () => {
    homeSection.classList.add('opacity-0');
    setTimeout(() => {
        homeSection.classList.add('hidden');
        dashboardSection.classList.remove('hidden');
        dashboardSection.classList.add('opacity-100');
        
        // Inicializa os gráficos APÓS a seção ficar visível para evitar problemas de renderização
        initCharts();
    }, 500); // Duração da transição
});

// --- LÓGICA DAS FERRAMENTAS ---

// Limite Semanal
const definirLimiteBtn = document.getElementById('definir-limite-btn');
const limiteFeedback = document.getElementById('limite-feedback');
definirLimiteBtn.addEventListener('click', () => {
    limiteFeedback.textContent = 'Seu limite foi salvo com sucesso!';
    setTimeout(() => {
        limiteFeedback.textContent = '';
    }, 3000);
});

// Temporizador
const timerDisplay = document.getElementById('timer-display');
let timerSeconds = 30 * 60;
const timerInterval = setInterval(() => {
    if (timerSeconds > 0) {
        timerSeconds--;
        const minutes = Math.floor(timerSeconds / 60).toString().padStart(2, '0');
        const seconds = (timerSeconds % 60).toString().padStart(2, '0');
        timerDisplay.textContent = `${minutes}:${seconds}`;
    } else {
        timerDisplay.textContent = 'TEMPO ESGOTADO!';
        timerDisplay.classList.add('text-red-500');
        clearInterval(timerInterval);
    }
}, 1000);

// Modo Bloqueio
const lockBtn = document.getElementById('lock-btn');
const lockMessage = document.getElementById('lock-message');
lockBtn.addEventListener('click', () => {
    lockBtn.disabled = true;
    lockBtn.classList.add('opacity-50', 'cursor-not-allowed');
    lockMessage.textContent = 'Sites de apostas bloqueados.';

    let lockTime = 10; // Simulação de 10 segundos
    const interval = setInterval(() => {
        lockMessage.textContent = `Sites bloqueados. Tempo restante: ${lockTime}s`;
        lockTime--;
        if (lockTime < 0) {
            clearInterval(interval);
            lockMessage.textContent = '';
            lockBtn.disabled = false;
            lockBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    }, 1000);
});


function initCharts() {


    if(window.myCharts) {
        window.myCharts.forEach(chart => chart.destroy());
    }
    window.myCharts = [];


    Chart.defaults.color = '#cbd5e1';
    Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';


    const ctxRisco = document.getElementById('perfilRiscoChart').getContext('2d');
    const riscoChart = new Chart(ctxRisco, {
        type: 'bar',
        data: {
            labels: ['População Geral', 'Adolescentes (14-17 anos)'],
            datasets: [{
                label: '% em Zona de Risco',
                data: [38.6, 55.2],
                backgroundColor: [
                    'rgba(251, 191, 36, 0.7)',
                    'rgba(239, 68, 68, 0.7)'
                ],
                borderColor: [
                    'rgba(251, 191, 36, 1)',
                    'rgba(239, 68, 68, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                x: { 
                    beginAtZero: true, 
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { callback: value => value + '%' }
                },
                y: { grid: { display: false } }
            }
        }
    });
    window.myCharts.push(riscoChart);


    // Gráfico 2: Gasto Mensal Médio
    const ctxGastos = document.getElementById('gastoMedioChart').getContext('2d');
    const gastoChart = new Chart(ctxGastos, {
        type: 'bar',
        data: {
            labels: ['Média Geral', 'Classes A/B'],
            datasets: [{
                label: 'Gasto Médio (R$)',
                data: [186, 267],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.7)',
                    'rgba(34, 197, 94, 0.7)'
                ],
                borderColor: [
                     'rgba(59, 130, 246, 1)',
                     'rgba(34, 197, 94, 1)'
                ],
                borderWidth: 1
            }]
        },
         options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                y: { 
                    beginAtZero: true, 
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { callback: value => 'R$ ' + value }
                },
                x: { grid: { display: false } }
            }
        }
    });
     window.myCharts.push(gastoChart);

    // Gráfico 3: Perfil de Gênero
    const ctxGenero = document.getElementById('perfilGeneroChart').getContext('2d');
    const generoChart = new Chart(ctxGenero, {
        type: 'doughnut',
        data: {
            labels: ['Homens', 'Mulheres'],
            datasets: [{
                label: 'Perfil de Gênero',
                data: [62, 38],
                backgroundColor: [
                    'rgba(96, 165, 250, 0.8)',
                    'rgba(244, 114, 182, 0.8)'
                ],
                borderColor: '#1f2937',
                borderWidth: 2,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' },
                tooltip: { callbacks: { label: (context) => `${context.label}: ${context.raw}%` } }
            }
        }
    });
    window.myCharts.push(generoChart);


    // Gráfico 4: População de Apostadores
    const ctxPopulacao = document.getElementById('populacaoApostadoresChart').getContext('2d');
    const popChart = new Chart(ctxPopulacao, {
        type: 'bar',
        data: {
            labels: ['Total (ativos)', 'Problemáticos'],
            datasets: [{
                label: 'Apostadores (em milhões)',
                data: [22.13, 10.9],
                backgroundColor: [
                    'rgba(52, 211, 153, 0.7)',
                    'rgba(249, 115, 22, 0.7)'
                ],
                borderColor: [
                    'rgba(52, 211, 153, 1)',
                    'rgba(249, 115, 22, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                y: { 
                    beginAtZero: true, 
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { callback: value => value + 'M' }
                },
                x: { grid: { display: false } }
            }
        }
    });
    window.myCharts.push(popChart);
}

