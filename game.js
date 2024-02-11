import {setTimeout} from 'node:timers/promises';
import select, {Separator} from '@inquirer/select';

export default function() {
    const computer = 0;
    const user = 1;
    const tie = 2;

    let user_score = 0;
    let computer_score = 0;

    const runGame = async () => {
        console.clear();
    
        console.log(`\nCurrent scores\nYou: ${user_score}\nOpponent: ${computer_score}\n`);
    
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
    
            const winner = chooseWinner(userChoice, computerChoice);
    
            if(winner === computer) {
                console.log("Uh oh, you lost!\n");
        
                computer_score++;
            }
            else if(winner === user) {
                console.log("Yay, you won!\n");
        
                user_score++;
            }
            else {
                console.log("It's a tie!\n");
            }
    
            console.log(`Current scores\nYou: ${user_score}\nOpponent: ${computer_score}\n`);
    
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

    const chooseWinner = (userChoice, computerChoice) => {
        if(userChoice === computerChoice) {
            return tie;
        }
        else if(
            (userChoice === 'rock' && computerChoice === 'paper')
            || (userChoice === 'paper' && computerChoice === 'scissor')
            || (userChoice === 'scissor' && computerChoice === 'rock')
        ) {
            return computer;
        }
        else if(
            (userChoice === 'rock' && computerChoice === 'scissor')
            || (userChoice === 'paper' && computerChoice === 'rock')
            || (userChoice === 'scissor' && computerChoice === 'paper')
        ) {
            return user;
        }
        else {
            throw new Error("Unexpected input");
        }
    };

    return {
        runGame,
        get userScore() { return user_score; },
        get computerScore() { return computer_score; },
        chooseWinner
    };
};