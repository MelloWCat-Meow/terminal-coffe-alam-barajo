/* ================================================
   Terminal Coffee Alam Barajo — main.js (Optimized)
   ================================================ */

// ── 1. FILTER MENU TABS ──────────────────────────
function filterMenu(cat, btn) {
    document.querySelectorAll(".tab-btn").forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");

    document.querySelectorAll(".menu-card").forEach(card => {
        const show = cat === "all" || card.dataset.cat === cat;
        card.style.display = show ? "" : "none";
        // Re-trigger animation on filter
        if (show) {
            card.classList.remove("anim-visible");
            requestAnimationFrame(() => card.classList.add("anim-visible"));
        }
    });
}

// ── 2. FORM KIRIM PESAN — via WhatsApp ──────────
function handleSubmit() {
    const nama = document.getElementById("input-nama").value.trim();
    const email = document.getElementById("input-email").value.trim();
    const pesan = document.getElementById("input-pesan").value.trim();

    if (!nama || !pesan) {
        // Highlight empty fields
        if (!nama) document.getElementById("input-nama").style.borderColor = "#e53e3e";
        if (!pesan) document.getElementById("input-pesan").style.borderColor = "#e53e3e";
        setTimeout(() => {
            document.getElementById("input-nama").style.borderColor = "";
            document.getElementById("input-pesan").style.borderColor = "";
        }, 2000);
        return;
    }

    const emailLine = email ? `%0AEmail%3A ${encodeURIComponent(email)}` : "";
    const waText = `Halo Terminal Coffee Alam Barajo!%0A%0ANama%3A ${encodeURIComponent(nama)}${emailLine}%0A%0APesan%3A%0A${encodeURIComponent(pesan)}`;
    const waURL = `https://wa.me/628217599687?text=${waText}`;

    const btn = document.getElementById("btn-kirim");
    const orig = btn.innerHTML;
    btn.innerHTML = `<i class="fa-solid fa-check" aria-hidden="true"></i> Membuka WhatsApp...`;
    btn.style.background = "#40916c";
    btn.disabled = true;

    window.open(waURL, "_blank");

    setTimeout(() => {
        btn.innerHTML = orig;
        btn.style.background = "";
        btn.disabled = false;
        document.getElementById("input-nama").value = "";
        document.getElementById("input-email").value = "";
        document.getElementById("input-pesan").value = "";
    }, 2200);
}

// ── 3. SCROLL ENTRANCE ANIMATION ────────────────
function initScrollAnimation() {
    const targets = document.querySelectorAll(
        ".menu-card, .gallery-item, .about-content, .about-logo-ring, .contact-form, .artikel-card, .hero-content, .section-header, .contact-left",
    );

    targets.forEach(el => el.classList.add("anim-ready"));

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.remove("anim-ready");
                        entry.target.classList.add("anim-visible");
                    }, i * 55);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.08 },
    );

    targets.forEach(el => observer.observe(el));
}

// ── 4. STICKY NAVBAR SHADOW ──────────────────────
function initNavShadow() {
    const nav = document.getElementById("navbar");
    if (!nav) return;
    window.addEventListener(
        "scroll",
        () => {
            nav.style.boxShadow = window.scrollY > 10 ? "0 4px 24px rgba(0,0,0,0.35)" : "none";
        },
        { passive: true },
    );
}

// ── 5. ACTIVE NAV LINK HIGHLIGHT ─────────────────
function initActiveNav() {
    const sections = document.querySelectorAll("section[id], div[id]");
    const navLinks = document.querySelectorAll(".nav-links a");
    if (!navLinks.length) return;

    window.addEventListener(
        "scroll",
        () => {
            let current = "";
            sections.forEach(sec => {
                if (window.scrollY >= sec.offsetTop - 90) current = sec.id;
            });
            navLinks.forEach(link => {
                link.classList.remove("active");
                const href = link.getAttribute("href");
                if (href === `#${current}`) link.classList.add("active");
            });
        },
        { passive: true },
    );
}

// ── 6. HAMBURGER MOBILE NAV ──────────────────────
function initMobileNav() {
    const btn = document.getElementById("hamburger");
    const nav = document.getElementById("mobile-nav");
    const overlay = document.getElementById("mobile-nav-overlay");
    if (!btn || !nav) return;

    btn.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        overlay.classList.toggle("open", open);
        btn.classList.toggle("open", open);
        btn.setAttribute("aria-expanded", open);
        nav.setAttribute("aria-hidden", !open);
        document.body.style.overflow = open ? "hidden" : "";
    });
}

window.closeMobileNav = function () {
    const btn = document.getElementById("hamburger");
    const nav = document.getElementById("mobile-nav");
    const overlay = document.getElementById("mobile-nav-overlay");
    if (!nav) return;
    nav.classList.remove("open");
    overlay.classList.remove("open");
    btn && btn.classList.remove("open");
    btn && btn.setAttribute("aria-expanded", "false");
    nav.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
};

// ── 7. HERO IMAGE PARALLAX (subtle) ─────────────
function initParallax() {
    const overlay = document.querySelector(".hero-overlay");
    if (!overlay || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    window.addEventListener(
        "scroll",
        () => {
            const y = window.scrollY;
            overlay.style.transform = `translateY(${y * 0.18}px)`;
        },
        { passive: true },
    );
}

// ── INIT ─────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
    initScrollAnimation();
    initNavShadow();
    initActiveNav();
    initMobileNav();
    initParallax();
});
