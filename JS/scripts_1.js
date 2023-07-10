let board;
let turn;
let numRedPieces;
let numWhitePieces;

const squares = [...document.querySelectorAll(".board .square")];
let redPiece;
let whitePiece;
let boardPieceNum;
const hed = document.querySelector("header");
// hed.addEventListener('click',function()=>{
//     console.log("hello")
// })

// squares.addEventListener('click')
document.querySelector("button").addEventListener("click",init)
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
	pieceSelection();
}


function renderBoard() {
	board.forEach((rowArr,rowIdx) => {
		rowArr.forEach(( square ,colIdx) => {
			const cellId = `r${rowIdx}c${colIdx}`
			const cellPiece = document.getElementById(cellId);
			// console.log(cellPiece)
			if (square <= 7 && square !== null) {
				cellPiece.innerHTML = `<div class="piece white"></div>`;
			} else if (square > 7 && square !== null) {
				cellPiece.innerHTML = `<div class="piece red"></div>`;
			} else if (square === 'x' && square !== null  ){
				cellPiece.style.backgroundColor = 'green';

			}
		})
	});
	redPiece = document.querySelectorAll(".red");
	whitePiece = document.querySelectorAll(".white");
}






function pieceSelection() {
	if (turn === "red") {
		// console.log(redPiece);
		redPiece.forEach((piece) => {
			// console.log(piece);
			piece.addEventListener("click", handleMove);
		});
	} else if (turn === "white") {
		whitePiece.forEach((piece) => {
			// console.log(piece);
			piece.addEventListener("click", handleMove);
		});
	}
}

function handleMove(evt) {
	
    let parentElId = evt.target.parentElement.id;
	let parentEl = evt.target.parentElement
	let squareIdx = String(parentElId);
	squareIdx = squareIdx.split("");
	let pieceSelected = board[squareIdx[1]][squareIdx[3]];
	// console.log(board[squareIdx[1]][squareIdx[3]],"ping1")

	let choice1Row;
	let choice1Col;  
	let choice2Row;
	let choice2Col;

	if (squareIdx[1] > 0 &&  squareIdx[3] > 0 ) {
		choice1Row = Number(squareIdx[1]) - 1;
	    choice1Col = Number(squareIdx[3]) - 1;
		if (board[choice1Row][choice1Col] === null  ){
			board[choice1Row][choice1Col] = 'x';
			
		} else if (board[choice1Row][choice1Col] !== null && board[choice1Row][choice1Col] <= 7 && squareIdx[3] > 1 && squareIdx[1] > 1) {
			choice1Row = Number(squareIdx[1]) - 2;
			choice1Col = Number(squareIdx[3]) - 2;
			if (board[choice1Row][choice1Col] === null) {
				board[choice1Row][choice1Col] = 'x';
			} 
	
		}
	}
	if(squareIdx[3] < 7 && squareIdx[1] > 0) {
		choice2Row = Number(squareIdx[1]) - 1;
		choice2Col = Number(squareIdx[3]) + 1;
		if (choice2Col !== undefined){
			if (board[choice2Row][choice2Col] === null ){
				board[choice2Row][choice2Col] = 'x';	
					
			} else if (board[choice2Row][choice2Col] !== null && board[choice2Row][choice2Col] < 7  && squareIdx[3] < 6 && squareIdx[1] > 1) {
				choice2Row = Number(squareIdx[1]) - 2;
				choice2Col = Number(squareIdx[3]) + 2;
				if (board[choice2Row][choice2Col] === null) {
					board[choice2Row][choice2Col] = 'x';
				} 
			}		 		
		}
	}
	renderBoard();
	if (choice1Col !== undefined){		
		
		document.querySelector(`#r${choice1Row}c${choice1Col}`).addEventListener('click',(evt) => {
			console.log(evt.target.id)
			if (board[choice1Row][choice1Col] === 'x') {
				parentEl.innerHTML =  "";
				board[choice1Row][choice1Col] = pieceSelected;
				board[squareIdx[1]][squareIdx[3]] = null;
				document.getElementById(`r${choice1Row}c${choice1Col}`).style.backgroundColor = "#ec7f03"
				if (choice2Col !== undefined ){
					board[choice2Row][choice2Col] = null;
					document.getElementById(`r${choice2Row}c${choice2Col}`).style.backgroundColor = "#ec7f03"
				}
		
				render();
			} else return;
			
			
			
		})	
	
	}

	if (choice2Col !== undefined){
		
		document.querySelector(`#r${choice2Row}c${choice2Col}`).addEventListener('click', (evt) => {
			if (board[choice2Row][choice2Col] === 'x') {
				parentEl.innerHTML =  "";
				board[choice2Row][choice2Col] = pieceSelected;
				board[squareIdx[1]][squareIdx[3]] = null;
	
				document.getElementById(`r${choice2Row}c${choice2Col}`).style.backgroundColor = "#ec7f03"
				if (choice1Col !== undefined){
					board[choice1Row][choice1Col] = null;
					document.getElementById(`r${choice1Row}c${choice1Col}`).style.backgroundColor = "#ec7f03"
				}
				render();
		} else return ;
	} )	
	
	}



}


