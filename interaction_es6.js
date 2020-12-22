import Game from "./game.js"

const win_msg = 'Congratulations! You WON! Reset the game or continue playing :)';
const over_msg = 'You lost the game :( To start over press the "reset game" button';

/**
 * The entire file is used to handle interactions between the user and and the board itself
 * Reflects changes on the board itself
 */

/**
 * HELPER METHODS
 */

/**
 * Initialize values on the board to 
 * @param {} game 
 */
const initBoard = function (game) {
    let game_state = game.getGameState();

    let score = game_state.score;
    let is_over = game_state.over;
    let is_won = game_state.won;
    let arr_vals = game_state.board; //gets one dimensional array version 

    console.log(arr_vals);
    console.log("Score " + score);
    console.log("Is_over " + is_over);
    console.log("Is_won " + is_won);

    document.querySelector("#score").textContent = score;

    let idx = 0; //index to iterate through underlying array of values
    
    let cells = document.querySelector(".tiles").children;

    console.log(cells);
    
    while (idx < 16) {
        if (arr_vals[idx] != 0) {
            document.getElementById(idx).textContent = arr_vals[idx];
            document.getElementById(idx).style.backgroundColor = calculateCellColor(arr_vals[idx]);
        }
        idx++;
    }
};

/**
 * Removes filled in cells from the board and messages if they exist
 */
const clearData = function () {
    // let message = document.querySelector(".messages");
    
    // while (message.firstChild) {
    //     message.removeChild(message.firstChild);
    // }

    // const break_line = document.createElement("br");
    // message.appendChild(break_line);

    const break_line = document.createElement("br");
    appendMessage(break_line);

    document.querySelector("#score").textContent = 0;

    let idx = 0;
    
    while (idx < 16) {
        document.getElementById(idx).textContent = "";
        document.getElementById(idx).style.backgroundColor = "";
        idx++;
    }   
}

const appendMessage = function(msg_child) {
    let message = document.querySelector(".messages");
    
    while (message.firstChild) {
        message.removeChild(message.firstChild);
    }

    message.appendChild(msg_child);
}

/**
 * Returns color for depiction of the cell
 * @param {} val - value of the cell
 */

const calculateCellColor = function(val) {
    switch (val) {
        case 2:
            return "#FEFAEC";
        case 4:
            return "#FDF5D8";
        case 8:
            return "#FCF0C5";
        case 16:
            return "#FBEBB1";
        case 32:
            return "#FAE69E";
        case 64:
            return "#F9E18B";
        case 128: 
            return "#F8DC77";
        case 256:
            return "#F7D764";
        case 512:
            return "#F6D251";
        case 1024:
            return "#F5CD3D";
        case 2048:
            return "#F4C82A";
        default:
            return "#F3C316";
    }
}

//convenience method
let ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
}

//calls necessary logic when DOM is loaded
ready(() => {
    let game = new Game(4);
    initBoard(game);

    //logic for resetting value when the reset button is clicked on
    document.querySelector("#reset").addEventListener("click", (event) => 
        { 
            //reset the original board and create new board
            clearData();
            game.setupNewGame();
            initBoard(game);
        });

    document.addEventListener("keydown", (event) => {
        let direction; //will store direction

        //if game is lost, do not allow to accept keydown events
        if (game.gameState.over === true) {
            return;
        }

           //sets up correct direction
        switch (event.key) {
            case "ArrowUp":
                direction = "up";
                break;
            case "ArrowDown":
                direction = "down";
                break;
            case "ArrowLeft":
                direction = "left";
                break;
            case "ArrowRight":
                direction = "right";
                break;
            default:
                return; //unsupported button is clicked, do nothing
        }

        //clear board and reset with updated values
        clearData();
        game.move(direction);
        initBoard(game);

        //if game is won or over show appropriate message
        if (game.gameState.over === true) {
            let over = document.createElement("div");
            over.classList.add("over_message");
            over.innerHTML = over_msg;
            appendMessage(over);
        } else if (game.gameState.win === true) {
            let win = document.createElement("div");
            win.classList.add("win_message");
            win.innerHTML = win_msg;
            appendMessage(win);
        }
    });
});

