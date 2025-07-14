const readline = require('readline-sync');

class Tamagotchi {
  constructor(nome) {
    this.nome = nome;
    this.fome = 50;
    this.felicidade = 50;
    this.vivo = true;
    this.emoji = '🐶';
    this.roupa = '👕';
  }

  status() {
    console.log(`\n${this.emoji}  ${this.nome} ${this.roupa}`);
    console.log(`Fome: ${this.fome}`);
    console.log(`Felicidade: ${this.felicidade}`);
  }

  alimentar() {
    this.fome = Math.max(0, this.fome - 20);
    this.felicidade += 5;
    console.log(`${this.nome} foi alimentado! 🍎`);
  }

  carinho() {
    this.felicidade = Math.min(100, this.felicidade + 15);
    console.log(`${this.nome} recebeu carinho! 💖`);
  }

  trocarRoupa() {
    const roupas = ['👕', '🎽', '👗', '🧥'];
    this.roupa = roupas[Math.floor(Math.random() * roupas.length)];
    this.felicidade += 5;
    console.log(`${this.nome} trocou de roupa! 😎`);
  }

  passear() {
    const animais = ['🐶', '🐱', '🐰', '🐥', '🦊'];
    this.emoji = animais[Math.floor(Math.random() * animais.length)];
    this.felicidade += 10;
    this.fome += 5;
    console.log(`${this.nome} foi passear! 🌳`);
  }

  atualizarEstado() {
    this.fome = Math.min(100, this.fome + 5);
    this.felicidade = Math.max(0, this.felicidade - 5);

    if (this.fome >= 100 || this.felicidade <= 0) {
      this.vivo = false;
      console.log(`\n💀 ${this.nome} morreu :( )`);
      clearInterval(intervalo);
      process.exit();
    }
  }
}

console.clear();
console.log('🐾 Bem-vindo ao Tamagotchi Virtual!');
const nome = readline.question('De um nome ao seu bichinho: ');
const pet = new Tamagotchi(nome);

// A cada 10 segundos ele perde felicidade e ganha fome
const intervalo = setInterval(() => {
  pet.atualizarEstado();
  pet.status();
}, 10000);

// Loop principal de interação
function loop() {
  if (!pet.vivo) return;

  console.log('\nO que deseja fazer?');
  console.log('[1] Alimentar 🍎');
  console.log('[2] Dar carinho 💖');
  console.log('[3] Trocar roupa 👕');
  console.log('[4] Levar pra passear 🐾');
  console.log('[5] Ver status 📊');
  console.log('[0] Sair ❌');

  const opcao = readline.question('Escolha: ');

  switch (opcao) {
    case '1':
      pet.alimentar();
      break;
    case '2':
      pet.carinho();
      break;
    case '3':
      pet.trocarRoupa();
      break;
    case '4':
      pet.passear();
      break;
    case '5':
      pet.status();
      break;
    case '0':
      console.log('Até mais! 👋');
      clearInterval(intervalo);
      process.exit();
    default:
      console.log('Opção inválida!');
  }

  setTimeout(loop, 500); // Pequeno delay para evitar sobreposição
}

loop();
