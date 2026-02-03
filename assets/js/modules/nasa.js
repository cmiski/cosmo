import { showPopup, setLoading, setExplanationText, resetMedia, showTitle, mediaLoaded } from "./ui.js";
import { hideKeywords } from "./keywords.js";

const DEFAULT_KEYWORDS = [
  "earth","mars","jupiter","saturn","galaxy","nebula","black hole","supernova",
  "milky way","telescope","astronaut","international space station","comet",
];

export async function getNASAImage(keyword = null){
  const searchTerm = keyword || DEFAULT_KEYWORDS[Math.floor(Math.random() * DEFAULT_KEYWORDS.length)];
  const apiURL = `https://images-api.nasa.gov/search?q=${encodeURIComponent(searchTerm)}`;

  resetMedia();
  setLoading();

  const img = document.getElementById("apod-img");
  const video = document.getElementById("apod-video");

  try{
    const response = await fetch(apiURL);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    const items = data?.collection?.items;

    if (!items || items.length === 0){
      showPopup("No results found - showing random");
      return getNASAImage();
    }

    const randomIndex = Math.floor(Math.random() * Math.min(10, items.length));
    const item = items[randomIndex];

    const info = item.data?.[0] ?? {};
    const mediaType = info.media_type;

    // Update date tooltip based on media type
    const dateElement = document.getElementById("date");
    if (dateElement){
      dateElement.setAttribute("data-label", mediaType === "video" ? "VIDEO DATE" : "IMAGE DATE");
      dateElement.textContent = info.date_created
        ? new Date(info.date_created).toLocaleDateString("en-US", { year:"numeric", month:"short", day:"numeric" }).toUpperCase()
        : "UNKNOWN";
    }

    showTitle(info.title);

    if (mediaType === "video"){
      const detailURL = item.href;
      const detailResponse = await fetch(detailURL);
      const detailData = await detailResponse.json();

      const videoFile = detailData.find((url) => url.includes(".mp4") || url.includes(".mov"));

      if (videoFile && video){
        video.src = videoFile;
        video.hidden = false;
        video.onloadeddata = mediaLoaded;
      } else {
        // fallback to preview image
        const imageURL = item.links?.[0]?.href;
        await loadImageInto(img, imageURL);
      }
    } else {
      const imageURL = item.links?.[0]?.href;
      await loadImageInto(img, imageURL);
    }

    setExplanationText(info.description);
  } catch (err){
    console.error("Error fetching NASA media:", err);
    setExplanationText("Failed to load NASA media. Please try again later.");
  }
}

async function loadImageInto(imgEl, url){
  if (!imgEl || !url) return;

  await new Promise((resolve) => {
    const tempImg = new Image();
    tempImg.onload = resolve;
    tempImg.onerror = resolve;
    tempImg.src = url;
  });

  imgEl.src = url;
  imgEl.hidden = false;
  mediaLoaded();
}

export function setHandlers({ onShowKeywords, onHideKeywords, onNext, onSearch }){
  const searchInput = document.getElementById("search-input");
  const blurOverlay = document.getElementById("blur-overlay");
  const searchBtn = document.getElementById("search-btn");
  const nextBtn = document.getElementById("next-btn");
  const fullscreenBtn = document.getElementById("fullscreen-btn");

  // Suggestions overlay
  searchInput?.addEventListener("focus", onShowKeywords);
  blurOverlay?.addEventListener("click", () => {
    hideKeywords();
    onHideKeywords?.();
  });

  // Next
  nextBtn?.addEventListener("click", () => onNext?.());

  // Search
  const doSearch = () => {
    const q = searchInput?.value?.trim();
    if (q){
      hideKeywords();
      onSearch?.(q);
    }
  };

  searchBtn?.addEventListener("click", doSearch);

  searchInput?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") doSearch();
  });

  // Fullscreen
  fullscreenBtn?.addEventListener("click", () => {
    const imageSection = document.getElementById("image-section");
    if (!imageSection) return;

    if (!document.fullscreenElement){
      imageSection.classList.add("fullscreen");
      imageSection.requestFullscreen().catch((e) => console.error(e));
    } else {
      imageSection.classList.remove("fullscreen");
      document.exitFullscreen();
    }
  });

  document.addEventListener("fullscreenchange", () => {
    const imageSection = document.getElementById("image-section");
    if (!document.fullscreenElement) imageSection?.classList.remove("fullscreen");
  });
}
