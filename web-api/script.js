document.addEventListener("DOMContentLoaded", () => {
  /** @type {HTMLDivElement}  */
  const element = document.querySelector(".square");
  const squareAnimation = element.animate(
    [
      {
        transform: "translateX(0)",
        easing: "ease-in",
      },
      {
        backgroundColor: "blue",
        offset: 0.8,
        composite: "replace",
      },
      {
        transform: "translateX(calc(100vw - 100px)) rotate(360deg)",
        backgroundColor: "crimson",
      },
    ],
    {
      duration: 3000,
      delay: 1000,
      direction: "alternate",
      fill: "both",
      iterations: Infinity,
      easing: "linear",
      composite: "add",
      iterationComposite: "accumulate",
      timeline: document.timeline,
    }
  );
  squareAnimation.pause();
  console.log(squareAnimation);

  /** @type {HTMLButtonElement[]} */
  const buttons = document.querySelectorAll(".button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("play")) {
        squareAnimation.play();
      }
      if (button.classList.contains("pause")) {
        squareAnimation.pause();
      }
      if (button.classList.contains("cancel")) {
        squareAnimation.cancel();
      }
      if (button.classList.contains("reverse")) {
        squareAnimation.reverse();
      }
      if (button.classList.contains("finish")) {
        squareAnimation.finish();
      }
    });

    /** @type {HTMLInputElement} */
    const playbackRateInput = document.getElementById("playbackRateInput");

    /** @type {HTMLOutputElement} */
    const playbackRateInputValue = document.getElementById(
      "playbackRateInputValue"
    );

    playbackRateInput.addEventListener("input", (e) => {
      if (!(e.target instanceof HTMLInputElement)) return;
      squareAnimation.updatePlaybackRate(e.target.value);
      playbackRateInputValue.value = e.target.value;
    });
  });

  /** @type {HTMLInputElement} */
  const durationInput = document.getElementById("durationInput");
});
