export function initRouter(){

const path = window.location.pathname.toLowerCase();

/* IGNORE ROOT */
if(path === "/" || path === "/index.html") return;

/* EXTRACT PHONE */
const phoneMatch = path.match(/(\d{10})/);

if(!phoneMatch) return;

const phone = phoneMatch[1];

/* EXTRACT SUB PAGE */
let page = "home";

if(path.includes("/gallery")) page = "gallery";
else if(path.includes("/videos")) page = "videos";
else if(path.includes("/about")) page = "about";

/* LOAD */
loadProfilePage(phone, page);

}


/* =========================
   LOAD PROFILE
========================= */

async function loadProfilePage(phone, page){

document.body.innerHTML = "<div style='padding:40px;text-align:center'>Loading...</div>";

try{

/* CDN */
const res = await fetch(`https://cdn.jsdelivr.net/gh/vidhwaan/${phone}/data.json`);

if(!res.ok){
document.body.innerHTML = "Profile not found";
return;
}

const data = await res.json();

/* ROUTE */
renderPage(data, page);

}catch(e){
document.body.innerHTML = "Error loading profile";
}

}


/* =========================
   ROUTE HANDLER
========================= */

function renderPage(data, page){

if(page === "gallery") return renderGallery(data);
if(page === "videos") return renderVideos(data);
if(page === "about") return renderAbout(data);

renderHome(data);

}


/* =========================
   COMMON NAV
========================= */

function nav(data){

const slug = `${data.firstName}${data.lastName}${data.phone}`.toLowerCase();

return `
<div style="margin-bottom:30px;display:flex;gap:16px;flex-wrap:wrap;">
<a href="/${slug}">Home</a>
<a href="/${slug}/gallery">Gallery</a>
<a href="/${slug}/videos">Videos</a>
<a href="/${slug}/about">About</a>
</div>
`;

}


/* =========================
   SEO HELPER
========================= */

function applySEO(title, description, data){

document.title = title;

/* meta */
const meta = document.createElement("meta");
meta.name = "description";
meta.content = description;
document.head.appendChild(meta);

/* schema */
const script = document.createElement("script");
script.type = "application/ld+json";

script.innerHTML = JSON.stringify({
"@context":"https://schema.org",
"@type":"Person",
"name":`${data.firstName} ${data.lastName}`,
"jobTitle":data.instrument,
"address":{
"@type":"PostalAddress",
"addressLocality":data.location.village
}
});

document.head.appendChild(script);

}


/* =========================
   HOME
========================= */

function renderHome(data){

applySEO(
`Vidhwaan - ${data.firstName} ${data.lastName}`,
`${data.firstName} ${data.lastName} - ${data.instrument} from ${data.location.village}`,
data
);

document.body.innerHTML = `
<div style="max-width:900px;margin:auto;padding:40px;color:white;">

${nav(data)}

<h1>${data.firstName} ${data.lastName}</h1>
<p>${data.instrument} • ${data.location.village}</p>

</div>
`;

}


/* =========================
   GALLERY
========================= */

function renderGallery(data){

applySEO(
`Gallery - ${data.firstName} ${data.lastName}`,
`Gallery of ${data.firstName} ${data.lastName}`,
data
);

document.body.innerHTML = `
<div style="max-width:900px;margin:auto;padding:40px;color:white;">

${nav(data)}

<h1>Gallery</h1>

${data.gallery.map(i=> i ? `
<img src="${i}" style="width:100%;margin-bottom:12px;border-radius:12px;">
` : "").join("")}

</div>
`;

}


/* =========================
   VIDEOS
========================= */

function renderVideos(data){

applySEO(
`Videos - ${data.firstName} ${data.lastName}`,
`Videos of ${data.firstName} ${data.lastName}`,
data
);

document.body.innerHTML = `
<div style="max-width:900px;margin:auto;padding:40px;color:white;">

${nav(data)}

<h1>Videos</h1>

${data.videos.map(v=> v ? `
<iframe src="${v.replace("watch?v=","embed/")}"
style="width:100%;height:220px;margin-bottom:12px;border-radius:12px;border:none;">
</iframe>
` : "").join("")}

</div>
`;

}


/* =========================
   ABOUT
========================= */

function renderAbout(data){

applySEO(
`About - ${data.firstName} ${data.lastName}`,
`About ${data.firstName} ${data.lastName}`,
data
);

document.body.innerHTML = `
<div style="max-width:900px;margin:auto;padding:40px;color:white;">

${nav(data)}

<h1>About</h1>

<p>${data.about || "No description yet."}</p>

</div>
`;

}
