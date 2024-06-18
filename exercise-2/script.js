document.addEventListener("DOMContentLoaded", () => {
  /** @type {HTMLDivElement} */
  const character = document.querySelector(".character");

  /** @type {HTMLDivElement} */
  const street = document.querySelector(".street");

  /** @type {HTMLDivElement} */
  const background = document.querySelector(".background");

  /** @type {HTMLDivElement} */
  const foreground = document.querySelector(".foreground");

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
    if (character.getAnimations().find((animation) => animation.id === "jump"))
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

    await jumpAnimation.finished;
    characterAnimation.play();
    character.classList.remove("jump");
  }

  document.addEventListener("keyup", (event) => {
    switch (event.code) {
      case "ArrowUp":
        jump();
        break;
      case "ArrowRight":
        break;
      case "ArrowLeft":
        break;
      case "Space":
        break;

      default:
        break;
    }
  });
});
