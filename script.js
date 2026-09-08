// ============================================================
// PROJECT DATA — placeholders. Replace each entry with a real
// site: name, url, blurb, tools used, and a size ("featured" |
// "" | "small") to control card width in the grid.
// Palette pair (a/b) just tints the placeholder media block —
// swap card-media for a real <img> once you have screenshots.
// ============================================================
const projects = [
  { name: "Marigold & Co.", url: "#", blurb: "Brand site and online store for a small-batch skincare line.", tools: ["Shopify", "Figma"], size: "featured", a: "#F6E7E9", b: "#EFD9DE" },
  { name: "Northside Dental", url: "#", blurb: "Clean, appointment-focused site for a family dental practice.", tools: ["WordPress"], size: "", a: "#DCE9E4", b: "#C9DDD5" },
  { name: "Studio Loom", url: "#", blurb: "Portfolio and booking site for an interior styling studio.", tools: ["Figma", "HTML & CSS"], size: "", a: "#EDE7DC", b: "#E3D9C6" },
  { name: "Bramble Bakery", url: "#", blurb: "Menu-led storefront with online ordering for a local bakery.", tools: ["Shopify", "Canva"], size: "small", a: "#F6E7E9", b: "#F1D6DC" },
  { name: "Verve Fitness", url: "#", blurb: "Class schedules, trainer bios and sign-up flow for a boutique gym.", tools: ["WordPress", "Photoshop"], size: "small", a: "#DCE9E4", b: "#CFE3DC" },
  { name: "Halcyon Home", url: "#", blurb: "Product catalogue and lookbook for a home-goods brand.", tools: ["Shopify", "Illustrator"], size: "featured", a: "#EDE7DC", b: "#F0E2D8" },
  { name: "Paper & Pine", url: "#", blurb: "Stationery brand site with a hand-illustrated identity.", tools: ["Illustrator", "HTML & CSS"], size: "", a: "#F6E7E9", b: "#EAD9DF" },
  { name: "The Corner Cafe", url: "#", blurb: "One-page site built around a printable, always-current menu.", tools: ["Canva", "WordPress"], size: "small", a: "#DCE9E4", b: "#D5E5DD" },
  { name: "Kestrel Coaching", url: "#", blurb: "Personal-brand site for a career coach, built around booking.", tools: ["Figma", "WordPress"], size: "", a: "#EDE7DC", b: "#E7DACB" },
  { name: "Bloom Florist", url: "#", blurb: "Seasonal storefront with delivery-area checkout logic.", tools: ["Shopify", "Photoshop"], size: "small", a: "#F6E7E9", b: "#F3DEE3" },
  { name: "Ledger & Co. Studio", url: "#", blurb: "Portfolio site for a small design-and-print studio.", tools: ["Figma", "Illustrator", "HTML & CSS"], size: "featured", a: "#DCE9E4", b: "#D0E1D9" },
];

function initials(name){
  return name.split(" ").filter(w => /[A-Za-z]/.test(w[0])).slice(0,2).map(w => w[0]).join("");
}

function renderProjects(){
  const grid = document.getElementById("work-grid");
  grid.innerHTML = projects.map(p => `
    <a class="card reveal ${p.size}" href="${p.url}" style="--card-a:${p.a}; --card-b:${p.b}" target="_blank" rel="noopener">
      <div class="card-media">
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

  document.querySelectorAll(".cta, .contact-email, a.mark").forEach(el => {
    el.addEventListener("mouseenter", () => cursor.classList.add("active"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("active"));
  });
} else {
  cursor.style.display = "none";
}
