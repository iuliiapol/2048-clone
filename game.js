export default class Game {
    /**
     * Constructor of the Game class
     * @param {} size 
     */
    constructor(size) {
        //if size = 4 -> 4x4 table (array is 16 elements long)
        this.size = size;

        //creating 2D array
        let arr = new Array(size);
        for (let i = 0; i < size; i++) {
            arr[i] = new Array(size).fill(0); //all values in array initially initialized to 0
        }

        this.gameState = {  //GameState object
            board: arr, //underlying 2D array
            score: 0,
            won: false,
            over: false
        }

        //listeners
        this.onMoveEvents = [];
        this.onWinEvents = [];
        this.onLoseEvents = [];

        //since we're initializing, we will call to addTile() two times
        this.addTile();
        this.addTile();
    }

    /**
     * Returns String version of the underlying array
     * Used for testing purposes
     */
    toString() {
        let str = ""; //string to be printed out to the console/terminal
        let size = this.size;

        for (let i = 0; i < size; i++) {
            for (let n = 0; n < size; n++) {
                str += "[";
                str += this.gameState.board[i][n];
                str += "]";

                if (n == (size - 1)) {
                    str += "\n";
                }
            }
        }

        return str;
    }

    /**
     * Helper method to add random tile to the board
     * 
     * 10% chance of a tile with number 4 being addded
     * 90% chance of a tile with number 2 being added
     */
    addTile() {
        let rnd_prc = Math.floor(Math.random() * 100); //Will return randomized percentage
        let num = 0; //num to be inserted into the table

        if (rnd_prc <= 10) {
            num = 4; //10% chance
        } else {
            num = 2; //90% chance
        }

        let len = this.size;

        //randomized column index the array
        let col_idx = Math.floor(Math.random() * len);
        let row_idx = Math.floor(Math.random() * len);

        //randomize index until the spot found with 0
        while (this.gameState.board[row_idx][col_idx] != 0) {
            col_idx = Math.floor(Math.random() * len);
            row_idx = Math.floor(Math.random() * len);
        }

        //sets found idx to num
        this.gameState.board[row_idx][col_idx] = num;
    }

    /**
     * Sets up the initial or new game by resetting the game to a random starting position
     */
    setupNewGame() {
        //creating 2D array
        let arr = new Array(this.size);

        for (let i = 0; i < this.size; i++) {
            arr[i] = new Array(this.size).fill(0); //all values in array initially initialized to 0
        }


        this.gameState = {
            board: arr, //all values in array initially initialized to 0
            score: 0,
            won: false,
            over: false
        }

        this.addTile();
        this.addTile();
    }

    /**
     * If there is existing saved GameState, it is used to "reload" the game
     * Should be one-dimensional array
     * 
     * Used for testing purposes
     * @param {} newGameState 
     */
    loadGame(newGameState) {
        //since we store data in 2D array, we need to change passed in 1D array into 2D array
        let og_board = newGameState.board;
        let new_size = Math.sqrt(og_board.length);

        let new_arr = new Array(new_size);

        for (let i = 0; i < new_arr.length; i++) {
            new_arr[i] = new Array(new_size);
        }

        let og_idx = 0; //original idx in the original board of newGameState

        for (let i = 0; i < new_arr.length; i++) {
            for (let j = 0; j < new_arr.length; j++) {
                new_arr[i][j] = og_board[og_idx];
                og_idx++;
            }
        }

        let upd_game_state = {
            board: new_arr,
            score: newGameState.score,
            won: newGameState.won,
            over: newGameState.over
        }

        this.gameState = upd_game_state;
    }

    /**
     *  Gets current state of the game, including score, status of the game (won and whether game is over)
     */
    getGameState() {
        let new_arr = [];
        this.gameState.board.forEach(val => (new_arr = new_arr.concat(val)));

        let obj = {
            board: new_arr,
            score: this.gameState.score,
            won: this.gameState.won,
            over: this.gameState.over
        }
        return obj;
    }

    /**
     * Turns 2D array representing board into 1D array
     */
    get1DGameStateBoard() {
        let new_arr = [];
        this.gameState.board.forEach(val => (new_arr = new_arr.concat(val)));
        return new_arr;
    }

    /**
     * Gets underlying 2D array representing the board
     */
    get2DGameState() {
        return this.gameState.board;
    }

    /**
     * Functions creating notifiers to keep track of the changes in the state of the game
     */

    onMove(callback) {
        return this.onMoveEvents.push(callback);
    }

    onWin(callback) {
        return this.onWinEvents.push(callback);
    }

    onLose(callback) {
        return this.onLoseEvents.push(callback);
    }

    /**
     * -------------------------------------------------------
     * HELPER METHODS FOR HANDLING MOVEMENTS IN THE GAME
     * -------------------------------------------------------
     */

    /**
     * Will shift values in arrays where value should be shifted right or up
     * Work with ONLY one row at a time
     * @param {*} arr - passed in array/game board
     * @param {*} direction  - String indicating direction of the movement ('up', 'right', 'down', 'left')
     */

    shiftArray(arr, direction) {
        let non_empty_arr, empty_arr;
        non_empty_arr = arr.filter(val => val);
        empty_arr = new Array(arr.length - non_empty_arr.length).fill(0); //fills in freed up spots in the board with 0's

        let upd_arr;
        if ((direction === 'up') || (direction === 'right') || (direction === 'down')) {
            upd_arr = empty_arr.concat(non_empty_arr);
            return upd_arr;
        } else {
            return non_empty_arr.concat(empty_arr);
        }
    }

    sumArray(arr, direction) {
        if (direction === 'left') {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] == arr[i + 1]) {
                    arr[i] = arr[i] * 2;
                    arr[i + 1] = 0;
                    this.gameState.score += arr[i];
                }
            }
            return arr;
        }

        for (let i = (arr.length - 1); i >= 0; i--) {
            if (arr[i] == arr[i - 1]) {
                //we need to sum up these values
                arr[i] = arr[i] * 2;
                arr[i - 1] = 0;
                //since we successfully summed up the values, the score should be updated 
                //by the value of the successful sum up
                this.gameState.score += arr[i];
            }
        }
        return arr;
    }

    /**
     * 
     * @param {*} arr - array which needs to be rotated
     * @param {*} way - boolean indicating which side we need to rotate
     * true -> rotate forward
     * false -> rotate backwards (inital position before rotating forward)
     */
    rotateArray(arr, way) {
        //will store the rotated array
        let upd_arr = new Array(arr.length);

        //initialize values inside of the array
        for (let i = 0; i < upd_arr.length; i++) {
            upd_arr[i] = new Array(upd_arr.length);
        }

        let col_idx = 0;
        for (let i = 0; i < upd_arr.length; i++) {
            col_idx = 0;
            for (let j = (upd_arr.length - 1); j >= 0; j--) {
                if (way === true) {
                    //rotating forward
                    upd_arr[i][col_idx] = arr[j][i];
                } else {
                    //rotating backwards
                    upd_arr[j][i] = arr[i][col_idx];
                }
                col_idx++;
            }
        }

        return upd_arr;
    }

    //Method for checking whether there are possible combinations available in the array
    checkCombs(arr) {
        let left, right, up, down = 0;

        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < 4; j++) {
                if ((i - 1) >= 0) {
                    up = arr[i - 1][j];
                }

                if ((i + 1) < arr.length) {
                    down = arr[i + 1][j];
                }

                if ((j - 1) >= 0) {
                    left = arr[i][j - 1];
                }

                if ((j + 1) < arr.length) {
                    right = arr[i][j + 1];
                }


                if ((arr[i][j] === left) || (arr[i][j] === right) || (arr[i][j] === down) || (arr[i][j] === up)) {
                    return true;
                }

                //if we are here then then there is no match found
                left = 0;
                right = 0;
                up = 0;
                down = 0;
            }
        }

        //if we are here no possible combinations are found
        return false;
    }

    /**
     * Method responsible for handling movement of tiles:
     * Given "up", "down", "left", or "right" as string input, 
     * makes the appropriate shifts and adds a random tile. 
     * @param {*} direction 
     * "up", "down", "left" or "right"
     */
    move(direction) {
        //will store values of 2D array
        let og_tiles = [...this.gameState.board]; //will store the original UNCHANGED array
        let tiles = this.gameState.board;

        //if values need to be shifted up or down, we need to rotate the array FORWARD first
        if (direction === 'up') {
            tiles = this.rotateArray(tiles, true);
        } else if (direction === 'down') {
            tiles = this.rotateArray(tiles, false);
        }

        //iterate through each row in the array
        for (let i = 0; i < tiles.length; i++) {
            tiles[i] = this.shiftArray(tiles[i], direction); //shift array to necessary direction
            tiles[i] = this.sumArray(tiles[i], direction); //sum values in the array

            if (tiles[i].includes(2048)) {
                //handle win
                this.gameState.won = true;

                //onWin method is called, since we won
                for (let i = 0; i < this.onWinEvents.length; i++) {
                    this.onWinEvents[i](this.gameState);
                }
            }

            tiles[i] = this.shiftArray(tiles[i], direction); //final shift
        }

        //if values need to be shifted up or down, we need to rotate the array BACK
        if (direction === 'up') {
            tiles = this.rotateArray(tiles, false);
        } else if (direction === 'down') {
            tiles = this.rotateArray(tiles, true);
        }

        if (JSON.stringify(og_tiles) === JSON.stringify(tiles)) {
            //that means that the movement wasn't successful
            //tiles were not updated and we shouldn't add new tile
            return;
        }

        //If successful then, update the board to be the new tiles
        this.gameState.board = tiles;
        this.addTile();

        //call to the onMove method
        for (let i = 0; i < this.onMoveEvents.length; i++) {
            this.onMoveEvents[i](this.gameState);
        }

        //Now we need to check whether game is over
        //First check whether array is full
        let isZeroPresent = false;
        for (let i = 0; i < tiles.length; i++) {
            if (tiles[i].includes(0)) {
                //that means that there is a free spot where we can add random tile
                //and we can continue
                isZeroPresent = true;
            }
        }

        if (!isZeroPresent) {
            //if we are here then the array is full and we need to check 
            //whether there are eligible moves available
            let moves_possible = this.checkCombs(tiles);

            //if there are no possible moves then we reached the end of the game
            if (moves_possible === false) {
                this.gameState.over = true;
                //We lost, therefore call onLose method

                for (let i = 0; i < this.onLoseEvents.length; i++) {
                    this.onLoseEvents[i](this.gameState);
                }
                return;
            }
        }
    }
};