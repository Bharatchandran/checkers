

let board;
let turn;
let numRedPieces;
let numWhitePieces;


const squares = document.querySelectorAll('.board .square')
let redPiece = document.querySelectorAll('.red');
let whitePiece = document.querySelectorAll('.white');
const hed = document.querySelector('header')
// hed.addEventListener('click',function()=>{
//     console.log("hello")
// })

// squares.addEventListener('click')

init();

function init() {
    board = [
        null, 0, null, 1, null, 2, null, 3,
        4, null, 5, null, 6, null,7, null,
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
        null, null, null, null, null, null, null, null,
        8, null, 9, null, 10, null,11, null,
        null, 12, null, 13, null, 14, null, 15
    ];
    render();
}

function render() {
    renderBoard();
    turn = 'red';
    pieceSelection();
}

function renderBoard() {
    board.forEach((square, idx) => {
        const squareEl = document.getElementById(`el${idx}`)
        if(square <= 7 && square !== null){
            squareEl.innerHTML = `<div class="piece white"></div>`
        } else if (square > 7 && square !== null){
            squareEl.innerHTML = `<div class="piece red"></div>`
        }
    });

}

function  pieceSelection() {
    if(turn === 'red') {
        console.log(redPiece)
        redPiece.forEach(piece => {
            console.log(piece)
            piece.addEventListener('click', handleMove);

        });
    } else if(turn === 'white') {
        whitePiece.forEach(piece => {
            console.log(piece)
            piece.addEventListener('click', handleMove);
        });
    }

   
}

function handleMove () {
    console.log("hello")
}