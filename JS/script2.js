let board;
let turn;
let numRedPieces;
let numWhitePieces;

const squares = document.querySelectorAll(".board .square");
let redPiece;
let whitePiece;
let boardPieceNum;



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
    pieceSelection();
}

function getRedIdx () {
    let wholeBoard = document.querySelectorAll(".board > div > div.red");
    let redPieceIdx =[];
    wholeBoard.forEach(el => {
            let elIdx = el.parentElement.id
            
            redPieceIdx.push(elIdx)
            // console.log(redPieceIdx)
        })
    // console.log(redPieceIdx)
    return redPieceIdx
}


function checkIfCanMOve (i, j) {
    let moveLeftDiag;
    let moveRightDiag;
    // console.log(board)
    
            if(board[i][j] > 7 && board[i][j] !== null ) {
    
                if(i === 0){
                    moveLeftDiag = false;
                    moveRightDiag = false;
                    return {
                        "moveLeftDiag" : moveLeftDiag,
                        "moveRightDiag" : moveRightDiag,
                        idx : `r${i}c${j}`
                        
                    }
                } else if (j === 0) {
                    console.log(board);
                    console.log(board[i - 1][j + 1])
                    if (board[i - 1][j + 1] === null ){
                    console.log("Hello")

                        moveLeftDiag = false;
                        moveRightDiag = true;
                        return{
                            "moveLeftDiag" : moveLeftDiag,
                            "moveRightDiag" : moveRightDiag,
                            idx : `r${i}c${j}`
                        }
                        
                    } else {
                    console.log("Hello")
                    console.log(board[i - 1][j + 1])


                        moveLeftDiag = false;
                        moveRightDiag = false;
                        return{
                            "moveLeftDiag" : moveLeftDiag,
                            "moveRightDiag" : moveRightDiag,
                            idx : `r${i}c${j}`
                        }
                    
                    }
                } else if (j >= 7 ) {
                    if(board[i - 1][j - 1] === null){
                        moveLeftDiag = true;
                        moveRightDiag = false;
                        return {
                            "moveLeftDiag" : moveLeftDiag,
                            "moveRightDiag" : moveRightDiag,
                            idx : `r${i}c${j}`
                        }
                        
                    } else {
                        moveLeftDiag = false;
                        moveRightDiag = false;
                        return {
                            "moveLeftDiag" : moveLeftDiag,
                            "moveRightDiag" : moveRightDiag,
                            idx : `r${i}c${j}`
                        }
                    }
                } else {
                    if(board[i-1][j-1] === null){
                        moveLeftDiag = true;
                    } else {
                        moveLeftDiag = false;
                    }
                    if (board[i-1][j+1] === null){
                        moveRightDiag = true;
                    } else {
                        moveRightDiag = false
                    }
                    return {
                        'moveLeftDiag' : moveLeftDiag,
                        'moveRightDiag' : moveRightDiag,
                        idx : `r${i}c${j}`
                    }
                }
            }
        
    
}




// function pieceSelection() {
//     console.log(`board- ${board}`);
// 	if (turn === "red") {
// 		redPiece.forEach((piece) => {
//             console.log(piece,"piece")
// 			piece.addEventListener("click", handleMove);
//             // piece.removeAttribute("onclick");
// 			// piece.addEventListener("click", function() {
//                 // console.log("click");
//             // });

// 		});
// 	} else if (turn === "white") {
// 		whitePiece.forEach((piece) => {
// 			piece.addEventListener("click", handleMove);
// 		});
// 	}
// }

function pieceSelection () {
    squares.forEach((square) => {
        square.removeEventListener("click", handleMove);
    })
    if (turn === "red") {
        let redPieceIdx = getRedIdx()
        // console.log(redPieceIdx);
        redPieceIdx.forEach( (red) => {
            red = red.split("")
            console.log(Number(red[1]))
            let row = Number(red[1]);
            let col = Number(red[3])

            let checkMove = checkIfCanMOve(row,col);
            if (checkMove.moveLeftDiag === true || checkMove.moveRightDiag === true){
                // console.log(checkMove)
                document.querySelector(`#r${red[1]}c${red[3]} > div`).removeEventListener("click",handleMove)
                document.querySelector(`#r${red[1]}c${red[3]} > div`).addEventListener("click",handleMove)
            } 
            console.log(checkMove)
            // else return
            // console.log(checkMove)
            // console.log(red.split(""))
        })
    }
}


function handleMove(evt) {
    // document.querySelector(`#r${choice1Row}c${choice1Col}`).removeEventListener('click');
    // document.querySelector(`#r${choice2Row}c${choice2Col}`).removeEventListener("click");


	console.log(board);
    console.log("handleMove")
    let parentElId = evt.target.parentElement.id;

	let parentEl = evt.target.parentElement

	let squareIdx = String(parentElId);
	squareIdx = squareIdx.split("");
	let pieceSelected = board[squareIdx[1]][squareIdx[3]];

	let choice1Row;
	let choice1Col;  
	let choice2Row;
	let choice2Col;

	if (squareIdx[1] > 0 &&  squareIdx[3] > 0 ) {
        // console.log(choice1Row,choice1Col,"just after if");
		choice1Row = Number(squareIdx[1]) - 1;
	    choice1Col = Number(squareIdx[3]) - 1;
        // console.log(choice1Row,choice1Col,"after value change");

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
        // console.log(choice1Row,choice1Col,"before event listener")
		
		console.log("before choice 1 event listener")
        // console.log(choice1Row,choice1Col,"before event listener")
        if (board[choice1Row][choice1Col] === 'x') {
		document.querySelector(`#r${choice1Row}c${choice1Col}`).addEventListener('click',() => {
            selectChoice1 (parentEl ,pieceSelected ,squareIdx, choice1Row, choice1Col,choice2Row, choice2Col )
        },{ once: true } 
        )}
            }
			
            if (choice2Col !== undefined){

                // console.log("ping")
                // console.log("before choice 2 event listener")
                
                if (board[choice2Row][choice2Col] === 'x') {
                document.querySelector(`#r${choice2Row}c${choice2Col}`).addEventListener('click', (evt) => {
                    selectChoice2(parentEl ,pieceSelected ,squareIdx, choice1Row, choice1Col,choice2Row, choice2Col )
                    }, { once: true }
                ) }
          
        
            }

            // document.querySelector(`#r${choice1Row}c${choice1Col}`).removeEventListener('click', () => {
            //     selectChoice1 (parentEl ,pieceSelected ,squareIdx, choice1Row, choice1Col,choice2Row, choice2Col )
            // });
            // document.querySelector(`#r${choice2Row}c${choice2Col}`).removeEventListener("click", () => {
            //     selectChoice2(parentEl ,pieceSelected ,squareIdx, choice1Row, choice1Col,choice2Row, choice2Col )
            // });
            document.querySelector(`#r${choice1Row}c${choice1Col}`).removeEventListener('click',selectChoice1.bind(parentEl ,pieceSelected ,squareIdx, choice1Row, choice1Col,choice2Row, choice2Col ));
            document.querySelector(`#r${choice2Row}c${choice2Col}`).removeEventListener("click",
                selectChoice2.bind(parentEl ,pieceSelected ,squareIdx, choice1Row, choice1Col,choice2Row, choice2Col )
            );
			render()
	}

	
function selectChoice1 (parentEl ,pieceSelected ,squareIdx, choice1Row, choice1Col,choice2Row, choice2Col ) {
    console.log(board);

			console.log("after choice 1 event listener");
				parentEl.innerHTML =  "";
                // console.log(choice1Row,choice1Col)
                console.log("")
				board[choice1Row][choice1Col] = pieceSelected;
				board[squareIdx[1]][squareIdx[3]] = null;
				document.getElementById(`r${choice1Row}c${choice1Col}`).style.backgroundColor = "#ec7f03"
				if (choice2Col !== undefined ){
                    if (board[choice2Row][choice2Col] === 'x') {
					board[choice2Row][choice2Col] = null;
					document.getElementById(`r${choice2Row}c${choice2Col}`).style.backgroundColor = "#ec7f03"
                    // document.querySelector(`#r${choice2Row}c${choice2Col}`).removeEventListener("click",() => {
                    //     selectChoice2(parentEl ,pieceSelected ,squareIdx, choice1Row, choice1Col,choice2Row, choice2Col )
                    // })
                    

                }
				}
			// document.querySelector(`#r${choice1Row}c${choice1Col}`).removeAttribute("onClick")
            renderBoard();
				// render();
		
}

function selectChoice2(parentEl ,pieceSelected ,squareIdx, choice1Row, choice1Col,choice2Row, choice2Col ){

        
                    // console.log("after choice 2 event listener");
                    
                        
                        parentEl.innerHTML =  "";
                        board[choice2Row][choice2Col] = pieceSelected;
                        board[squareIdx[1]][squareIdx[3]] = null;
            
                        document.getElementById(`r${choice2Row}c${choice2Col}`).style.backgroundColor = "#ec7f03"
                        if (choice1Col !== undefined){
        
                            if (board[choice1Row][choice1Col] === 'x') {
                            board[choice1Row][choice1Col] = null;
                            document.getElementById(`r${choice1Row}c${choice1Col}`).style.backgroundColor = "#ec7f03"
                            // document.querySelector(`#r${choice1Row}c${choice1Col}`).removeEventListener("click",)
                            
                            // document.querySelector(`#r${choice1Row}c${choice1Col}`).removeEventListener('click',() => {
                            //     selectChoice1 (parentEl ,pieceSelected ,squareIdx, choice1Row, choice1Col,choice2Row, choice2Col )
                            // })

                        }

                        }
                        renderBoard();

                        // render();
}


