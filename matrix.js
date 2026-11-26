(() => {
  const canvas = document.querySelector("#matrix-rain");
  const context = canvas?.getContext("2d");
  if (!context) return;

  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const glyphs = "0123456789ABCDEF:+=<>";
  const rowHeight = 18;
  let width = 0;
  let height = 0;
  let streams = [];
  let frame = 0;
  let lastTime = 0;
  let elapsed = 0;

  // Stable per-column variation avoids flickering random characters each frame.
  function noise(seed) {
    const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
    return value - Math.floor(value);
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    context.font = '12px "Courier New", monospace';
    context.textAlign = "center";
    context.textBaseline = "middle";

    streams = Array.from({ length: Math.ceil(width / 36) }, (_, column) => ({
      x: column * 36 + 18,
      length: 10 + Math.floor(noise(column + 1) * 14),
      speed: 18 + noise(column + 13) * 20,
      phase: noise(column + 31),
      brightness: .1 + noise(column + 53) * .1,
    })).filter((_, column) => noise(column + 71) > .26);
    draw();
  }

  function draw() {
    context.clearRect(0, 0, width, height);
    for (const stream of streams) {
      const trailHeight = stream.length * rowHeight;
      const cycleHeight = height + trailHeight + 280;
      const head = (stream.phase * cycleHeight + elapsed * stream.speed) % cycleHeight;
      for (let tail = 0; tail < stream.length; tail++) {
        const y = head - tail * rowHeight;
        if (y < 0 || y > height) continue;
        const fade = (1 - tail / stream.length) ** 2;
        const seed = Math.floor(head / rowHeight) - tail + stream.x;
        const symbol = glyphs[Math.floor(noise(seed) * glyphs.length)];
        context.fillStyle = tail === 0
          ? `rgba(181, 207, 136, ${stream.brightness * 1.25})`
          : `rgba(116, 154, 71, ${stream.brightness * fade})`;
        context.fillText(symbol, stream.x, y);
      }
    }
  }

  function tick(now) {
    frame = 0;
    if (document.hidden || motionPreference.matches) return;
    if (!lastTime) lastTime = now;
    const delta = now - lastTime;
    if (delta >= 1000 / 30) {
      elapsed += Math.min(delta, 100) / 1000;
      lastTime = now;
      draw();
    }
    frame = window.requestAnimationFrame(tick);
  }

  function updatePlayback() {
    window.cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
    draw();
    if (!document.hidden && !motionPreference.matches) {
      frame = window.requestAnimationFrame(tick);
    }
  }

  window.addEventListener("resize", resize, { passive: true });
  document.addEventListener("visibilitychange", updatePlayback);
  motionPreference.addEventListener("change", updatePlayback);
  resize();
  updatePlayback();
})();
