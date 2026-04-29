const cardsData = [
  { id: 1, type: "Link", content: "Хоробрий герой у зеленому, обраний долею" },
  {
    id: 1,
    type: "image",
    content:
      "https://cdn.wikimg.net/en/zeldawiki/images/thumb/f/fc/EoW_Link_Render.png/312px-EoW_Link_Render.png"
  },

  // MARIO
  { id: 2, type: "Mario", content: "Відомий водопровідник, що рятує принцесу" },
  {
    id: 2,
    type: "image",
    content:
      "https://mario.wiki.gallery/images/thumb/0/0d/MarioAlternateJamboreeRender.png/180px-MarioAlternateJamboreeRender.png"
  },

  {
    id: 3,
    type: "Astarion",
    content: "Вампір-відступник із харизматичною поведінкою"
  },
  {
    id: 3,
    type: "image",
    content:
      "https://baldursgate3.wiki.fextralife.com/file/Baldurs-Gate-3/astariont-avatar.png"
  },

  {
    id: 4,
    type: "text",
    content: "Довгов'язий суперник у фіолетовому костюмі"
  },
  {
    id: 4,
    type: "image",
    content:
      "https://mario.wiki.gallery/images/thumb/2/27/SuperMarioParty_Waluigi.png/225px-SuperMarioParty_Waluigi.png"
  },

  {
    id: 5,
    type: "Leyzel",
    content: "Воїнка-гитьянкі, сувора та дисциплінована"
  },
  {
    id: 5,
    type: "image",
    content:
      "https://baldursgate3.wiki.fextralife.com/file/Baldurs-Gate-3/laezel.png"
  },

  { id: 6, type: "Wyll", content: "Мисливець на демонів із контрактом сили" },
  {
    id: 6,
    type: "image",
    content:
      "https://baldursgate3.wiki.fextralife.com/file/Baldurs-Gate-3/wyll-avatar.png"
  },

  { id: 7, type: "Dude", content: "Антигерой із хаотичним способом життя" },
  {
    id: 7,
    type: "image",
    content:
      "https://static.wikia.nocookie.net/postal/images/a/a8/Postal_Dude-P2R.jpg"
  },

  {
    id: 8,
    type: "Nameless One",
    content:
      "Безіменний мандрівник із Планів, проклятий безсмертям і втратою пам’яті після кожної смерті"
  },
  {
    id: 8,
    type: "image",
    content:
      "https://static.wikia.nocookie.net/forgottenrealms/images/4/43/Nameless_One.png"
  }
];

let first = null;
let second = null;
let lock = false;

let score = 0;
let time = 60;
let interval = null;

let gameStarted = false;
let gameOver = false;

function updateScore() {
  document.getElementById("score").textContent = "Score: " + score;
}

function updateTimer() {
  document.getElementById("timer").textContent = "Time: " + time;
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

    if (item.type === "image") {
      const img = document.createElement("img");
      img.src = item.content;
      card.appendChild(img);
    } else {
      card.textContent = item.content;
    }

    card.addEventListener("click", () => selectCard(card));

    board.appendChild(card);
  });
}

function selectCard(card) {
  if (!gameStarted || gameOver || lock || card.classList.contains("matched"))
    return;

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
    showMessage("🎉 Перемога!");
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
      showMessage("💀 Поразка!");
    }
  }, 1000);
}

function startGame() {
  if (gameStarted) return;

  gameStarted = true;
  gameOver = false;

  showMessage("");

  render();
  startTimer();
}

function restartGame() {
  clearInterval(interval);

  score = 0;
  time = 60;

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