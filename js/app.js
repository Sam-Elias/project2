//Create arrays for different card states (All Cards, Open Cards, Matched Cards)
var cards = Array.from(document.getElementsByClassName('card'));

var openCards = Array.from(document.getElementsByClassName('open show'));

var matchedCards = Array.from(document.getElementsByClassName('match'));

var deck = document.querySelector('.deck');

var cardClicked;

var counter = document.querySelector('.moves');

var timer = document.getElementById('timer');

var stars = document.querySelectorAll('.star');

var seconds = 00;

var minutes = 00;

var t;



//all game functions are written here

// _clock function from https://jsfiddle.net/Daniel_Hug/pvk6p/
function _clock() {
  seconds++;
  if (seconds >= 60) {
      seconds = 0;
      minutes++;
  }

  timer.innerHTML = ((minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds));

  _timer();
}

// _timer function from https://jsfiddle.net/Daniel_Hug/pvk6p/
function _timer() {
  setTimeout(_clock, 1000);
}

function _resetStars() {
  for ( let star of stars) {
    star.classList.replace('lost-star', 'star')
    console.log(star);
  }
}

function _starColor (){
  if (counter.textContent == 12) {
    stars.item(2).classList.replace('star', 'lost-star');
  }
  else if (counter.textContent == 24) {
    stars.item(1).classList.replace('star', 'lost-star');
  }
  else if (counter.textContent == 36) {
    stars.item(0).classList.replace('star', 'lost-star');
  }
}

// _restart function resets game
function _restart() {
  console.log('_restart was called!!');
// removes the class match from all elements of array matchedCards and empties matchedCards
  matchedCards.forEach(function (el_matched) {
    this.classList.remove('match');
    matchedCards.splice(0,1);
  });
// shuffles cards
  _shuffle();
  // resets the counter to zero
  counter.textContent = 0;
//resets timer

//resets stars
  _resetStars();
}

//*****With help from Carlos Fins******
// _shuffle function uses shuffleEngine and assigns the shuffled cards to the deck ul
function _shuffle() {
  shuffleEngine(cards);
  deck.innerHTML = "";
  for (let card of cards) deck.appendChild(card);
}

// shuffle function is the shuffle "engine"
function shuffleEngine(array) {

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

// _counter function updates the moves count and start the timer
function _counter() {
  console.log('_counter was called!!');
  let counterNumber = parseInt(document.querySelector('.moves').textContent, 10);
  counterNumber += 1
  counter.textContent = counterNumber;
  if (counter.textContent == 1) {_timer()}
  _starColor();
}

// _compareCard function compare the elements inside openCards array and assign function based on output of comparison.
function _compareCard() {
  console.log('_compareCard was called!!');
  let card1class = openCards[0].firstElementChild.className;
  let card2class = openCards[1].firstElementChild.className;
  card1class === card2class ?  _matchClass() : setTimeout (_removeClass, 800);
}

//_removeClass function remove class open and show from both elements of openCards
function _removeClass() {
  console.log('_removeClass called!!');
  openCards[0].classList.remove('open', 'show');
  openCards[1].classList.remove('open', 'show');
  openCards.splice(0, 2);
}

//_matchClass function remove class open and show from both elements, add class match, and add elements to array matchedCards
function _matchClass() {
  console.log('_matchClass called!!');
  openCards[0].classList.remove('open', 'show');
  openCards[1].classList.remove('open', 'show');
  openCards[0].classList.add('match');
  openCards[1].classList.add('match');
  matchedCards.push(openCards[0], openCards[1]);
  openCards.splice(0, 2);
}

//Loop through all cards and select the card clicked
cards.forEach(function (el_clicked) {
  cardClicked = el_clicked;
  el_clicked.addEventListener('click', gameLogic);
  console.log ('Game started!!');
});

//Creates the function that handles the card clicked
function gameLogic (cardClicked) {
  console.log('gameLogic function is linked!');

// -open?- check to see if card is already open
  if (this.classList.contains('open')) {
    console.log('open? is working!');
    alert('What are you doing? This is already open, please choose another card!');
    return
  }

// -matched?- check to see if card is already matched
  else if (this.classList.contains('match')) {
    console.log('matched? is working!');
    alert('Wasting your clicks! This is one is already matched, please chose another card!');
   return
  }

// -first?- check to see if the card is the first to be opened
  else if (openCards.length === 0) {
    console.log('first? is working!')
    _counter();
    this.classList.add('open', 'show');
    openCards.push(this);
    //_openCard(); ( I wanted to put this.classList.add('open' 'show') inside of the openCard function but it does not work)
    return
  }

  // -second?- check to see if the card is the second to be opened
  else if (openCards.length === 1) {
    console.log('second? is working!')
    _counter();
    this.classList.add('open', 'show');
    openCards.push(this);
    _compareCard();
    return
  }
}




  //if
  /*
  *card is already open - display card is already open and return
  */
  //else if
  /*
  *card is already matched - display card is already matched and return
  */
  //else if
  /*
  *openCards.length is 0 - run _openCard function and return
  */
  //else if
  /*
  *openCards.length is 1 - run -openCard function, run _compareCard function and return
  */
  /*
  --- _openCard Function---
  *run _counter function
  *add class 'open show' to element
  ***** function(el) {
  ***** el.classList.add('open', 'show');
  */

  /*
  --- _gameOver function---
  *run _modal function
  *run _restart function
  */


/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
/*
// Shuffle function from http://stackoverflow.com/a/2450976
function _shuffle(array) {
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
*/
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
