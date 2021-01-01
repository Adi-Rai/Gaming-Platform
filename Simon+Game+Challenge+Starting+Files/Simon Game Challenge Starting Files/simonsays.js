let buttonColors = ["red","green","yellow","blue"];
let gamePattern = [];
let userClickedPattern = [];
let gameStarted = false;
let level = 0;

$(document).on("keypress",()=>{
    if(!gameStarted){
        nextSequence();
        $("h1").text(`Level ${level}`);
        gameStarted=true;
    }
    
})


$(".btn").on('click', function() {
    let userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer();
});

function playSound(name){
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColor){
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(()=>{
        $(`#${currentColor}`).removeClass("pressed");
    },200);
}

function nextSequence(){
    level++;
    $("h1").text(`Level ${level}`); 
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);   
    userClickedPattern=[];  
}

function checkAnswer(){
    if (userClickedPattern.length === gamePattern.length){
        if (JSON.stringify(userClickedPattern)=== JSON.stringify(gamePattern)){
            setTimeout(()=>{
                nextSequence();
            },1000);
        }
        else{
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(()=>{
                $("body").removeClass("game-over");
            },200);
            $("h1").text("Game Over, Press Any Key to Restart");
            startOver();
        }   
    }

    else if(userClickedPattern[userClickedPattern.length-1] !== gamePattern[userClickedPattern.length-1]){
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(()=>{
        $("body").removeClass("game-over");
                },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
   
}

function startOver(){
    level = 0;
    gamePattern =[];
    gameStarted=false;
}