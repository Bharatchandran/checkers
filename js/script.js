
// Variables

let board;
let turn;
let numRedPieces;
let numWhitePieces;
let boardPieceNum;
let parentElId;
let squareIdx;
// 4 choices are the direction the checker coin can move 
// choice 1 - Left Forward, choice 2 - Right Forward, choice 3 - Left Backward, choice 4 - Right Backward
let choice1Row;
let choice1Col;
let choice2Row;
let choice2Col;
let choice3Row;
let choice3Col;
let choice4Row;
let choice4Col;
let parentEl; //the square which holds the selected coin
let winner;
let selectedEl; // the selected coin
let kingClassArr; // token number which becomes the king
let selectedPieceIdx; // array which holds current players coins index
let player1Points;
let player2Points;
let time;
let moveLeftDiag;
let moveRightDiag;
let moveLeftDiagBackward;
let moveRightDiagBackward;

// Cached Elements

const squares = document.querySelectorAll(".board .square");
const resetBtn = document.querySelector("button");
const winnerText = document.querySelector(".player-won");
const turnText = document.querySelector(".turn");
const timeText = document.querySelector(".time");

// EventListener
document.querySelector("button").addEventListener('click', init)

// Functions
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
    winner = null;
    kingClassArr = [null];
    turn = -1;
    initialRemove()
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
    if (player1Points === 8) {
        winMsg.innerHTML = "PLAYER 1 WON !!"
        winMsg.style.color = "red"
        winner = 1;
        turnText.innerHTML = "";
        timeText.classList.add("time-won")
        clearInterval(time);
    } else if (player2Points === 8) {
        winMsg.innerHTML = "PLAYER 2 WON !!"
        winMsg.style.color = "white"
        winner = 1;
        turnText.innerHTML = "";
        timeText.classList.add("time-won")
        clearInterval(time);
    }
}

// After winning bringing removing the changes made which was not there in the initial game
function initialRemove() {
    winnerText.innerHTML = "";
    turnText.innerHTML = `<span >Turn: <span class="turn-color">Red</span> </span>`;
    timeText.classList.remove("time-won")
    timeText.innerHTML = `Time - <span class="display-time">0 : 0</span>`
    document.querySelector(".player1-point").innerText = `0`
    document.querySelector(".player2-point").innerText = `0`
}

function addKingClass() {
    board.forEach((rowArr, rowIdx) => {
        rowArr.forEach((square, colIdx) => {
            const cellId = `r${rowIdx}c${colIdx}`
            const cellPiece = document.getElementById(cellId);
            if (kingClassArr.indexOf(square) >= 0) {
                if (square <= 7 && square != null) {
                    cellPiece.innerHTML = `<div class="piece white king ">K</div>`;
                } else if (square > 7 && square !== null) {
                    cellPiece.innerHTML = `<div class="piece red king">K</div>`;
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
            if (square <= 7 && square !== null) {
                cellPiece.innerHTML = `<div class="piece white "></div>`;
            } else if (square > 7 && square !== null) {
                cellPiece.innerHTML = `<div class="piece red "></div>`;
            } else if (square === 'x' && square !== null) {
                cellPiece.style.backgroundColor = '#f58549';
            } else if (square === null && cellPiece.classList.contains("dark")) {
                cellPiece.innerHTML = "";
                cellPiece.style.backgroundColor = '#0b132b';
            }
            if (square === null && cellPiece.classList.contains("light")) {
                cellPiece.style.backgroundColor = '#1c7293';
            }
            if (square !== null && square !== 'x' && cellPiece.classList.contains("dark")) {
                cellPiece.style.backgroundColor = '#0b132b';
            }
        })
    });
    addKingClass()
}

function getPieceIdx() {
    let wholeBoard;
    if (turn === -1) {
        wholeBoard = document.querySelectorAll(".board > div > div.red");
    } else if (turn === 1) {
        wholeBoard = document.querySelectorAll(".board > div > div.white");
    }
    let pieceIdx = [];
    wholeBoard.forEach((el) => {
        let elIdx = el.parentElement.id
        pieceIdx.push(elIdx)
    })
    return pieceIdx
}

function checkMoveRed(i, j) {
    if (i === 0) {
        moveLeftDiag = false;
        moveRightDiag = false;
    } else if (j === 0) {
        if (board[i - 1][j + 1] === null) {
            moveLeftDiag = false;
            moveRightDiag = true;
        }
        else if (j < 6 && board[i - 1][j + 1] <= 7 && board[i - 2][j + 2] === null) {
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
        } else if (j > 1 && i > 1 && board[i - 1][j - 1] <= 7 && board[i - 2][j - 2] === null) {
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
        } else if (j > 1 && i > 1 && board[i - 1][j - 1] <= 7 && board[i - 2][j - 2] === null) {
            moveLeftDiag = true;
        } else {
            moveLeftDiag = false;
        }

        if (board[i - 1][j + 1] === null) {
            moveRightDiag = true;
        }else if (j < 6 && i > 1 && board[i - 1][j + 1] <= 7 && board[i - 2][j + 2] === null) {
            moveRightDiag = true;
        }else {
            moveRightDiag = false
        }
    }
    return {
        'moveLeftDiag': moveLeftDiag,
        'moveRightDiag': moveRightDiag,
        idx: `r${i}c${j}`
    }
}

function CheckMoveWhite(i, j) {
    if (i === 7) {
        moveLeftDiag = false;
        moveRightDiag = false;

    } else if (j === 0) {
        if (board[i + 1][j + 1] === null) {
            moveLeftDiag = false;
            moveRightDiag = true;

        } else if (i < 6 && board[i + 1][j + 1] > 7 && board[i + 2][j + 2] === null) {
            moveLeftDiag = false;
            moveRightDiag = true;

        } else {
            moveLeftDiag = false;
            moveRightDiag = false;

        }
    } else if (j >= 7) {
        if (board[i + 1][j - 1] === null) {
            moveLeftDiag = true;
            moveRightDiag = false;


        } else if (j > 1 && i < 6 && board[i + 1][j - 1] > 7 && board[i + 2][j - 2] === null) {
            moveLeftDiag = true;
            moveRightDiag = false;

        } else {
            moveLeftDiag = false;
            moveRightDiag = false;

        }
    } else {
        if (board[i + 1][j - 1] === null) {
            moveLeftDiag = true;
        } else if (j > 1 && i < 6 && board[i + 1][j - 1] >= 7 && board[i + 2][j - 2] === null) {
            moveLeftDiag = true;
        } else {
            moveLeftDiag = false;
        }
        if (board[i + 1][j + 1] === null) {
            moveRightDiag = true;
        }  else if (j < 6 && i < 6 && board[i + 1][j + 1] > 7 && board[i + 2][j + 2] === null) {
            moveRightDiag = true;
        } else {
            moveRightDiag = false
        }
    }
    return {
        'moveLeftDiag': moveLeftDiag,
        'moveRightDiag': moveRightDiag,
        idx: `r${i}c${j}`
    }
}

function checkMoveRedBackward(i, j) {
    if (i === 7) {
        moveLeftDiagBackward = false;
        moveRightDiagBackward = false;
    } else if (j === 0) {
        if (board[i + 1][j + 1] === null) {
            moveLeftDiagBackward = false;
            moveRightDiagBackward = true;
        } else if (i < 6 && board[i + 1][j + 1] <= 7 && board[i + 2][j + 2] === null) {
            moveLeftDiagBackward = false;
            moveRightDiagBackward = true;
        }  else {
            moveLeftDiagBackward = false;
            moveRightDiagBackward = false;
        }
    } else if (j === 7) {
        if (board[i + 1][j - 1] === null) {
            moveLeftDiagBackward = true;
            moveRightDiagBackward = false;
        } else if (i < 6 && board[i + 1][j - 1] <= 7 && board[i + 2][j - 2] === null) {
            moveLeftDiagBackward = true;
            moveRightDiagBackward = false;
        } else {
            moveLeftDiagBackward = false;
            moveRightDiagBackward = false;
        }
    } else {
        if (board[i + 1][j + 1] === null) {
            moveRightDiagBackward = true;

        } else if (j < 6 && i < 6 && board[i + 1][j + 1] <= 7 && board[i + 2][j + 2] === null) {
            moveRightDiagBackward = true;
        } else {
            moveRightDiagBackward = false;
        }
        if (board[i + 1][j - 1] === null) {
            moveLeftDiagBackward = true;
        } else if (j > 1 && i < 6 && board[i + 1][j - 1] <= 7 && board[i + 2][j - 2] === null) {
            moveLeftDiagBackward = true;
        } else {
            moveLeftDiagBackward = false;
        }
    }
    return {
        'moveLeftDiagBackward': moveLeftDiagBackward,
        'moveRightDiagBackward': moveRightDiagBackward,
        idx: `r${i}c${j}`
    }
}

function checkMoveWhiteBackWard(i, j) {
    if (i === 0) {
        moveLeftDiagBackward = false;
        moveRightDiagBackward = false;
    } else if (j === 0) {
        if (board[i - 1][j + 1] === null) {
            moveLeftDiagBackward = false;
            moveRightDiagBackward = true;
        } else if (i > 1 && board[i - 1][j + 1] <= 7 && board[i - 2][j + 2] === null) {
            moveLeftDiagBackward = false;
            moveRightDiagBackward = true;
        } else {
            moveLeftDiagBackward = false;
            moveRightDiagBackward = false;
        }
    } else if (j === 7) {
        if (board[i - 1][j - 1] === null) {
            moveLeftDiagBackward = true;
            moveRightDiagBackward = false;
        } else if (i > 1 && board[i - 1][j - 1] > 7 && board[i - 2][j - 2] === null) {
            moveLeftDiagBackward = true;
            moveRightDiagBackward = false;
        } else {
            moveLeftDiagBackward = false;
            moveRightDiagBackward = false;
        }
    } else {
        if (board[i - 1][j + 1] === null) {
            moveRightDiagBackward = true;

        } else if (j < 6 && i > 1 && board[i - 1][j + 1] > 7 && board[i - 2][j + 2] === null) {
            moveRightDiagBackward = true;
        } else {
            moveRightDiagBackward = false;
        }
        if (board[i - 1][j - 1] === null) {
            moveLeftDiagBackward = true;
        } else if (j > 1 && i > 1 && board[i - 1][j - 1] > 7 && board[i - 2][j - 2] === null) {
            moveLeftDiagBackward = true;
        } else {
            moveLeftDiagBackward = false;
        }
    }
    return {
        'moveLeftDiagBackward': moveLeftDiagBackward,
        'moveRightDiagBackward': moveRightDiagBackward,
        idx: `r${i}c${j}`
    }
}

function checkIfCanMOve(i, j) {

    if (board[i][j] > 7 && board[i][j] !== null) {
        let returnMoveRed = checkMoveRed(i, j);
        let returnMoveRedBackward = checkMoveRedBackward(i, j)
        Object.assign(returnMoveRed, returnMoveRedBackward);
        return returnMoveRed;
    } else if (board[i][j] <= 7 && board[i][j] !== null) {
        let returnMoveWhite = CheckMoveWhite(i, j);
        let returnMoveWhiteBackward = checkMoveWhiteBackWard(i, j)
        Object.assign(returnMoveWhite, returnMoveWhiteBackward);
        return returnMoveWhite;
    }
}

// Adding event listeners depending on whose turn it is and their ability to move
function pieceSelection() {
    selectedPieceIdx = getPieceIdx();
    selectedPieceIdx.forEach((el) => {
        el = el.split("")
        let row = Number(el[1]);
        let col = Number(el[3])
        let checkMove = checkIfCanMOve(row, col);
        if (!document.querySelector(`#r${el[1]}c${el[3]} > div`).classList.contains('king')) {
            if (checkMove.moveLeftDiag === true || checkMove.moveRightDiag === true) {
                document.querySelector(`#r${el[1]}c${el[3]} > div`).addEventListener("click", handleMove)
            }
        } else if (document.querySelector(`#r${el[1]}c${el[3]} > div`).classList.contains('king')) {
            if (checkMove.moveLeftDiag === true || checkMove.moveRightDiag === true || checkMove.moveLeftDiagBackward || checkMove.moveRightDiagBackward) {
                document.querySelector(`#r${el[1]}c${el[3]} > div`).addEventListener("click", handleMove)
            }
        }
    })
}

function handleMove(evt) {
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
}

function moveDiagonalLeftForwardRed() {
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

function moveDiagonalRightForwardRed() {
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

function moveDiagonalLeftForwardWhite() {
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

function moveDiagonalRightForwardWhite() {
    choice2Row = Number(squareIdx[1]) + 1;
    choice2Col = Number(squareIdx[3]) + 1;
    if (choice2Col !== undefined) {
        if (board[choice2Row][choice2Col] === null) {
            board[choice2Row][choice2Col] = 'x';
        } else if (board[choice2Row][choice2Col] !== null && board[choice2Row][choice2Col] > 7 && squareIdx[3] < 6 && squareIdx[1] < 6) {
            choice2Row = Number(squareIdx[1]) + 2;
            choice2Col = Number(squareIdx[3]) + 2;
            if (board[choice2Row][choice2Col] === null) {
                board[choice2Row][choice2Col] = 'x';
            }
        }
    }
}

function moveDiagonalLeftBackwardRed() {
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

function moveDiagonalRightBackwardRed() {
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
        } else if (board[choice4Row][choice4Col] !== null && board[choice4Row][choice4Col] > 7 && squareIdx[3] < 6 && squareIdx[1] > 1) {
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
        if (!selectedEl.classList.contains("king")) {
            if (Number(squareIdx[1]) > 0 && Number(squareIdx[3]) > 0) {
                moveDiagonalLeftForwardRed();
            }
            if (Number(squareIdx[3]) < 7 && Number(squareIdx[1]) > 0) {
                moveDiagonalRightForwardRed();
            }
        } else if (selectedEl.classList.contains("king")) {
            if (Number(squareIdx[1]) === 0 && Number(squareIdx[3] > 0)) {
                moveDiagonalLeftBackwardRed();
            } else if (Number(squareIdx[1]) > 0 && Number(squareIdx[1]) < 7 && Number(squareIdx[3]) > 0) {
                moveDiagonalLeftBackwardRed();
                moveDiagonalLeftForwardRed();
            } else if (Number(squareIdx[1]) > 0 && Number(squareIdx[1]) === 7 && Number(squareIdx[3]) > 0) {
                moveDiagonalLeftForwardRed();
            }
            if (Number(squareIdx[1]) === 0 && Number(squareIdx[3]) < 7) {
                moveDiagonalRightBackwardRed();
            } else if (Number(squareIdx[1]) > 0 && Number(squareIdx[1]) < 7 && Number(squareIdx[3]) < 7) {
                moveDiagonalRightBackwardRed();
                moveDiagonalRightForwardRed();
            } else if (Number(squareIdx[1]) > 0 && Number(squareIdx[1]) === 7 && Number(squareIdx[3]) < 7) {
                moveDiagonalRightForwardRed();
            }
        }
    } else if (turn === 1) {
        if (!selectedEl.classList.contains("king")) {
            if (Number(squareIdx[1]) < 7 && squareIdx[3] > 0) {
                moveDiagonalLeftForwardWhite();
            }
            if (Number(squareIdx[1]) < 7 && squareIdx[3] < 7) {
                moveDiagonalRightForwardWhite();
            }
        } else if (selectedEl.classList.contains("king")) {
            if (Number(squareIdx[1]) === 7 && Number(squareIdx[3]) > 0) {
                moveDiagonalLeftBackwardWhite();
            } else if (Number(squareIdx[1]) < 7 && Number(squareIdx[1]) > 0 && squareIdx[3] > 0) {
                moveDiagonalLeftBackwardWhite();
                moveDiagonalLeftForwardWhite();
            } else if (Number(squareIdx[1]) < 7 && Number(squareIdx[1]) === 0 && squareIdx[3] > 0) {
                moveDiagonalLeftForwardWhite();
            }
            if (Number(squareIdx[1]) === 7 && squareIdx[3] < 7) {
                moveDiagonalRightBackwardWhite();
            } else if (Number(squareIdx[1]) < 7 && Number(squareIdx[1]) > 0 && squareIdx[3] < 7) {
                moveDiagonalRightBackwardWhite();
                moveDiagonalRightForwardWhite();
            } else if (Number(squareIdx[1]) < 7 && Number(squareIdx[1]) === 0 && squareIdx[3] < 7) {
                moveDiagonalRightForwardWhite();
            }

        }
    }
    renderBoard();
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
    if (choice3Col !== undefined) {
        if (board[choice3Row][choice3Col] === 'x') {

            document.querySelector(`#r${choice3Row}c${choice3Col}`).addEventListener('click', selectChoice3, { once: true })
        }
    }
    if (choice4Col !== undefined) {
        if (board[choice4Row][choice4Col] === 'x') {
            document.querySelector(`#r${choice4Row}c${choice4Col}`).addEventListener('click', selectChoice4, { once: true })
        }
    }
}

function selectChoice1() {
    parentEl.innerHTML = "";
    board[choice1Row][choice1Col] = pieceSelected;
    board[squareIdx[1]][squareIdx[3]] = null;
    if (turn === 1) {
        if (choice1Row === 0) {
            kingClassArr.push(pieceSelected);
        }
        let compIdx = Number(squareIdx[1]) - 2;
        if (compIdx === choice1Row) {
            board[squareIdx[1] - 1][squareIdx[3] - 1] = null;
            document.querySelector(`#r${squareIdx[1] - 1}c${squareIdx[3] - 1}`).innerHTML = "";
            player1Points += 1
            renderPoints();
        }
    } else if (turn === -1) {
        if (choice1Row === 7) {
            kingClassArr.push(pieceSelected);
        }
        let compIdx = Number(squareIdx[1]) + 2;
        if (compIdx === choice1Row) {
            board[Number(squareIdx[1]) + 1][Number(squareIdx[3]) - 1] = null;
            document.querySelector(`#r${Number(squareIdx[1]) + 1}c${Number(squareIdx[3]) - 1}`).innerHTML = "";
            player2Points += 1
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
    render();
}

function selectChoice2() {
    parentEl.innerHTML = "";
    board[choice2Row][choice2Col] = pieceSelected;
    board[squareIdx[1]][squareIdx[3]] = null;
    if (turn === -1) {
        if (choice2Row === 7) {
            kingClassArr.push(pieceSelected);
        }
        let compIdx = Number(squareIdx[1]) + 2;
        if (compIdx === choice2Row) {
            board[Number(squareIdx[1]) + 1][Number(squareIdx[3]) + 1] = null;
            document.querySelector(`#r${Number(squareIdx[1]) + 1}c${Number(squareIdx[3]) + 1}`).innerHTML = "";
            player2Points += 1;
            renderPoints();
        }
    } else if (turn === 1) {
        if (choice2Row === 0) {
            kingClassArr.push(pieceSelected);
        }
        let compIdx = Number(squareIdx[1]) - 2;
        if (compIdx === choice2Row) {
            board[Number(squareIdx[1]) - 1][Number(squareIdx[3]) + 1] = null;
            document.querySelector(`#r${Number(squareIdx[1]) - 1}c${Number(squareIdx[3]) + 1}`).innerHTML = "";
            player1Points += 1;
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

    render();
}

function selectChoice3() {
    parentEl.innerHTML = "";
    board[choice3Row][choice3Col] = pieceSelected;
    board[squareIdx[1]][squareIdx[3]] = null;
    if (turn === 1) {
        let compIdx = Number(squareIdx[1]) + 2;
        if (compIdx === choice3Row) {
            board[Number(squareIdx[1]) + 1][Number(squareIdx[3]) - 1] = null;
            document.querySelector(`#r${Number(squareIdx[1]) + 1}c${Number(squareIdx[3]) - 1}`).innerHTML = "";
            player1Points += 1
            renderPoints();
        }
    } else if (turn === -1) {
        let compIdx = Number(squareIdx[1]) - 2;
        if (compIdx === choice3Row) {
            board[Number(squareIdx[1]) - 1][Number(squareIdx[3]) - 1] = null;
            document.querySelector(`#r${Number(squareIdx[1]) - 1}c${Number(squareIdx[3]) - 1}`).innerHTML = "";
            player2Points += 1
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
    render();
}

function selectChoice4() {
    parentEl.innerHTML = "";
    board[choice4Row][choice4Col] = pieceSelected;
    board[squareIdx[1]][squareIdx[3]] = null;
    if (turn === 1) {
        let compIdx = Number(squareIdx[1]) + 2;
        if (compIdx === choice4Row) {
            board[Number(squareIdx[1]) + 1][Number(squareIdx[3]) + 1] = null;
            document.querySelector(`#r${Number(squareIdx[1]) + 1}c${Number(squareIdx[3]) + 1}`).innerHTML = "";
            player1Points += 1
            renderPoints();
        }
    } else if (turn === -1) {
        let compIdx = Number(squareIdx[1]) - 2;
        if (compIdx === choice4Row) {
            board[Number(squareIdx[1]) - 1][Number(squareIdx[3]) + 1] = null;
            document.querySelector(`#r${Number(squareIdx[1]) - 1}c${Number(squareIdx[3]) + 1}`).innerHTML = "";
            player2Points += 1
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
    render();
}

//removing event listener for handlemove for array of specific coins
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

function renderTurnText() {
    let turnMsg = document.querySelector(".turn-color")
    if (turn === -1) {
        turnMsg.innerText = "Red";
        turnMsg.style.color = "red";
    } else if (turn === 1) {
        turnMsg.innerText = "White";
        turnMsg.style.color = "white";
    }
}

function renderTime() {
    let displayTime = document.querySelector(".display-time");
    let second = 0;
    let minute = 0;
    time = setInterval(() => {
        if (second === 60) {
            minute += 1;
            second = 0
        }
        displayTime.innerText = `${minute} : ${second}`;
        second += 1;
    }, 1000)
}

