// ============================================================
// PROJECT DATA — placeholders. Replace each entry with a real
// site: name, url, blurb, tools used, and a size ("featured" |
// "" | "small") to control card width in the grid.
// Palette pair (a/b) just tints the placeholder media block —
// swap card-media for a real <img> once you have screenshots.
// ============================================================
const projects = [
  { img: "./images/project-1.jpg", name: "Yegertek", url: "https://www.yegertek.com/", blurb: "B2B technology website for a customer loyalty and engagement solutions provider.", tools: ["WordPress"], size: "featured", a: "#F6E7E9", b: "#EFD9DE" },
  { img: "./images/project-2.jpg", name: "Dhanlabh Logistics", url: "https://dhanlabhlogistics.com/", blurb: "Global logistics and freight forwarding website for a full-service transportation provider.", tools: ["WordPress"], size: "", a: "#DCE9E4", b: "#C9DDD5" },
  { img: "./images/project-3.jpg", name: "Great Explorations", url: "https://greatex.org/", blurb: "Interactive website for a children's museum focused on hands-on learning and family experiences.", tools: ["Figma", "WordPress"], size: "", a: "#EDE7DC", b: "#E3D9C6" },
  { img: "./images/project-4.jpg", name: "Jaina Convention", url: "https://jainaconvention.org/", blurb: "Event-focused website for a biennial Jain community convention.", tools: ["Shopify", "Canva"], size: "small", a: "#F6E7E9", b: "#F1D6DC" },
  { img: "./images/project-5.jpg", name: "Kavi Overseas", url: "https://kavioverseas.com/", blurb: "Education consultancy website for students pursuing MBBS and higher education abroad.", tools: ["WordPress", "Figma"], size: "small", a: "#DCE9E4", b: "#CFE3DC" },
  { img: "./images/project-6.jpg", name: "Funvilla", url: "https://funvilla.ca/", blurb: "Play-focused website for an indoor entertainment center and kid's birthday venue.", tools: ["WordPress", "Figma"], size: "featured", a: "#EDE7DC", b: "#F0E2D8" },
  { img: "./images/project-7.jpg", name: "Connect St. Petersburg", url: "https://connectstpete.com/", blurb: "Community-focused coworking website for networking, leadership, and business events.", tools: ["WordPress", "Figma"], size: "", a: "#F6E7E9", b: "#EAD9DF" },
  { img: "./images/project-8.jpg", name: "StampTie", url: "https://stamptie.com/", blurb: "Digital loyalty platform offering simple QR-based rewards for businesses.", tools: ["WordPress"], size: "small", a: "#DCE9E4", b: "#D5E5DD" },
  { img: "./images/project-9.jpg", name: "BCS Laundry", url: "https://bcslaundry.com/", blurb: "Commercial laundry website serving hotels, holiday lets, and hospitality businesses.", tools: ["Figma", "WordPress"], size: "", a: "#EDE7DC", b: "#E7DACB" },
  { img: "./images/project-10.jpg", name: "Ecolive India", url: "https://ecoliveindia.com/", blurb: "Multi-vendor marketplace connecting local businesses with online shoppers.", tools: ["WordPress", "Illustrator"], size: "small", a: "#F6E7E9", b: "#F3DEE3" },
  { img: "./images/project-11.jpg", name: "Arham Technosoft", url: "https://arhamtechnosoft.com/", blurb: "Corporate website for an AI-powered web, mobile, and digital solutions company.", tools: ["WordPress", "Figma"], size: "featured", a: "#DCE9E4", b: "#D0E1D9" },
];

function initials(name){
  return name.split(" ").filter(w => /[A-Za-z]/.test(w[0])).slice(0,2).map(w => w[0]).join("");
}

function renderProjects(){
  const grid = document.getElementById("work-grid");
  grid.innerHTML = projects.map(p => `
    <a class="card reveal ${p.size}" href="${p.url}" style="--card-a:${p.a}; --card-b:${p.b}" target="_blank" rel="noopener">
      <div class="card-media">
        <img class="card-img" src="${p.img}" alt="${p.name} website screenshot" loading="lazy">
        <span class="initials">${initials(p.name)}</span>
        <div class="tag-row">
          ${p.tools.map(t => `<span class="tag">${t}</span>`).join("")}
        </div>
      </div>
      <div class="card-body">
        <h3>${p.name}</h3>
        <p>${p.blurb}</p>
        <span class="card-link">View site</span>
      </div>
    </a>
  `).join("");
}
renderProjects();

// ---------- hero load sequence ----------
window.addEventListener("load", () => {
  requestAnimationFrame(() => document.body.classList.add("loaded"));
});

// ---------- scroll progress bar ----------
const progressEl = document.getElementById("progress");
function updateProgress(){
  const h = document.documentElement;
  const scrolled = h.scrollTop;
  const height = h.scrollHeight - h.clientHeight;
  progressEl.style.width = (height > 0 ? (scrolled / height) * 100 : 0) + "%";
}
document.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

// ---------- scroll-linked tool marquee ----------
const marquee = document.getElementById("marquee");
let marqueeOffset = 0;
function updateMarquee(){
  const rect = document.querySelector(".tools").getBoundingClientRect();
  const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
  marqueeOffset = -(progress * marquee.scrollWidth * 0.35);
  marquee.style.transform = `translateX(${marqueeOffset}px)`;
}
document.addEventListener("scroll", updateMarquee, { passive: true });
window.addEventListener("resize", updateMarquee);
updateMarquee();

// ---------- reveal on scroll ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting){
      e.target.classList.add("in-view");
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// ---------- smooth scroll (mouse wheel) ----------
// A plain mouse wheel scrolls in big fixed jumps by design, unlike a
// trackpad's continuous motion — Lenis intercepts wheel input and
// animates it, leaving touch/trackpad scrolling native. Skipped under
// reduced motion, and simply does nothing if the CDN script fails.
if (typeof Lenis !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches){
  const lenis = new Lenis({
    duration: 1.1,
    smoothWheel: true,
    syncTouch: false, // leave native touch scrolling alone
  });
  function raf(time){
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // hand anchor-link navigation (nav, the logo mark, the hero CTA) to
  // the same smooth scroll, offset clear of the sticky header
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href").slice(1);
      const target = id ? document.getElementById(id) : document.body;
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -90 });
    });
  });
}

// ---------- freehand draw canvas ----------
// A full-document canvas visitors can doodle on in black ink.
// It's pointer-events: none (see CSS), so every click still reaches
// the real element underneath — nav links, project cards, the email
// link. A stroke only starts when the pointer goes down somewhere
// that ISN'T a link/button. Nothing is saved: a reload clears it.
(() => {
  const canvas = document.getElementById("drawCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const INK = "#16161D";
  const LINE_WIDTH = 14; // matches the default custom-cursor dot size
  let strokes = [];
  let activeStroke = null;
  let signature = null; // { pathData } — an SVG path string once the intro has drawn it
  let dismissDrawHint = null; // set once the typed hint is playing, so a real stroke can cut it short

  function sizeCanvas(){
    const dpr = window.devicePixelRatio || 1;
    const w = document.documentElement.scrollWidth;
    const h = document.documentElement.scrollHeight;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    redraw();
  }

  function strokeStyle(){
    ctx.strokeStyle = INK;
    ctx.lineWidth = LINE_WIDTH;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }

  const midPoint = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

  // Draws (or redraws) an entire stroke as a smooth curve through
  // its recorded points, rather than straight segments point-to-
  // point — quadratic curves through each pair's midpoint is what
  // removes the faceted/jagged look on fast mouse movement.
  function drawStroke(stroke){
    if (stroke.length === 0) return;
    strokeStyle();
    if (stroke.length === 1){
      ctx.beginPath();
      ctx.arc(stroke[0].x, stroke[0].y, LINE_WIDTH / 2, 0, Math.PI * 2);
      ctx.fillStyle = INK;
      ctx.fill();
      return;
    }
    ctx.beginPath();
    ctx.moveTo(stroke[0].x, stroke[0].y);
    for (let i = 1; i < stroke.length - 1; i++){
      const mid = midPoint(stroke[i], stroke[i + 1]);
      ctx.quadraticCurveTo(stroke[i].x, stroke[i].y, mid.x, mid.y);
    }
    const last = stroke[stroke.length - 1];
    ctx.lineTo(last.x, last.y);
    ctx.stroke();
  }

  function redraw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    strokes.forEach(drawStroke);
    if (signature) drawSignaturePath(signature);
  }

  // fills the glyph outlines straight from the font — used once the
  // intro's outline-trace animation has finished, and again on every
  // later redraw() (e.g. window resize)
  function drawSignaturePath({ pathData }){
    ctx.fillStyle = INK;
    ctx.fill(new Path2D(pathData));
  }

  // straight-line polyline through already-dense, curve-sampled
  // points — unlike drawStroke() this skips the midpoint quadratic
  // smoothing, which is for raw/jagged mouse input, not needed here
  function drawPolyline(points, width){
    if (points.length < 2) return;
    ctx.strokeStyle = INK;
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
    ctx.stroke();
  }

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(sizeCanvas, 150);
  });
  window.addEventListener("load", sizeCanvas);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(sizeCanvas);
  sizeCanvas();

  const isInteractive = (el) => !!(el && el.closest && el.closest("a, button"));

  document.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    if (isInteractive(e.target)) return;
    e.preventDefault(); // stop native text-selection drag
    if (dismissDrawHint) dismissDrawHint(); // they found it — stop explaining
    activeStroke = [{ x: e.pageX, y: e.pageY }];
    drawStroke(activeStroke);
  });

  document.addEventListener("pointermove", (e) => {
    if (!activeStroke) return;
    activeStroke.push({ x: e.pageX, y: e.pageY });
    // redrawing the whole stroke each move (not just the new
    // segment) keeps it consistently smooth end-to-end; already-
    // inked pixels are solid black so re-stroking them is a no-op
    // visually, and stroke lengths here are short enough that this
    // stays cheap.
    drawStroke(activeStroke);
  });

  function endStroke(){
    if (!activeStroke) return;
    strokes.push(activeStroke);
    activeStroke = null;
  }
  document.addEventListener("pointerup", endStroke);
  document.addEventListener("pointercancel", endStroke);

  // ---------- glyph-outline flattening ----------
  // Converts a font's bezier curve commands into dense point arrays,
  // so the signature can be traced as an actual sequence of lines and
  // curves — not revealed from a pre-rendered block of text.
  function flattenCubic(p0, c1, c2, p1, steps){
    const pts = [];
    for (let i = 1; i <= steps; i++){
      const t = i / steps, mt = 1 - t;
      pts.push({
        x: mt * mt * mt * p0.x + 3 * mt * mt * t * c1.x + 3 * mt * t * t * c2.x + t * t * t * p1.x,
        y: mt * mt * mt * p0.y + 3 * mt * mt * t * c1.y + 3 * mt * t * t * c2.y + t * t * t * p1.y,
      });
    }
    return pts;
  }

  function flattenQuad(p0, c, p1, steps){
    const pts = [];
    for (let i = 1; i <= steps; i++){
      const t = i / steps, mt = 1 - t;
      pts.push({
        x: mt * mt * p0.x + 2 * mt * t * c.x + t * t * p1.x,
        y: mt * mt * p0.y + 2 * mt * t * c.y + t * t * p1.y,
      });
    }
    return pts;
  }

  // opentype.js glyph commands -> one point array per contour (a
  // glyph like "A" has an outer contour plus an inner counter, each
  // traced as its own stroke, in the order the font data defines)
  function buildContours(commands){
    const contours = [];
    let current = null;
    let cursor = { x: 0, y: 0 };
    commands.forEach((cmd) => {
      if (cmd.type === "M"){
        if (current && current.length > 1) contours.push(current);
        current = [{ x: cmd.x, y: cmd.y }];
        cursor = { x: cmd.x, y: cmd.y };
      } else if (cmd.type === "L"){
        current.push({ x: cmd.x, y: cmd.y });
        cursor = { x: cmd.x, y: cmd.y };
      } else if (cmd.type === "C"){
        current.push(...flattenCubic(cursor, { x: cmd.x1, y: cmd.y1 }, { x: cmd.x2, y: cmd.y2 }, { x: cmd.x, y: cmd.y }, 14));
        cursor = { x: cmd.x, y: cmd.y };
      } else if (cmd.type === "Q"){
        current.push(...flattenQuad(cursor, { x: cmd.x1, y: cmd.y1 }, { x: cmd.x, y: cmd.y }, 10));
        cursor = { x: cmd.x, y: cmd.y };
      } else if (cmd.type === "Z" && current && current.length){
        current.push(current[0]);
      }
    });
    if (current && current.length > 1) contours.push(current);
    return contours;
  }

  // ---------- auto-signature intro ----------
  // Signs the page in the bottom-right corner of the hero, the way a
  // designer signs the corner of a finished piece — traced contour by
  // contour from the actual glyph outlines of the supplied signature
  // font, then settled into solid ink once fully drawn.
  async function playSignature(){
    const heroEl = document.querySelector(".hero");
    if (!heroEl || activeStroke || typeof opentype === "undefined") return;

    let font;
    try {
      font = await opentype.load("./fonts/AutografPersonalUseOnly-mOBm.ttf");
    } catch (e) {
      return; // no font available — skip the intro rather than break the page
    }
    if (activeStroke) return; // a stroke may have started while the font was loading

    const cs = getComputedStyle(heroEl);
    const r = heroEl.getBoundingClientRect();
    const paddingRight = parseFloat(cs.paddingRight) || 24;
    const paddingBottom = parseFloat(cs.paddingBottom) || 60;
    const fontSize = Math.max(34, Math.min(64, paddingBottom * 0.62));
    const text = "SWATI";

    const advance = font.getAdvanceWidth(text, fontSize);
    const leftX = r.right + window.scrollX - paddingRight - advance;
    const baseY = r.bottom + window.scrollY - paddingBottom * 0.32;

    const path = font.getPath(text, leftX, baseY, fontSize);
    const pathData = path.toPathData(2);
    const contours = buildContours(path.commands);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || contours.length === 0){
      signature = { pathData };
      redraw();
      return;
    }

    const traceWidth = Math.max(1.6, fontSize * 0.045);
    const totalPoints = contours.reduce((sum, c) => sum + c.length, 0) || 1;
    const totalDuration = 1700;

    let contourIndex = 0;
    let contourStart = performance.now();

    (function step(now){
      if (activeStroke) return; // don't fight a stroke the visitor is actually drawing
      const contour = contours[contourIndex];
      const contourDuration = Math.max(120, totalDuration * (contour.length / totalPoints));
      const p = Math.min(1, (now - contourStart) / contourDuration);
      const pointCount = Math.max(2, Math.round(contour.length * p));

      redraw();
      for (let i = 0; i < contourIndex; i++) drawPolyline(contours[i], traceWidth);
      drawPolyline(contour.slice(0, pointCount), traceWidth);

      if (p < 1){
        requestAnimationFrame(step);
        return;
      }
      contourIndex++;
      if (contourIndex < contours.length){
        contourStart = now;
        requestAnimationFrame(step);
      } else {
        // fully traced — settle into solid ink, same as a finished pen
        // stroke, and remember it so redraw() (e.g. on window resize)
        // replays the filled letterforms directly
        signature = { pathData };
        redraw();
      }
    })(contourStart);
  }

  const scheduleSignature = () => setTimeout(playSignature, 1600);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(scheduleSignature);
  else window.addEventListener("load", scheduleSignature);

  // ---------- draw-hint typewriter ----------
  // A one-time typed caption, timed just after the signature finishes
  // tracing — the page draws its own name, then explains what just
  // happened. Cut short the moment a visitor starts a real stroke
  // (see the dismissDrawHint() call in the pointerdown handler above).
  function typeHint(){
    const hintEl = document.getElementById("drawHint");
    const textEl = document.getElementById("drawHintText");
    if (!hintEl || !textEl) return;
    const message = "psst — this whole page is a canvas. try drawing on it.";
    hintEl.classList.add("visible");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches){
      textEl.textContent = message;
      setTimeout(() => hintEl.classList.remove("visible"), 4500);
      return;
    }

    let i = 0;
    const typeSpeed = 32;
    const timer = setInterval(() => {
      i++;
      textEl.textContent = message.slice(0, i);
      if (i >= message.length){
        clearInterval(timer);
        setTimeout(() => hintEl.classList.remove("visible"), 3800);
      }
    }, typeSpeed);

    dismissDrawHint = () => {
      clearInterval(timer);
      hintEl.classList.remove("visible");
    };
  }

  setTimeout(typeHint, 3900);
})();

// ---------- custom cursor + card magnetism ----------
const cursor = document.getElementById("cursor");
const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (canHover){
  window.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("mouseenter", () => cursor.classList.add("active"));
    card.addEventListener("mouseleave", () => {
      cursor.classList.remove("active");
      card.style.transform = "";
    });
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(800px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg) translateY(-4px)`;
    });
  });

  document.querySelectorAll(".contact-email, a.mark").forEach(el => {
    el.addEventListener("mouseenter", () => cursor.classList.add("active"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("active"));
  });

} else {
  cursor.style.display = "none";
}
