class Player {
  constructor(name) {
    this.name = name;
    this.moves = [];
    this.Rows = [];
    this.Cols = [];
    this.wins = [];
    this.losses = [];
  }
}

class Game {
  constructor(player1, player2, status) {
    this.player1 = player1;
    this.player2 = player2;
    this.atbat = player1.name;
    this.active = false;
    this.round = 0;
    this.status = status;
    this.victor = "";
    this.matches = [];
  }
}

class History {
  constructor() {
    this.winners = [];
  }
}

// DEFINE MASTER INTERFACE ELEMENTS
let output = document.querySelector(".output");
let versus = document.querySelector(".versus");
let button = document.querySelector(".button");
let winners = document.querySelector(".winners");
const cells = document.querySelectorAll(".cell");

// INITIALIZE PLAYERS AND GAME OBJECTS
let p1 = new Player(prompt("Player One, please enter your name."));
let p2 = new Player(prompt("Player Two, please enter your name."));
let game = new Game(p1.name, p2.name, "Ready to start the game!");
let history = new History();
// INITIALIZE OUTPUT
updateOutput(game.status);

// INITIALIZE VERSUS
versus.innerText = p1.name + " vs. " + p2.name;

let rowA = [];
let rowB = [];
let rowC = [];
let col1 = [];
let col2 = [];
let col3 = [];
let diaB = [];
let diaF = [];

// UPDATE BUTTON, ADD LISTENER
button.addEventListener("click", gamestate);

// UPDATE CELLS, ADD LISTENER
for (i = 0; i < cells.length; i++) {
  cells[i].classList.add(i);
  cells[i].addEventListener("click", move);
}

// FUNCTION: HANDLE OUTPUT
function updateOutput(text) {
  console.log("FIRED! updateOutput - " + text);
  output.innerText = text;
}

// FUNCTION: HANDLE BUTTON
function gamestate() {
  console.log("FIRED! gamestate");
  if (!game.active) {
    for (i = 0; i < cells.length; i++) {
      cells[i].classList.remove("X");
      cells[i].classList.remove("O");
    }
    updateOutput("The game has begun!  It is " + p1.name + "'s turn.");
    button.innerHTML = "End Game";
    game.active = true;
  } else {
    if (game.victor) {
      if (game.victor === p1.name) {
        p1.wins.push(p2.name);
        history.winners.push(p1.name);
      } else if (game.victor === p2.name) {
        p2.wins.push(p1.name);
        history.winners.push(p2.name);
      } else {
        console.log("BAD VICTOR NAME");
      }
      updateOutput(
        game.victor + " was victorious in round " + game.round + "!  Game Over!"
      );
    } else {
      updateOutput("The game was ended!  No winner was declared.");
      history.winners.push("Draw");
    }
    game = new Game(p1.name, p2.name, "Ready to start the game!");
    p1.moves = [];
    p1.Rows = [];
    p1.Cols = [];
    p2.moves = [];
    p2.Rows = [];
    p2.Cols = [];
    button.innerHTML = "Begin Game";
    winners.innerText = history.winners.join(", ");
    game.active = false;
  }
}

// FUNCTION: PRIMARY ROUND HANDLER
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function move() {
  if (game.active) {
    console.log("FIRED! move");
    console.log(history.winners);

    console.log(
      "Round " + game.round.toString(),
      this.classList[0],
      this.classList[1],
      this.classList[2],
      this.classList[3]
    );

    if (!this.classList.contains("X") && !this.classList.contains("O")) {
      if (game.round % 2 === 0) {
        console.log("Added: X");
        p1.Rows.push(this.classList[1]);
        p1.Cols.push(this.classList[2]);
        p1.moves.push(this.classList[1] + this.classList[2].toString());
        this.classList.add("X");
        game.round += 1;
        game.atbat = p2.name;
        updateOutput("It is now " + game.atbat + "'s turn.");
        //
        console.log(p1.moves.join(", "));
        //
      } else if (game.round % 2 != 0) {
        console.log("Added: O");
        p2.Rows.push(this.classList[1]);
        p2.Cols.push(this.classList[2]);
        p2.moves.push(this.classList[1] + this.classList[2].toString());
        this.classList.add("O");
        game.round += 1;
        game.atbat = p1.name;
        updateOutput("It is now " + game.atbat + "'s turn.");
        //
        console.log(p2.moves.join(", "));
        //
      }
    } else {
      updateOutput("Invalid move! It is still " + game.atbat + "'s turn.");
      console.log("This cell has already been marked.");
      console.log("YOU BIG DUMMY!!");
      console.log(this.classList);
    }
    let victor;
    victor = checkPlayer(game, p1);
    if (!victor) {
      checkPlayer(game, p2);
    }
    if (!victor) {
      checkMatch(game);
    }
  } else {
    updateOutput("You must begin the game before making any moves!");
  }
}
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// WIN CONDITION HANDLERS
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function checkPlayer(game, player) {
  console.log("FIRED! checkPlayer - " + player.name);
  // CHECK PLAYER VICTORY
  let rowsA = countIndexes(player.Rows, "A");
  let rowsB = countIndexes(player.Rows, "B");
  let rowsC = countIndexes(player.Rows, "C");
  let cols1 = countIndexes(player.Cols, "1");
  let cols2 = countIndexes(player.Cols, "2");
  let cols3 = countIndexes(player.Cols, "3");
  let hist = player.moves;

  if (rowsA === 3 || rowsB === 3 || rowsC === 3) {
    game.victor = player.name;
    gamestate();
    return player.name;
  } else if (cols1 === 3 || cols2 === 3 || cols3 === 3) {
    game.victor = player.name;
    gamestate();
    return player.name;
  } else if (
    hist.includes("A1") &&
    hist.includes("B2") &&
    hist.includes("C3")
  ) {
    game.victor = player.name;
    gamestate();
    return player.name;
  } else if (
    hist.includes("A3") &&
    hist.includes("B2") &&
    hist.includes("C1")
  ) {
    game.victor = player.name;
    gamestate();
    return player.name;
  } else {
    console.log(player.name + " is not victorious.");
  }
}

function checkMatch(game) {
  console.log("FIRED! checkMatch");
  // CHECK ROUND LIMIT DRAW
  if (game.round >= 9) {
    gamestate();
    console.log("DRAW!!");
    return true;
  }
}

// FUNCTION: ARRAY CHECKER
function countIndexes(array, value) {
  let indexes = [],
    i = -1;
  if (array.length > 0) {
    while ((i = array.indexOf(value, i + 1)) != -1) {
      indexes.push(i);
    }
  }
  // TO RETURN THE COMPLETE ARRAY OF RESULTS: REMOVE ".LENGTH"
  return indexes.length;
}
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
