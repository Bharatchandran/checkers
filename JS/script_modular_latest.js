
function handleMove(evt) {
	
    console.log("hello")
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
		
		if (board[choice1Row][choice1Col] === 'x') {
		console.log("before choice 1 event listener")
		document.querySelector(`#r${choice1Row}c${choice1Col}`).addEventListener('click',(evt) => {
			console.log("after choice 1 event listener");
				parentEl.innerHTML =  "";
				board[choice1Row][choice1Col] = pieceSelected;
				board[squareIdx[1]][squareIdx[3]] = null;
				document.getElementById(`r${choice1Row}c${choice1Col}`).style.backgroundColor = "#ec7f03"
                console.log(board[choice2Row][choice2Col] === 'x' ,"choice 2.1");
				if (choice2Col !== undefined ){
                console.log(board[choice2Row][choice2Col] === 'x' ,"choice 2.2");

                    if (board[choice2Row][choice2Col] === 'x') {
					board[choice2Row][choice2Col] = null;
					document.getElementById(`r${choice2Row}c${choice2Col}`).style.backgroundColor = "#ec7f03"
                    }
				}
			document.querySelector(`#r${choice1Row}c${choice1Col}`).removeAttribute("onClick")

				render();
		
			},
            {
                once: true
            })
			
			
		} else return;
	}

	if (choice2Col !== undefined){


		if (board[choice2Row][choice2Col] === 'x') {
		console.log("before choice 2 event listener")

		document.querySelector(`#r${choice2Row}c${choice2Col}`).addEventListener('click', (evt) => {

			console.log("after choice 2 event listener");
            console.log("ping1")
			
				
				parentEl.innerHTML =  "";
				board[choice2Row][choice2Col] = pieceSelected;
				board[squareIdx[1]][squareIdx[3]] = null;
                console.log("ping2")

				document.getElementById(`r${choice2Row}c${choice2Col}`).style.backgroundColor = "#ec7f03"
                console.log("ping3")
                console.log((board[choice1Row][choice1Col] === 'x', "choice 1.1") )

				if (choice1Col !== undefined){
                    console.log((board[choice1Row][choice1Col] === 'x') )
                    if (board[choice1Row][choice1Col] === 'x', "choice 1.2") {
					board[choice1Row][choice1Col] = null;
					document.getElementById(`r${choice1Row}c${choice1Col}`).style.backgroundColor = "#ec7f03"
                    }
				}
				render();

		},
        {
            once: true
        }) 
	
    } else return ;

	}


}
