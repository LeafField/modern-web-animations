window.addEventListener("DOMContentLoaded", () => {
  /** @type {HTMLDivElement} */
  const element = document.querySelector(".square");
  /** @type {HTMLButtonElement} */
  const addButton = document.querySelector(".add-square");
  /** @type {HTMLButtonElement} */
  const toggleColorButton = document.querySelector(".toggle-color");

  addButton.addEventListener("click", () => {
    const newSquare = document.createElement("div");
    newSquare.classList.add("square");
    document.querySelector(".wrapper").append(newSquare);
  });

  toggleColorButton.addEventListener("click", () => {
    /** @type {HTMLDivElement[]} */
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.classList.toggle("blue");
    });
  });
});
