import createGame from './game.js';

const {chooseWinner, user, computer, tie, rock, paper, scissor} = createGame();

describe('Game Tests', () => {
    //user wins
    it('user rock beats computer scissor', () => {
        expect(chooseWinner(rock, scissor)).toBe(user);
    });

    it('user paper beats computer rock', () => {
        expect(chooseWinner(paper, rock)).toBe(user);
    });

    it('user scissor beats computer paper', () => {
        expect(chooseWinner(scissor, paper)).toBe(user);
    });

    //computer wins
    it('computer rock beats user scissor', () => {
        expect(chooseWinner(scissor, rock)).toBe(computer);
    });

    it('computer paper beats user rock', () => {
        expect(chooseWinner(rock, paper)).toBe(computer);
    });

    it('computer scissor beats user paper', () => {
        expect(chooseWinner(paper, scissor)).toBe(computer);
    });

    //ties
    it('rock tie', () => {
        expect(chooseWinner(rock, rock)).toBe(tie);
    });

    it('paper tie', () => {
        expect(chooseWinner(paper, paper)).toBe(tie);
    });

    it('scissor tie', () => {
        expect(chooseWinner(scissor, scissor)).toBe(tie);
    });
});
