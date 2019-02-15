window.addEventListener("load", () => {
  
  let GAME = {
    REMAINING : 20,
    CARDS : [],
    SELECTED : []
  };
  
  class Card {
    constructor(n, td) {
      this.visible = false;
      this.selected = false;
      /* QUESTION 2 */
      //this.number = n;
      //this.display = td;
      Object.defineProperty(this, "number", {value : n, writable : false});
      Object.defineProperty(this, "display", {value : td, writable : false});
    }
    
    /* retourne une carte */
    flip() {
      /* si la carte est visible, on la cache en supprimant le contenu du td */
      if (this.visible) {
        this.display.innerHTML = "";
      } else {
        /* sinon on crée un élément img dans la case, dont la source est 0.png, 1.png, … , ou 9.png en fonction
           de la valeur de la carte */
        this.display.innerHTML = "<img src='" + this.number + ".png' />";
      }

      this.visible = !this.visible;
    }

    /*
     sélectionne une carte. ATTENTION modifie le tableau GAME.SELECTED et ne peut donc pas être appelé
     dans une boucle for ou un appel de méthode forEach/map/filter … sur ce même tableau.
    */
    toggle() {
      if (this.selected) {
        /* si la carte est sélectionnée */
        this.display.style.background = "";
        this.selected = false;
        let i = GAME.SELECTED.indexOf(this); // on trouve sa position dans le tableau GAME.SELECTED
        GAME.SELECTED.splice(i,1);           // on supprime la case à cette position
      } else if ( !this.visible && !this.selected && GAME.SELECTED.length < 2) {
        /* si la carte n'est pas sélectionnée,
           qu'elle n'est pas déjà retournée et qu'on a sélectionné moins de deux cartes
        */
        this.display.style.background = "orange"; /* on met le font de la case en orange */
        this.selected = true;
        GAME.SELECTED.push(this);  /* on rajoute la carte au tableau des cartes sélectionnées */
      }
    }

  }

  function shuffleArray(tab) {
    /* QUESTION 3 */
    let N = tab.length;
    for (let i = 0; i < N - 2; i++){
      let j = Math.trunc(Math.random()*(N-i) + i);
      let tmp = tab[j];
      tab[j] = tab[i];
      tab[i] = tmp;
    }
  }

  function initArray() {
    /* QUESTION 4 */
    let tab = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9];
    shuffleArray(tab);
    let result = [];
    for (let i = 0; i < tab.length/5; i++){
      let tmp = [];
      for (let j = 0; j < tab.length/4; j++){
        tmp[j] = new Card(tab[5*i+j], document.getElementById("id_" + i + "_" + j));
      }
      result.push(tmp);
    }
    return result;
  }

/* QUESTION 5 */
  let victoryDiv = document.getElementById("id_victory");
  let flipButton = document.getElementById("id_flip");
  let table = document.getElementById("id_table");
  let resetButton = document.getElementById("id_reset");

  function victory() {
    /* QUESTION 6 */
    victoryDiv.style.display = "block";
  }


  function reset () {
    /* QUESTION 7 */
    victoryDiv.style.display = "";
    GAME.CARDS = initArray();
    GAME.REMAINING = 20;
    GAME.SELECTED = [];
    for(let i = 0; i < GAME.CARDS.length; i++){
      for (let j = 0; j < GAME.CARDS[i].length; j++){
        GAME.CARDS[i][j].display.innerHTML = "";
      }
    }
  }

  reset();
  console.log(GAME.REMAINING);

  /* QUESTION 8 */
  resetButton.addEventListener("click", reset);

  /* QUESTION 9 */
  table.addEventListener("click", function(ev) {
    let td = ev.target;
    let id = td.id.split("_");
    let i = id[1];
    let j = id[2];
    let card = GAME.CARDS[i][j];
    card.toggle();
  });

  /* QUESTION 10 */
  flipButton.addEventListener("click", function(ev) {
    if (GAME.SELECTED.length == 2) {
      flipButton.disabled = true;
      GAME.SELECTED[0].flip();
      GAME.SELECTED[1].flip();
      if (GAME.SELECTED[0].number == GAME.SELECTED[1].number) {
        GAME.REMAINING = GAME.REMAINING - 2;
        GAME.SELECTED[1].toggle();
        GAME.SELECTED[0].toggle();
        flipButton.disabled = false;
        console.log(GAME.REMAINING);
        if (GAME.REMAINING == 0){
          victory();
        }
      }
      else {
        setTimeout(function(){
          GAME.SELECTED[0].flip();
          GAME.SELECTED[1].flip();
          GAME.SELECTED[1].toggle();
          GAME.SELECTED[0].toggle();
          flipButton.disabled = false;
        }, 1000);
      }
    }
    else {}
  });

});