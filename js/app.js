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


let cardArr = [...document.querySelectorAll('.card')];
let cardOpen = [];
const restart = document.querySelector('.restart');
const timeContainer = document.getElementById('seconds');
let seconds = 0;
const movesContainer = document.querySelector('.moves');
let moves = 0;
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
// reset the game
function reset() {
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';// hiding the modal if exist
    // stop time counter and reset moves number and stars
    clearInterval(id);// stopping time if still work
    moves = 0;// this will reset the value of global variable 'moves'
    seconds = 0; // this will reset the value of global variable 'seconds'
    timeContainer.textContent = 0; // this will make sure the time counter starts by 0
    movesContainer.textContent = 0 ; // this will make sure moves starts by 0
    ratingReset();// to reset stars
    randomize(); // to randmoize cards in the deck
}
//this function will be called in reset function
function randomize() {
    const deck = document.querySelector('.deck');
    shuffle(cardArr);// randomize the array of cards
    deck.innerHTML = ''; // clearing the deck
    cardArr.forEach(card => {
       card.className = 'card'; // any class except of 'card' will be removed
       deck.appendChild(card); // appending cards to the deck one by one
       card.addEventListener('click', showCards)// adding the click listener to all cards
    });
}

function showCards() {
   this.classList.add('open', 'show','animated', 'bounceIn');	
   cardOpen.push(this);
   // prevent the effect of the second click on the first card of two
   if(cardOpen.length === 1) cardOpen[0].removeEventListener('click', showCards);
   else if(cardOpen.length === 2) compare();
   moveCounter();
   rating();
   setTimeout(win, 500);
}
//compare  two cards
function compare() {
    if (cardOpen[0].innerHTML === cardOpen[1].innerHTML) {
      cardOpen[0].classList.add('match');
      cardOpen[1].classList.add('match');
      //prevent the effect of second click on the second card 
      cardOpen[1].removeEventListener('click', showCards);  
      cardOpen.length = 0;             
    }
     
    else {
      // remove eventListener ofrom all cards temprarily
      cardArr.forEach(card => card.removeEventListener('click', showCards));
        // return back the event listener after some time except for matched cards   
       setTimeout(function() {
            cardOpen[0].classList.remove('open', 'show','animated', 'bounceIn');
            cardOpen[1].classList.remove('open' , 'show', 'animated', 'bounceIn');
            cardOpen.length = 0;
            cardArr.forEach(card => {
               if(!card.classList.contains('show'))  card.addEventListener('click', showCards)
            });                  
       }, 750);
            
    } 
}

function win() {
  const deck = document.querySelector('.deck');
  let matchedCards = document.querySelectorAll('.match');
  const modal = document.querySelector('.modal');
  let finalMessage = document.querySelector('.final-message');
  const finalRating = document.querySelector('.final-rating');
  const stars = document.querySelector('.stars');
   // if all cards have match class stop time and display the modal with all results
	if(matchedCards.length === 16){ 
    clearInterval(id);//stop time counter
		deck.innerHTML = ''; // clear deck to show modal
    modal.style.display ='block'; // display the modal
    // show results in the modal
    finalMessage.textContent = `you have completed the game with ${parseInt(moves/2)} moves in ${seconds} seconds`
    // show how many stars left before finishing the game
    finalRating.innerHTML = stars.innerHTML;
	}
}
// the time counter
function time() {
    seconds++;
    timeContainer.textContent = seconds; 
}
// moves counter
function moveCounter() {
    moves++;//increment moves one by one
    movesContainer.textContent = parseInt(moves/2);// increment moves by one every two clicks
    if(moves === 1)    id = setInterval(time, 1000);  // start time counter with the first click  
}
// remove a star every number of moves
function rating (){
    let stars = document.querySelector('.stars');
    let movesNumber = movesContainer.textContent;
    if((movesNumber == 16 && stars.firstChild) || (movesNumber  == 24 && stars.firstChild)){
        stars.removeChild(stars.firstChild);
    } 
}
// reset stars
function ratingReset() {
   const starReset = `<li><i class="fa fa-star"></i></li>   
                     <li><i class="fa fa-star"></i></li>
                     <li><i class="fa fa-star"></i></li>`
         
    const stars = document.querySelector('.stars');
    stars.innerHTML = starReset;//adding all stars again
}

restart.addEventListener('click', reset);

window.onload = reset;
// when click play again button on modal reset the game
document.querySelector('.play-again').onclick = reset;



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
