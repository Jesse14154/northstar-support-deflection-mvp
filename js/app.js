document.addEventListener("DOMContentLoaded", () => {
  const triggers = document.querySelectorAll(".home-trigger");
  const nav = document.getElementById("supportNav");
  if (!nav) return;
  triggers.forEach(btn => btn.addEventListener("click", () => {
    const willOpen = nav.hidden;
    nav.hidden = !willOpen;
    triggers.forEach(t => t.setAttribute("aria-expanded", String(willOpen)));
    if (willOpen) nav.scrollIntoView({behavior:"smooth", block:"start"});
  }));
});
