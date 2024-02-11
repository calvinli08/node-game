import {setTimeout} from 'node:timers/promises';
import select, {Separator} from '@inquirer/select';

export default function() {
    const computer = 0;
    const user = 1;
    const tie = 2;

    const _rock = 'rock';
    const _paper = 'paper';
    const _scissor = 'scissor';
    const end = 'end';

    let _user_score = 0;
    let _computer_score = 0;

    const runGame = async () => {
        console.clear();
    
        console.log(`\nCurrent scores\nYou: ${_user_score}\nOpponent: ${_computer_score}\n`);
    
        const userSelect = await select({
            message: "Rock, paper, scissors?",
            choices: [
                {
                    name: 'Rock',
                    value: _rock
                },
                {
                    name: 'Paper',
                    value: _paper
                },
                {
                    name: 'Scissor',
                    value: _scissor
                },
                new Separator(),
                {
                    name: 'Quit Game',
                    value: end
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
        else if(userChoice === end) {
            return false;
        }
        else {
            console.log(`You chose ${userChoice}`)
    
            const choices = [_rock, _paper, _scissor];
    
            const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    
            console.log(`Your opponent chose ${computerChoice}\n`);
    
            const winner = chooseWinner(userChoice, computerChoice);
    
            if(winner === computer) {
                console.log("Uh oh, you lost!\n");
        
                _computer_score++;
            }
            else if(winner === user) {
                console.log("Yay, you won!\n");
        
                _user_score++;
            }
            else {
                console.log("It's a tie!\n");
            }
    
            console.log(`Current scores\nYou: ${_user_score}\nOpponent: ${_computer_score}\n`);
    
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
            (userChoice === _rock && computerChoice === _paper)
            || (userChoice === _paper && computerChoice === _scissor)
            || (userChoice === _scissor && computerChoice === _rock)
        ) {
            return computer;
        }
        else if(
            (userChoice === _rock && computerChoice === _scissor)
            || (userChoice === _paper && computerChoice === _rock)
            || (userChoice === _scissor && computerChoice === _paper)
        ) {
            return user;
        }
        else {
            throw new Error("Unexpected input");
        }
    };

    return {
        runGame,
        get userScore() { return _user_score; },
        get computerScore() { return _computer_score; },
        get rock() { return _rock; },
        get paper() { return _paper; },
        get scissor() { return _scissor; },
        chooseWinner,
        user, 
        computer, 
        tie,
    };
};