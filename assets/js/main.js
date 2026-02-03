import { createStarfield } from "./modules/starfield.js";
import { keywords, mountKeywordTags, showKeywords, hideKeywords } from "./modules/keywords.js";
import { startClock } from "./modules/clock.js";
import { getNASAImage, setHandlers } from "./modules/nasa.js";

createStarfield("#starfield", 100);
mountKeywordTags("#keyword-scroll", keywords, (kw) => getNASAImage(kw));

setHandlers({
  onShowKeywords: showKeywords,
  onHideKeywords: hideKeywords,
  onNext: () => getNASAImage(),
  onSearch: (q) => getNASAImage(q),
});

startClock("#time");

// Initial load
getNASAImage();
