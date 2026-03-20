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

const res = await fetch(`https://raw.githubusercontent.com/vidhwaan/${phone}/main/data.json`);

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

/* SEO */

document.title = `Vidhwaan - ${firstName} ${lastName}`;

/* HTML */

document.body.innerHTML = `

<div style="max-width:900px;margin:auto;padding:40px;color:white;font-family:system-ui;">

<h1>${firstName} ${lastName}</h1>

<p>${instrument} • ${location.village}</p>

<hr>

<h2>Gallery</h2>
${gallery.map(i=> i ? `<img src="${i}" style="width:100%;margin-bottom:10px;border-radius:10px;">` : "").join("")}

<h2>Videos</h2>
${videos.map(v=> v ? `<iframe src="${v.replace("watch?v=","embed/")}" style="width:100%;height:220px;margin-bottom:10px;"></iframe>` : "").join("")}

<h2>About</h2>
<p>${about || ""}</p>

</div>

`;

}
