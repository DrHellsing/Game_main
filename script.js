const cardsData = [
  { id: 1, type: "text", content: "Хоробрий герой у зеленому, обраний долею" },
  {
    id: 1,
    type: "image",
    content: "images/312px-EoW_Link_Render.png"
  },

  // MARIO
  { id: 2, type: "text", content: "Відомий водопровідник, що рятує принцесу" },
  {
    id: 2,
    type: "image",
    content: "images/180px-MarioAlternateJamboreeRender.png"
  },

  {
    id: 3,
    type: "text",
    content: "Вампір-відступник із харизматичною поведінкою"
  },
  {
    id: 3,
    type: "image",
    content: "images/astariont-avatar.png"
  },

  {
    id: 4,
    type: "text",
    content: "Довгов'язий суперник у фіолетовому костюмі"
  },
  {
    id: 4,
    type: "image",
    content: "images/225px-SuperMarioParty_Waluigi.png"
  },

  {
    id: 5,
    type: "text",
    content: "Воїнка-гитьянкі, сувора та дисциплінована"
  },
  {
    id: 5,
    type: "image",
    content: "images/laezel.png"
  },

  { id: 6, type: "text", content: "Мисливець на демонів із контрактом сили" },
  {
    id: 6,
    type: "image",
    content: "images/wyll-avatar.png"
  },

  { id: 7, type: "text", content: "Антигерой із хаотичним способом життя" },
  {
    id: 7,
    type: "image",
    content: "images/Postal_Dude-P2R.jpg"
  },
  {
    id: 8,
    type: "text",
    content: "Безіменний мандрівник із Планів, проклятий безсмертям і втратою пам’яті після кожної смерті"
  },
  {
    id: 8,
    type: "image",
    content: "images/Nameless_One.jpg"
     
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
  const shuffled = shuffle([...cardsData]);

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
      first.classList.remove("selected");
      second.classList.remove("selected");
      reset();
    }, 600);
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
