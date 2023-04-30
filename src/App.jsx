import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./Components/Square";
import { TURNS } from "./Constants";
import { checkWinnerFrom, checkEndGame } from "./Logic/Board";
import { WinnerModal } from "./Components/WinnerModal";
import { saveGameToStorage, resetGameStorage } from "./Logic/Storage";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? TURNS.X;
  });

  // null es que no hay ganador, false es que hay un empate
  const [winner, setwinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setwinner(null);

    resetGameStorage();
  };

  const updateBoard = (index) => {
    // No actualizamos esta posición
    // Si ya tiene algo
    if (board[index] || winner) return;
    // Actualizamos el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    // Guardar la partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn,
    });

    // Revisar si hay un ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setwinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setwinner(false); // empate
    }
  };

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        {board.map((Square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {Square}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
}

export default App;
