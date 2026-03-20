export function initRouter(){

const path = window.location.pathname.toLowerCase();

/* IGNORE ROOT */
if(path === "/" || path === "/index.html") return;

/* EXTRACT PHONE */
const match = path.match(/(\d{10})$/);

if(!match) return;

const phone = match[1];

/* LOAD PROFILE */
loadProfilePage(phone);

}


/* =========================
   LOAD PROFILE PAGE
========================= */

async function loadProfilePage(phone){

document.body.innerHTML = "<div style='padding:40px;text-align:center'>Loading profile...</div>";

try{

/* ✅ CDN (FAST) */
const res = await fetch(`https://cdn.jsdelivr.net/gh/vidhwaan/${phone}/data.json`);

if(!res.ok){
document.body.innerHTML = "Profile not found";
return;
}

const data = await res.json();

/* RENDER */
renderProfile(data);

}catch(e){
document.body.innerHTML = "Error loading profile";
}

}


/* =========================
   RENDER PROFILE
========================= */

function renderProfile(data){

const { firstName, lastName, instrument, location, gallery, videos, about } = data;

/* =========================
   SEO
========================= */

/* TITLE */
document.title = `Vidhwaan - ${firstName} ${lastName}`;

/* META DESCRIPTION */
const meta = document.createElement("meta");
meta.name = "description";
meta.content = `${firstName} ${lastName} - ${instrument} from ${location.village}`;
document.head.appendChild(meta);

/* STRUCTURED DATA */
const script = document.createElement("script");
script.type = "application/ld+json";

script.innerHTML = JSON.stringify({
"@context":"https://schema.org",
"@type":"Person",
"name":`${firstName} ${lastName}`,
"jobTitle":instrument,
"address":{
"@type":"PostalAddress",
"addressLocality":location.village
}
});

document.head.appendChild(script);


/* =========================
   UI
========================= */

document.body.innerHTML = `

<div style="max-width:900px;margin:auto;padding:40px;color:white;font-family:system-ui;">

<h1>${firstName} ${lastName}</h1>

<p style="color:#94a3b8;margin-bottom:20px;">
${instrument} • ${location.village}
</p>

<hr style="margin:30px 0;border-color:#334155;">

<h2>Gallery</h2>
${(gallery || []).map(i=> i ? `
<img src="${i}" style="width:100%;margin-bottom:12px;border-radius:12px;">
` : "").join("")}

<h2>Videos</h2>
${(videos || []).map(v=> v ? `
<iframe src="${v.replace("watch?v=","embed/")}"
style="width:100%;height:220px;margin-bottom:12px;border-radius:12px;border:none;">
</iframe>
` : "").join("")}

<h2>About</h2>
<p style="color:#94a3b8;">
${about || "No description yet."}
</p>

</div>

`;

}
