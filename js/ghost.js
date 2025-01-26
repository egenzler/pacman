'use strict'

const GHOST =  '👻' 
// '<img  class="ghost-img" src="img/t.webp" alt="">'
// 
// &#9781
var gGhosts = []

var gGhostsInterval

function createGhosts(board) {
    // TODO: Create 3 ghosts and an interval
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    gGhostsInterval = setInterval(moveGhosts, 1000)
}

function createGhost(board) {
    // TODO: Create a ghost with arbitrary start pos & currCellContent
    const ghost = {
        location: { i: 3, j: 3 },
        currCellContent: FOOD,
        color: getRandomColor(),
        isGhostEaten: false
    }

    // TODO: Add the ghost to the ghosts array
    gGhosts.push(ghost)

    // TODO: Update the board
    board[ghost.location.i][ghost.location.j] = GHOST
}

function moveGhosts() {
    // TODO: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        if (!gGhosts[i].isGhostEaten) moveGhost(gGhosts[i])
    }
}

function moveGhost(ghost) {
    // TODO: figure out moveDiff, nextLocation, nextCell
    const diff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + diff.i,
        j: ghost.location.j + diff.j,
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // TODO: return if cannot move
    if (nextCell === WALL || nextCell === GHOST) return

    // TODO: hitting a pacman? call gameOver
    if (nextCell === PACMAN) return /* gameOver('I got eaten! 🐾 Game over.')*/

    // TODO: moving from current location:
    // TODO: update the model (restore prev cell contents)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent

    // TODO: update the DOM
    renderCell(ghost.location, ghost.currCellContent, '')

    // TODO: Move the ghost to new location:
    // TODO: update the model (save cell contents so we can restore later)
    ghost.location = nextLocation
    ghost.currCellContent = nextCell

    gBoard[ghost.location.i][ghost.location.j] = GHOST

    // TODO: update the DOM
    var color = (gGame.isSuperFood === true) ? '#526D4C' : ghost.color
    renderCell(ghost.location, GHOST, color)
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    return `<span>${GHOST}</span>`
}


function getGhostByLocation(location) {

    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i];
        if (ghost.location.i === location.i && ghost.location.j === location.j) {
            return ghost
        }

    }
}

function clearGhostEaten() {
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i];
        ghost.isGhostEaten = false
    }
}

