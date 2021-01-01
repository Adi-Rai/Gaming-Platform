const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");
let player = {speed: 8, score: 0};

startScreen.addEventListener("click",start);
document.addEventListener("keydown",pressOn);
document.addEventListener("keyup",pressOff);

let keys={
	ArrowUp: false,
	ArrowDown: false,
	ArrowRight: false,
	ArrowLeft:false
};

function moveLines(){
	let lines = document.querySelectorAll(".line");
	lines.forEach(function(item){
		if(item.y > 750){
			item.y -= 750;
		}
		item.y += player.speed;
		item.style.top = item.y + "px";
	})

}

function isCollided(a,b){
	let aRect = a.getBoundingClientRect();
	let bRect = b.getBoundingClientRect();

	return !(
		(aRect.bottom < bRect.top)||
		(aRect.top > bRect.bottom)||
		(aRect.right < bRect.left)||
		(aRect.left > bRect.right)
		)
}

function moveEnemy(car){
	let ele = document.querySelectorAll(".enemy");
	ele.forEach(function(item){
		if(isCollided(car,item)){
			console.log("HIT");
			endGame();
		}
		if(item.y > 1500){
			item.y -= 2000;
			item.style.left = Math.floor(Math.random()*250)+"px";
			item.style.backgroundColor = randomColor();
		}
		item.y += player.speed;
		item.style.top = item.y + "px";
	})

}

function playGame(){
	let car=document.querySelector(".car");
	moveLines();
	moveEnemy(car);
	let road=gameArea.getBoundingClientRect();
		
	if(player.start){
		if(keys.ArrowUp && player.y>8){
			player.y -= player.speed;
		}
		if(keys.ArrowDown && player.y<720){
			player.y += player.speed;
		}
		if(keys.ArrowRight && player.x<(road.width-50)){
			player.x += player.speed;
		}
		if(keys.ArrowLeft && player.x>0){
			player.x -= player.speed;
		}
		car.style.left=player.x + 'px';
		car.style.top=player.y + 'px';
		player.score++;
		score.innerText= "SCORE: " + player.score;
		window.requestAnimationFrame(playGame);
	}
}

function pressOn(e){
	e.preventDefault();
	keys[e.key]=true;
	// console.log(keys);
}

function pressOff(e){
	e.preventDefault();
	keys[e.key]=false;
	// console.log(keys);
}

function endGame(){
	player.start=false;
	score.innerHTML="Game Over<br> Score was "+player.score;
	startScreen.classList.remove("hide");

}

function start(){
	startScreen.classList.add("hide");
	// gameArea.classList.remove("hide");
	gameArea.innerHTML="";
	score.classList.remove("hide");
	player.start=true;
	player.score=0;
	for(let x=0;x<5;x++){
		let div = document.createElement("div");
		div.classList.add("line");
		div.y = x*150;
		div.style.top = (x*150)+"px";
		gameArea.appendChild(div);
	}
	let car= document.createElement("div");
	// car.innerText="Car";
	car.setAttribute("class","car");
	gameArea.appendChild(car);
	player.x=car.offsetLeft;
	player.y=car.offsetTop;
	for(let x=0;x<3;x++){
		let enemy = document.createElement("div");
		enemy.classList.add("enemy");
		enemy.y = ((x+1)*500)*(-1);
		enemy.style.top = enemy.y+"px";
		enemy.style.left = Math.floor(Math.random()*150)+"px";
		enemy.style.backgroundColor = randomColor();
		enemy.innerHTML = "<br>"+(x+1);
		gameArea.appendChild(enemy);
	}
	console.log(player);
	window.requestAnimationFrame(playGame);
}

function randomColor(){
	function c(){
		let hex = Math.floor(Math.random()*256).toString(16);
		return ("0"+hex).substr(-1);
	}
	return "#"+c()+c()+c();
}