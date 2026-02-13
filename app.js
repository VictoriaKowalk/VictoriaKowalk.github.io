// === CONFIG ===
const EMAIL = "victoriakowalk@gmail.com"; // <-- Cambiá esto
const LINKEDIN = "https://www.linkedin.com/in/victoria-kowalk/"; // <-- Cambiá esto si querés

// === Typing effect (simple) ===
const commands = [
  "whoami",
  "stack --show",
  "projects --featured",
  "contact --copy-email"
];

const outputs = [
  "Victoria Kowalk\nFull-Stack Developer en formación\nWeb & Software Developer",
  "C# · Java · PHP · MySQL · HTML · CSS\nTools: Git/GitHub · Postman · Figma · VS Code · Eclipse",
  "🏡 Web Inmobiliaria + API CRM (TIV)\n🏦 Sistema Bancario (Java + MySQL)\n🖥️ Apps Desktop (C# / WinForms)\n🌐 Frontend (HTML + CSS)",
  "Tip: tocá 'Copiar email' para contactarme 😉"
];

const typingEl = document.getElementById("typing");
const outEl = document.getElementById("terminalOut");

let cmdIndex = 0;
let charIndex = 0;
let isDeleting = false;

function sleep(ms){ return new Promise(r => setTimeout(r, ms)); }

async function typeLoop(){
  const cmd = commands[cmdIndex];

  if (!isDeleting) {
    typingEl.textContent = cmd.slice(0, charIndex++);
    if (charIndex > cmd.length) {
      // print output
      await sleep(350);
      outEl.textContent = outputs[cmdIndex];
      await sleep(1200);
      isDeleting = true;
      charIndex = cmd.length;
    }
  } else {
    typingEl.textContent = cmd.slice(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      cmdIndex = (cmdIndex + 1) % commands.length;
      charIndex = 0;
      outEl.textContent = "";
      await sleep(250);
    }
  }

  const speed = isDeleting ? 35 : 55;
  setTimeout(typeLoop, speed);
}
typeLoop();

// === Email copy ===
function copyEmail(){
  navigator.clipboard.writeText(EMAIL).then(() => {
    toast("Email copiado ✅");
  }).catch(() => {
    toast("No pude copiar 😅 Copialo manual: " + EMAIL);
  });
}

function toast(text){
  const t = document.createElement("div");
  t.textContent = text;
  t.style.position = "fixed";
  t.style.left = "50%";
  t.style.bottom = "22px";
  t.style.transform = "translateX(-50%)";
  t.style.background = "rgba(15,23,42,.92)";
  t.style.border = "1px solid rgba(255,255,255,.14)";
  t.style.color = "white";
  t.style.padding = "10px 12px";
  t.style.borderRadius = "14px";
  t.style.fontWeight = "800";
  t.style.zIndex = "9999";
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 1700);
}

["copyEmailBtn", "copyEmailBtn2", "copyEmailBtn3"].forEach(id => {
  const b = document.getElementById(id);
  if (b) b.addEventListener("click", copyEmail);
});

const emailText = document.getElementById("emailText");
if (emailText) emailText.textContent = EMAIL;

// === Mobile menu toggle ===
const burger = document.getElementById("burgerBtn");
const mobile = document.getElementById("mobileMenu");

if (burger && mobile) {
  burger.addEventListener("click", () => {
    const open = mobile.getAttribute("aria-hidden") === "false";
    mobile.setAttribute("aria-hidden", open ? "true" : "false");
    mobile.style.display = open ? "none" : "block";
  });

  // Close when clicking a link
  mobile.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      mobile.setAttribute("aria-hidden", "true");
      mobile.style.display = "none";
    });
  });
}

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
