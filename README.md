# [COSMO](https://c-o-s-m-o.netlify.app/) 

  
COSMO is a lightweight NASA media explorer built using vanilla HTML, CSS, and JavaScript. It fetches space-related images and videos from NASA’s public Images API and displays them in a clean, immersive interface with search support, keyword suggestions, fullscreen mode, and a dynamic starfield background.

I created this project to practice real-world frontend development fundamentals such as DOM manipulation, modular JavaScript structure, asynchronous API handling, UI state management, and responsive design.

---

## Features

- Fetches NASA images and videos using NASA Images API
- Random media discovery for exploration
- Search functionality with curated keyword suggestions
- Fullscreen viewing mode for an immersive experience
- Dynamic starfield animation background
- Responsive layout (mobile and desktop friendly)
- Clean UI with minimal distraction and focus on media content
- Modular JavaScript code structure (maintainable and scalable)

---


## How It Works

1. A keyword is selected (randomly or from the search input).
2. The NASA Images API is queried with the keyword.
3. A random item is selected from the returned results.
4. The app detects whether the media is an image or video:
   - Images are displayed directly.
   - Videos are fetched through the media endpoint and loaded as `.mp4`.
5. UI updates include title, date, and description (Observation section).

---

## API Reference

This project uses:

- NASA Images API  
  https://images.nasa.gov/

Endpoint example:
```
https://images-api.nasa.gov/search?q=mars
```

---

