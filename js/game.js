'use strict'

const WALL = '&#8251;'
const FOOD = '&middot;'
const EMPTY = ' '
const SUPER_FOOD = '🏈'
const CHERRY = '🍒'

var gCherryInterval
var gBestScore = 0

var gGame
var gBoard

function init() {
    console.log('hello')
    closeGameOver()
    gGhosts = []
    setGame()
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    
    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
    gCherryInterval = setInterval(addCherry, 15000);
    gBestScore = getBestScore()
    document.querySelector('h3 span').innerText = gBestScore

}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            } else if (i === 1 && j === 1 || i === 1 && j === size - 2 ||
                i === size - 2 && j === 1 || i === size - 2 && j === size - 2) {
                board[i][j] = SUPER_FOOD
            } else {
                board[i][j] = FOOD
                gGame.foodCounter++
            }

        }
    }
    return board
}

function setGame() {

    gGame = {
        score: 0,
        isOn: false,
        foodCounter: 0,
        isSuperFood: false
    }
}
function updateScore(diff) {
    // Model
    gGame.score += diff

    // DOM
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver(text) {
    console.log('Game Over')
    document.querySelector('.game-over span').innerText = text
    document.querySelector('.game-over').style.display = 'block'
    clearInterval(gGhostsInterval)
    clearInterval(gCherryInterval)
    gGame.isOn = false
    if (gGame.score > gBestScore) gBestScore = gGame.score
    saveBestScore(gBestScore)
    document.querySelector('h3 span').innerText = gBestScore
    setCookie("bestScore", gBestScore, 7);
}


function closeGameOver() {
    const gameOverDiv = document.querySelector('.game-over');
    gameOverDiv.style.display = 'none';

}


function isVictory() {

    if (gGame.foodCounter === 1) return true
    return false

}



function addCherry() {
    var emptyBoard = emptyCell(gBoard)
    if (emptyBoard.length === 0) return null
    var idx = getRandomIntInclusive(0, emptyBoard.length)
    var cherryCell = emptyBoard[idx]
    gBoard[cherryCell.i][cherryCell.j] = CHERRY
    renderCell(cherryCell, CHERRY)

}


// שמירת bestScore ב-Local Storage
function saveBestScore(score) {
    localStorage.setItem('bestScore', score);
}

// קבלת bestScore מ-Local Storage
function getBestScore() {
    return localStorage.getItem('bestScore') || 0; // מחזיר 0 אם אין ערך שמור
}


function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // days -> milliseconds
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// דוגמה לשמירה:
 // שמירת קוקי למשך 7 ימים
