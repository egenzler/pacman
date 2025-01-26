'use strict'

var PACMAN = '<img  class="oacmn-img" style="transform: scaleX(-1); margin: auto; display: block;" src="img/oacmn.gif" alt="">'
// '😷'
var gPacman

function createPacman(board) {
	// TODO: initialize gPacman...
	gPacman = {
		location: { i: 6, j: 6 },
		isSuper: false
	}
	board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {

	console.log(gGame.foodCounter);

	if (!gGame.isOn) return
	// TODO: use getNextLocation(), nextCell
	const nextLocation = getNextLocation(ev)
	if (!nextLocation) return

	var nextCell = gBoard[nextLocation.i][nextLocation.j]

	// TODO: return if cannot move
	if (nextCell === WALL) return

	// TODO: hitting a ghost? call gameOver
	if (nextCell === GHOST && !gGame.isSuperFood) return gameOver('Defeat. 😢 Try again!')
	if (nextCell === GHOST && gGame.isSuperFood) {
		var ghost = getGhostByLocation(nextLocation)
		if (ghost.currCellContent === FOOD) {
			ghost.currCellContent = EMPTY
			gGame.foodCounter--
		}
		ghost.isGhostEaten = true
		renderCell(ghost.location, ghost.currCellContent, '')
	}


	// TODO: hitting food? call updateScore
	if (nextCell === FOOD) {
		updateScore(1)
		gGame.foodCounter--
	} 

	if (nextCell === SUPER_FOOD && gGame.isSuperFood === true) return
	if (nextCell === SUPER_FOOD) onSuperFoodEaten()
	if (nextCell === CHERRY) {
		gGame.score += 10
	}

	// TODO: moving from current location:
	// TODO: update the model
	gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

	// TODO: update the DOM
	renderCell(gPacman.location, EMPTY)

	// TODO: Move the pacman to new location:
	// TODO: update the model
	gPacman.location = nextLocation
	gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

	// TODO: update the DOM
	renderCell(gPacman.location, PACMAN)

	if (isVictory()) return gameOver('Victory! 🎉 Well done!')
}



function getNextLocation(eventKeyboard) {

	switch (eventKeyboard.key) {
		case 'ArrowUp':
			PACMAN = '<img class="oacmn-img" style="transform: rotate(-90deg);" src="img/oacmn.gif" alt="">';
			var diff = { i: -1, j: 0 }
			break
		case 'ArrowDown':
			PACMAN = '<img class="oacmn-img" style="transform: rotate(-270deg) ;" src="img/oacmn.gif" alt="">'
			var diff = { i: 1, j: 0 }
			break
		case 'ArrowLeft':
			PACMAN = '<img class="oacmn-img" style="transform: rotate(-180deg) ;" src="img/oacmn.gif" alt="">'
			var diff = { i: 0, j: -1 }
			break
		case 'ArrowRight':
			PACMAN = '<img class="oacmn-img" style="transform: rotate(-360deg) ;" src="img/oacmn.gif" alt="">'
			var diff = { i: 0, j: 1 }
			break
		case 'Enter':
			init()
			break
		default:
			return null
	}

	// TODO: figure out nextLocation
	var nextLocation = {
		i: gPacman.location.i + diff.i,
		j: gPacman.location.j + diff.j,
	}
	return nextLocation
}


function onSuperFoodEaten() {
	gGame.isSuperFood = true
	gGame.score += 10;
		setTimeout(() => {
		gGame.isSuperFood = false
		clearGhostEaten()
	}, 5000);

}