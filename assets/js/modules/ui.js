export function showPopup(message){
  const popup = document.getElementById("popup-notification");
  if (!popup) return;

  popup.textContent = message;
  popup.classList.add("show");
  setTimeout(() => popup.classList.remove("show"), 3000);
}

export function setLoading(){
  const explanation = document.getElementById("explanation");
  if (explanation) explanation.innerHTML = '<div class="spinner" aria-hidden="true"></div>';
}

export function setExplanationText(text){
  const explanation = document.getElementById("explanation");
  if (explanation) explanation.textContent = text || "No description available.";
}

export function resetMedia(){
  const mediaContainer = document.getElementById("media-container");
  const img = document.getElementById("apod-img");
  const video = document.getElementById("apod-video");
  const title = document.getElementById("image-title");

  if (video){
    video.pause();
    video.currentTime = 0;
    video.src = "";
    video.hidden = true;
  }

  if (img) img.hidden = true;

  mediaContainer?.classList.remove("loaded");
  title?.classList.remove("show");
}

export function showTitle(text){
  const title = document.getElementById("image-title");
  if (!title) return;
  title.textContent = text || "Untitled";
  setTimeout(() => title.classList.add("show"), 500);
}

export function mediaLoaded(){
  const mediaContainer = document.getElementById("media-container");
  setTimeout(() => mediaContainer?.classList.add("loaded"), 50);
}
