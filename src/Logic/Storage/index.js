export const saveGameToStorage  = ({ board, turn}) => {
     // Guardar aqui partida
     window.localStorage.setItem('board', JSON.stringify(board))
     window.localStorage.setItem('turn', turn)
}

export const resetGameStorage = () => {
    Window.localStorage.removeItem('board')
    Window.localStorage.removeItem('turn')
}