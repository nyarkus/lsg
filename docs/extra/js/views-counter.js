document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  if (!path) return;

  fetch("https://linux-wiki-backend.nyarkus.workers.dev?path=" + encodeURIComponent(path), {
    method: "POST",
  }).catch(console.error);
});
