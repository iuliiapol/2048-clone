import Game from "./engine/game.js";

/**
 * The entire file is used to handle interactions between the user and and the board itself
 * Reflects changes on the board itself
 */
$(document).ready(() => {
    let game = new Game(4);
    initBoard(game);

    //logic for resetting value when the reset button is clicked on
    $("#reset").click(() => {
        //first we should reset the original board
        clearData();
        game.setupNewGame();
        initBoard(game);
    });

    $(document).keydown((event) => {
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

        clearData();
        game.move(direction);
        initBoard(game);

        if (game.gameState.over === true) {
            $(".over_message").show();
        } else if (game.gameState.win === true) {
            $(".win_message").show();
        }
    });

});

/**
 * Initialize values on the board to 
 * @param {} game 
 */
const initBoard = function (game) {
    $(".over_message").hide();
    $(".win_message").hide();

    let game_state = game.getGameState();

    let score = game_state.score;
    let is_over = game_state.over;
    let is_won = game_state.won;
    let arr_vals = game_state.board; //gets one dimensional array version 

    $("#score").text(score);
    $("#is_over").text(is_over);
    $("#is_won").text(is_won);

    let idx = 0; //index to iterate through underlying array of values
    let cells = document.querySelectorAll(".cell"); //gets all elements of cell class from html

    //fill in cells with initial values
    cells.forEach(cell => {
        if (arr_vals[idx] != 0) {
            $(cell).text(arr_vals[idx]);
        }
        idx++;
    });
};

/**
 * Removes filled in cells from the board and 
 */
const clearData = function () {
    $(".over_message").hide();
    $(".win_message").hide();

    $("#score").empty();
    $("#is_over").empty();
    $("#is_won").empty();

    let cells = document.querySelectorAll(".cell"); //gets all elements of cell class from html
    cells.forEach(cell => $(cell).empty());
}