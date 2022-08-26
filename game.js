
const buttonColours = ["red", "blue", "green", "yellow"]
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let startGame = false;
let isCorrect = true;

function newSequence() {
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour);  
    //use jQuery to select button
    $("#"+randomChosenColour).fadeOut(200).fadeIn(500);
    //play sound
    playSound(randomChosenColour)
    //increment level by 1 
    level++;
    $("h1").text("Level: " + level)
  }

//User click a button
$(".btn").click((e)=> {
    const userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    if (userClickedPattern.length === gamePattern.length) {
       isCorrect = checkAnswer();
       if (!isCorrect) {
        $("h1").text("Incorrect. Press reset to try again")
        }   
    }
})
 

//check answer 
function checkAnswer() {
        for (let i = 0; i < gamePattern.length; i++) { 
            if (userClickedPattern[i] !== gamePattern[i]) {
               return false; 
            }   
        }
        userClickedPattern = [];
        window.setTimeout( ()=> newSequence(), 1000 )
        return true;
}

//start over
function startOver() {
   gamePattern = [];
   level = 0;
   startGame = false;
   isCorrect = true;
   userClickedPattern = [];
   $("h1").text("Press A Key to Start")
}


//Play sound 
function playSound(name) {
    const audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColour) {
   $("#"+ currentColour).addClass("pressed")
   window.setTimeout( ()=> $("#"+ currentColour).removeClass("pressed"),50)
}

 
$(document).keypress(() => {
    if (!startGame) {
        newSequence();
        $("h1").text("Level: " + level)
        startGame= true;
     }   
})
 





 