// ORIGINAL APP (unchanged logic) wrapped as module

export function initCosmoApp(){
// Create starfield
const starfield = document.getElementById("starfield");
for (let i = 0; i < 100; i++) {
  const star = document.createElement("div");
  star.className = "star";
  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";
  star.style.animationDelay = Math.random() * 3 + "s";
  starfield.appendChild(star);
}

const keywords = [
  "earth",
  "mars",
  "jupiter",
  "saturn",
  "uranus",
  "neptune",
  "venus",
  "mercury",
  "sun",
  "moon",
  "galaxy",
  "nebula",
  "andromeda",
  "black hole",
  "supernova",
  "milky way",
  "telescope",
  "space shuttle",
  "astronaut",
  "international space station",
  "asteroid",
  "comet",
  "cosmos",
  "stars",
  "solar system",
  "rocket",
  "spacewalk",
  "eclipse",
  "planet",
  "universe",
  "Hubble",
  "James Webb Telescope",
];

// Populate keyword tags
const keywordScroll = document.getElementById("keyword-scroll");
keywords.forEach((keyword, index) => {
  const tag = document.createElement("div");
  tag.className = "keyword-tag";
  tag.textContent = keyword;
  tag.style.animationDelay = `${index * 0.05}s`;
  tag.addEventListener("click", () => {
    document.getElementById("search-input").value = keyword;
    hideKeywords();
    getNASAImage(keyword);
  });
  keywordScroll.appendChild(tag);
});

// Show/hide keywords
const searchInput = document.getElementById("search-input");
const blurOverlay = document.getElementById("blur-overlay");
const keywordContainer = document.getElementById("keyword-container");

function showKeywords() {
  blurOverlay.classList.add("active");
  keywordContainer.classList.add("active");
}

function hideKeywords() {
  blurOverlay.classList.remove("active");
  keywordContainer.classList.remove("active");
}

searchInput.addEventListener("focus", showKeywords);
blurOverlay.addEventListener("click", hideKeywords);

// Show popup notification
function showPopup(message) {
  const popup = document.getElementById("popup-notification");
  popup.textContent = message;
  popup.classList.add("show");
  setTimeout(() => {
    popup.classList.remove("show");
  }, 3000);
}

function updateTime() {
  const now = new Date();
  document.getElementById("time").textContent = now.toLocaleTimeString(
    "en-US",
    {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }
  );
}

setInterval(updateTime, 1000);
updateTime();

async function getNASAImage(keyword = null) {
  const searchTerm =
    keyword || keywords[Math.floor(Math.random() * keywords.length)];
  const apiURL = `https://images-api.nasa.gov/search?q=${searchTerm}`;

  // Reset media opacity for fade-in
  const mediaContainer = document.getElementById("media-container");
  const img = document.getElementById("apod-img");
  const video = document.getElementById("apod-video");
  const title = document.getElementById("image-title");

  // Stop and reset video if it's playing
  video.pause();
  video.currentTime = 0;
  video.src = "";

  mediaContainer.classList.remove("loaded");
  title.classList.remove("show");
  img.style.display = "none";
  video.style.display = "none";

  document.getElementById("explanation").innerHTML =
    '<div class="spinner"></div>';

  try {
    console.log(`Fetching media for: ${searchTerm}`);
    const response = await fetch(apiURL);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const items = data.collection.items;

    if (!items || items.length === 0) {
      showPopup("No results found - showing random");
      // Load random image instead
      getNASAImage();
      return;
    }

    const randomIndex = Math.floor(Math.random() * Math.min(10, items.length));
    const item = items[randomIndex];

    const info = item.data[0];
    const mediaType = info.media_type;

    // Update date tooltip based on media type
    const dateElement = document.getElementById("date");
    dateElement.setAttribute(
      "data-label",
      mediaType === "video" ? "VIDEO DATE" : "IMAGE DATE"
    );

    if (mediaType === "video") {
      // Handle video - need to fetch the actual video file
      const detailURL = item.href;
      const detailResponse = await fetch(detailURL);
      const detailData = await detailResponse.json();

      // Find video file (usually .mp4)
      const videoFile = detailData.find(
        (url) => url.includes(".mp4") || url.includes(".mov")
      );

      if (videoFile) {
        video.src = videoFile;
        video.style.display = "block";
        video.onloadeddata = function () {
          setTimeout(() => {
            mediaContainer.classList.add("loaded");
          }, 50);
        };
      } else {
        // If no video file found, show the preview image instead
        const imageURL = item.links[0].href;
        const tempImg = new Image();
        tempImg.onload = function () {
          img.src = imageURL;
          img.style.display = "block";
          setTimeout(() => {
            mediaContainer.classList.add("loaded");
          }, 50);
        };
        tempImg.src = imageURL;
      }
    } else {
      // Handle image
      const imageURL = item.links[0].href;
      const tempImg = new Image();
      tempImg.onload = function () {
        img.src = imageURL;
        img.style.display = "block";
        setTimeout(() => {
          mediaContainer.classList.add("loaded");
        }, 50);
      };
      tempImg.src = imageURL;
    }

    document.getElementById("date").textContent = new Date(info.date_created)
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
      .toUpperCase();

    // Display title
    title.textContent = info.title || "Untitled";
    setTimeout(() => {
      title.classList.add("show");
    }, 500);

    document.getElementById("explanation").textContent =
      info.description || "No description available.";
  } catch (error) {
    console.error("Error fetching NASA media:", error);
    document.getElementById("explanation").textContent =
      "Failed to load NASA media. Please try again later.";
  }
}

// Fullscreen functionality
document.getElementById("fullscreen-btn").addEventListener("click", () => {
  const imageSection = document.getElementById("image-section");

  if (!document.fullscreenElement) {
    imageSection.classList.add("fullscreen");
    imageSection.requestFullscreen().catch((err) => {
      console.error(`Error attempting to enable fullscreen: ${err.message}`);
    });
  } else {
    imageSection.classList.remove("fullscreen");
    document.exitFullscreen();
  }
});

// Listen for fullscreen changes
document.addEventListener("fullscreenchange", () => {
  const imageSection = document.getElementById("image-section");
  if (!document.fullscreenElement) {
    imageSection.classList.remove("fullscreen");
  }
});

// Event listeners
document.getElementById("next-btn").addEventListener("click", () => {
  getNASAImage();
});

document.getElementById("search-btn").addEventListener("click", () => {
  const searchValue = document.getElementById("search-input").value.trim();
  if (searchValue) {
    hideKeywords();
    getNASAImage(searchValue);
  }
});

document.getElementById("search-input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const searchValue = document.getElementById("search-input").value.trim();
    if (searchValue) {
      hideKeywords();
      getNASAImage(searchValue);
    }
  }
});

// Initial load
getNASAImage();

}
