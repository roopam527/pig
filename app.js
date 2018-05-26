var scores, roundScore, activePlayer, gamevariable, prev = 0,
    prev2 = 0;

init();

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0; //0 means first player and 1 means second player
    gamevariable = true;
    document.querySelector(".dice").style.display = "none";
    document.querySelector(".dice2").style.display = "none";


    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.getElementById("name-0").textContent = "player 1";
    document.getElementById("name-1").textContent = "player 2";
    document.querySelector(".player-0-box").classList.remove("winner");
    document.querySelector(".player-1-box").classList.remove("winner");
    document.querySelector(".player-0-box").classList.remove("active");
    document.querySelector(".player-1-box").classList.remove("active");

    document.querySelector(".player-0-box").classList.add("active");
    document.querySelector(".input").classList.remove("display-invisible");


}




document.querySelector(".btn-roll").addEventListener("click", function () {

    if (gamevariable === true) {
        // 1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // 2.Display the result
        var diceDOM = document.querySelector(".dice");
        var dice2DOM = document.querySelector(".dice2");

        diceDOM.style.display = "block";
        dice2DOM.style.display = "block";


        diceDOM.src = "dice-" + dice + ".png";
        dice2DOM.src = "dice-" + dice2 + ".png";


        // 3. update the value of round if dice not equal to 1

        if (dice !== 1 && dice2 !== 1) {
            // Add score

            roundScore += dice + dice2;
            document.getElementById("current-" + activePlayer).textContent = roundScore;


            //checking if two times six
            if (dice === 6 && prev === 6 || dice2 === 6 && prev2 === 6) {
                scores[activePlayer] = 0;
                document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
                changeUser();

                console.log(dice + " == " + prev);

                prev = 0;
                prev2 = 0;

                return 0;
            }
            prev = dice;

        } else {
            //next player
            changeUser();
            prev = 0;
            prev2 = 0;
        }

        //4. hiding the input box
        document.querySelector(".input").classList.add("display-invisible");
    }
});



document.querySelector(".btn-hold").addEventListener("click", function () {
    prev = 0;
    prev2=0;
    if (gamevariable === true) {
        // 1.Add Current score to Global Score
        scores[activePlayer] += roundScore;

        // 3.Update th UI

        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

        // 3.chack if player win the game



        if (scores[activePlayer] > document.querySelector(".input").value - 1) {
            document.querySelector("#name-" + activePlayer).textContent = "winner";
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".dice2").style.display = "none";
            
            document.querySelector(".player-" + activePlayer + "-box").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-box").classList.remove("active");
            gamevariable = false;

        } else {
            changeUser();
        }

    }

})

function changeUser() {
    document.querySelector(".player-" + activePlayer + "-box").classList.remove("active");
    roundScore = 0;
    document.getElementById("current-" + activePlayer).textContent = roundScore;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector(".player-" + activePlayer + "-box").classList.add("active");

    document.querySelector(".dice").style.display = "none";
    document.querySelector(".dice2").style.display = "none";
    
}


document.querySelector(".btn-new").addEventListener("click", init)