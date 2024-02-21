var imgpath = [
  "icon-rock.svg",
  "icon-paper.svg",
  "icon-scissors.svg",
  "icon-lizard.svg",
  "icon-spock.svg",
];
var classes = ["rock", "paper", "scissors", "lizard", "spock"];
var userPick = -1;
var compPick = -1;
var conf;
var score = 0;

//update score in the html
//confetti
function updateScore() {
  document.querySelector("#score").innerHTML = score;

  var canvas = document.createElement("canvas");
  var container = document.getElementsByClassName("post-pick")[0];
  canvas.width = 600;
  canvas.height = 600;

  container.appendChild(canvas);

  var confetti_button = confetti.create(canvas);

  if (conf) {
    confetti_button({
      particleCount: 300,
      spread: 360,
      scalar: 0.8,
      startVelocity: 40,
      ticks: 150,
    }).then(() => container.removeChild(canvas));
  }
}

// play again
document.querySelector("#again").addEventListener("click", function () {
  document.querySelector(".pick").classList.remove("hidden");
  document.querySelector(".post-pick").classList.add("hidden");
  document.querySelector(".result").classList.add("stealth");
});

//Function to proceed to step-II
//  reset user-pick css
//  updates the user-pick icon and the corresponding css
//  add loading gif
function stepTwo(ind) {
  document.querySelector(".pick").classList.add("hidden");
  document.querySelector(".post-pick").classList.remove("hidden");
  document.querySelector("#user-pick-img").src = "images/" + imgpath[ind];

  document
    .querySelector("#user-pick-img")
    .classList.remove(classes[0], classes[1], classes[2]);
  document
    .querySelector("#comp-pick-img")
    .classList.remove(classes[0], classes[1], classes[2]);
  document.querySelector("#comp-pick-img").src = "images/loading100px.svg";
  document.querySelector("#comp-pick-img").classList.add("loading");
  document.querySelector("#user-pick-img").classList.add(classes[ind]);

  processing();
  // document.querySelector(".user-pick-caption").innerText=cap;
}

//logic
function compare() {
  var i = userPick;
  var j = compPick;
  conf = false;

  if (i === j) {
    document.querySelector("#res").innerText = "DRAW";
  } else if (i === 0) {
    if (j === 1) {
      document.querySelector("#res").innerText = "you lost";
      score--;
    } else if (j === 2) {
      document.querySelector("#res").innerText = "you won";
      score++;
      conf = true;
    }
  } else if (i === 1) {
    if (j === 0) {
      document.querySelector("#res").innerText = "you won";
      score++;
      conf = true;
    } else if (j === 2) {
      document.querySelector("#res").innerText = "you lost";
      score--;
    }
  } else if (i === 2) {
    if (j === 0) {
      document.querySelector("#res").innerText = "you lost";
      score--;
    } else if (j === 1) {
      document.querySelector("#res").innerText = "you won";
      score++;
      conf = true;
    }
  }

  updateScore();
}

// Set a delay for 3 seconds
// makes choice
function processing() {
  setTimeout(function () {
    // Code to execute after 3 seconds

    //original
    compPick = Math.floor(Math.random() * 3);

    document.querySelector("#comp-pick-img").src =
      "images/" + imgpath[compPick];
    document.querySelector("#comp-pick-img").classList.remove("loading");
    document.querySelector("#comp-pick-img").classList.add(classes[compPick]);
    compare();
    document.querySelector(".result").classList.remove("stealth");
  }, 500); // 3000 milliseconds = 3 seconds
}

// Identification of the user-pick

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("rules-toggle")) {
    document.querySelector(".container").classList.toggle("darken");
    // document.querySelector(".container").classList.toggle("hidden");
    document.querySelector(".container2").classList.toggle("hidden");
  }

  if (event.target.classList.contains("p-rock")) {
    userPick = 0;
    stepTwo(0);
  }
  if (event.target.classList.contains("p-scissors")) {
    userPick = 2;
    stepTwo(2);
  }
  if (event.target.classList.contains("p-paper")) {
    userPick = 1;
    stepTwo(1);
  }
});
