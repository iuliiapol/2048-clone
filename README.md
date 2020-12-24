# 2048-clone
Clone of [2048](https://github.com/gabrielecirulli/2048) game by Gabriele Cirulli. Created using JavaScript, jQuery and CSS Bulma framework. 
You can play the game right [here](https://iuliiapol.github.io/2048-clone/).
## Screenshot
![screenshot](https://github.com/iuliiapol/2048-clone/blob/main/game_screenshot.png?raw=true)
## Reflection
In this project, I worked with classes, objects, and arrays and connected different parts of the code to create an interactable JavaScript project. The logic (game.js) part of the project was the most challenging part of the project because it required careful thinking about the underlying board (array) because each movement (up, down, right, left) required:
* Checking whether the movement is valid (if tiles can't be moved, nothing should happen)
    * If no movements are possible at all, then the game is over
* Summing up correct tiles in the correct order 
    * Tiles with the same values should be summed up
    * If the movement is valid, then correct cells should be summed up
        * In the following example, the user presses the arrow down, to move cells down. 16 at the third row and the third column should be summed up with 16 at the fourth row and the third column, NOT with 16 at the second row and the third column. Similar logic follows for other movements.
        * In this example, 4 with lime background indicates random tile that generated once the sum of values is completed
![screenshot](https://github.com/iuliiapol/2048-clone/blob/main/example.png?raw=true)
Initially, I used jQuery for handling user interaction with the game (interaction.js). However, I was curious about how ES6 features can be used as a substitute for jQuery. As a result, I created the ES6 version of the interaction.js file, interaction_es6.js, and removed jQuery as the dependency. As a result, the project currently uses vanilla JavaScript and Bulma CSS framework for the game's appearance.