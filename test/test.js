let board;
let turn;
let numRedPieces;
let numWhitePieces;

const squares = document.querySelectorAll(".board .square");
let redPiece = document.querySelectorAll(".red");
let whitePiece = document.querySelectorAll(".white");
const hed = document.querySelector("header");
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
	turn = "red";
	pieceSelection();
}

function renderBoard() {
	board.forEach((square, idx) => {
		const redEl = document.getElementById(`l${idx}`);
        const whiteEl = document.getElementById(`d${idx}`)
        console.log(redEl.)
        redEl.innerHTML = `<div class="piece red">`
        whiteEl.innerHTML = `<div class="piece white">`
        console.log(redEl)
        console.log(whiteEl)
		// if (square <= 7 && square !== null) {
		// 	whiteEl.innerHTML = `<div class="piece white"></div>`;
		// } else if (square > 7 && square !== null) {
		// 	redEl.innerHTML = `<div class="piece red"></div>`;
		// }
	});
	whitePiece = document.querySelectorAll(".white");
	redPiece = document.querySelectorAll(".red");
}

function pieceSelection() {
	if (turn === "red") {
		console.log(redPiece);
		redPiece.forEach((piece) => {
			console.log(piece);
			piece.addEventListener("click", handleMove);
		});
	} else if (turn === "white") {
		whitePiece.forEach((piece) => {
			console.log(piece);
			piece.addEventListener("click", handleMove);
		});
	}
}


function handleMove(evt) {
    
    let parentElId = evt.target.parentElement.id;
    console.log(parentElId);
    if (parentElId === 'el63'){
        evt.target.style.border = "2px solid black"
        // console.log("Hello");
        // evt.target.classList.remove('red');
    }
}


