let board;
let turn;
let numRedPieces;
let numWhitePieces;
let redPiece;
let whitePiece;
let boardPieceNum;
const squares = document.querySelectorAll(".board .square");
let parentElId;
let squareIdx;
let choice1Row;
let choice1Col;
let choice2Row;
let choice2Col;
let myName;
let parentEl;


let selectedEl;
let kingClass;


let selectedPieceIdx;
let player1Points;
let player2Points;
let time ;

let moveLeftDiag;
let moveRightDiag;


init();
function init() {
    board = [
        [0, null, 1, null, 2, null, 3, null],
        [null, 4, null, 5, null, 6, null, 7],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [8, null, 9, null, 10, null, 11, null],
        [null, 12, null, 13, null, 14, null, 15]
    ];
    turn = -1;
    player1Points = 0;
    player2Points = 0;
    renderTime();
    render();
}

function render() {
    
    renderBoard();
    renderTurnText();
    pieceSelection();

}

function renderBoard() {
    board.forEach((rowArr, rowIdx) => {
        rowArr.forEach((square, colIdx) => {
            const cellId = `r${rowIdx}c${colIdx}`
            const cellPiece = document.getElementById(cellId);
            if (square <= 7 && square !== null) {
                cellPiece.innerHTML = `<div class="piece white"></div>`;
            } else if (square > 7 && square !== null) {
                cellPiece.innerHTML = `<div class="piece red"></div>`;
            } else if (square === 'x' && square !== null) {
                cellPiece.style.backgroundColor = 'green';

            }
        })
    });
    redPiece = document.querySelectorAll(".red");

    whitePiece = document.querySelectorAll(".white");
    // pieceSelection();
}

function getPieceIdx() {
    let wholeBoard;
    if (turn === -1){
        wholeBoard = document.querySelectorAll(".board > div > div.red");
    } else if (turn === 1) {
        
        wholeBoard = document.querySelectorAll(".board > div > div.white");

        
    }
    let pieceIdx = [];
    wholeBoard.forEach( (el) => {
        let elIdx = el.parentElement.id
        pieceIdx.push(elIdx)
    })
    return pieceIdx
}
function checkMoveRed(i,j) {
    if (i === 0) {
        moveLeftDiag = false;
        moveRightDiag = false;
        return {
            "moveLeftDiag": moveLeftDiag,
            "moveRightDiag": moveRightDiag,
            idx: `r${i}c${j}`

        }
    } else if (j === 0) {
        if (board[i - 1][j + 1] === null) {

            moveLeftDiag = false;
            moveRightDiag = true;
            return {
                "moveLeftDiag": moveLeftDiag,
                "moveRightDiag": moveRightDiag,
                idx: `r${i}c${j}`
            }

        } 
        else if (board[i-1][j + 1] <=7 && board[i - 2][j + 2] === null && j < 6) {


            moveLeftDiag = false;
            moveRightDiag = true;
            return {
                "moveLeftDiag": moveLeftDiag,
                "moveRightDiag": moveRightDiag,
                idx: `r${i}c${j}`
            }

        } 
        else {

            moveLeftDiag = false;
            moveRightDiag = false;
            return {
                "moveLeftDiag": moveLeftDiag,
                "moveRightDiag": moveRightDiag,
                idx: `r${i}c${j}`
            }
        }
    
    } else if (j >= 7) {
        if (board[i - 1][j - 1] === null) {
            moveLeftDiag = true;
            moveRightDiag = false;
            return {
                "moveLeftDiag": moveLeftDiag,
                "moveRightDiag": moveRightDiag,
                idx: `r${i}c${j}`
            }

        } 
        else if (board[i - 1][j - 1] <= 7 && board[i - 2][j - 2] === null && j > 1) {
            moveLeftDiag = true;
            moveRightDiag = false;
            return {
                "moveLeftDiag": moveLeftDiag,
                "moveRightDiag": moveRightDiag,
                idx: `r${i}c${j}`
            }
        }
        else {
            moveLeftDiag = false;
            moveRightDiag = false;
            return {
                "moveLeftDiag": moveLeftDiag,
                "moveRightDiag": moveRightDiag,
                idx: `r${i}c${j}`
            }
        }
    } else {
        if (board[i - 1][j - 1] === null) {
            moveLeftDiag = true;
        } 
        else if (board[i - 1][j - 1] <= 7 && board[i - 2][j - 2] === null) {
            moveLeftDiag = true;
        }
         else {
            moveLeftDiag = false;
        }
    
        if (board[i - 1][j + 1] === null) {
            moveRightDiag = true;
        } 
        else if(board[i - 1][j + 1] <= 7 && board[i - 2][j + 2] === null) {
            moveRightDiag = true;
        }
         else {
            moveRightDiag = false
        }
        return {
            'moveLeftDiag': moveLeftDiag,
            'moveRightDiag': moveRightDiag,
            idx: `r${i}c${j}`
        }
    }
} 
function CheckMoveWhite(i,j) {
    if(i === 7) {
        moveLeftDiag = false;
        moveRightDiag = false;
        return {
            "moveLeftDiag": moveLeftDiag,
            "moveRightDiag": moveRightDiag,
            idx: `r${i}c${j}`

        }
    } else if (j === 0){
        if (board[i+1][j+1] === null) {
            moveLeftDiag = false;
            moveRightDiag = true;
            return {
                "moveLeftDiag": moveLeftDiag,
                "moveRightDiag": moveRightDiag,
                idx: `r${i}c${j}`
            }
        } 
        else if(board[i+1][j+1] >7 && board[i+2][j+2] === null && j < 6) {
            moveLeftDiag = false;
            moveRightDiag = true;
            return {
                "moveLeftDiag": moveLeftDiag,
                "moveRightDiag": moveRightDiag,
                idx: `r${i}c${j}`
            }
        }
         else {
            moveLeftDiag = false;
            moveRightDiag = false;
            return {
                "moveLeftDiag": moveLeftDiag,
                "moveRightDiag": moveRightDiag,
                idx: `r${i}c${j}`
            }
        }
    } else if (j >= 7) {
        if (board[i + 1 ][j - 1] === null) {
            moveLeftDiag = true;
            moveRightDiag = false;
            return {
                "moveLeftDiag": moveLeftDiag,
                "moveRightDiag": moveRightDiag,
                idx: `r${i}c${j}`
            }

        } 
        else if (board[i + 1][j - 1] > 7 && board[i + 2][j - 2] === null && j > 1){
            moveLeftDiag = true;
            moveRightDiag = false;
            return {
                "moveLeftDiag": moveLeftDiag,
                "moveRightDiag": moveRightDiag,
                idx: `r${i}c${j}`
            }
        }
  
        else {
            moveLeftDiag = false;
            moveRightDiag = false;
            return {
                "moveLeftDiag": moveLeftDiag,
                "moveRightDiag": moveRightDiag,
                idx: `r${i}c${j}`
            }
        }
    }  else {
        if (board[i + 1][j - 1] === null) {
            moveLeftDiag = true;
        } 
        else if(board[i + 1][j - 1] > 7 && board[i + 2][j + 2] === null) {
            moveLeftDiag = true;
        } 
         else {
            moveLeftDiag = false;
        }
        if (board[i + 1][j + 1] === null) {
            moveRightDiag = true;
        } 
        else if (board[i + 1][j + 1] > 7 && board[i + 2][j + 2] === null) {
            moveRightDiag = true;
        } 
        else {
            moveRightDiag = false
        }
        return {
            'moveLeftDiag': moveLeftDiag,
            'moveRightDiag': moveRightDiag,
            idx: `r${i}c${j}`
        }
    }
}
// function 
function checkIfCanMOve(i, j) {
    // let moveLeftDiag;
    // let moveRightDiag;
    console.log(selectedEl)
    if (board[i][j] > 7 && board[i][j] !== null ) {
       let returnMoveRed = checkMoveRed(i,j);
       console.log(returnMoveRed)
       return returnMoveRed;
        
    } else if (board[i][j] <=7 && board[i][j] !== null) {
        let returnMoveWhite = CheckMoveWhite(i,j);
        return returnMoveWhite;
    }

    }


function pieceSelection() {

   
        selectedPieceIdx = getPieceIdx();
        selectedPieceIdx.forEach((el) => {
            el = el.split("")
            let row = Number(el[1]);
            let col = Number(el[3])

            let checkMove = checkIfCanMOve(row, col);
            console.log(checkMove);
            
            if (checkMove.moveLeftDiag === true || checkMove.moveRightDiag === true) {
                document.querySelector(`#r${el[1]}c${el[3]} > div`).addEventListener("click", handleMove)
            }
        })
        
  
}

function handleMove(evt) {
    // if( evt.target.classList.contains("red")){
    //     console.log(evt.target.className);
    // }
    // console.log(evt.target.className);
    selectedEl = evt.target;
    // console.log(se)
    // console.log(s)
    parentElId = evt.target.parentElement.id;
    parentEl = evt.target.parentElement
    squareIdx = String(parentElId);
    squareIdx = squareIdx.split("");
    pieceSelected = board[squareIdx[1]][squareIdx[3]];
    assignChoices();
    renderBoard();
    makeChoice();
    removePieceEventListener();
    
    turn *= -1;
    console.log("test")
    console.log("Player 1 points in handle", player1Points)
    console.log("Player 2 points in handle", player1Points)
    // render()


}
function moveDiagonalLeftForwardRed () {
    choice1Row = Number(squareIdx[1]) - 1;
    choice1Col = Number(squareIdx[3]) - 1;

    if (board[choice1Row][choice1Col] === null) {
        board[choice1Row][choice1Col] = 'x';

    } else if (board[choice1Row][choice1Col] !== null && board[choice1Row][choice1Col] <= 7 && squareIdx[3] > 1 && squareIdx[1] > 1) {
        choice1Row = Number(squareIdx[1]) - 2;
        choice1Col = Number(squareIdx[3]) - 2;
        
        if (board[choice1Row][choice1Col] === null) {
            board[choice1Row][choice1Col] = 'x';
        }

    }
}
function moveDiagonalRightForwardRed () {
    choice2Row = Number(squareIdx[1]) - 1;
    choice2Col = Number(squareIdx[3]) + 1;
    if (choice2Col !== undefined) {
        if (board[choice2Row][choice2Col] === null) {
            board[choice2Row][choice2Col] = 'x';

        } else if (board[choice2Row][choice2Col] !== null && board[choice2Row][choice2Col] < 7 && squareIdx[3] < 6 && squareIdx[1] > 1) {
            choice2Row = Number(squareIdx[1]) - 2;
            choice2Col = Number(squareIdx[3]) + 2;
            if (board[choice2Row][choice2Col] === null) {
                board[choice2Row][choice2Col] = 'x';
            }
        }
    }
}

function moveDiagonalLeftForwardWhite () {
        choice1Row = Number(squareIdx[1]) + 1;
        choice1Col = Number(squareIdx[3]) - 1;

        if (board[choice1Row][choice1Col] === null) {
            board[choice1Row][choice1Col] = 'x';

        } else if (board[choice1Row][choice1Col] !== null && board[choice1Row][choice1Col] > 7 && squareIdx[3] > 1 && squareIdx[1] < 6) {
            choice1Row = Number(squareIdx[1]) + 2;
            choice1Col = Number(squareIdx[3]) - 2;
            if (board[choice1Row][choice1Col] === null) {
                board[choice1Row][choice1Col] = 'x';
            }

        }
}

function moveDiagonalRightForwardWhite () {
    choice2Row = Number(squareIdx[1]) + 1;
    choice2Col = Number(squareIdx[3]) + 1;
    if (choice2Col !== undefined) {
        if (board[choice2Row][choice2Col] === null) {
            board[choice2Row][choice2Col] = 'x';

        } else if (board[choice2Row][choice2Col] !== null && board[choice2Row][choice2Col] > 7 && squareIdx[3] < 6 && squareIdx[1] < 6 ) {
            choice2Row = Number(squareIdx[1]) + 2;
            choice2Col = Number(squareIdx[3]) + 2;
            if (board[choice2Row][choice2Col] === null) {
                board[choice2Row][choice2Col] = 'x';
            }
        }
    }
}

function assignChoices() {
    if (turn === -1){
        console.log(parentElId, "Parent")
    if (squareIdx[1] > 0 && squareIdx[3] > 0) {
       moveDiagonalLeftForwardRed();
    }
    if (squareIdx[3] < 7 && squareIdx[1] > 0) {
        moveDiagonalRightForwardRed();
    }
} else if (turn === 1) {
    if (squareIdx[1] < 7 && squareIdx[3] > 0) {
        moveDiagonalLeftForwardWhite();
    }
    if (squareIdx[1] < 7 && squareIdx[3] < 7  ) {
        moveDiagonalRightForwardWhite();
    }
}
} 

function makeChoice() {

    if (choice1Col !== undefined) {
        if (board[choice1Row][choice1Col] === 'x') {
            document.querySelector(`#r${choice1Row}c${choice1Col}`).addEventListener('click', selectChoice1, { once: true })
        }
    }

    if (choice2Col !== undefined) {


        if (board[choice2Row][choice2Col] === 'x') {
            document.querySelector(`#r${choice2Row}c${choice2Col}`).addEventListener('click', selectChoice2, { once: true })
        }


    }
    
}

function selectChoice1() {

    parentEl.innerHTML = "";
    board[choice1Row][choice1Col] = pieceSelected;
    board[squareIdx[1]][squareIdx[3]] = null;
    if(turn === 1){
        console.log("turn - 1",turn);
        let compIdx = Number(squareIdx[1]) - 2;
        if(compIdx === choice1Row){
            board[squareIdx[1] - 1][squareIdx[3] - 1] = null;
            // document.querySelector(`r${squareIdx[1] - 1}c${squareIdx[3] - 1}`).parentElement.innerHTML = "";
            document.querySelector(`#r${squareIdx[1] - 1}c${squareIdx[3] - 1}`).innerHTML = "";
            player1Points += 1
            console.log(player1Points, "Player points")
            console.log("Player 1 point in choice",player1Points)
            renderPoints();

        }
    } else if( turn === -1){
        let compIdx = Number(squareIdx[1]) + 2;
        if(compIdx === choice1Row){
            console.log("Hello")
            console.log(document.querySelector(`#r${Number(squareIdx[1]) + 1}c${Number(squareIdx[3]) - 1}`))
            board[Number(squareIdx[1]) + 1][Number(squareIdx[3]) - 1] = null;
            document.querySelector(`#r${Number(squareIdx[1]) + 1}c${Number(squareIdx[3]) - 1}`).innerHTML = "";
            player2Points+=1
            console.log("Player 2 point in choice",player2Points)
            renderPoints();

        }
    }
    
    document.getElementById(`r${choice1Row}c${choice1Col}`).style.backgroundColor = "#ec7f03"
    if (choice2Col !== undefined) {
        if (board[choice2Row][choice2Col] === 'x') {
            board[choice2Row][choice2Col] = null;
            document.getElementById(`r${choice2Row}c${choice2Col}`).style.backgroundColor = "#ec7f03"
            document.querySelector(`#r${choice2Row}c${choice2Col}`).removeEventListener("click", selectChoice2)


        }
    }
    render();
    // renderBoard();

}

function selectChoice2() {




    parentEl.innerHTML = "";
    board[choice2Row][choice2Col] = pieceSelected;
    board[squareIdx[1]][squareIdx[3]] = null;

    if(turn === -1){
        console.log("turn red")

        let compIdx = Number(squareIdx[1]) + 2;
        if(compIdx === choice2Row){
            console.log("Hello")
            console.log(document.querySelector(`#r${Number(squareIdx[1]) + 1}c${Number(squareIdx[3]) + 1}`))
            board[Number(squareIdx[1]) + 1][Number(squareIdx[3]) + 1] = null;
            console.log(document.querySelector(`#r${Number(squareIdx[1]) + 1}c${Number(squareIdx[3]) - 1}`));
            document.querySelector(`#r${Number(squareIdx[1]) + 1}c${Number(squareIdx[3]) + 1}`).innerHTML = "";
            console.log(board)
            player2Points += 1;
            console.log("Player 2 point in choice",player2Points)
            renderPoints();
        
        }
    } else if( turn === 1){
        console.log("turn white")
        let compIdx = Number(squareIdx[1]) - 2;
        console.log(compIdx)
        if(compIdx === choice2Row){
            console.log("Hello")
            console.log(document.querySelector(`#r${Number(squareIdx[1]) - 1}c${Number(squareIdx[3]) + 1}`))
            board[Number(squareIdx[1]) - 1][Number(squareIdx[3]) + 1] = null;
            document.querySelector(`#r${Number(squareIdx[1]) - 1}c${Number(squareIdx[3]) + 1}`).innerHTML = "";
            player1Points += 1;
            console.log("Player 1 point in choice",player1Points)
            renderPoints();

        }
    }
    document.getElementById(`r${choice2Row}c${choice2Col}`).style.backgroundColor = "#ec7f03"
    if (choice1Col !== undefined) {

        if (board[choice1Row][choice1Col] === 'x') {
            board[choice1Row][choice1Col] = null;
            document.getElementById(`r${choice1Row}c${choice1Col}`).style.backgroundColor = "#ec7f03"

            document.querySelector(`#r${choice1Row}c${choice1Col}`).removeEventListener('click', selectChoice1)

        }

    }
    // turn *= 1;

    render();

    // renderBoard();

}


function removePieceEventListener() {

    selectedPieceIdx = getPieceIdx()
    selectedPieceIdx.forEach((el) => {
        el = el.split("")
       
        document.querySelector(`#r${el[1]}c${el[3]} > div`).removeEventListener("click", handleMove)

    })
}


function renderPoints() {
    document.querySelector(".player1-point").innerText = `${player1Points}`
    document.querySelector(".player2-point").innerText = `${player2Points}`
}

function renderTurnText () {
    let turnMsg = document.querySelector(".turn-color")
   
    // let count = 0;
    if( turn === -1) {
        turnMsg.innerText = "Red";
        turnMsg.style.color = "red";
    } else if (turn === 1){
        turnMsg.innerText = "White";
        turnMsg.style.color = "white";
    }
    
}

function renderTime() {
    let displayTime = document.querySelector(".display-time");
    let second = 0;
    let minute = 0;
    time = setInterval(() =>{
        if(second === 60){
            minute += 1;
            second = 0
        }
        displayTime.innerText = `${minute} : ${second}`;
        second += 1;
    },1000)
}