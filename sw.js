self.addEventListener("install", (e)=>{
  self.skipWaiting();
});

self.addEventListener("activate", (e)=>{
  e.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event)=>{

  const url = new URL(event.request.url);

  /* 🔥 INTERCEPT MANIFEST */
  if(url.pathname === "/manifest.json"){

    const name = url.searchParams.get("name") || "Vidhwaan";

    const manifest = {
      name: `VID ${name}`,
      short_name: `VID ${name}`,
      start_url: self.location.origin + url.searchParams.get("start") || "/",
      display: "standalone",
      background_color: "#020617",
      theme_color: "#1e3a8a",
      icons: [
        {
          src: "/icons1/icon-192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/icons1/icon-512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ]
    };

    event.respondWith(
      new Response(JSON.stringify(manifest), {
        headers: { "Content-Type": "application/json" }
      })
    );

    return;
  }

  /* DEFAULT */
  event.respondWith(fetch(event.request));
});
