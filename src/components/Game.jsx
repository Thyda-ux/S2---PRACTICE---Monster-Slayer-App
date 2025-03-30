import React, { useState, useEffect } from "react";
import Entity from "./Entity.jsx";
import Logs from "./Log.jsx";
import GameOver from "./GameOver.jsx";

// ----------------------------------------------------------------------------------------------------------
// HELPER FUNCTIONS
// ----------------------------------------------------------------------------------------------------------

// Generate a random values in the range {min, max}
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Create an attack log
function createLogAttack(isPlayer, damage) {
  return {
    isPlayer: isPlayer,
    isDamage: true,
    text: ` takes ${damage} damages`,
  };
}

// Create a healing log
function createLogHeal(healing) {
  return {
    isPlayer: true,
    isDamage: false,
    text: ` heal ${healing} life points`,
  };
}

function Game() {
  // ----------------------------------------------------------------------------------------------------------
  // STATES & VARIABLES
  // ----------------------------------------------------------------------------------------------------------
  const [playerHealth, setPlayerHealth] = useState(100);
  const [monsterHealth, setMonsterHealth] = useState(100);
  const [logs, setLogs] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const [specialAttackCounter, setSpecialAttackCounter] = useState(0);

  // ----------------------------------------------------------------------------------------------------------
  // BUTTONS EVENT FUNCTIONS
  // ----------------------------------------------------------------------------------------------------------
  const handleAttack = () => {
    const playerDamage = getRandomValue(5, 12);
    setMonsterHealth(prev => Math.max(0, prev - playerDamage));
    setLogs(prev => [createLogAttack(false, playerDamage), ...prev]);

    const monsterDamage = getRandomValue(5, 12);
    setPlayerHealth(prev => Math.max(0, prev - monsterDamage));
    setLogs(prev => [createLogAttack(true, monsterDamage), ...prev]);

    setSpecialAttackCounter(prev => prev + 1);
  };

  const handleSpecialAttack = () => {
    const specialDamage = getRandomValue(8, 25);
    setMonsterHealth(prev => Math.max(0, prev - specialDamage));
    setLogs(prev => [createLogAttack(false, specialDamage), ...prev]);

    const monsterDamage = getRandomValue(5, 12);
    setPlayerHealth(prev => Math.max(0, prev - monsterDamage));
    setLogs(prev => [createLogAttack(true, monsterDamage), ...prev]);

    setSpecialAttackCounter(0);
  };

  const handleHeal = () => {
    const healing = getRandomValue(8, 15);
    setPlayerHealth(prev => Math.min(100, prev + healing));
    setLogs(prev => [createLogHeal(healing), ...prev]);

    const monsterDamage = getRandomValue(5, 12);
    setPlayerHealth(prev => Math.max(0, prev - monsterDamage));
    setLogs(prev => [createLogAttack(true, monsterDamage), ...prev]);

    setSpecialAttackCounter(prev => prev + 1);
  };

  const handleKill = () => {
    setPlayerHealth(0);
    setLogs(prev => [{ isPlayer: true, isDamage: true, text: ' kills themselves' }, ...prev]);
  };

  const restartGame = () => {
    setPlayerHealth(100);
    setMonsterHealth(100);
    setLogs([]);
    setGameOver(false);
    setGameResult(null);
    setSpecialAttackCounter(0);
  };

  useEffect(() => {
    if (playerHealth <= 0 || monsterHealth <= 0) {
      let result;
      if (playerHealth <= 0 && monsterHealth <= 0) result = 'draw';
      else if (playerHealth <= 0) result = 'monster';
      else result = 'player';
      setGameOver(true);
      setGameResult(result);
      setSpecialAttackCounter(0);
    }
  }, [playerHealth, monsterHealth]);

  // ----------------------------------------------------------------------------------------------------------
  // JSX FUNCTIONS
  // ----------------------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------------------
  // MAIN  TEMPLATE
  // ----------------------------------------------------------------------------------------------------------
  return (
    <div className="container">
      <Entity entityName="Monster" health={monsterHealth} />
      <Entity entityName="Player" health={playerHealth} />

      <div id="controls">
        <button onClick={handleAttack} disabled={gameOver}>ATTACK</button>
        <button 
          onClick={handleSpecialAttack} 
          disabled={gameOver || specialAttackCounter < 2}
        >
          SPECIAL ATTACK
        </button>
        <button onClick={handleHeal} disabled={gameOver}>HEAL</button>
        <button onClick={handleKill} disabled={gameOver}>KILL YOURSELF</button>
      </div>

      <Logs logs={logs} />

      {gameOver && (
        <GameOver
          result={gameResult === 'draw' ? 'Draw Game!' : `You ${gameResult === 'player' ? 'Won!' : 'Lost!'}`}
          onRestart={restartGame}
        />
      )}
    </div>
  );
}

export default Game;
