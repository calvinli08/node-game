import select, {Separator} from '@inquirer/select';
import {setTimeout} from 'node:timers/promises';

const runGame = async () => {
    console.clear();

    console.log(`\nCurrent scores\nYou: ${userScore}\nOpponent: ${computerScore}\n`);

    const userSelect = await select({
        message: "Rock, paper, scissors?",
        choices: [
            {
                name: 'Rock',
                value: 'rock'
            },
            {
                name: 'Paper',
                value: 'paper'
            },
            {
                name: 'Scissor',
                value: 'scissor'
            },
            new Separator(),
            {
                name: 'Quit Game',
                value: 'end'
            }
        ]
    });

    const timeout = setTimeout(60000).then(() => {
        userSelect.cancel();

        return false;
    });

    const userChoice = await Promise.race([timeout, userSelect]);

    console.clear();

    if(userChoice === false) {
        console.log("No answer received, goodbye.");

        return false;
    }
    else if(userChoice === 'end') {
        return false;
    }
    else {
        console.log(`You chose ${userChoice}`)

        const choices = ['rock', 'paper', 'scissor'];

        const computerChoice = choices[Math.floor(Math.random() * choices.length)];

        console.log(`Your opponent chose ${computerChoice}\n`);

        if(userChoice === computerChoice) {
            console.log("It's a tie!\n");
        }
        else if(
            (userChoice === 'rock' && computerChoice === 'paper')
            || (userChoice === 'paper' && computerChoice === 'scissor')
            || (userChoice === 'scissor' && computerChoice === 'rock')
        ) {
            console.log("Uh oh, you lost!\n");

            computerScore++;
        }
        else if(
            (userChoice === 'rock' && computerChoice === 'scissor')
            || (userChoice === 'paper' && computerChoice === 'rock')
            || (userChoice === 'scissor' && computerChoice === 'paper')
        ) {
            console.log("Yay, you won!\n");

            userScore++;
        }
        else {
            throw new Error("Unexpected input");
        }

        console.log(`Current scores\nYou: ${userScore}\nOpponent: ${computerScore}\n`);

        const continueGameSelect = await select({
            message: "Play again?",
            choices: [
                {
                    name: 'Yes',
                    value: true,
                },
                {
                    name: 'No',
                    value: false
                },
            ]
        });

        const continueTimeout = setTimeout(60000).then(() => {
            continueGameSelect.cancel();

            return false;
        });

        return await Promise.race([continueGameSelect, continueTimeout]);
    }
}

let continueGame = true;
let userScore = 0;
let computerScore = 0;
let gameResult = true;

while(continueGame) {
    try {
        gameResult = await runGame();

        if(!gameResult) {
            console.log(`Final scores\nYou: ${userScore}\nOpponent: ${computerScore}\n`);

            console.log("Thanks for playing!\n");
        }

        continueGame = gameResult;
    }
    catch(exception) {
        //log exception
        console.error("The game has encountered an error and must close\n");

        continueGame = false;
    }
}

process.exit();