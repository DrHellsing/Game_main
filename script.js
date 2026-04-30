const board = document.getElementById("game-board");

for (let i = 1; i <= 4; i++) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.textContent = "Test " + i;
  board.appendChild(card);
