var start = false;
var stop = true;
var timer;
window.onload = function(){
	creatMoles();
	init();
}
function init(){
	var timeBox = document.getElementById("timeBox");
	var scoreBox = document.getElementById("scoreBox");
	var GameState = document.getElementById("GameState");
	
	timeBox.setAttribute("disabled", "true");
	scoreBox.setAttribute("disabled", "true");
	GameState.setAttribute("disabled", "true");
}
function creatMoles(){
	var gameContainer = document.getElementById("GameContainer");
	var startAndStopBtn = document.getElementById("startAndStopBtn");
	startAndStopBtn.addEventListener("click", startOrStop);
	for (var i = 0; i < 60; i++){
		var radioBtn = document.createElement("input");
		radioBtn.setAttribute("type","radio");
		radioBtn.setAttribute("class", "radioBtn");
		radioBtn.setAttribute("disabled", "true");
		radioBtn.addEventListener("click", checkAndGetScore);
		gameContainer.appendChild(radioBtn);
	}
}
function startOrStop(){
	if (start){
		var radioBtn = document.getElementsByClassName("radioBtn");
		for (var i = 0; i < 60; i++){
			radioBtn[i].disabled = true;
			radioBtn[i].checked = false;
		}
		start = false;
		stop = true;
		document.getElementById("GameState").value = "Game Over";
	}
	else {
		var radioBtn = document.getElementsByClassName("radioBtn");
		for (var i = 0; i < 60; i++){
			radioBtn[i].disabled = false;
		}
		start = true;
		stop = false;
		document.getElementById("GameState").value = "Play";
		document.getElementById("timeBox").value = "30";
		document.getElementById("scoreBox").value = "0";
		var randomnuM = getRandomNum();
		radioBtn[randomnuM].checked = true;
		timeDecrease();
	}
}

function timeDecrease(){
	var time = parseInt(document.getElementById("timeBox").value);
	timer = setInterval(function(){
		if (time > 0){
			time--;
			document.getElementById("timeBox").value = time;
		}
		else {
			clearInterval(timer);
			startOrStop();
			start = false;
			stop = true;
		}
	}, 1000);
}
function getRandomNum(){
	return Math.round(Math.random()*60);
}
function checkAndGetScore(event){
	var clickRadioBtn = event.target;
	var score = parseInt(document.getElementById("scoreBox").value);
	if (clickRadioBtn.checked == true){
		score++;

		document.getElementById("scoreBox").value = score;
		clickRadioBtn.checked = false;

		var randomnuM = getRandomNum();
		var radioBtn = document.getElementsByClassName("radioBtn");
		radioBtn[randomnuM].checked = true;
	}
	else {
		radioBtn.checked = false;
	}
}