document.addEventListener("DOMContentLoaded", () => {
  /** @type {HTMLDivElement} */
  const container1 = document.querySelector(".c-1");

  /** @type {HTMLDivElement} */
  const container2 = document.querySelector(".c-2");

  const progress = document.querySelector(".c-1 .progress .progress-inner");

  /** @type {AnimationTimeline} */
  const timeline = new ScrollTimeline({
    source: container2,
    axis: "block",
  });

  /** @type {AnimationTimeline} */
  const viewTimeline = new ViewTimeline({
    subject: progress,
    axis: "block",
    // inset: ["auto", CSS.px(100)],
  });

  console.log(viewTimeline);

  progress.animate(
    [
      {
        width: 0,
      },
      {
        width: CSS.percent(100),
      },
    ],
    {
      fill: "both",
      timeline: viewTimeline,
      rangeStart: {
        rangeName: "cover",
        offset: CSS.percent(30),
      },
      // rangeEnd: "",
    }
  );

  container1.animate(
    [
      {
        backgroundColor: "salmon",
      },
    ],
    {
      fill: "both",
      timeline: viewTimeline,
    }
  );
});
