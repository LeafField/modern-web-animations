document.addEventListener("DOMContentLoaded", () => {
  /** @type {HTMLDivElement} */
  const square = document.querySelector(".square");
  square.addEventListener("animationstart", (e) => {
    console.log(e.type, e);
  });
  square.addEventListener("animationend", (e) => {
    console.log(e.type, e);
  });
  square.addEventListener("animationiteration", (e) => {
    console.log(e.type, e);
  });
  square.addEventListener("animationcancel", (e) => {
    console.log(e.type, e);
  });
});
