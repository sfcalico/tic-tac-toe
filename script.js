const tiles = Array.from(document.getElementsByClassName('tile'));
console.log(tiles)
const title = document.getElementById('title');
const reset = document.getElementById('reset');
const stat = document.getElementById('status');
const boardState = ["", "", "", "", "", "", "", "", ""];
const player1 = "X";
const player2 = "O";
let currentPlayer = player1;
let gameOver = false
let count = 0

const clickTile = (e) => {
    if (gameOver){
        return;
    }
    count++
    const id = e.target.id;
    console.log(id);
    if(!boardState[id]){
        boardState[id] = currentPlayer;
        e.target.innerText = currentPlayer;
        statusDisplay()
        if (count === 9) {
            title.innerText = `Looks like we have a tie!`;
        }
        if(playerWon()){
            title.innerText = `${currentPlayer} won the game!`;
            gameOver = true;
            return;
        }
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }
};

tiles.forEach(tile => {
    tile.addEventListener("click", clickTile);
})

const playerWon = () => {
    if (boardState[0] === currentPlayer){
        if (boardState[1] === currentPlayer && boardState[2] === currentPlayer){
            console.log(`${currentPlayer} wins along top row.`)
            count = 0;
            return true;
        }
        if (boardState[3] === currentPlayer && boardState[6] === currentPlayer){
            console.log(`${currentPlayer} wins down the first column.`)
            count = 0;
            return true;
        }
        if (boardState[4] === currentPlayer && boardState[8] === currentPlayer){
            console.log(`${currentPlayer} wins diagonally.`)
            count = 0;
            return true;
        }
    } else if (boardState[8] === currentPlayer){
        if (boardState[7] === currentPlayer && boardState[6] === currentPlayer){
            console.log(`${currentPlayer} wins along bottom row.`)
            count = 0;
            return true;
        }
        if (boardState[5] === currentPlayer && boardState[2] === currentPlayer){
            console.log(`${currentPlayer} wins down the third column.`)
            count = 0;
            return true;
        }
    } else if (boardState[4] === currentPlayer){
        if (boardState[1] === currentPlayer && boardState[7] === currentPlayer){
            console.log(`${currentPlayer} wins along middle column.`)
            count = 0;
            return true;
        }
        if (boardState[3] === currentPlayer && boardState[5] === currentPlayer){
            console.log(`${currentPlayer} wins along middle row.`)
            count = 0;
            return true;
        }
    }
}

const statusDisplay = () => {
    if (currentPlayer === "X"){
        stat.innerText = `Next up: Player 2 (O)`;
    } else {
        stat.innerText = `Next up: Player 1 (X)`;
    }
}

const restart = () =>{
    boardState.forEach((cell, index)=>{
        boardState[index] = null;
    })
    tiles.forEach(tile => {
        tile.innerText = "";
    })
    title.innerText = `Let's Play Tic Tac Toe`;
    stat.innerText = `New Game! Who's first?`;
    currentPlayer = player1;
    gameOver = false;
}

reset.addEventListener("click", restart);
restart();