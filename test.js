import createGame from './dist/game.js';

const {chooseWinner, user, computer, tie, rock, paper, scissor} = createGame();

describe('Game Tests', () => {
    //user wins
    test('user rock beats computer scissor', () => {
        expect(chooseWinner(rock, scissor)).toBe(user);
    });

    test('user paper beats computer rock', () => {
        expect(chooseWinner(paper, rock)).toBe(user);
    });

    test('user scissor beats computer paper', () => {
        expect(chooseWinner(scissor, paper)).toBe(user);
    });

    //computer wins
    test('computer rock beats user scissor', () => {
        expect(chooseWinner(scissor, rock)).toBe(computer);
    });

    test('computer paper beats user rock', () => {
        expect(chooseWinner(rock, paper)).toBe(computer);
    });

    test('computer scissor beats user paper', () => {
        expect(chooseWinner(paper, scissor)).toBe(computer);
    });

    //ties
    test('rock tie', () => {
        expect(chooseWinner(rock, rock)).toBe(tie);
    });

    test('paper tie', () => {
        expect(chooseWinner(paper, paper)).toBe(tie);
    });

    test('scissor tie', () => {
        expect(chooseWinner(scissor, scissor)).toBe(tie);
    });
});
