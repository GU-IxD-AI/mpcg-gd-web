(() => {
  const root = document.querySelector(".background-cycle");
  if (!root) return;

  const layers = Array.from(root.querySelectorAll(".background-cycle__layer"));
  if (layers.length < 2) return;

  const duration = Number(root.dataset.duration || 5200);
  const orbs = Array.from(root.querySelectorAll(".orb-field__sphere"));
  let index = 0;
  let orbColor = layers[index]?.dataset.orb || "rgba(124, 163, 189, 0.22)";

  const randomBetween = (min, max) => min + Math.random() * (max - min);

  const resetOrb = (orb, color, withDelay = false, lane = 0) => {
    const laneWidth = 100 / Math.max(orbs.length, 1);
    const laneLeft = lane * laneWidth + randomBetween(1.5, Math.max(2, laneWidth - 8));

    orb.style.setProperty("--orb-color", color);
    orb.style.setProperty("--orb-left", `${laneLeft.toFixed(1)}vw`);
    orb.style.setProperty("--orb-size", `${randomBetween(4.8, 10.5).toFixed(1)}vmax`);
    orb.style.setProperty("--orb-duration", `${randomBetween(72, 118).toFixed(1)}s`);
    orb.style.setProperty("--orb-drift", `${randomBetween(-2.5, 2.5).toFixed(1)}vw`);
    orb.style.setProperty("--orb-scale", randomBetween(0.82, 1.12).toFixed(2));
    orb.style.setProperty("--orb-inner-rotate", `${randomBetween(-28, 34).toFixed(1)}deg`);
    orb.style.setProperty("--orb-sheen-angle", `${randomBetween(0, 360).toFixed(1)}deg`);
    orb.style.setProperty("--orb-stripe-angle", `${randomBetween(12, 78).toFixed(1)}deg`);
    orb.style.setProperty("--orb-material-duration", `${randomBetween(14, 26).toFixed(1)}s`);
    orb.style.setProperty("--orb-material-delay", `${randomBetween(-20, 0).toFixed(1)}s`);
    orb.style.setProperty("--orb-delay", withDelay ? `${randomBetween(-72, -4).toFixed(1)}s` : "0s");
  };

  layers.forEach((layer) => {
    const imageUrl = layer.dataset.image;
    if (!imageUrl || !/\.(png|jpe?g|webp|avif|gif|svg)$/i.test(imageUrl)) return;

    const probe = new Image();
    probe.onload = () => {
      layer.style.backgroundImage = `url("${imageUrl}")`;
    };
    probe.src = imageUrl;
  });

  orbs.forEach((orb, lane) => {
    resetOrb(orb, orbColor, true, lane);
    orb.addEventListener("animationiteration", (event) => {
      if (event.animationName !== "orb-fall") return;
      resetOrb(orb, orbColor, false, lane);
    });
  });

  window.setInterval(() => {
    layers[index].classList.remove("is-active");
    index = (index + 1) % layers.length;
    layers[index].classList.add("is-active");
    orbColor = layers[index].dataset.orb || orbColor;
  }, duration);
})();
