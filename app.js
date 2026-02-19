// Mobile nav
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle?.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close menu on link click (mobile)
document.querySelectorAll(".nav-link").forEach((a) => {
    a.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle?.setAttribute("aria-expanded", "false");
    });
});

// Copy email
const copyBtn = document.getElementById("copyEmailBtn");
const emailText = document.getElementById("emailText");

copyBtn?.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(emailText.textContent.trim());
        copyBtn.textContent = "Copiado ✓";
        setTimeout(() => (copyBtn.textContent = "Copiar"), 1200);
    } catch (e) {
        // fallback
        const temp = document.createElement("textarea");
        temp.value = emailText.textContent.trim();
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        document.body.removeChild(temp);
        copyBtn.textContent = "Copiado ✓";
        setTimeout(() => (copyBtn.textContent = "Copiar"), 1200);
    }
});

// ===== Terminal typing =====
const terminalEl = document.getElementById("terminalType");

const terminalText =
    `$ git status
On branch main
nothing to commit, working tree clean

$ php artisan schedule:run
✔ synced properties (TIV API)
✔ cache warmed
✔ response time improved

$ npm run build
✔ assets compiled`;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function typeTerminal(text, el, speed = 16) {
    if (!el) return;

    el.textContent = "";
    // caret
    const caret = document.createElement("span");
    caret.className = "terminal-caret";
    el.parentElement.appendChild(caret);

    for (let i = 0; i < text.length; i++) {
        el.textContent += text[i];

        const ch = text[i];

        // Pausas naturales
        if (ch === "\n") await sleep(speed * 10);
        else if (ch === ".") await sleep(speed * 6);
        else await sleep(speed);

        // mantener caret al final
        el.parentElement.appendChild(caret);
    }
}

let typedOnce = false;
const heroTerminal = document.querySelector(".terminal");

if (heroTerminal && terminalEl) {
    const obs = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !typedOnce) {
            typedOnce = true;
            typeTerminal(terminalText, terminalEl, 30); // velocidad (menor = más rápido)
        }
    }, { threshold: 0.35 });

    obs.observe(heroTerminal);
}
