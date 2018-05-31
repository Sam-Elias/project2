/*
* Variables
*/
const cards = Array.from(document.getElementsByClassName('card'));

let openCards = Array.from(document.getElementsByClassName('open show'));

let matchedCards = Array.from(document.getElementsByClassName('match'));

let deck = document.querySelector('.deck');

let cardClicked;

let counter = document.querySelector('.moves');

let timer = document.getElementById('timer');

let stars = document.querySelectorAll('.star');

let seconds = 00;

let minutes = 00;

let t;

let shouldContinue = true;

let restart = document.querySelector('.restart');

let finalTime;

let modal = document.querySelector('.modalBackground');

let replay = document.querySelector('.modalBtn');

let starNum = parseInt(document.querySelector('#htmlStars').textContent, 10);

let htmlStars = document.querySelector('#htmlStars');

let modalMinutes = document.querySelector('#finalMinutes');

let modalSeconds = document.querySelector('#finalSeconds');



/*
*FUNCTIONS:
*/

//Handles all possible states of the card clicked
function gameLogic (cardClicked) {

// -open?- check to see if card is already open
  if (this.classList.contains('open')) {
    alert('This one is already open, please choose another card!');
  }

// -matched?- check to see if card is already matched
  else if (this.classList.contains('match')) {
    alert('This is one is already matched, please chose another card!');
  }

// -first?- check to see if the card is the first to be opened
  else if (openCards.length === 0) {
    _counter();
    this.classList.add('open', 'show');
    openCards.push(this);
  }

// -second?- check to see if the card is the second to be opened
  else if (openCards.length === 1) {
    _counter();
    this.classList.add('open', 'show');
    openCards.push(this);
    _compareCard();
  }
}

// Updates the moves counter, starts the timer, and run _starColor
function _counter() {
  let counterNumber = parseInt(document.querySelector('.moves').textContent, 10);
  counterNumber += 1
  counter.textContent = counterNumber;
  if (counter.textContent == 1) {
    _resetClock();
    shouldContinue = true;
    _timer();
  }
  _starColor();
}

// Compares openCards elements and _matchClass() or _removeClass()
function _compareCard() {
  let card1class = openCards[0].firstElementChild.className;
  let card2class = openCards[1].firstElementChild.className;
  card1class === card2class ?  _matchClass() : setTimeout (_removeClass, 800);
}

// Removes class open and show from both elements and assigns class match,
// add elements to array matchedCards, and check to see if game is over.
function _matchClass() {
  openCards[0].classList.remove('open', 'show');
  openCards[1].classList.remove('open', 'show');
  openCards[0].classList.add('match');
  openCards[1].classList.add('match');
  matchedCards.push(openCards[0], openCards[1]);
  openCards.splice(0, 2);
  if (matchedCards.length == 16) {
    _openModal();
  }
}

// Removes class open show from both elements of openCards array
function _removeClass() {
  openCards[0].classList.remove('open', 'show');
  openCards[1].classList.remove('open', 'show');
  openCards.splice(0, 2);
}

// Removes purple stars after a number of moves is made
function _starColor (){
  if (counter.textContent == 20) {
    stars.item(2).classList.replace('star', 'lost-star');
  }
  else if (counter.textContent == 35) {
    stars.item(1).classList.replace('star', 'lost-star');
  }
  else if (counter.textContent == 45) {
    stars.item(0).classList.replace('star', 'lost-star');
  }
}

// Reset all three stars to purple
function _resetStars() {
  for ( let star of stars) {
    star.classList.replace('lost-star', 'star')
  }
}

// Updates clock on the screen from https://jsfiddle.net/Daniel_Hug/pvk6p/
function _clock() {
  seconds++;
  if (seconds >= 60) {
      seconds = 0;
      minutes++;
  }
  timer.innerHTML = ((minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds));
  _timer();
}

// Runs the _clock from https://jsfiddle.net/Daniel_Hug/pvk6p/
function _timer() {
  shouldContinue? setTimeout(_clock, 1000) : timer.innerHTML = "00:00";
}

// Resets the _clock
function _resetClock() {
  shouldContinue = false;
  seconds = 00;
  minutes = 00;
}

// Resets game to original condition
function _restart() {
// Removes the class match from all elements of array matchedCards and empties matchedCards
  matchedCards.forEach(function (cards) {
    cards.classList.remove('match');
  });
  matchedCards = [];
// shuffles cards
  _shuffle();
// resets the counter to zero
  counter.textContent = 0;
//resets timer
  _resetClock();
//resets stars
  _resetStars();
//Removes modal
  _closeModal();
}

//*****With help from peer Udacity student Carlos Fins!!******
// Runs shuffleEngine and assigns the shuffled cards to the deck
function _shuffle() {
  shuffleEngine(cards);
  deck.innerHTML = "";
  for (let card of cards) deck.appendChild(card);
}

// Shuffle "engine"
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

// Opens modal
function _openModal() {
  for (let star of stars) {
    if (star.classList.contains('lost-star'))  starNum -= 1;
    htmlStars.textContent = starNum;
  }
  modalMinutes.textContent = minutes
  modalSeconds.textContent = seconds
  modal.style.display = 'block';
}

function _closeModal() {
  modal.style.display = 'none';
}

/*
* Event Listeners
*/

//Listens to a click on one of the cards and selects the cardClicked
cards.forEach(function (clicked) {
  cardClicked = clicked;
  clicked.addEventListener('click', gameLogic);
});

//Listens to a click on the restart button and run _restart
restart.addEventListener('click', _restart);

//Listens to a click on the replay button and run _restart
replay.addEventListener('click', _restart);
