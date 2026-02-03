const blurOverlay = () => document.getElementById("blur-overlay");
const keywordContainer = () => document.getElementById("keyword-container");

export const keywords = [
  "earth","mars","jupiter","saturn","uranus","neptune","venus","mercury","sun","moon",
  "galaxy","nebula","andromeda","black hole","supernova","milky way","telescope",
  "space shuttle","astronaut","international space station","asteroid","comet",
  "cosmos","stars","solar system","rocket","spacewalk","eclipse","planet","universe",
  "Hubble","James Webb Telescope",
];

export function mountKeywordTags(scrollSelector, list, onClick){
  const scroll = document.querySelector(scrollSelector);
  if (!scroll) return;

  list.forEach((keyword, index) => {
    const tag = document.createElement("button");
    tag.className = "keyword-tag";
    tag.type = "button";
    tag.textContent = keyword;
    tag.style.animationDelay = `${index * 0.05}s`;

    tag.addEventListener("click", () => {
      const input = document.getElementById("search-input");
      if (input) input.value = keyword;
      hideKeywords();
      onClick?.(keyword);
    });

    scroll.appendChild(tag);
  });
}

export function showKeywords(){
  blurOverlay()?.classList.add("active");
  keywordContainer()?.classList.add("active");
}

export function hideKeywords(){
  blurOverlay()?.classList.remove("active");
  keywordContainer()?.classList.remove("active");
}
