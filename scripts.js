console.log('loading')
const X_CLASS = 'x'
const O_CLASS = 'o'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]


let oTurn

const cellElements = document.querySelectorAll('[data-cell]')
console.log(cellElements)
const board = document.getElementById('board')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton =document.getElementById("restartButton")

console.log('about to connect ['+cellElements.length+'] elements to click handlers')

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
    oTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.removeEventListener('click',handleClick)
        cell.addEventListener('click', handleClick, {once: true})
        console.log('adding click handler')
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')

}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = "It's a DRAW!"
    } else {
        winningMessageTextElement.innerText = `${oTurn ? "O's" : "X's" } Wins!`
    }
    winningMessageElement.classList.add('show')
}

function handleClick(e) {
    console.log('clicked')
    const cell = e.target
    const currentClass = oTurn ? O_CLASS : X_CLASS
    placeMark(cell, currentClass)
    console.log("checking "+currentClass+" to see if they won")
    if (checkWin(currentClass)) {
        console.log("winner: "+currentClass)
        endGame(false)
    } else if (isDraw()) {
        console.log("It's a DRAW")
        endGame(true)
    }
    swapTurns();
    setBoardHoverClass();
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    oTurn = !oTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)
    if(oTurn) {
        board.classList.add(O_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination =>  {
        return combination.every(index =>  {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) ||
                cell.classList.contains(O_CLASS)
    })
}

console.log('done')