const x_class = 'x'
const o_class = 'o'
const winning_combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

let oTurn

const board = document.getElementById('board')
const cells = document.querySelectorAll('.cell')
const gameEnd = document.getElementById('gameEnd')
const winMsg = document.querySelector('[data-end-game-msg]')
const restartButton = document.getElementById('restartButton')

function startGame() {
  oTurn = false

  cells.forEach((cell) => {
    cell.classList.remove(x_class)
    cell.classList.remove(o_class)
    cell.removeEventListener('click', clickHandler)
    cell.addEventListener('click', clickHandler, { once: true })
  })

  setHoverClass()

  gameEnd.classList.remove('show')
}

function clickHandler(event) {
  const cell = event.target
  const currentClass = oTurn ? o_class : x_class

  placeMark(cell, currentClass)

  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setHoverClass()
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurns() {
  oTurn = !oTurn
}

function setHoverClass() {
  board.classList.remove(x_class)
  board.classList.remove(o_class)

  if (oTurn) {
    board.classList.add(o_class)
  } else {
    board.classList.add(x_class)
  }
}

function checkWin(currentClass) {
  return winning_combinations.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentClass)
    })
  })
}

function endGame(draw) {
  if (draw) {
    winMsg.innerText = 'Draw!'
  } else {
    winMsg.innerText = `${oTurn ? 'O' : 'X'} wins!`
  }
  gameEnd.classList.add('show')
}

function isDraw() {
  return [...cells].every((cell) => {
    return cell.classList.contains(x_class) || cell.classList.contains(o_class)
  })
}

restartButton.addEventListener('click', startGame)

startGame()
