'use strict';
import createGame from './game.js';
const game = createGame();
let continueGame = true;
let gameResult = game.endGame;
let manualOrAuto = game.continueManual;
while (continueGame) {
    try {
        gameResult = await game.runGame(manualOrAuto);
        if (gameResult === game.continueManual
            || gameResult === game.continueAuto) {
            continueGame = true;
            manualOrAuto = gameResult;
        }
        else if (gameResult === game.endGame) {
            console.log(`Final scores\nYou: ${game.userScore}\nOpponent: ${game.computerScore}\n`);
            console.log("Thanks for playing!\n");
            continueGame = false;
        }
    }
    catch (exception) {
        //log exception
        if (process.env.NODE_ENV === 'development') {
            console.log(exception);
        }
        else {
            console.error("The game has encountered an error and must close\n");
        }
        continueGame = false;
    }
}
process.exit();
