'use strict'

import createGame from './game.js';

let continueGame = true;
let gameResult = false;

const game = createGame();

while(continueGame) {
    try {
        gameResult = await game.runGame();

        if(!gameResult) {
            console.log(`Final scores\nYou: ${game.userScore}\nOpponent: ${game.computerScore}\n`);

            console.log("Thanks for playing!\n");
        }

        continueGame = gameResult;
    }
    catch(exception) {
        //log exception
        if(process.env.NODE_ENV === 'development') {
            console.log(exception);
        }
        else {
            console.error("The game has encountered an error and must close\n");
        }

        continueGame = false;
    }
}

process.exit();