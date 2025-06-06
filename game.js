var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];

var started = false;
var level=0;

$(document).keypress(function(){
    if(!started){
        nextSequence();
        started=true;
        $("#level-title").text("Level "+ level);
    }
})



function nextSequence(){
    userClickedPattern=[];
    var randomNumber = Math.floor(Math.random() * 4);
    
    level++;
    $("#level-title").text("Level " + level);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
}

$(".btn").click(function(){
    
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);

})

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#"+ currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length ===gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
  
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}