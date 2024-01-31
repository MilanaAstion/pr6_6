import { Pokemon } from './pokemon.js';
import { createClickCounter, logs } from './utils.js';
import { pokemons } from './pokemons.js';

class Game {
  constructor() {
    this.$btn = document.getElementById("btn-kick");
    this.$btn1 = document.getElementById("btn-kick1");
    this.$btn2 = document.getElementById("btn-kick2");
    this.$btn3 = document.getElementById("btn-kick3");
    this.$btn4 = document.getElementById("btn-kick4");
    this.$btn5 = document.getElementById("btn-kick5");
    this.$btn6 = document.getElementById("btn-kick6");
    this.$btn7 = document.getElementById("btn-kick7");

    this.remainingClicks = 224;
    this.$btnRestart = document.getElementById("btn-restart");
    this.$logs = document.getElementById("logs");
    

    this.player1 = new Pokemon("Pikachu", 274, document.getElementById("health-player1"), document.getElementById("progressbar-player1"));
    this.player1.clickCounter = this.setMaxClicksForBtn;

    this.player2 = new Pokemon("Charmander", 282, document.getElementById("health-player2"), document.getElementById("progressbar-player2"));
    this.player2.clickCounter = this.setMaxClicksForBtn1;


    this.setMaxClicksForBtn = createClickCounter(this.$btn, 6);
    this.setMaxClicksForBtn1 = createClickCounter(this.$btn1, 6);
    this.setMaxClicksForBtn2 = createClickCounter(this.$btn2, 100);
    this.setMaxClicksForBtn4 = createClickCounter(this.$btn4, 4);
    this.setMaxClicksForBtn6 = createClickCounter(this.$btn6, 2);
    this.setMaxClicksForBtn3 = createClickCounter(this.$btn3, 100);
    this.setMaxClicksForBtn5 = createClickCounter(this.$btn5, 4);
    this.setMaxClicksForBtn7 = createClickCounter(this.$btn7, 2);

    this.$btn1.addEventListener("click", () => this.fireAttack());
    this.$btn3.addEventListener("click", () => this.fireAttack3());
    this.$btn5.addEventListener("click", () => this.fireAttack5());
    this.$btn7.addEventListener("click", () => this.fireAttack7());

    this.$btn.addEventListener("click", () => this.kick());
    this.$btn2.addEventListener("click", () => this.kick2());
    this.$btn4.addEventListener("click", () => this.kick4());
    this.$btn6.addEventListener("click", () => this.kick6());

    this.$btnRestart.addEventListener("click", () => {
      this.resetGame();
      this.startGame();
    });

    this.resetGame();    
    
  }

  decrementRemainingClicks() {
    this.remainingClicks--;
    if (this.remainingClicks === 0) {
      this.endGame();
    }
  }

  resetGame() {
    this.createRandomEnemy(); 
    this.$btn.disabled = false;
    this.$btn1.disabled = false;
    this.$btn2.disabled = false;
    this.$btn3.disabled = false;
    this.$btn4.disabled = false;
    this.$btn5.disabled = false;
    this.$btn6.disabled = false;
    this.$btn7.disabled = false;

    this.$logs.innerHTML = "";
    this.$btnRestart.style.display = 'none';

    this.setMaxClicksForBtn.reset();
    this.setMaxClicksForBtn1.reset();
    this.setMaxClicksForBtn2.reset();
    this.setMaxClicksForBtn3.reset();
    this.setMaxClicksForBtn4.reset();
    this.setMaxClicksForBtn5.reset();
    this.setMaxClicksForBtn6.reset();
    this.setMaxClicksForBtn7.reset();

    this.remainingClicks = 224;
  }

  startGame() {
    
    this.$btn1.disabled = false;
    this.$btn.disabled = false;
    this.$btn2.disabled = false;
    this.$btn3.disabled = false;
    this.$btn4.disabled = false;
    this.$btn5.disabled = false;
    this.$btn6.disabled = false;
    this.$btn7.disabled = false;
    this.$btnRestart.style.display = 'none';

    this.$btn.style.display = 'inline-block';
    this.$btn1.style.display = 'inline-block';
    this.$btn2.style.display = 'inline-block';
    this.$btn3.style.display = 'inline-block';
    this.$btn4.style.display = 'inline-block';
    this.$btn5.style.display = 'inline-block';
    this.$btn6.style.display = 'inline-block';
    this.$btn7.style.display = 'inline-block';
    
    this.updateAttackButtons(this.player1, this.player2);
  }

  endGame() {
    if (this.player1.isDefeated() && this.player2.isDefeated()) {
      this.$btnRestart.style.display = 'block';
      this.$btn.disabled = true;
      this.$btn1.disabled = true;
      this.$btn2.disabled = true;
      this.$btn3.disabled = true;
      this.$btn4.disabled = true;
      this.$btn5.disabled = true;
      this.$btn6.disabled = true;
      this.$btn7.disabled = true;
    } else {
      this.$btn2.style.display = 'block';
      this.$btn3.style.display = 'block';
      this.$btn4.style.display = 'block';
      this.$btn5.style.display = 'block';
      this.$btn6.style.display = 'block';
      this.$btn7.style.display = 'block';
      this.$btn.style.display = 'block';
      this.$btn1.style.display = 'block';
    }

    if (this.remainingClicks === 0) {
      this.$btnRestart.style.display = 'block';
      this.$btn.disabled = true;
      this.$btn1.disabled = true;
      this.$btn2.disabled = true;
      this.$btn3.disabled = true;
      this.$btn4.disabled = true;
      this.$btn5.disabled = true;
      this.$btn6.disabled = true;
      this.$btn7.disabled = true;
    }else {
      this.$btn2.style.display = 'block';
      this.$btn3.style.display = 'block';
      this.$btn4.style.display = 'block';
      this.$btn5.style.display = 'block';
      this.$btn6.style.display = 'block';
      this.$btn7.style.display = 'block';
      this.$btn.style.display = 'block';
      this.$btn1.style.display = 'block';
    }

  }

  createRandomEnemy() {
    const randomIndexPlayer1 = Math.floor(Math.random() * pokemons.length);
    const randomEnemyDataPlayer1 = pokemons[randomIndexPlayer1];
    
    const randomIndexPlayer2 = Math.floor(Math.random() * pokemons.length);
    const randomEnemyDataPlayer2 = pokemons[randomIndexPlayer2];
    
    const attacksPlayer1 = randomEnemyDataPlayer1.attacks;
    const attacksPlayer2 = randomEnemyDataPlayer2.attacks;
  
    if (this.player1.isDefeated()) {
      this.player1 = new Pokemon(
        randomEnemyDataPlayer1.name,
        randomEnemyDataPlayer1.hp,
        document.getElementById("health-player1"),
        document.getElementById("progressbar-player1"),
        attacksPlayer1
      );
      document.getElementById("name-player1").innerText = this.player1.name;
      this.player1.init();
      const player1Image = document.querySelector(".pokemon.player1 .sprite");
      player1Image.src = randomEnemyDataPlayer1.img;
    }
  
    if (this.player2.isDefeated()) {
      this.player2 = new Pokemon(
        randomEnemyDataPlayer2.name,
        randomEnemyDataPlayer2.hp,
        document.getElementById("health-player2"),
        document.getElementById("progressbar-player2"),
        attacksPlayer2
      );
      document.getElementById("name-player2").innerText = this.player2.name;
      this.player2.init();
      const player2Image = document.querySelector(".pokemon.player2 .sprite");
      player2Image.src = randomEnemyDataPlayer2.img;
    }
  
    this.updateAttackButtons(this.player1, this.player2);
  }
  
  
updateAttackButtons(player1, player2) {
  const buttonIdsPlayer1 = ['btn-kick', 'btn-kick2', 'btn-kick4', 'btn-kick6'];
  const buttonIdsPlayer2 = ['btn-kick3', 'btn-kick1', 'btn-kick5', 'btn-kick7'];

  if (player1.attacks) {
    buttonIdsPlayer1.forEach((buttonId, index) => {
      const $btn = document.getElementById(buttonId);
      if ($btn && player1.attacks[index]) {
        $btn.innerText = `${player1.attacks[index].name}`;
      }
    });
  }

  if (player2.attacks) {
    buttonIdsPlayer2.forEach((buttonId, index) => {
      const $btn = document.getElementById(buttonId);
      if ($btn && player2.attacks[index]) {
        $btn.innerText = `${player2.attacks[index].name}`;
      }
    });
  }
}


  kick() {
    console.log("Kick");
    const player2Damage = this.random(70);
    this.player2.changeHP(player2Damage);

    this.decrementRemainingClicks();

    const logMessagePlayer2 = `${this.player2.name} получил урон: ${player2Damage}. Осталось жизней: ${this.player2.damageHP}`;
    this.log(logMessagePlayer2);

    const randomLog = logs[this.random(logs.length)];
    this.log(randomLog.replace('Charmander', this.player2.name).replace('Pikachu', this.player1.name));

    if (this.player2.isDefeated()) {
      this.endGame();
      this.createRandomEnemy(); 
    }
    
  }

  kick2() {
    console.log("Kick");
    const player2Damage = this.random(70);
    this.player2.changeHP(player2Damage);

    this.decrementRemainingClicks();

    const logMessagePlayer2 = `${this.player2.name} получил урон: ${player2Damage}. Осталось жизней: ${this.player2.damageHP}`;
    this.log(logMessagePlayer2);

    const randomLog = logs[this.random(logs.length)];
    this.log(randomLog.replace('Charmander', this.player2.name).replace('Pikachu', this.player1.name));

    if (this.player2.isDefeated()) {
      this.endGame();
      this.createRandomEnemy();
    }
  }

  kick4() {
    console.log("Kick");
    const player2Damage = this.random(70);
    this.player2.changeHP(player2Damage);

    this.decrementRemainingClicks();

    const logMessagePlayer2 = `${this.player2.name} получил урон: ${player2Damage}. Осталось жизней: ${this.player2.damageHP}`;
    this.log(logMessagePlayer2);

    const randomLog = logs[this.random(logs.length)];
    this.log(randomLog.replace('Charmander', this.player2.name).replace('Pikachu', this.player1.name));

    if (this.player2.isDefeated()) {
      this.endGame();
      this.createRandomEnemy(); 
    }
  }

  kick6() {
    console.log("Kick");
    const player2Damage = this.random(70);
    this.player2.changeHP(player2Damage);

    this.decrementRemainingClicks();

    const logMessagePlayer2 = `${this.player2.name} получил урон: ${player2Damage}. Осталось жизней: ${this.player2.damageHP}`;
    this.log(logMessagePlayer2);

    const randomLog = logs[this.random(logs.length)];
    this.log(randomLog.replace('Charmander', this.player2.name).replace('Pikachu', this.player1.name));

    if (this.player2.isDefeated()) {
      this.endGame();
      this.createRandomEnemy(); 
    }
  }

  fireAttack() {
    console.log("Fire Charmander");
    const damage = this.random(70);
    if (this.player1.changeHP(damage)) {
      const logMessage = `${this.player1.name} получил урон: ${damage}. Осталось жизней: ${this.player1.damageHP}`;
      this.log(logMessage);
      const randomLog = logs[this.random(logs.length)];
      this.log(randomLog.replace('Pikachu', this.player1.name).replace('Charmander', this.player2.name));
    } else {
      this.log(`${this.player1.name} проиграл бой!`);
      this.endGame();
    }
    if (this.player1.isDefeated() || this.player2.isDefeated()) {
      this.createRandomEnemy(); 
    }
    this.decrementRemainingClicks();
  }

  fireAttack3() {
    console.log("Fire Charmander");
    const damage = this.random(70);
    if (this.player1.changeHP(damage)) {
      const logMessage = `${this.player1.name} получил урон: ${damage}. Осталось жизней: ${this.player1.damageHP}`;
      this.log(logMessage);
      const randomLog = logs[this.random(logs.length)];
      this.log(randomLog.replace('Pikachu', this.player1.name).replace('Charmander', this.player2.name));
    } else {
      this.log(`${this.player1.name} проиграл бой!`);
      this.endGame();
    }
    if (this.player1.isDefeated() || this.player2.isDefeated()) {
      this.createRandomEnemy(); 
    }
    this.decrementRemainingClicks();

  }

  fireAttack5() {
    console.log("Fire Charmander");
    const damage = this.random(70);
    if (this.player1.changeHP(damage)) {
      const logMessage = `${this.player1.name} получил урон: ${damage}. Осталось жизней: ${this.player1.damageHP}`;
      this.log(logMessage);
      const randomLog = logs[this.random(logs.length)];
      this.log(randomLog.replace('Pikachu', this.player1.name).replace('Charmander', this.player2.name));
    } else {
      this.log(`${this.player1.name} проиграл бой!`);
      this.endGame();
    }

    if (this.player1.isDefeated() || this.player2.isDefeated()) {
      this.createRandomEnemy(); 
    }
    this.decrementRemainingClicks();
  }

  fireAttack7() {
    console.log("Fire Charmander");
    const damage = this.random(70);
    if (this.player1.changeHP(damage)) {
      const logMessage = `${this.player1.name} получил урон: ${damage}. Осталось жизней: ${this.player1.damageHP}`;
      this.log(logMessage);
      const randomLog = logs[this.random(logs.length)];
      this.log(randomLog.replace('Pikachu', this.player1.name).replace('Charmander', this.player2.name));
    } else {
      this.log(`${this.player1.name} проиграл бой!`);
      this.endGame();
    }
    this.decrementRemainingClicks();

    if (this.player1.isDefeated() || this.player2.isDefeated()) {
      this.createRandomEnemy(); 
    }
  }

  random(num) {
    return Math.floor(Math.random() * num);
  }

  log(message) {
    const logEntry = document.createElement("div");
    logEntry.innerText = message;
    this.$logs.prepend(logEntry);
  }
}

const game = new Game();
game.startGame();

document.addEventListener('DOMContentLoaded', () => {
  const $btnStart = document.getElementById("btn-start");

  $btnStart.addEventListener("click", () => {
    game.resetGame();
    game.startGame();
    $btnStart.style.display = 'none';
  });
  game.$btn.style.display = 'none';
  game.$btn1.style.display = 'none';
  game.$btn2.style.display = 'none';
  game.$btn3.style.display = 'none';
  game.$btn4.style.display = 'none';
  game.$btn5.style.display = 'none';
  game.$btn6.style.display = 'none';
  game.$btn7.style.display = 'none';
  $btnStart.style.display = 'inline-block'; 
});
