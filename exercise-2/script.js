document.addEventListener("DOMContentLoaded", () => {
  /** @type {HTMLDivElement} */
  const character = document.querySelector(".character");

  /** @type {HTMLDivElement} */
  const street = document.querySelector(".street");

  /** @type {HTMLDivElement} */
  const background = document.querySelector(".background");

  /** @type {HTMLDivElement} */
  const foreground = document.querySelector(".foreground");

  /** @type {HTMLDivElement} */
  const carWrapper = document.querySelector(".car-wrapper");

  const characterAnimation = character.animate(
    [
      {
        backgroundPosition: "0 0",
      },
      {
        backgroundPosition: "calc(var(--char-width) * -7) 0",
      },
    ],
    {
      duration: 1000,
      iterations: Infinity,
      easing: "steps(8,jump-none)",
    }
  );

  const streetAnimation = street.animate(
    [
      {
        transform: "translateX(0)",
      },
      {
        transform: "translateX(-50%)",
      },
    ],
    {
      duration: 12000,
      easing: "linear",
      iterations: Infinity,
    }
  );

  const backgroundAnimation = background.animate(
    [
      {
        transform: "translateX(100%)",
      },
      {
        transform: "translateX(-100%)",
      },
    ],
    {
      duration: streetAnimation.effect.getComputedTiming().duration * 2,
      easing: "linear",
      iterations: Infinity,
    }
  );

  const foregroundAnimation = foreground.animate(
    [
      {
        transform: "translateX(100%)",
      },
      {
        transform: "translateX(-100%)",
      },
    ],
    {
      duration: streetAnimation.effect.getComputedTiming().duration * 1.5,
      easing: "linear",
      iterations: Infinity,
    }
  );

  async function jump() {
    if (
      streetAnimation.playState !== "running" ||
      character.getAnimations().find((animation) => animation.id === "jump")
    )
      return;
    characterAnimation.pause();
    character.classList.add("jump");
    const jumpAnimation = character.animate(
      [
        {
          transform: "translateY(0)",
        },
        {
          transform: "translateY(-70px)",
        },
      ],
      {
        iterations: 2,
        easing: "ease-in-out",
        duration: 500,
        direction: "alternate",
        id: "jump",
      }
    );

    const { duration, iterations, direction, easing } =
      jumpAnimation.effect.getComputedTiming();
    document.querySelector(".shadow").animate(
      [
        {
          transform: "scale(1)",
        },
        {
          transform: "scale(1.15)",
        },
      ],
      { duration, iterations, direction, easing }
    );
    await jumpAnimation.finished;
    characterAnimation.play();
    character.classList.remove("jump");
  }

  function togglePlayState() {
    document.getAnimations().forEach((animation) => {
      if (animation.playState === "running") {
        animation.pause();
      } else {
        animation.play();
      }
    });
    addNewCar();
  }

  function runFaster() {
    if (streetAnimation.playbackRate >= 3) return;
    document.getAnimations().forEach((animation) => {
      if (animation.id !== "car") {
        animation.playbackRate *= 1.1;
      }
    });
  }

  function runSlower() {
    if (streetAnimation.playbackRate <= 0.8) return;
    document.getAnimations().forEach((animation) => {
      if (animation.id !== "car") {
        animation.playbackRate *= 0.9;
      }
    });
  }

  setInterval(() => {
    if (streetAnimation.playState === "running") {
      runSlower();
    }
  }, 5000);

  async function addNewCar() {
    if (
      streetAnimation.playState !== "running" ||
      document.querySelector(".car")
    )
      return;

    const car = document.createElement("div");
    car.classList.add("car");
    const carAnimation = car.animate(
      [
        {
          transform: "translateX(-100vw)",
        },
        {
          transform: "translateX(100vw)",
        },
      ],
      {
        duration: Math.random() * 4000 + 2000,
        easing: "linear",
        id: "car",
      }
    );

    [":after", ":before"].forEach((pseudoElement) => {
      car.animate(
        [
          {
            transform: "rotate(0)",
          },
          {
            transform: "rotate(360deg)",
          },
        ],
        {
          iterations: Infinity,
          easing: "linear",
          duration: carAnimation.effect.getComputedTiming().duration / 4,
          pseudoElement: pseudoElement,
          id: "car",
        }
      );
    });

    carWrapper.appendChild(car);
    await carAnimation.finished;
    car.remove();

    setTimeout(() => {
      if (streetAnimation.playState === "running") {
        addNewCar();
      }
    }, Math.random() * 4000);
  }

  streetAnimation.ready.then(() => {
    if (streetAnimation.playState === "running") {
      addNewCar();
    }
  });

  document.addEventListener("keyup", (event) => {
    switch (event.code) {
      case "ArrowUp":
        jump();
        break;
      case "ArrowRight":
        runFaster();
        break;
      case "ArrowLeft":
        runSlower();
        break;
      case "Space":
        togglePlayState();
        break;

      default:
        break;
    }
  });
});
