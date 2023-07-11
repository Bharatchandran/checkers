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
let selectedPieceIdx;



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
    render();
}

function render() {
    
    
    renderBoard();
    

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
    pieceSelection();
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

function checkIfCanMOve(i, j) {
    let moveLeftDiag;
    let moveRightDiag;
    if (board[i][j] > 7 && board[i][j] !== null) {

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

            } else {


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

            } else {
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
            } else {
                moveLeftDiag = false;
            }
            if (board[i - 1][j + 1] === null) {
                moveRightDiag = true;
            } else {
                moveRightDiag = false
            }
            return {
                'moveLeftDiag': moveLeftDiag,
                'moveRightDiag': moveRightDiag,
                idx: `r${i}c${j}`
            }
        }
    } else if (board[i][j] <=7 && board[i][j] !== null) {
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
            } else {
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

            } else {
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
            } else {
                moveLeftDiag = false;
            }
            if (board[i + 1][j + 1] === null) {
                moveRightDiag = true;
            } else {
                moveRightDiag = false
            }
            return {
                'moveLeftDiag': moveLeftDiag,
                'moveRightDiag': moveRightDiag,
                idx: `r${i}c${j}`
            }
        }
    }


}

function pieceSelection() {

   
        selectedPieceIdx = getPieceIdx();
        selectedPieceIdx.forEach((el) => {
            el = el.split("")
            let row = Number(el[1]);
            let col = Number(el[3])

            let checkMove = checkIfCanMOve(row, col);
            
            if (checkMove.moveLeftDiag === true || checkMove.moveRightDiag === true) {
                document.querySelector(`#r${el[1]}c${el[3]} > div`).addEventListener("click", handleMove)
            }
        })
        
  
}

function handleMove(evt) {
    console.log("ping");
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
    render()


}

function assignChoices() {
    if (turn === -1){
    if (squareIdx[1] > 0 && squareIdx[3] > 0) {
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
    if (squareIdx[3] < 7 && squareIdx[1] > 0) {
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
} else if (turn === 1) {
    if (squareIdx[1] < 7 && squareIdx[3] > 0) {
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
    if (squareIdx[1] < 7 && squareIdx[3] < 7  ) {
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
    document.getElementById(`r${choice1Row}c${choice1Col}`).style.backgroundColor = "#ec7f03"
    if (choice2Col !== undefined) {
        if (board[choice2Row][choice2Col] === 'x') {
            board[choice2Row][choice2Col] = null;
            document.getElementById(`r${choice2Row}c${choice2Col}`).style.backgroundColor = "#ec7f03"
            document.querySelector(`#r${choice2Row}c${choice2Col}`).removeEventListener("click", selectChoice2)


        }
    }
    renderBoard();

}

function selectChoice2() {




    parentEl.innerHTML = "";
    board[choice2Row][choice2Col] = pieceSelected;
    board[squareIdx[1]][squareIdx[3]] = null;

    document.getElementById(`r${choice2Row}c${choice2Col}`).style.backgroundColor = "#ec7f03"
    if (choice1Col !== undefined) {

        if (board[choice1Row][choice1Col] === 'x') {
            board[choice1Row][choice1Col] = null;
            document.getElementById(`r${choice1Row}c${choice1Col}`).style.backgroundColor = "#ec7f03"

            document.querySelector(`#r${choice1Row}c${choice1Col}`).removeEventListener('click', selectChoice1)

        }

    }
    renderBoard();

}


function removePieceEventListener() {

    selectedPieceIdx = getPieceIdx()
    selectedPieceIdx.forEach((el) => {
        el = el.split("")
       
        document.querySelector(`#r${el[1]}c${el[3]} > div`).removeEventListener("click", handleMove)

    })
}