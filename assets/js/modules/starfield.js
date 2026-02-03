export function createStarfield(selector, count = 100){
  const host = document.querySelector(selector);
  if (!host) return;

  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++){
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = Math.random() * 3 + "s";
    frag.appendChild(star);
  }
  host.appendChild(frag);
}
