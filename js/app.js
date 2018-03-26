/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
const deck = document.querySelector('.deck');

const cards = document.querySelectorAll('.card');

let cardArr = Array.prototype.slice.call(cards);

const restart = document.querySelector('.restart');

const timeContainer = document.getElementById('seconds');

let seconds = 0;

const movesContainer = document.querySelector('.moves');

let moves = 0;

let stars = document.querySelector('.stars');

const modal = document.querySelector('.modal');

let id;


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function reset() {
    clearInterval(id);
    moves = 0;
    seconds = 0;
    timeContainer.textContent = 0;
    movesContainer.textContent = 0 + ' Moves';
    deck.innerHTML = '';
    shuffle(cardArr);

	cardArr.forEach(card => {
       card.className = 'card';
       deck.appendChild(card);
    });
}

restart.addEventListener('click', reset);

window.onload = reset;

function showCards() {
   this.classList.add('open', 'show');	

   compare();
   moveCounter();
   win()
}

cardArr.forEach(card => card.addEventListener('click', showCards));

function compare() {
    let cardOpen = document.querySelectorAll('.open');
	let openList = [...cardOpen];
  
    if (openList.length === 2) {
       cardArr.forEach(card => card.removeEventListener('click', showCards));
            
        if (openList[0].innerHTML === openList[1].innerHTML) {
            openList[0].classList.add('match');
            openList[1].classList.add('match');        
            openList[0].classList.remove('open');
            openList[1].classList.remove('open');
            openList[0].removeEventListener('click', showCards);
            openList[1].removeEventListener('click', showCards);
           
        }
	
        else {
    	    setTimeout(function() {
    	    	openList[0].classList.remove('open', 'show');
                openList[1].classList.remove('open' , 'show');	          
	    	 }, 750);
        }

        setTimeout(function(){
            cardArr.forEach(card => card.addEventListener('click', showCards));
        },400);
       
    }	 
}

function win() {
	let matchedCards = document.querySelectorAll('.match');

	if(matchedCards.length === 16){ 
		deck.innerHTML = '';
        deck.appendChild(modal);
        modal.style.display ='block';
        modal.textContent ='congratulation';
        clearInterval(id);
	}
}

function time() {
    seconds++;
    timeContainer.textContent = seconds; 
}
  
function moveCounter() {
    moves++;
    movesContainer.textContent = moves + ' Moves';
    if(moves === 1)    id = setInterval(time, 1000);    
}
   


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
