document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  if (!path) return;

  fetch("https://your-worker-domain.pages.dev?path=" + encodeURIComponent(path), {
    method: "POST",
  }).catch(console.error);
});
