// settings // subject to change
var theme = 'Emojis';
var numberOfPlayers = 1;
var difficulty = 'Easy';

// game settings
var roundsToWin = 3;
var pcCallsIn ;
var currentRound = 0;

var playerOne = {
	card : undefined,
	roundsWon : 0 ,
	name : 'Player One'
};

var playerTwo = {
	card : undefined,
	roundsWon : 0 ,
	name : undefined
};

// difficulty
if (difficulty == 'Easy') {
	var pcCallsIn = 2000;
	var countdownFrom = 3;
	var countdownSpeed = 800;
	var newRoundTime = 4000;
}

// instruction

//starting the game
var noticePlayerOneWon;
var noticePlayerOneWonGame;
var noticePlayerTwoWon;
var noticePlayerTwoWonGame;

if (numberOfPlayers == 1) {
	playerTwo.name = 'PC';
	noticePlayerOneWon = 'You won one point';
	noticePlayerOneWonGame = 'YOU WIN!<br>🎈🎉🎈';
	noticePlayerTwoWon = 'PC won one point';
	noticePlayerTwoWonGame = 'PC WON!<br>😑😣😭';
} else {
	playerTwo.name = 'Player Two';
	noticePlayerOneWon = 'Player one won one point';
	noticePlayerOneWonGame = 'PLAYER ONE WINS!';
	noticePlayerTwoWon = 'Player Two won one point';
	noticePlayerTwoWonGame = 'Player TWO WINS!';
}

// theme
if (theme == 'Emojis') {
	if (difficulty == 'Easy') {
		var cards = ['😊','😂','😍','😢','🤬','😨'];
		var joker = '🃏';
	}
}

//the game
var getRandomCard = function () {
	var randomNumber = Math.round(Math.random() * (cards.length));
	if (randomNumber == cards.length) {
		var randomCard = joker;
	} else {
		var randomCard = cards[randomNumber];
	}
	return randomCard;
	console.log(randomCard)
};
var startNextRound = function () {
	currentRound ++;
	countdownStarted = false;
	snapCalled = false;
	playerOne.card = getRandomCard();
	playerTwo.card = getRandomCard();
	updateCard ();
	updateRound();
	console.log('round : '+currentRound)
	console.log(playerOne.card + ' vs ' + playerTwo.card)
	if (numberOfPlayers == 1) {
		setTimeout(pcCallsSnap,pcCallsIn);
	} 
	setTimeout(countdown,newRoundTime);
};
var count = countdownFrom;
var countdownStarted = false;
function countdown(){
	countdownStarted = true;
	if (end()) {
		setTimeout(endGameScreen(),6000)
		return;
	}
	updateCounter();
	if (count !=0 ) {
		console.log('count '+count)
	}
	if (count <= 0) {
		count =countdownFrom;
		endShuffle = true;
		startNextRound ();
		return
	} else {
		endShuffle = false;
		shuffle();
		setTimeout(countdown,countdownSpeed);
	}
	count --;
};
var isAMatch = function () {
	if (playerOne.card == playerTwo.card) {
		return true;
	}
	if (playerOne.card == joker || playerTwo.card == joker) {
		return true;
	}
	return false;	
};
var snapCalled = false;
var snap = function (playerTwoCalledIt) {
	if (!gameStarted) {
		return;
	}
	if (countdownStarted) {
		return;
	}
	if (snapCalled) {
		return;
	}
	if (playerTwoCalledIt) {
		if (isAMatch()) {
			playerTwo.roundsWon ++;
			updateNotice(false);
			console.log('player two won the round')
		} else {
			playerOne.roundsWon ++;
			updateNotice(true);
			console.log('player one won the round')
		}
	} else {
		if (isAMatch()) {
			playerOne.roundsWon ++;
			updateNotice(true);
			console.log('player one won the round')
		} else {
			playerTwo.roundsWon ++;
			updateNotice(false);
			console.log('player two won the round')
		}
	}
	snapCalled = true;
	updateScore();
	console.log(playerOne.roundsWon + ' : ' + playerTwo.roundsWon)
};
function pcCallsSnap(){
	if (isAMatch()) {
		snap(true);
	}
};
var gameStarted = false;
function start(){
	if (gameStarted) {
		return;
	}
	gameStarted = true;
	startGame();
	inti();
	countdown();
};

// the end
var playerOneWonGame;
function end(){
	if (playerTwo.roundsWon == roundsToWin) {
		console.log('player two won the game')
		console.log('game ended')
		playerOneWonGame = false;
		gameStarted = false;
		return true;
	}
	if (playerOne.roundsWon == roundsToWin ) {
		console.log('player one won the game')
		console.log ('game ended')
		playerOneWonGame = true;
		gameStarted = false;
		return true;
	} else {
		return false;
	}
};
function restart(){
	if (gameStarted) {
		return;
	}
	removeNotice(playerOneWonGame);
	hideEnd();
	gameStarted = true;
	playerOne.roundsWon = 0;
	playerTwo.roundsWon = 0;
	currentRound = 0;
	inti();
	setTimeout(countdown(),1000);
};

// html stuff
var playersName =document.getElementsByClassName("name");
var playersCard =document.getElementsByClassName("card");
var playersScore =document.getElementsByClassName("scoreBoard");
var round = document.getElementsByClassName("roundNumber");
var snapBtn = document.getElementsByClassName("snap");

function startGame (){
	document.getElementById("instruction").classList.add("hide");
};
function nOfPlayers (){
	if (numberOfPlayers == 1) {
		snapBtn[0].classList.add('onePlayer');
		snapBtn[1].classList.add('onePlayer');
	} else {
		snapBtn[0].classList.remove('onePlayer');
		snapBtn[1].classList.remove('onePlayer');
	}
};
function inti (){
	playersName[1].innerHTML = playerTwo.name;
	updateRound();
	updateCard();
	updateScore();
	nOfPlayers();
};
function updateRound (){
	var roundNumber = "Round: "+ currentRound;
	round[0].innerHTML = roundNumber;
};
function updateCounter (){
	document.getElementById("notice").classList.add("counter");
	if (count == 0) {
		document.getElementById("notice").innerHTML = 'GO!';
	}else{
		document.getElementById("notice").innerHTML = count;
	}	
};
var shuffleCount = cards.length - 1
var endShuffle = false;
function shuffle (){
	if (endShuffle) {
		return;
	}
	if (shuffleCount<0) {
		shuffleCount = cards.length - 1;
	}else{
		playersCard[0].innerHTML = cards[shuffleCount];
		playersCard[1].innerHTML = cards[shuffleCount];
	}
	setTimeout(shuffle,100);
	shuffleCount -- ;
};
function updateCard (){
	playersCard[0].innerHTML = playerOne.card;
	playersCard[1].innerHTML = playerTwo.card;
};
function updateScore (){
	playersScore[0].innerHTML = playerOne.roundsWon;
	playersScore[1].innerHTML = playerTwo.roundsWon;
};
function updateNotice (playerOneWon){
	document.getElementById("notice").innerHTML = '';
	document.getElementById("notice").classList.remove('counter');
	if (playerOneWon) {
		document.getElementById("notice").classList.add('playerOneWon');
		document.getElementById("notice").innerHTML = noticePlayerOneWon;
	}else{
		document.getElementById("notice").classList.add('playerTwoWon');
		document.getElementById("notice").innerHTML = noticePlayerTwoWon;
	}
	setTimeout(function(){
		if (playerOneWon) {
			document.getElementById("notice").classList.remove('playerOneWon');
		}else{
			document.getElementById("notice").classList.remove('playerTwoWon');
		}
	},1999);
	if (end()) {
		setTimeout(function () {
			if (playerOne.roundsWon == roundsToWin) {
				document.getElementById("notice").classList.add('playerOneWonGame');
				document.getElementById("notice").innerHTML = noticePlayerOneWonGame;
			}
			if (playerTwo.roundsWon == roundsToWin) {
				document.getElementById("notice").classList.add('playerTwoWonGame');
				document.getElementById("notice").innerHTML = noticePlayerTwoWonGame;
			}
		},2000);
	}
};
function removeNotice (whoWon) {
	if (whoWon) {
		document.getElementById("notice").classList.remove('playerOneWonGame');
	}else{
		document.getElementById("notice").classList.remove('playerTwoWonGame');
	}
};
function endGameScreen (){
	document.getElementById("end").classList.remove('hide');
};
function hideEnd (){
	document.getElementById("end").classList.add('hide');
};

//percentage
function percentage(){
	var sum = 0;
	var card1;
	var card2;
	for (var i = 1; i <= 1000000; i++) {
		card1 = getRandomCard();
		card2 = getRandomCard();
		if (card1 == card2) {
			sum ++;
		}else if (card1 == joker || card2 == joker) {
			sum++;
		}
	}
	console.log(sum/10000+'%')
	console.log((1/7*1/7+1/7+1/7)*100)
};