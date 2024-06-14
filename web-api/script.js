document.addEventListener("DOMContentLoaded", async () => {
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
      iterations: 2,
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
        squareAnimation.ready.then(() => {
          console.log("playState after play", squareAnimation.playState);
        });
      }
      if (button.classList.contains("pause")) {
        squareAnimation.pause();
        squareAnimation.ready.then(() => {
          console.log("playState after pause", squareAnimation.playState);
        });
      }
      if (button.classList.contains("cancel")) {
        squareAnimation.cancel();
        squareAnimation.ready.then(() => {
          console.log("playState after cancel", squareAnimation.playState);
        });
      }
      if (button.classList.contains("reverse")) {
        squareAnimation.reverse();
      }
      if (button.classList.contains("finish")) {
        squareAnimation.finish();
      }
      if (button.classList.contains("changeAnimation")) {
        squareAnimation.effect.setKeyframes([
          {
            transform: "translateY(0)",
          },
          {
            backgroundColor: "greenyellow",
            offset: 0.8,
          },
          {
            transform: "translateY(calc(100vh - 100px)) rotate(360deg)",
            backgroundColor: "purple",
          },
        ]);
      }
      if (button.classList.contains("loginfo")) {
        console.log("currentTime", squareAnimation.currentTime);
        console.log("startTime", squareAnimation.startTime);
        console.log("playbackRate", squareAnimation.playbackRate);
        console.log("playState", squareAnimation.playState);
        console.log("KeyFrames", squareAnimation.effect.getKeyframes());
        console.log("Timing", squareAnimation.effect.getTiming());
        console.log(
          "ComputedTiming",
          squareAnimation.effect.getComputedTiming()
        );
      }
    });

    /** @type {HTMLInputElement} */
    const playbackRateInput = document.getElementById("playbackRateInput");

    /** @type {HTMLOutputElement} */
    const playbackRateInputValue = document.getElementById(
      "playbackRateInputValue"
    );

    playbackRateInput.value = squareAnimation.playbackRate;
    playbackRateInputValue.value = squareAnimation.playbackRate;
    playbackRateInput.addEventListener("input", (e) => {
      if (!(e.target instanceof HTMLInputElement)) return;
      squareAnimation.updatePlaybackRate(e.target.value);
      playbackRateInputValue.value = e.target.value;
    });
  });

  /** @type {HTMLInputElement} */
  const durationInput = document.getElementById("durationInput");

  /** @type {HTMLOutputElement} */
  const durationInputValue = document.getElementById("durationInputValue");

  durationInput.value = squareAnimation.effect.getComputedTiming().duration;
  durationInputValue.value =
    squareAnimation.effect.getComputedTiming().duration;

  durationInput.addEventListener("input", (e) => {
    if (!(e.target instanceof HTMLInputElement)) return;
    squareAnimation.effect.updateTiming({
      duration: parseInt(e.target.value),
    });
    durationInputValue.value = e.target.value;
  });

  /** @type {HTMLInputElement} */
  const infiniteInput = document.getElementById("infiniteInput");

  infiniteInput.checked =
    squareAnimation.effect.getComputedTiming().iterations === Infinity;

  infiniteInput.addEventListener("change", (e) => {
    if (!(e.target instanceof HTMLInputElement)) return;
    squareAnimation.effect.updateTiming({
      iterations: e.target.checked ? Infinity : 2,
    });
  });

  /** @type {HTMLInputElement} */
  const currentTimeInput = document.getElementById("currentTimeInput");
  currentTimeInput.value = squareAnimation.currentTime;
  currentTimeInput.addEventListener("input", (e) => {
    if (e.target instanceof HTMLInputElement) {
      squareAnimation.currentTime = e.target.value;
    }
  });

  /** @type {HTMLInputElement} */
  const startTimeInput = document.getElementById("startTimeInput");
  startTimeInput.value = squareAnimation.startTime;
  startTimeInput.addEventListener("input", (e) => {
    if (e.target instanceof HTMLInputElement) {
      squareAnimation.startTime = e.target.value;
    }
  });

  squareAnimation.pause();
  console.log("playState after pause:", squareAnimation.playState);
  console.log("pending after pause:", squareAnimation.pending);

  squareAnimation.ready.then(() => {
    console.log("Animation ready");
    console.log("playState after ready:", squareAnimation.playState);
    console.log("pending after ready:", squareAnimation.pending);
  });

  squareAnimation.play();
  console.log("playState after play:", squareAnimation.playState);
  console.log("pending after play:", squareAnimation.pending);

  squareAnimation.addEventListener("finish", (e) => {
    console.log(e);
  });
  squareAnimation.addEventListener("cancel", (e) => {
    console.log(e);
  });
});
