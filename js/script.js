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
let choice3Row;
let choice3Col;
let choice4Row;
let choice4Col;
let myName;
let parentEl;
let winner;


let selectedEl;
let kingClass;
let kingClassArr = [null]


let selectedPieceIdx;
let player1Points;
let player2Points;
let time ;

let moveLeftDiag;
let moveRightDiag;
let moveLeftDiagBackward;
let moveRightDiagBackward;

const resetBtn = document.querySelector("button");
const winnerText = document.querySelector(".player-won");
const turnText = document.querySelector(".turn");
const timeText = document.querySelector(".time");

document.querySelector("button").addEventListener('click', init)

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
        [null, 11, null, 13, null, 14, null, 15]
    ];
    // document.querySelectorAll(".light").style.backgroundColor
    // renderBoard();
    winner = null;
    turn = -1;
    player1Points = 0;
    player2Points = 0;
    renderTime();
    render();
}

function render() {
    renderBoard();
    pieceSelection();
    renderTurnText();
    getWinner();
    winnerText.style.visibility = winner ? 'visible' : 'hidden';
    resetBtn.style.visibility = winner ? 'visible' : 'hidden';

}

function getWinner() {
    let winMsg = document.querySelector('.player-won');
    if (player1Points === 8){
        console.log("player 1 won") ;
        winMsg.innerHTML = "PLAYER 1 WON!!"
        winMsg.style.color = "red"
        winner = 1;
        turnText.innerHTML = "";
        timeText.classList.add("time-won")
        clearInterval(time);
    } else if (player2Points === 8){
        console.log("player 2 won") ;
        winMsg.innerHTML = "PLAYER 2 WON!!"
        winMsg.style.color = "white"
        winner = 1;
        turnText.innerHTML = "";
        timeText.classList.add("time-won")
        clearInterval(time);        
    }
    

    
}

function addKingClass() {
    board.forEach((rowArr, rowIdx) => {
        rowArr.forEach((square, colIdx) => {
            
            const cellId = `r${rowIdx}c${colIdx}`
            const cellPiece = document.getElementById(cellId);
            
          if(kingClassArr.indexOf(square) >= 0 ){
            if (square <= 7 && square != null){
                cellPiece.innerHTML = `<div class="piece white king "></div>`;
            } else if (square > 7 && square !== null){
                cellPiece.innerHTML = `<div class="piece red king"></div>`;
            }
          }
        })
    });
    
}
function renderBoard() {
   
        board.forEach((rowArr, rowIdx) => {
            rowArr.forEach((square, colIdx) => {
                
                const cellId = `r${rowIdx}c${colIdx}`
                const cellPiece = document.getElementById(cellId);
                // console.log(cellPiece.classList.contains("light"))
               if (square <= 7 && square !== null){
                    cellPiece.innerHTML = `<div class="piece white "></div>`;
                }  else if (square > 7 && square !== null) {
                    cellPiece.innerHTML = `<div class="piece red "></div>`;
                } else if (square === 'x' && square !== null) {
                    cellPiece.style.backgroundColor = 'green';
                } else if (square === null && cellPiece.classList.contains("dark")) {
                    cellPiece.innerHTML = "";
                    cellPiece.style.backgroundColor = '#ec7f03';

                } 
                // else if (square === null && cellPiece.classList.contains("dark")){
                //     cellPiece.style.backgroundColor = 'white';
                // }

            })
        });
   
    addKingClass()
    // redPiece = document.querySelectorAll(".red");

    // whitePiece = document.querySelectorAll(".white");
    // render();
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
    } else if (j === 0) {
        if (board[i - 1][j + 1] === null) {
            moveLeftDiag = false;
            moveRightDiag = true;
        } 
        else if (j < 6 && board[i-1][j + 1] <=7 && board[i - 2][j + 2] === null  ) {
            moveLeftDiag = false;
            moveRightDiag = true;
        } 
        else {
            moveLeftDiag = false;
            moveRightDiag = false;
        }
        
    } else if (j >= 7) {
        if (board[i - 1][j - 1] === null) {
            moveLeftDiag = true;
            moveRightDiag = false;
        } 
        else if ( j > 1 && i > 1 && board[i - 1][j - 1] <= 7 && board[i - 2][j - 2] === null ) {
            moveLeftDiag = true;
            moveRightDiag = false;
        }
        else {
            moveLeftDiag = false;
            moveRightDiag = false;
        }
    } else {
        if (board[i - 1][j - 1] === null) {
            moveLeftDiag = true;
        } 
        else if (j > 1 && i > 1 && board[i - 1][j - 1] <= 7 && board[i - 2][j - 2] === null ) {
            moveLeftDiag = true;
        }
         else {
            moveLeftDiag = false;
        }
    
        if (board[i - 1][j + 1] === null) {
            moveRightDiag = true;
        } 
        else if(j < 6 && i > 1 && board[i - 1][j + 1] <= 7 && board[i - 2][j + 2] === null ) {
            moveRightDiag = true;
        }
         else {
            moveRightDiag = false
        }
        
    }
    return {
        'moveLeftDiag': moveLeftDiag,
        'moveRightDiag': moveRightDiag,
        idx: `r${i}c${j}`
    }
} 
function CheckMoveWhite(i,j) {
    if(i === 7) {
        moveLeftDiag = false;
        moveRightDiag = false;
        
    } else if (j === 0){
        if (board[i+1][j+1] === null) {
            moveLeftDiag = false;
            moveRightDiag = true;
            
        } 
        else if(i < 6 && board[i+1][j+1] >7 && board[i+2][j+2] === null  ) {
            moveLeftDiag = false;
            moveRightDiag = true;
            
        }
         else {
            moveLeftDiag = false;
            moveRightDiag = false;
            
        }
    } else if (j >= 7) {
        if (board[i + 1 ][j - 1] === null) {
            moveLeftDiag = true;
            moveRightDiag = false;
            

        } 
        else if ( j > 1 && i < 6 && board[i + 1][j - 1] > 7 && board[i + 2][j - 2] === null ){
            moveLeftDiag = true;
            moveRightDiag = false;
            
        }
  
        else {
            moveLeftDiag = false;
            moveRightDiag = false;
            
        }
    }  else {
        if (board[i + 1][j - 1] === null) {
            moveLeftDiag = true;
        } 
        else if(j > 1 && i < 6 && board[i + 1][j - 1] >= 7 && board[i + 2][j - 2] === null ) {
            moveLeftDiag = true;
        } 
         else {
            moveLeftDiag = false;
        }
        if (board[i + 1][j + 1] === null) {
            moveRightDiag = true;
        } 
        else if ( j < 6 && i < 6 && board[i + 1][j + 1] > 7 && board[i + 2][j + 2] === null ) {
            moveRightDiag = true;
        } 
        else {
            moveRightDiag = false
        }
        
    }
    return {
        'moveLeftDiag': moveLeftDiag,
        'moveRightDiag': moveRightDiag,
        idx: `r${i}c${j}`
    }
}

function checkMoveRedBackward(i,j){
    if (i === 7) {
        moveLeftDiagBackward = false;
        moveRightDiagBackward = false;
    } else if(j === 0){
            if(board[i + 1][j + 1] === null){
                moveLeftDiagBackward = false;
                moveRightDiagBackward = true;
            } else if (i < 6 && board[i + 1][j + 1] <= 7 && board[i + 2][j + 2] === null ){
                moveLeftDiagBackward = false;
                moveRightDiagBackward = true;
            }
            else {
                moveLeftDiagBackward = false;
                moveRightDiagBackward = false;
            }
        } else if (j === 7) {
            if(board[i + 1][j - 1] === null){
                moveLeftDiagBackward = true;
                moveRightDiagBackward = false;
            } else if (i < 6 && board[i + 1][j - 1] <= 7 && board[i - 2][j - 2] === null){
                moveLeftDiagBackward = true;
                moveRightDiagBackward = false;
            }
            else {
                moveLeftDiagBackward = false;
                moveRightDiagBackward = false;
            }
        } else  {
            if(board[i + 1][j + 1] === null){
                moveRightDiagBackward = true;

            } else if (j < 6  && i < 6 && board[i + 1][j + 1] <= 7 && board[i + 2][j + 2] === null ){
                moveRightDiagBackward = true;
            } else {
                moveRightDiagBackward = false;
            }
            if(board[i + 1][j - 1] === null){
                moveLeftDiagBackward = true;
            } else if (j > 1 && i < 6 && board[i + 1][j - 1] <= 7 && board[i + 2][j - 2] === null ){
                moveLeftDiagBackward = true;
            } else {
                moveLeftDiagBackward = false;
            }
        }
        return {
            'moveLeftDiagBackward' : moveLeftDiagBackward,
            'moveRightDiagBackward' : moveRightDiagBackward,
             idx: `r${i}c${j}`
        }
    


    }

function checkMoveWhiteBackWard(i,j){
    if (i === 0) {
        moveLeftDiagBackward = false;
        moveRightDiagBackward = false;
    } else if(j === 0){
            if(board[i - 1][j + 1] === null){
                moveLeftDiagBackward = false;
                moveRightDiagBackward = true;
            } else if (  i > 1 && board[i - 1][j + 1] <= 7 && board[i - 2][j + 2] === null ){
                moveLeftDiagBackward = false;
                moveRightDiagBackward = true;
            }
            else {
                moveLeftDiagBackward = false;
                moveRightDiagBackward = false;
            }
        } else if (j === 7) {
            if(board[i - 1][j - 1] === null){
                moveLeftDiagBackward = true;
                moveRightDiagBackward = false;
            } else if (  i > 1 && board[i - 1][j - 1] <= 7 && board[i - 2][j - 2] === null ){
                moveLeftDiagBackward = true;
                moveRightDiagBackward = false;
            }
            else {
                moveLeftDiagBackward = false;
                moveRightDiagBackward = false;
            }
        } else  {
            if(board[i - 1][j + 1] === null){
                moveRightDiagBackward = true;

            } else if (j < 6  && i > 1 && board[i - 1][j + 1] > 7 && board[i - 2][j + 2] === null){
                moveRightDiagBackward = true;
            } else {
                moveRightDiagBackward = false;
            }
            if(board[i - 1][j - 1] === null){
                moveLeftDiagBackward = true;
            } else if ( j > 1 && i > 1 && board[i - 1][j - 1] > 7 && board[i - 2][j - 2] === null ){
                moveLeftDiagBackward = true;
            } else {
                moveLeftDiagBackward = false;
            }
        }
        return {
            'moveLeftDiagBackward' : moveLeftDiagBackward,
            'moveRightDiagBackward' : moveRightDiagBackward,
             idx: `r${i}c${j}`
        }
    


}

// function 
function checkIfCanMOve(i, j) {
    
    if (board[i][j] > 7 && board[i][j] !== null ) {
       let returnMoveRed = checkMoveRed(i,j);
       let returnMoveRedBackward = checkMoveRedBackward(i,j)
       Object.assign(returnMoveRed, returnMoveRedBackward);
       
       return returnMoveRed;
        
    } else if (board[i][j] <=7 && board[i][j] !== null) {
        let returnMoveWhite = CheckMoveWhite(i,j);
        let returnMoveWhiteBackward = checkMoveWhiteBackWard(i,j)
        Object.assign(returnMoveWhite, returnMoveWhiteBackward);
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
            if(!document.querySelector(`#r${el[1]}c${el[3]} > div`).classList.contains('king')){
                if (checkMove.moveLeftDiag === true || checkMove.moveRightDiag === true) {
                    document.querySelector(`#r${el[1]}c${el[3]} > div`).addEventListener("click", handleMove)
                }
            } else if (document.querySelector(`#r${el[1]}c${el[3]} > div`).classList.contains('king')){
                if (checkMove.moveLeftDiag === true || checkMove.moveRightDiag === true || checkMove.moveLeftDiagBackward || checkMove.moveRightDiagBackward) {
                    document.querySelector(`#r${el[1]}c${el[3]} > div`).addEventListener("click", handleMove)
                }
            }
           
        })
        
  
}

function handleMove(evt) {
    console.log("handleMove")
    selectedEl = evt.target;
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

        } else if (board[choice2Row][choice2Col] !== null && board[choice2Row][choice2Col] <= 7 && squareIdx[3] < 6 && squareIdx[1] > 1) {
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

function moveDiagonalLeftBackwardRed () {
    choice3Row = Number(squareIdx[1]) + 1;
    choice3Col = Number(squareIdx[3]) - 1;

    if (board[choice3Row][choice3Col] === null) {
        board[choice3Row][choice3Col] = 'x';

    } else if (board[choice3Row][choice3Col] !== null && board[choice3Row][choice3Col] <= 7 && squareIdx[3] > 1 && squareIdx[1] < 6) {
        choice3Row = Number(squareIdx[1]) + 2;
        choice3Col = Number(squareIdx[3]) - 2;
        
        if (board[choice3Row][choice3Col] === null) {
            board[choice3Row][choice3Col] = 'x';
        }

    }
}

function moveDiagonalRightBackwardRed () {
    choice4Row = Number(squareIdx[1]) + 1;
    choice4Col = Number(squareIdx[3]) + 1;
    if (choice4Col !== undefined) {
        if (board[choice4Row][choice4Col] === null) {
            board[choice4Row][choice4Col] = 'x';

        } else if (board[choice4Row][choice4Col] !== null && board[choice4Row][choice4Col] <= 7 && squareIdx[3] < 6 && squareIdx[1] < 6) {
            choice4Row = Number(squareIdx[1]) + 2;
            choice4Col = Number(squareIdx[3]) + 2;
            if (board[choice4Row][choice4Col] === null) {
                board[choice4Row][choice4Col] = 'x';
            }
        }
    }
}

function moveDiagonalLeftBackwardWhite() {
    choice3Row = Number(squareIdx[1]) - 1;
        choice3Col = Number(squareIdx[3]) - 1;

        if (board[choice3Row][choice3Col] === null) {
            board[choice3Row][choice3Col] = 'x';

        } else if (board[choice3Row][choice3Col] !== null && board[choice3Row][choice3Col] > 7 && squareIdx[3] > 1 && squareIdx[1] > 1) {
            choice3Row = Number(squareIdx[1]) - 2;
            choice3Col = Number(squareIdx[3]) - 2;
            if (board[choice3Row][choice3Col] === null) {
                board[choice3Row][choice3Col] = 'x';
            }

        }

}

function moveDiagonalRightBackwardWhite() {
    choice4Row = Number(squareIdx[1]) - 1;
    choice4Col = Number(squareIdx[3]) + 1;
    if (choice4Col !== undefined) {
        if (board[choice4Row][choice4Col] === null) {
            board[choice4Row][choice4Col] = 'x';

        } else if (board[choice4Row][choice4Col] !== null && board[choice4Row][choice4Col] > 7 && squareIdx[3] < 6 && squareIdx[1] > 1 ) {
            choice4Row = Number(squareIdx[1]) - 2;
            choice4Col = Number(squareIdx[3]) + 2;
            if (board[choice4Row][choice4Col] === null) {
                board[choice4Row][choice4Col] = 'x';
            }
        }
    }
}

function assignChoices() {
   if (turn === -1) {
    if(!selectedEl.classList.contains("king")) {
        if (Number(squareIdx[1]) > 0 && Number(squareIdx[3]) > 0 ) {
            console.log("move left forward")
           moveDiagonalLeftForwardRed();
    
        } 
       
        if (Number(squareIdx[3]) < 7 && Number(squareIdx[1]) > 0) {
            console.log("move right forward")
            moveDiagonalRightForwardRed();
    
        }
    } else if (selectedEl.classList.contains("king")){
        console.log("Hurray")
        if(Number(squareIdx[1]) === 0 && Number(squareIdx[3] > 0)) {
            console.log("RL1")
            moveDiagonalLeftBackwardRed();
        } else if (Number(squareIdx[1]) > 0 && Number(squareIdx[1]) < 7 && Number(squareIdx[3]) > 0 ) {
            console.log("RL2")
            
            moveDiagonalLeftBackwardRed();
            moveDiagonalLeftForwardRed();
        } else if (Number(squareIdx[1]) > 0 && Number(squareIdx[1]) === 7 && Number(squareIdx[3]) > 0 ){
            console.log("RL3")
            
            moveDiagonalLeftForwardRed();
        }
        if ( Number(squareIdx[1]) === 0  && Number(squareIdx[3]) < 7    ) {
            console.log("RR1")
            
            moveDiagonalRightBackwardRed();

        } else if (  Number(squareIdx[1]) > 0  &&  Number(squareIdx[1]) < 7 && Number(squareIdx[3]) < 7) {
            console.log("RR2")
            
            moveDiagonalRightBackwardRed();
            moveDiagonalRightForwardRed();
        } else if (Number(squareIdx[1]) > 0 && Number(squareIdx[1]) === 7 && Number(squareIdx[3]) < 7 ) {
            console.log("RR3")
            moveDiagonalRightForwardRed();
        }
    }
   } else if (turn === 1) {
    console.log(selectedEl.classList.contains("king"));

    if (!selectedEl.classList.contains("king")){ 
    if (Number(squareIdx[1]) < 7 && squareIdx[3] > 0) {
        moveDiagonalLeftForwardWhite();
    }
    if (Number(squareIdx[1]) < 7 && squareIdx[3] < 7  ) {
        moveDiagonalRightForwardWhite();
    }
} else if (selectedEl.classList.contains("king")) {
    if (Number(squareIdx[1]) === 7 && Number(squareIdx[3]) > 0) {
        moveDiagonalLeftBackwardWhite();
    } else if (Number(squareIdx[1]) < 7  && Number(squareIdx[1]) > 0 && squareIdx[3] > 0) {
        moveDiagonalLeftBackwardWhite();
        moveDiagonalLeftForwardWhite();
    } else if (Number(squareIdx[1]) < 7 && Number(squareIdx[1]) === 0 && squareIdx[3] > 0){
        moveDiagonalLeftForwardWhite();
    }
    if (Number(squareIdx[1]) === 7 && squareIdx[3] < 7  ) {
        moveDiagonalRightBackwardWhite();
    } else if (Number(squareIdx[1]) < 7 && Number(squareIdx[1]) > 0 && squareIdx[3] < 7  ) {
        moveDiagonalRightBackwardWhite();
        moveDiagonalRightForwardWhite();
    } else if (Number(squareIdx[1]) < 7 && Number(squareIdx[1]) === 0 && squareIdx[3] < 7  ) {
        moveDiagonalRightForwardWhite();
    }
    
}
}
renderBoard(); 
} 

function makeChoice() {

    if (choice1Col !== undefined) {
        if (board[choice1Row][choice1Col] === 'x') {
            console.log("evt c1")
            document.querySelector(`#r${choice1Row}c${choice1Col}`).addEventListener('click', selectChoice1, { once: true })
        }
    }

    if (choice2Col !== undefined) {
        if (board[choice2Row][choice2Col] === 'x') {
            console.log("evt c2")

            document.querySelector(`#r${choice2Row}c${choice2Col}`).addEventListener('click', selectChoice2, { once: true })
        }
    }
    if(choice3Col !== undefined) {
        if (board[choice3Row][choice3Col] === 'x') {
            console.log("evt c3")

            document.querySelector(`#r${choice3Row}c${choice3Col}`).addEventListener('click', selectChoice3, { once: true })
        }
    }

    if ( choice4Col !== undefined) {
        if (board[choice4Row][choice4Col] === 'x') {
            console.log("evt c4")
            document.querySelector(`#r${choice4Row}c${choice4Col}`).addEventListener('click', selectChoice4, { once: true })
        }
    }
    
}

function selectChoice1() {
console.log("choice 1")
    parentEl.innerHTML = "";
    board[choice1Row][choice1Col] = pieceSelected;
    board[squareIdx[1]][squareIdx[3]] = null;
    
    if(turn === 1){
        // console.log("red",choice1Row) 
        if (choice1Row === 0){
            // selectedEl.classList.add("king")
            kingClassArr.push(pieceSelected);
            console.log(kingClassArr)
            console.log(document.querySelector(`#r${choice1Row}c${choice1Col}`))
        }

        let compIdx = Number(squareIdx[1]) - 2;
        if(compIdx === choice1Row){
            board[squareIdx[1] - 1][squareIdx[3] - 1] = null;
            // document.querySelector(`r${squareIdx[1] - 1}c${squareIdx[3] - 1}`).parentElement.innerHTML = "";
            document.querySelector(`#r${squareIdx[1] - 1}c${squareIdx[3] - 1}`).innerHTML = "";
            player1Points += 1
            
            

            renderPoints();

        }
    } else if( turn === -1){
        // console.log("white",choice1Row)
        if (choice1Row === 7){
            kingClassArr.push(pieceSelected);
            console.log(kingClassArr)
        }

        let compIdx = Number(squareIdx[1]) + 2;
        if(compIdx === choice1Row){
            
            board[Number(squareIdx[1]) + 1][Number(squareIdx[3]) - 1] = null;
            document.querySelector(`#r${Number(squareIdx[1]) + 1}c${Number(squareIdx[3]) - 1}`).innerHTML = "";
            player2Points+=1 

           
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

    if (choice3Col !== undefined) {
        if (board[choice3Row][choice3Col] === 'x') {
            board[choice3Row][choice3Col] = null;
            document.getElementById(`r${choice3Row}c${choice3Col}`).style.backgroundColor = "#ec7f03"
            document.querySelector(`#r${choice3Row}c${choice3Col}`).removeEventListener("click", selectChoice3)


        }
    }

    if (choice4Col !== undefined) {
        if (board[choice4Row][choice4Col] === 'x') {
            board[choice4Row][choice4Col] = null;
            document.getElementById(`r${choice4Row}c${choice4Col}`).style.backgroundColor = "#ec7f03"
            document.querySelector(`#r${choice4Row}c${choice4Col}`).removeEventListener("click", selectChoice4)
        }
    }
    console.log(pieceSelected)
    render();
    // renderBoard();

}

function selectChoice2() {

console.log("choice 2")


    parentEl.innerHTML = "";
    board[choice2Row][choice2Col] = pieceSelected;
    board[squareIdx[1]][squareIdx[3]] = null;
    // console.log(choice1Row)
    console.log(selectedEl)
    if(turn === -1){
        // console.log("white",choice2Row)
        if (choice2Row === 7){
            kingClassArr.push(pieceSelected);
            console.log(kingClassArr)
        }

        let compIdx = Number(squareIdx[1]) + 2;
        if(compIdx === choice2Row){
            board[Number(squareIdx[1]) + 1][Number(squareIdx[3]) + 1] = null;
            document.querySelector(`#r${Number(squareIdx[1]) + 1}c${Number(squareIdx[3]) + 1}`).innerHTML = "";
            player2Points += 1;
            
            if(choice2Row === 7){
                console.log("2000000000")
            }
            renderPoints();
        
        }
    } else if( turn === 1){
        // console.log("red",choice2Row)
        if (choice2Row === 0){
            kingClassArr.push(pieceSelected);
            console.log(kingClassArr)
        }

        let compIdx = Number(squareIdx[1]) - 2;
        if(compIdx === choice2Row){
            board[Number(squareIdx[1]) - 1][Number(squareIdx[3]) + 1] = null;
            document.querySelector(`#r${Number(squareIdx[1]) - 1}c${Number(squareIdx[3]) + 1}`).innerHTML = "";
            player1Points += 1;
            if(choice2Row === 7){
                console.log("27000000000")
            }
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

    if (choice3Col !== undefined) {
        if (board[choice3Row][choice3Col] === 'x') {
            board[choice3Row][choice3Col] = null;
            document.getElementById(`r${choice3Row}c${choice3Col}`).style.backgroundColor = "#ec7f03"
            document.querySelector(`#r${choice3Row}c${choice3Col}`).removeEventListener("click", selectChoice3)


        }
    }

    if (choice4Col !== undefined) {
        if (board[choice4Row][choice4Col] === 'x') {
            board[choice4Row][choice4Col] = null;
            document.getElementById(`r${choice4Row}c${choice4Col}`).style.backgroundColor = "#ec7f03"
            document.querySelector(`#r${choice4Row}c${choice4Col}`).removeEventListener("click", selectChoice4)
        }
    }
    // turn *= 1;

    render();

    // renderBoard();

}

function selectChoice3() {

    console.log("choice 3")
    parentEl.innerHTML = "";
    board[choice3Row][choice3Col] = pieceSelected;
    board[squareIdx[1]][squareIdx[3]] = null;
    
    if(turn === 1){
        console.log("red",choice3Row) 
        let compIdx = Number(squareIdx[1]) + 2;
        if(compIdx === choice3Row){
            
            board[Number(squareIdx[1]) + 1][Number(squareIdx[3]) - 1] = null;
            document.querySelector(`#r${Number(squareIdx[1]) + 1}c${Number(squareIdx[3]) - 1}`).innerHTML = "";
            player1Points+=1 

           
            renderPoints();

        }
    } else if( turn === -1){
        console.log("white",choice3Row) 

        let compIdx = Number(squareIdx[1]) - 2;
        if(compIdx === choice3Row){
            
            board[Number(squareIdx[1]) - 1][Number(squareIdx[3]) - 1] = null;
            document.querySelector(`#r${Number(squareIdx[1]) - 1}c${Number(squareIdx[3]) - 1}`).innerHTML = "";
            player2Points+=1 

           
            renderPoints();

        }
    }
    
    document.getElementById(`r${choice3Row}c${choice3Col}`).style.backgroundColor = "#ec7f03"
    if (choice1Col !== undefined) {
        if (board[choice1Row][choice1Col] === 'x') {
            board[choice1Row][choice1Col] = null;
            document.getElementById(`r${choice1Row}c${choice1Col}`).style.backgroundColor = "#ec7f03"
            document.querySelector(`#r${choice1Row}c${choice1Col}`).removeEventListener("click", selectChoice1)
        }
    }
    if (choice2Col !== undefined) {
        if (board[choice2Row][choice2Col] === 'x') {
            board[choice2Row][choice2Col] = null;
            document.getElementById(`r${choice2Row}c${choice2Col}`).style.backgroundColor = "#ec7f03"
            document.querySelector(`#r${choice2Row}c${choice2Col}`).removeEventListener("click", selectChoice2)
        }
    }
    if (choice4Col !== undefined) {
        if (board[choice4Row][choice4Col] === 'x') {
            board[choice4Row][choice4Col] = null;
            document.getElementById(`r${choice4Row}c${choice4Col}`).style.backgroundColor = "#ec7f03"
            document.querySelector(`#r${choice4Row}c${choice4Col}`).removeEventListener("click", selectChoice4)
        }
    }
    console.log(pieceSelected)
    render();
    // renderBoard();
}

function selectChoice4() {
    console.log("choice 4")
    parentEl.innerHTML = "";
    board[choice4Row][choice4Col] = pieceSelected;
    board[squareIdx[1]][squareIdx[3]] = null;
    
    if(turn === 1){
        console.log("red",choice4Row) 
        

        let compIdx = Number(squareIdx[1]) + 2;
        if(compIdx === choice4Row){
            
            board[Number(squareIdx[1]) + 1][Number(squareIdx[3]) + 1] = null;
            document.querySelector(`#r${Number(squareIdx[1]) + 1}c${Number(squareIdx[3]) + 1}`).innerHTML = "";
            player1Points+=1 

           
            renderPoints();

        }
    } else if( turn === -1){
        console.log("white",choice4Row)
       

        let compIdx = Number(squareIdx[1]) - 2;
        if(compIdx === choice4Row){
            
            board[Number(squareIdx[1]) - 1][Number(squareIdx[3]) + 1] = null;
            document.querySelector(`#r${Number(squareIdx[1]) - 1}c${Number(squareIdx[3]) + 1}`).innerHTML = "";
            player2Points+=1 

           
            renderPoints();

        }
    }
    
    document.getElementById(`r${choice4Row}c${choice4Col}`).style.backgroundColor = "#ec7f03"
    if (choice1Col !== undefined) {
        if (board[choice1Row][choice1Col] === 'x') {
            board[choice1Row][choice1Col] = null;
            document.getElementById(`r${choice1Row}c${choice1Col}`).style.backgroundColor = "#ec7f03"
            document.querySelector(`#r${choice1Row}c${choice1Col}`).removeEventListener("click", selectChoice1)


        }
    }
    if (choice2Col !== undefined) {
        if (board[choice2Row][choice2Col] === 'x') {
            board[choice2Row][choice2Col] = null;
            document.getElementById(`r${choice2Row}c${choice2Col}`).style.backgroundColor = "#ec7f03"
            document.querySelector(`#r${choice2Row}c${choice2Col}`).removeEventListener("click", selectChoice2)


        }
    }
    if (choice3Col !== undefined) {
        if (board[choice3Row][choice3Col] === 'x') {
            board[choice3Row][choice3Col] = null;
            document.getElementById(`r${choice3Row}c${choice3Col}`).style.backgroundColor = "#ec7f03"
            document.querySelector(`#r${choice3Row}c${choice3Col}`).removeEventListener("click", selectChoice3)


        }
    }
    console.log(pieceSelected)
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