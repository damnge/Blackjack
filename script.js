// At the begining by by using prompt method We ask about the player's nickname and cash.
// We are storing this input value in the variables and then using them in our player object that later can be displayed on the board of the game.

let nickname = prompt("What's your nickname?");

// When it comes to cash we created a special function that not only ask for the input value but also check if the value that we pass is just numbers or 0 value

function askAbtCash() {
  // so lets use prompt method to collect input from the user
  let cash = prompt("How much money you would like to exchange?");

  //   first we check if the value that we passed it's not 0. for that we use parseInt to convert string into a number. If it's 0 the messege will be alerted on the website and screen will reload
  if (parseInt(cash) === 0) {
    alert("You don't have enough money!");
    location.reload();
  }
  //   then we check if we are only passing numbers if that's the case and we gave value higher than 0 player can play black jack. Function is executed and it return the value of cash
  else if (/^[0-9.,]+$/.test(cash)) {
    alert("Let's play Blackjack!Have fun!");
    return cash;
    // if player put something else than message will be alerted and screen will reload again
  } else {
    alert("You need to input just numbers");
    location.reload();
  }
}

// we store our function inside the cash variable
let cash = askAbtCash();

// player object with the nickname that is passed by the player and amout of money exchanged for chips

let player = {
  name: nickname,
  chips: cash,
};

// all basic variables that later during the game are reassigned

let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";

// all elements from HTML stored in variables needed for DOM manipluation

let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el");

let startGameBtn = document.getElementById("start-btn");
let newCardBtn = document.getElementById("new-card-btn");

// here we use on player element a method called textContent and we pass to our HTML input collected from prompt which is stored in our player object

playerEl.textContent = `${player.name}: ${player.chips}$ `;

// Stat game button calls on click startGame function
startGameBtn.addEventListener("click", startGame);

// New Card button calls on click newCard function
newCardBtn.addEventListener("click", newCard);

// Now we need to create a function that creats for us random cards and for that we use Math.floor together with Math.random
// We want to have 13 cards our method stored in randomNumber variable will be producing numbers from 1 to 13

function getRandomCard() {
  let randomNumber = Math.floor(Math.random() * 13) + 1;
  //   In blackjack Jack, Queen and King has a value of 10 and their position is according to random numbers will be 11,12 and 13.
  // So whenever random number will be higher than 10 it means that it's either Jack,Queen or King and we will reassing this value to 10 and return it
  if (randomNumber > 10) {
    return 10;
    // If the number is 1 it means that we drawn Ace from our cards, in Blackjack you can either choose if its worth 1 or 11 points but for sake of simplicty we will keep just one option and it will be worth 11 points
  } else if (randomNumber === 1) {
    // let choseAce = prompt();
    return 11;
  } else {
    return randomNumber;
  }
}

// our function that starts the game

function startGame() {
  // first we are changig the value of isAlive to true it means that player is in the game at the table
  isAlive = true;
  //   than we store our getRandomCard which passes a number and we stored it in two variables which are named firstCard and secondCard
  let firstCard = getRandomCard();
  let secondCard = getRandomCard();

  //   than those first cards that we drawn we put into our array called card so we can reassing its empty value at the beginnig
  cards = [firstCard, secondCard];

  //   then we just add the points from the first and second card so we can sum up total points
  sum = firstCard + secondCard;

  //   in the end we call the function called randerGame
  renderGame();
}

// render game function pushes all our stored information and display it inside HTML

function renderGame() {
  // first it shows us a numbers of drawn cards on the board
  cardsEl.textContent = "Cards: ";
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + " ";
  }
  // it also sum it up their value
  sumEl.textContent = "Sum: " + sum;
  //   then depends on the value it passes the message to the player
  // if player has less or equal amount of 20 points he can pick up a new card and the message as if he want a new card
  if (sum <= 20) {
    message = "Do you want to draw a new card?";

    // if the player has exact sum of 21 points it means that he got a blackjack so it's sets a value of hasBlackJack to true, it means that he/she won this round
  } else if (sum === 21) {
    message = "You've got Blackjack!";
    hasBlackJack = true;
    // else means that player had more points than 21 and he/she is out of the game in this round that's why the value of the isAlive is set to false
  } else {
    message = "You're out of the game!";
    isAlive = false;
  }
  //   in the end using textContent method message that fulfilled if statments is passed and displayed in HTML
  messageEl.textContent = message;
}

// our last funtion that allows us to pick a new card
function newCard() {
  // so if player is alive and do not has a blackjack he/she is allowed to pick up a new card
  if (isAlive === true && hasBlackJack === false) {
    // in new variable called card we pass function getRandomCard that draws for a player new card
    let card = getRandomCard();
    // then this card is added to the total number of points
    sum += card;
    // card is pushed to the deck
    cards.push(card);
    // and game is render out again
    renderGame();
  }
}
