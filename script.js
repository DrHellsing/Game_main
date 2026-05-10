const cardsData = [
  { id: 1, type: "text", content: "Краще води з річки сьорбнути, ніж пойла місцевого частування." },
  {
    id: 1,
    type: "image",
    content: "images/Rihter.png"
  },

  { id: 2, type: "text", content: "О-о-х, люблю цю пору року. Де не поглянь, з'являються придурки." },
  {
    id: 2,
    type: "image",
    content: "images/Karlach.png"
  },

  {
    id: 3,
    type: "text", content: "Мені так подобається, коли ти простакам елементарні речі пояснюєш!"
  },
  {
    id: 3,
    type: "image",
    content: "images/John.png"
  },

  {
    id: 4,
    type: "text", content: "Щойно прозвучали настанови «Як стати легендою»."
  },
  {
    id: 4,
    type: "image",
    content: "images/Johnny.png"
  },

  {
    id: 5,
    type: "text",
    content: "Я шляхетний пан. Шляхта не працює! Що, як хтось мене побачить?"
  },
  {
    id: 5,
    type: "image",
    content: "images/Jan.png"
  },

  { id: 6, type: "text", content: "Я теж «у-у-у». Але я також «ї-ї-ї»! А отже, «ї-ї-ї» врівноважує «у-у-у»." },
  {
    id: 6,
    type: "image",
    content: "images/Eskie.png"
  },

  { id: 7, type: "text", content: "Я насолоджуюся некорисністю сьогодні й готую свою корисність на завтра." },
  {
    id: 7,
    type: "image",
    content: "images/Gustav.png"
  },
  {
    id: 8,
    type: "text",
    content: "Я зголоднів."
  },
  {
    id: 8,
    type: "image",
    content: "images/Henry.png"
  }
];

let first = null;
let second = null;
let lock = false;

let score = 0;
let startTime = 0;
let time = 60;
let interval = null;

let gameStarted = false;
let gameOver = false;

function updateScore() {
  document.getElementById("score").textContent = "Рахунок: " + score;
}

function updateTimer() {
  document.getElementById("timer").textContent = "Час: " + time;
}

function showMessage(text) {
  document.getElementById("message").textContent = text;
}

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function clearBoard() {
  document.getElementById("game-board").innerHTML = "";
}

function render() {
  clearBoard();

const board = document.getElementById("game-board");
const images = shuffle(cardsData.filter(item => item.type === "image"));
const texts = shuffle(cardsData.filter(item => item.type === "text"));

const shuffled = [
  ...images.slice(0, 4),
  ...texts,
  ...images.slice(4)
];

  shuffled.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.id = item.id;

 if (!gameStarted) {
  const img = document.createElement("img");
  img.src = "images/logo.png";
  img.classList.add("cover-img");
  card.appendChild(img);
} else {
  if (item.type === "image") {
    const img = document.createElement("img");
    img.src = item.content;
    card.appendChild(img);
  } else {
    card.textContent = item.content;
  }
}

    card.addEventListener("click", () => selectCard(card));

    board.appendChild(card);
  });
}

function selectCard(card) {
  if (
    !gameStarted ||
    gameOver ||
    lock ||
    card.classList.contains("matched") ||
    card === first
  ) return;
  
  card.classList.add("selected");

  if (!first) {
    first = card;
    return;
  }

  second = card;
  lock = true;

  if (first.dataset.id === second.dataset.id) {
    first.classList.add("matched");
    second.classList.add("matched");

    score++;
    updateScore();

    reset();

    checkWin();
  } else {
   setTimeout(() => {
  first.classList.add("wrong");
  second.classList.add("wrong");

  setTimeout(() => {
    first.classList.remove("selected", "wrong");
    second.classList.remove("selected", "wrong");
    reset();
  }, 500);
}, 300);
  }
}

function reset() {
  first = null;
  second = null;
  lock = false;
}

function checkWin() {
  const matched = document.querySelectorAll(".matched").length;
  if (matched === cardsData.length) {
    gameOver = true;
    clearInterval(interval);
    const seconds = Math.floor((Date.now() - startTime) / 1000);
showMessage("🎉 Перемога! Час: " + seconds + " сек");
  }
}

function startTimer() {
  interval = setInterval(() => {
    if (gameOver || !gameStarted) return;

    time--;
    updateTimer();

    if (time <= 0) {
      gameOver = true;
      clearInterval(interval);
     const seconds = Math.floor((Date.now() - startTime) / 1000);
showMessage("💀 Поразка! Минуло: " + seconds + " сек");
    }
  }, 1000);
}

function startGame() {
  if (gameStarted) return;

  gameStarted = true;
  gameOver = false;
  startTime = Date.now();

  showMessage("");
  render();

  clearInterval(interval);
  startTimer();
}

function restartGame() {
  clearInterval(interval);

  score = 0;
  time = 60;
  startTime = 0;

  first = null;
  second = null;
  lock = false;

  gameStarted = false;
  gameOver = false;

  updateScore();
  updateTimer();
  showMessage("");

  render();
}

document.getElementById("startBtn").addEventListener("click", startGame);
document.getElementById("restartBtn").addEventListener("click", restartGame);

updateScore();
updateTimer();
render();
