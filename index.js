let userClickedPattern = [];
let gamePattern = [];

let buttonColours = ["red", "blue", "green", "yellow"];
let level = 0;


function nextSequence() {
    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random() * 4);

    let randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);

    $("." + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

    $("h1").text("Level " + level++);

}


// When you refresh the website it will make a sound of randomly selected button
$(document).keydown(function () {
    if (level === 0) {
        nextSequence()
    }
});


// This is the code that we use for both: randomly selected buttons and the buttons we choose to click on functions.
// Because they have the same code structure at some point, but different inputs: for the first one name=randomChosenColor. For the second one name=ID of the button we click on
function playSound(name) {
    let buttonID = name;
    let audio = new Audio("sounds/" + buttonID + ".mp3");
    audio.play();
}

//When you click on a button, this function helps you to play a sound of it. (green button->green.mp3)
$(".btn").click(function () {
    let buttonID = this.id;
    userClickedPattern.push(buttonID);
    playSound(buttonID);
    animatePress(buttonID);
    let indexOfLast = userClickedPattern.length - 1;
    checkAnswer(indexOfLast);
});


function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    console.log("user choice: " + userClickedPattern);
    console.log("Game pattern: " + gamePattern);

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }
    } else {
        playSound("wrong")
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}


function startOver() {
    level = 0;
    gamePattern = [];

}