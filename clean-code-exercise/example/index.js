const speed = 2000;
const appearance = 800;
const holes = document.querySelectorAll("main article");
const scoreElem = document.querySelector(".moleswhacked b");
const timeElem = document.querySelector(".timeleft b");

// add event listener
holes.forEach((hole) => {
  hole.addEventListener("click", () => {
    let whackedHole = app.whack(hole);
    app.evalWhack(whackedHole);
  });
});

const gameLoop = setInterval(() => {
  // Ta bort mole från alla hålen
  holes.forEach((hole) => {
    hole.classList.remove("mole");
  });
  app.popUp();
}, speed); // 2000ms = 2s

const timer = setInterval(() => {
  app.updateTime();
}, 1000);

const app = {
  currentHole: null,
  molesWhacked: 0,
  currentTime: 60,
  hits: 0,
  whack(hole) {
    let whackedHole = hole.getAttribute("data-id");
    return whackedHole;
  },
  popUp() {
    // Slumpa ett hål
    let randomId = Math.floor(Math.random() * holes.length);
    this.currentHole = randomId;

    // Lägg på CSS - klass på valt slumpat hål för att visa mole
    const elem = document.querySelector(`[data-id="${randomId}"]`);
    elem.classList.add("mole");

    setTimeout(() => {
      elem.classList.remove("mole");
      this.currentHole = null;
    }, appearance); // 800ms = 0.8s
  },
  evalWhack(whackedHole) {
    if (parseInt(whackedHole) === this.currentHole) {
      // Uppdatera poäng
      this.updateScore();

      // Addera CSS klass för att visa träff
      const elem = document.querySelector(`[data-id="${whackedHole}"]`);
      elem.classList.add("hit");
      setTimeout(() => {
        elem.classList.remove("hit");
      }, appearance); // 800ms = 0.8s
    }
  },
  updateScore() {
    this.molesWhacked++;
    scoreElem.innerText = this.molesWhacked;
  },
  updateTime() {
    if (this.currentTime > 0) {
      timeElem.innerText = `${this.currentTime}s`;
      this.currentTime--;
    } else {
      clearInterval(gameLoop);
      clearInterval(timer);

      alert(`You whacked ${this.molesWhacked} moles in 60 sec.`);
    }
  },
};
