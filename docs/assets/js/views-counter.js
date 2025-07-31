document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  if (!path) return;

  const workerUrl = "https://lsg-backend.nyarkus.workers.dev?path=" + encodeURIComponent(path);

  fetch(workerUrl, {
    method: "POST",
  }).catch(console.error);
});