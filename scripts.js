class Player {
    constructor(name) {
        this.name = name;
        this.moves = [];
        this.wins = [];
        this.losses = [];

    }
}

class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.historyRow = [];
        this.historyCol = [];
        this.historySym = [];
    }
}

// CREATE PLAYERS AND GAME OBJECTS
let p1 = new Player(prompt("Player One, please enter your name."));
let p2 = new Player(prompt("Player Two, please enter your name."));
let game = new Game(p1.name, p2.name)

let rowA = [];
let rowB = [];
let rowC = [];
let col1 = [];
let col2 = [];
let col3 = [];
let diaB = [];
let diaF = [];

// ADD CELL LISTENERS
const cells = document.querySelectorAll(".cell");

for (i=0;i<cells.length;i++){
    cells[i].classList.add(i);
    cells[i].addEventListener("click", move);
}

function move(){
    console.log("MOVE(fired!)");
    console.log(this.classList[0], this.classList[1], this.classList[2], this.classList[3]);
    game.historyRow.push(this.classList[1])
    game.historyCol.push(this.classList[2])

    if (!this.classList.contains("X") && !this.classList.contains("O")) {
        if (game.historySym.length % 2 === 0) {
            game.historySym.push("X");
            this.classList.add("X");
            
        }
        else if (game.historySym.length % 2 != 0) {
            game.historySym.push("O");
            this.classList.add("O");
        }
        console.log(game.historySym);
    }
    
    else {
        console.log("This cell has already been marked.");
        console.log(this.classList);
        console.log("YOU BIG DUMMY!!");
    }

    

}