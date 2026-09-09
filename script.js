// ============================================================
// PROJECT DATA — placeholders. Replace each entry with a real
// site: name, url, blurb, tools used, and a size ("featured" |
// "" | "small") to control card width in the grid.
// Palette pair (a/b) just tints the placeholder media block —
// swap card-media for a real <img> once you have screenshots.
// ============================================================
const projects = [
  { img: "./images/project-1.jpg", name: "Yegertek", url: "https://www.yegertek.com/", blurb: "B2B technology website for a customer loyalty and engagement solutions provider.", tools: ["Wordpress"], size: "featured", a: "#F6E7E9", b: "#EFD9DE" },
  { img: "./images/project-2.jpg", name: "Dhanlabh Logistics", url: "https://dhanlabhlogistics.com/", blurb: "Global logistics and freight forwarding website for a full-service transportation provider.", tools: ["WordPress"], size: "", a: "#DCE9E4", b: "#C9DDD5" },
  { img: "./images/project-3.jpg", name: "Great Explorations", url: "https://greatex.org/", blurb: "Interactive website for a children's museum focused on hands-on learning and family experiences.", tools: ["Figma", "WordPress"], size: "", a: "#EDE7DC", b: "#E3D9C6" },
  { img: "./images/project-4.jpg", name: "Jaina Convention", url: "https://jainaconvention.org/", blurb: "Event-focused website for a biennial Jain community convention.", tools: ["Shopify", "Canva"], size: "small", a: "#F6E7E9", b: "#F1D6DC" },
  { img: "./images/project-5.jpg", name: "Kavi Overseas", url: "https://kavioverseas.com/", blurb: "Education consultancy website for students pursuing MBBS and higher education abroad.", tools: ["WordPress", "Figma"], size: "small", a: "#DCE9E4", b: "#CFE3DC" },
  { img: "./images/project-6.jpg", name: "Funvilla", url: "https://funvilla.ca/", blurb: "Play-focused website for an indoor entertainment center and kid's birthday venue.", tools: ["Wordpress", "Figma"], size: "featured", a: "#EDE7DC", b: "#F0E2D8" },
  { img: "./images/project-7.jpg", name: "Connect St. Petersburg", url: "https://connectstpete.com/", blurb: "Community-focused coworking website for networking, leadership, and business events.", tools: ["Wordpress", "Figma"], size: "", a: "#F6E7E9", b: "#EAD9DF" },
  { img: "./images/project-8.jpg", name: "StampTie", url: "https://stamptie.com/", blurb: "Digital loyalty platform offering simple QR-based rewards for businesses.", tools: ["WordPress"], size: "small", a: "#DCE9E4", b: "#D5E5DD" },
  { img: "./images/project-9.jpg", name: "BCS Laundry", url: "https://bcslaundry.com/", blurb: "Commercial laundry website serving hotels, holiday lets, and hospitality businesses.", tools: ["Figma", "WordPress"], size: "", a: "#EDE7DC", b: "#E7DACB" },
  { img: "./images/project-10.jpg", name: "Ecolive India", url: "https://ecoliveindia.com/", blurb: "Multi-vendor marketplace connecting local businesses with online shoppers.", tools: ["Wordpress", "Illustrator"], size: "small", a: "#F6E7E9", b: "#F3DEE3" },
  { img: "./images/project-11.jpg", name: "Arham Technosoft", url: "https://arhamtechnosoft.com/", blurb: "Corporate website for an AI-powered web, mobile, and digital solutions company.", tools: ["Wordpress", "Figma"], size: "featured", a: "#DCE9E4", b: "#D0E1D9" },
];

function initials(name){
  return name.split(" ").filter(w => /[A-Za-z]/.test(w[0])).slice(0,2).map(w => w[0]).join("");
}

function renderProjects(){
  const grid = document.getElementById("work-grid");
  grid.innerHTML = projects.map(p => `
    <a class="card reveal ${p.size}" href="${p.url}" style="--card-a:${p.a}; --card-b:${p.b}" target="_blank" rel="noopener">
      <div class="card-media">
        <img class="card-img" src="${p.img}">
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
