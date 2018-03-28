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
let cardOpen = [];
const restart = document.querySelector('.restart');

const timeContainer = document.getElementById('seconds');

let seconds = 0;

const movesContainer = document.querySelector('.moves');

let moves = 0;

//let starsContainer = document.querySelector('.stars');


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
    movesContainer.textContent = 0 ;
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
   cardOpen.push(this);
   if(cardOpen.length === 1) cardOpen[0].removeEventListener('click', showCards);
   else if(cardOpen.length === 2) compare();
   moveCounter();
   rating();
   win();
}

cardArr.forEach(card => card.addEventListener('click', showCards));

function compare() {
        if (cardOpen[0].innerHTML === cardOpen[1].innerHTML) {
            cardOpen[0].classList.add('match');
            cardOpen[1].classList.add('match'); 
            cardOpen[1].removeEventListener('click', showCards);  
            cardOpen.length = 0;             
        }
     
        else {
             cardArr.forEach(card => card.removeEventListener('click', showCards))
           
            setTimeout(function() {   
               cardOpen[0].classList.remove('open', 'show');
               cardOpen[1].classList.remove('open' , 'show');
               cardOpen.length = 0;
               cardArr.forEach(card => {
                 if(!card.classList.contains('show'))  card.addEventListener('click', showCards)
               });                  
            }, 750);
            
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
    movesContainer.textContent = parseInt(moves/2);
    if(moves === 1)    id = setInterval(time, 1000);    
}

function rating (){
    let stars = document.querySelector('.stars');
    let movesNumber = movesContainer.textContent;
    if((movesNumber == 16 && stars.firstChild) || (movesNumber  == 24 && stars.firstChild)|| (movesNumber  == 36 && stars.firstChild)){
        stars.removeChild(stars.firstChild);
    } 
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
