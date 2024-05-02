const calls = document.querySelectorAll('.cell')
const statusText = document.querySelector('#statusText')
const restartButton = document.querySelector('#restartButton')
const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]
let ophions = ['', '', '', '', '', '', '', '', '']
let corretPlayer = 'X'
let runnin = false

initializeGame()

function initializeGame() {
    calls.forEach((cell) => cell.addEventListener('click', cellClicked))
    restartButton.addEventListener('click', restartGame)
    statusText.textContent = `${corretPlayer} 's turn`
    runnin = true
}

function cellClicked() {
    const cellIndex = this.getAttribute('cellIndex')

    if (ophions[cellIndex] != '' || !runnin) {
        return
    }

    updateCell(this, cellIndex)
    checkWinner()
}
function updateCell(cell, index) {
    ophions[index] = corretPlayer
    cell.textContent = corretPlayer
}
function changePlayer() {
    corretPlayer = corretPlayer == 'X' ? 'O' : 'X'
    statusText.textContent = `${corretPlayer}' s turn`
}
function checkWinner() {
    let roundWon = false

    for (let i = 0; i < winCondition.length; i++) {
        const condichion = winCondition[i]
        const cellA = ophions[condichion[0]]
        const cellB = ophions[condichion[1]]
        const cellC = ophions[condichion[2]]

        if (cellA == '' || cellB == '' || cellC == '') {
            continue
        }
        if (cellA == cellB && cellB == cellC) {
            roundWon = true
            break
        }
    }

    if (roundWon) {
        statusText.textContent = `${corretPlayer}' wins`
        runnin = false
    } else if (!ophions.includes('')) {
        statusText.textContent = `Draw`
        runnin = false
    } else {
        changePlayer()
    }
}
function restartGame() {
    corretPlayer = 'Y'
    ophions = ['', '', '', '', '', '', '', '', '']
    statusText.textContent = `${corretPlayer}' s turn`
    calls.forEach((cell) => (cell.textContent = ''))
    runnin = true
}

