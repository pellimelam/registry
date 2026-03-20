export function initRouter(){

let path = window.location.pathname.toLowerCase();

/* HANDLE 404 REDIRECT */
const params = new URLSearchParams(window.location.search);
const redirectedPath = params.get("path");

if(redirectedPath){

path = decodeURIComponent(redirectedPath).toLowerCase();

/* 🔥 CLEAN URL (REMOVE ?path=) */
window.history.replaceState({}, "", path);

}

/* IGNORE ROOT */
if(path === "/" || path === "/index.html") return;

/* SPLIT */
const parts = path.split("/").filter(Boolean);

/* FIND PHONE */
let phone = null;

for(const part of parts){
const match = part.match(/(\d{10})$/);
if(match){
phone = match[1];
break;
}
}

if(!phone) return;

/* PAGE TYPE */
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

function renderLayout(content){
document.getElementById("app").innerHTML = content;
}

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

function slugify(str){
return str.toLowerCase().replace(/\s+/g,"-");
}

function nav(data){

const slug = `${data.firstName}${data.lastName}${data.phone}`.toLowerCase();

/* GEO PATH */
const geoPath = `
${slugify(data.location.state)}/
${slugify(data.location.district)}/
${slugify(data.location.subdistrict)}/
${slugify(data.instrument)}/
${slug}
`.replace(/\n/g,"");

return `
<div style="margin-bottom:30px;display:flex;gap:16px;flex-wrap:wrap;">
<a href="/${geoPath}">Home</a>
<a href="/${geoPath}/gallery">Gallery</a>
<a href="/${geoPath}/videos">Videos</a>
<a href="/${geoPath}/about">About</a>
</div>
`;

}


/* =========================
   SEO HELPER
========================= */

function applySEO(title, description, data){

const geo = `${data.location.village}, ${data.location.subdistrict}, ${data.location.district}, ${data.location.state}`;

/* TITLE */
document.title = `${title} | ${geo}`;

/* META */
const meta = document.createElement("meta");
meta.name = "description";
meta.content = `${description} in ${geo}`;
document.head.appendChild(meta);

/* KEYWORDS (optional boost) */
const keywords = document.createElement("meta");
keywords.name = "keywords";
keywords.content = `${data.instrument}, ${data.firstName}, ${geo}`;
document.head.appendChild(keywords);

/* STRUCTURED DATA */
const script = document.createElement("script");
script.type = "application/ld+json";

script.innerHTML = JSON.stringify({
"@context":"https://schema.org",
"@type":"Person",
"name":`${data.firstName} ${data.lastName}`,
"jobTitle":data.instrument,
"address":{
"@type":"PostalAddress",
"addressLocality":data.location.village,
"addressRegion":data.location.district
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
