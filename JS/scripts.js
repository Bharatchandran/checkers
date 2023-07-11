let board;
let turn;
let numRedPieces;
let numWhitePieces;

const squares = [...document.querySelectorAll(".board .square")];
let redPiece;
let whitePiece;
let boardPieceNum;
let idEl;
let piece_selected;

document.querySelector(".board").addEventListener('click', handleMove)

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
	console.log(piece_selected)
	// pieceSelection();
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





// function pieceSelection() {
// 	if (turn === "red") {
// 		// console.log(redPiece);
// 		redPiece.forEach((piece) => {
// 			// console.log(piece);
// 			piece.addEventListener("click", function(evt) {
// 				idEl = evt.target.parentElement.id;
// 				// console.log(idEl)
// 				// console.log(document.getElementById(idEl))
// 				idEl = String(idEl)
// 				idEl = idEl.split("")
// 				let row1Idx = Number(idEl[1])
// 				let col1Idx = Number(idEl[3])
// 				handleMove(evt)
				
// 				// console.log(idEl)
// 				// evt.target.addEventListener("click",handleMove)
// 				// console.log(evt.target)
// 			});
// 			// piece_selected =  console.log(document.getElementById(idEl),"ping 2")

// 			// piece.removeEventListener("click",handleMove);
// 		});
// 	} else if (turn === "white") {
// 		whitePiece.forEach((piece) => {
// 			// console.log(piece);
// 			piece.addEventListener("click", handleMove);
// 		});
// 	}


// }

console.log(idEl)

function handleMove(evt) {
	console.log("handleMove")
	

	
    let parentElId = evt.target.parentElement.id;
	let parentEl = evt.target.parentElement
	let squareIdx = String(parentElId);
	squareIdx = squareIdx.split("");
	let pieceSelected = board[squareIdx[1]][squareIdx[3]];
	console.log(squareIdx[1],squareIdx[3],"=====1")
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
		console.log(board[choice1Row][choice1Col])
	console.log(squareIdx[1],squareIdx[3],"=====2.1")
		
		if (board[choice1Row][choice1Col] === 'x') {
		console.log(board[choice1Row][choice1Col])
	console.log(squareIdx[1],squareIdx[3],"=====2.2")
		
		document.querySelector(`#r${choice1Row}c${choice1Col}`).addEventListener('click',(evt) => {
			console.log(evt.target.id)
			console.log("choice1")
			
				console.log(board);
				parentEl.innerHTML =  "";
				board[choice1Row][choice1Col] = pieceSelected;
				board[squareIdx[1]][squareIdx[3]] = null;
				document.getElementById(`r${choice1Row}c${choice1Col}`).style.backgroundColor = "#ec7f03"
				if (choice2Col !== undefined ){
					console.log(board)

					board[choice2Row][choice2Col] = null;
					document.getElementById(`r${choice2Row}c${choice2Col}`).style.backgroundColor = "#ec7f03"
				}
				render();
		
			})
			
			
			
		} else return;
	
	}

	if (choice2Col !== undefined){
		console.log(board[choice2Row][choice2Col])
		console.log(squareIdx[1],squareIdx[3],"=====3.1")

		if (board[choice2Row][choice2Col] === 'x') {
		console.log(squareIdx[1],squareIdx[3],"=====3.2")

			console.log(board[choice2Row][choice2Col])
		console.log(choice2Row, choice2Col)
		document.querySelector(`#r${choice2Row}c${choice2Col}`).addEventListener('click', (evt) => {
			console.log("choice2")
			console.log(parentElId)

			
				console.log(board)
				
				parentEl.innerHTML =  "";
				board[choice2Row][choice2Col] = pieceSelected;
				board[squareIdx[1]][squareIdx[3]] = null;
	
				document.getElementById(`r${choice2Row}c${choice2Col}`).style.backgroundColor = "#ec7f03"
				if (choice1Col !== undefined){
					console.log(board)

					board[choice1Row][choice1Col] = null;
					document.getElementById(`r${choice1Row}c${choice1Col}`).style.backgroundColor = "#ec7f03"
				}
				render();
		}) 
	} else return ;
	
	}



}


