export class Pokemon {
  constructor(name, health, $hpElement, $progressbar, attacks) {
    this.name = name;
    this.defaultHealth = health;
    this.damageHP = health;
    this.$hpElement = $hpElement;
    this.$progressbar = $progressbar;
    this.attacks = attacks;
  }

  getAttackDetails(index) {
    return this.attacks[index];
  }

  init() {
    this.renderHP();
  }
  resetHealth() {
    this.damageHP = this.originalHP;
    if (this.$healthElement) {
      this.$healthElement.innerText = this.damageHP;
    }
    if (this.$progressbarElement) {
      this.$progressbarElement.style.width = '100%';
    }

    if (this.clickCounter) {
      this.clickCounter.reset();
    }
  }
renderHP() {
    this.$hpElement.innerText = this.damageHP + ' / ' + this.defaultHealth;
    this.$progressbar.style.width = (this.damageHP / this.defaultHealth) * 100 + '%';

    if (this.damageHP < 60 && this.damageHP > 20) {
        this.$progressbar.classList.add('low');
    } else {
        this.$progressbar.classList.remove('low');
    }


    if (this.damageHP < 20) {
        this.$progressbar.classList.add('critical');
    } else {
        this.$progressbar.classList.remove('critical');
    }
}


  changeHP(count) {
    this.damageHP -= count;

    if (this.damageHP <= 0) {
      this.damageHP = 0;
    }

    this.renderHP();
    return this.damageHP;
  }

  reset() {
    this.damageHP = this.defaultHealth;
    this.renderHP();
  }

  isDefeated() {
    return this.damageHP === 0;
  }
}