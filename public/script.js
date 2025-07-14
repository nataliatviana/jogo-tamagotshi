// Inicia os estados do bichinho
let fome = 50;
let felicidade = 50;
let vivo = true;

// Pega os elementos do HTML para manipular
const fomeSpan = document.getElementById("fome");
const felicidadeSpan = document.getElementById("felicidade");
const petImg = document.getElementById("pet");
const roupaImg = document.getElementById("roupa");

// Listas com nomes de imagens para troca dinâmica
const animais = ["dog.png", "cat.png", "rabbit.png"];
const roupas = ["clothes1.png", "clothes2.png", "clothes3.png"];

// Atualiza os valores na tela e verifica se o bichinho ainda está vivo
function atualizarStatus() {
  fomeSpan.textContent = fome;
  felicidadeSpan.textContent = felicidade;

  if (fome >= 100 || felicidade <= 0) {
    vivo = false;
    alert("💀 Seu bichinho morreu :(");
    clearInterval(ciclo); // Para o temporizador
  }
}

// Ações que o jogador pode fazer:

// Alimentar: reduz fome e aumenta felicidade
function alimentar() {
  if (!vivo) return;
  fome = Math.max(0, fome - 20); // Evita valor menor que 0
  felicidade += 5;
  atualizarStatus();
}

// Carinho: aumenta felicidade
function darCarinho() {
  if (!vivo) return;
  felicidade = Math.min(100, felicidade + 15); // Limita em 100
  atualizarStatus();
}

// Trocar roupa: escolhe uma imagem aleatória da lista de roupas
function trocarRoupa() {
  if (!vivo) return;
  const aleatoria = roupas[Math.floor(Math.random() * roupas.length)];
  roupaImg.src = `assets/${aleatoria}`; // Atualiza a imagem no HTML
  felicidade += 5;
  atualizarStatus();
}

// Passear: muda o pet por outro animal e ajusta os níveis
function passear() {
  if (!vivo) return;
  const aleatorio = animais[Math.floor(Math.random() * animais.length)];
  petImg.src = `assets/${aleatorio}`;
  felicidade += 10;
  fome += 5;
  atualizarStatus();
}

// A cada 10 segundos o bichinho fica mais faminto e menos feliz
const ciclo = setInterval(() => {
  fome = Math.min(100, fome + 5);
  felicidade = Math.max(0, felicidade - 5);
  atualizarStatus();
}, 10000);

// Exibe os valores iniciais quando a página carrega
atualizarStatus();
