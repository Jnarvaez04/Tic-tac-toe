import { WINNER_COMBOS } from "../Constants"

export const checkWinnerFrom = (boardTocheck) => {
    // Revisamos todas las combinaciones ganadoras
    // Para ver si X u O ganó
    for(const combo of WINNER_COMBOS){
      const [a, b, c] = combo
      if(
        boardTocheck[a] &&
        boardTocheck[a] === boardTocheck[b] &&
        boardTocheck[a] === boardTocheck[c]
      ){
        return boardTocheck[a]
      }
    }
    return null
  }

 export  const checkEndGame = (newBoard) => {
    // Revisamos si hay un empate
    // si no hay mas espacio vacios
    // en el tablero
    return newBoard.every((square) => square !== null)
  }