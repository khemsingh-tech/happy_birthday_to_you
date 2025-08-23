// Simple confetti using canvas (no libraries)
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');

let W, H, confetti, running = true;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

function makeConfetti(count = 180) {
  const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#a855f7', '#ec4899'];
  return Array.from({ length: count }, () => ({
    x: Math.random() * W,
    y: Math.random() * -H,              // start above screen for a nice fall
    r: Math.random() * 6 + 3,           // radius
    c: colors[Math.floor(Math.random() * colors.length)],
    a: Math.random() * 2 * Math.PI,     // angle
    v: Math.random() * 2 + 1.5,         // fall speed
    s: Math.random() * 1 + 0.5,         // sway speed
    w: Math.random() * 40 + 20          // sway width
  }));
}

function drawConfetti() {
  if (!running) return;
  ctx.clearRect(0, 0, W, H);

  confetti.forEach(p => {
    p.y += p.v;
    p.x += Math.sin((p.y / p.w) * p.s);

    // twinkle effect
    const tw = 0.75 + 0.25 * Math.sin(p.y * 0.05 + p.a);
    ctx.globalAlpha = tw;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.c;
    ctx.fill();

    // recycle when off-screen
    if (p.y - p.r > H) {
      p.y = -10;
      p.x = Math.random() * W;
    }
  });

  ctx.globalAlpha = 1;
  requestAnimationFrame(drawConfetti);
}

function startConfetti() {
  confetti = makeConfetti();
  running = true;
  drawConfetti();
}

function stopConfetti() {
  running = false;
  ctx.clearRect(0, 0, W, H);
}

document.getElementById('replay').addEventListener('click', () => {
  stopConfetti();
  setTimeout(startConfetti, 50);
});

// kick things off
startConfetti();
