export function startClock(selector){
  const el = document.querySelector(selector);
  if (!el) return;

  const update = () => {
    const now = new Date();
    el.textContent = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  update();
  setInterval(update, 1000);
}
