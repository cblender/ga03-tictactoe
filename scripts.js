const record = document.querySelector(".record");

//____________________________________________________________________________________________
// IMPORTANT NOTES:
// -- The STATUS BAR is a flexible display that is used to provide current information.
// -- It can include messages, such as "It is Player 2's turn" as well as interactive content.
// -- The nature of its displayed content will be controlled by the various game functions.
// -- Its current content will ALWAYS BE OVERWRITTEN by any successive operations.



//____________________________________________________________________________________________
// SETUP: PLAYERS
// -- Each player needs an object ("MOVE RECORD") to hold the identities of cells the player clicks on
// -- As well as an object to record their history of wins and losses
// -- On second thought, make each of these a PROPERTY of a player object

class Player {
    constructor(name){
        this.name = name;
        this.moves = [];
        this.wins = [];
        this.losses = [];
    }

}



//____________________________________________________________________________________________
// SETUP: GAME
// -- The game object will hold the current game.  Takes the names of players.

class Game {
    constructor(player1, player2){
        this.player1 = player1;
        this.player2 = player2;

    }
}



//____________________________________________________________________________________________
// SETUP: EVENT LISTENERS
// -- Each cell needs an on-click listener.  Set up using CSS classes (CELL IDENTIFIERS - A1 through C3).
// -- The cell listeners should call a function that returns the identity of the cell clicked on.

// -- RESET BUTTON needs an on-click listener.  Make sure to include a confirmation step.
// -- The reset listener should clear the current game.

// -- START BUTTON needs an on-click listener.
// -- This listener should take input information to create new Player objects.
// -- NOTE: If the name of an EXISTING player is input, it should use THAT PLAYER.



//____________________________________________________________________________________________
// FUNCTION: INSTANTIATE TURN
// -- Alternate between X's turn (goes first) and O's turn
// -- Whichever cell is clicked on, apply the appropriate class.  X's and O's are displayed via CSS background-image.
// -- Write the chosen cell to the appropriate player's MOVE RECORD



//____________________________________________________________________________________________
// FUNCTION: AFTER MOVE, CHECK EACH OF EIGHT POSSIBLE WIN CONDITIONS
// -- Check if the player's MOVE RECORD contains certain sets of cells (defined by CELL IDENTIFIERS)
// -- For example, a win occurs if a player's record shows they have selected "A1", "A2", and "A3".
// -- YAY, IF / ELSE IF STATEMENTS



//____________________________________________________________________________________________
// FUNCTION: RECORD WINNER TO GAME LOG
function recordWin(victor="Nobody") {

    let node = document.createElement("h3");
    node.classList.add("result");
    let textnode = document.createTextNode(victor+" won a game of Tic-Tac-Toe!!");
    node.appendChild(textnode);
    record.appendChild(node);

}
recordWin();    // TEST LOGGER - DELETE WHEN FINISHED



//_____________________________________________________________________________________________
// FUNCTION: RECORD FINAL GAMESTATE TO GAME LOG
// -- Pass in X and O player object data.
function recordState(){

}