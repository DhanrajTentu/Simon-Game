var buttonColors = ["red", "green", "yellow", "orange"];
var gamePattern = [];
var userClickedPattern = [];

// first time key press -----------------

var started = false;
var level = 0;
$(document).keydown(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// button clicks ----------------

$('.btn').click(function () {

    var userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(userClickedPattern.length - 1)
});

// Check answer a.k.a The Real Boss fight -----------

function checkAnswer(currentLevel) {

    // Check if the LAST button clicked is right

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        // ONLY if the count is the same number as gamePattern length,
        // (meaning each one of the colors was right) then it's success

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 500);
        }
        // otherwise, it's wrong and trigger Game Over

    } else {
        playSound("wrong");

        $("body").addClass("game-over");
        $("h1").text("Game Over :( ,Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 300);


        startOver();
    }

}
// trigger next sequence -----------------

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);


    var randomNumber = Math.floor(Math.random() * 4);
    var randomChoosenColors = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColors);

    // button animations -------------

    $("#" + randomChoosenColors).fadeOut(100).fadeIn(100).fadeIn(200);
    playSound(randomChoosenColors);
}

function playSound(sound) {
    var audio = new Audio("sounds/" + sound + ".mp3");
    audio.play();
}




function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed")
    setTimeout(function () {
        $("#" + currentColor).removeClass('pressed');
    }, 100);
}
// Reset every variable -------------

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

