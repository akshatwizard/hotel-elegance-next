// Swap <img class="svg-img" src="*.svg"> for the inline <svg> so the template
// CSS can colour the shapes. Plain DOM APIs (no jQuery). Results are cached so
// each SVG file is fetched once per page load.
const cache = new Map();

function loadSvg(url) {
  if (!cache.has(url)) {
    cache.set(
      url,
      fetch(url)
        .then((r) => (r.ok ? r.text() : Promise.reject(new Error(r.status))))
        .catch(() => null)
    );
  }
  return cache.get(url);
}

export const imageTosvg = () => {
  if (typeof window === "undefined") return;
  document.querySelectorAll('img.svg-img[src$=".svg"]').forEach(async (img) => {
    const text = await loadSvg(img.getAttribute("src"));
    if (!text || !img.isConnected) return;
    const doc = new DOMParser().parseFromString(text, "image/svg+xml");
    const svg = doc.querySelector("svg");
    if (!svg) return;
    svg.removeAttribute("xmlns:a");
    for (const { name, value } of Array.from(img.attributes)) {
      if (name !== "src") svg.setAttribute(name, value);
    }
    img.replaceWith(document.importNode(svg, true));
  });
};
