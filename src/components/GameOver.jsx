import React from 'react';

function GameOver({ result, onRestart }) {
    return (
        <section className="container">
        <h2>Game Over!</h2>
        <h3>{result}</h3>
        <button onClick={onRestart}>Start New Game</button>
        </section>
    );
}

export default GameOver;