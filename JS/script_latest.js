// constants
let board;
let turn;
let numRedPieces;
let numWhitePieces;
let redPiece;
let whitePiece;
let boardPieceNum;
let colIdx;
let rowIdx;
let parentEl;
let squareIdx;

// cahed
const boardEl = document.querySelector('.board')

// event listener
boardEl.addEventListener('click', handleMove)
// functions
init();
function init() {
    board = [
        [0, null, 1, null, 2, null, 3, null],
        [null, 4, null, 5, null, 6,null, 7],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [8, null, 9, null, 10, null,11, null],
        [null, 12, null, 13, null, 14, null, 15]
    ];
	
	render();
}

function render() {
    
	renderBoard();
	turn = "red";
    
	// pieceSelection();
}

function renderBoard() {
    board.forEach((rowArr,rowIdx) => {
		rowArr.forEach(( square ,colIdx) => {
			const cellId = `r${rowIdx}c${colIdx}`
			const cellPiece = document.getElementById(cellId);
			if (square <= 7 && square !== null) {
				cellPiece.innerHTML = `<div class="piece white"></div>`;
			} else if (square > 7 && square !== null) {
				cellPiece.innerHTML = `<div class="piece red"></div>`;
			} else if (square === 'x' && square !== null  ){
				cellPiece.style.backgroundColor = 'green';

			}
		})
	});
}


function handleMove(evt) {
    if ( turn =='red'){
        if(evt.target.id === 'red'){
            parentEl = evt.target.parentElement.id;
            squareIdx = String(parentElId);
            squareIdx = squareIdx.split("");
        }
    }
}