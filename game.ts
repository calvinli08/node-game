import {setTimeout} from 'node:timers/promises';
import select, {Separator} from '@inquirer/select';

export default function() {
    const computer: number = 0;
    const user: number = 1;
    const tie: number = 2;

    const _end_game: number = 0;
    const _continue_manual: number = 1;
    const _continue_auto: number = 2;

    const _rock: string = 'rock';
    const _paper: string = 'paper';
    const _scissor: string = 'scissor';
    const _auto: string = 'auto';
    const end: string = 'end';

    let _user_score: number = 0;
    let _computer_score: number = 0;

    const runGame = async (manualOrAuto: number): Promise<number> => {
        console.clear();
    
        console.log(`\nCurrent scores\nYou: ${_user_score}\nOpponent: ${_computer_score}\n`);
    
        let userChoice: string = '';

        if(manualOrAuto === _continue_manual) {
            userChoice = await select({
                message: "Rock, paper, scissor?",
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
                        name: 'Auto Play',
                        value: _auto
                    },
                    new Separator(),
                    {
                        name: 'Quit Game',
                        value: end
                    }
                ]
            });
        }
        else {
            userChoice = _auto;
        }
    
        console.clear();
    
        if(userChoice === end) {
            console.log("No answer received, goodbye.");
    
            return _end_game;
        }
        else if(userChoice === end) {
            return _end_game;
        }
        else if(userChoice === _auto) {
            console.log("Computer versus computer\n");

            const choices = [_rock, _paper, _scissor];
    
            const firstChoice = choices[Math.floor(Math.random() * choices.length)];
            const secondChoice = choices[Math.floor(Math.random() * choices.length)];
    
            console.log(`Computer 1 chose ${firstChoice}\n`);
            console.log(`Computer 2 chose ${secondChoice}\n`); 

            if(manualOrAuto === _continue_manual) {
                _computer_score = 0;
                _user_score = 0;
            }
            
            const winner = chooseWinner(firstChoice, secondChoice);

            if(winner === computer) {
                console.log("Computer 2 won!\n");
        
                _computer_score++;
            }
            else if(winner === user) {
                console.log("Computer 1 won!\n");
        
                _user_score++;
            }
            else {
                console.log("It's a tie!\n");
            }

            console.log(`Current scores\nComputer 1: ${_user_score}\nComputer 2: ${_computer_score}\n`);
    
            const continueGameSelect: number = await select({
                message: "Play again?",
                choices: [
                    {
                        name: 'Yes',
                        value: _continue_auto,
                    },
                    {
                        name: 'No',
                        value: _end_game
                    },
                ]
            });
    
            return continueGameSelect;
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
    
            const continueGameSelect: number = await select({
                message: "Play again?",
                choices: [
                    {
                        name: 'Yes',
                        value: _continue_manual,
                    },
                    {
                        name: 'No',
                        value: _end_game
                    },
                ]
            });
    
            return continueGameSelect;
        }
    }

    const chooseWinner = (userChoice: string, computerChoice: string) => {
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
        get continueManual() {return _continue_manual; },
        get continueAuto() { return _continue_auto; },
        get endGame() {return _end_game; },
        chooseWinner,
        user, 
        computer, 
        tie,
    };
};