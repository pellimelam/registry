import { layout } from "./template/baseTemplate.js";

function renderLayout(content){
document.getElementById("app").innerHTML = content;
}

export function initRouter(){

if(window.location.pathname.match(/\d{10}$/)){
document.body.innerHTML = "<div id='app'></div>";
}

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

// ✅ HIDE LANDING UI WHEN PROFILE LOADS
document.getElementById("nav").style.display = "none";
document.getElementById("hero").style.display = "none";
document.getElementById("registration").style.display = "none";
document.getElementById("edit").style.display = "none";
document.getElementById("footer").style.display = "none";


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
${slugify(data.location.village)}/
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


document.title = `Vidhwaan | ${data.firstName} ${data.lastName} | ${data.instrument}`;


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





function formatName(str){
return str.replace(/-/g," ").replace(/\b\w/g,c=>c.toUpperCase());
}


function extractPincode(village){
const match = village.match(/\d{6}$/);
return match ? match[0] : "";
}


function getVillageName(str){
return str.split("-")[0].replace(/\b\w/g,c=>c.toUpperCase());
}



/* =========================
   HOME
========================= */

function renderHome(data){

applySEO(
`${data.firstName} ${data.lastName}`,
`${data.instrument} artist`,
data
);

const profileUrl = window.location.href;

const qr = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${profileUrl}`;

const content = `

<div class="hero">

<div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap;">

<!-- PROFILE IMAGE -->
<img src="https://ui-avatars.com/api/?name=${data.firstName}+${data.lastName}&background=1e3a8a&color=fff&size=200"
style="
border-radius:50%;
width:120px;
height:120px;
border:3px solid rgba(255,255,255,0.3);
box-shadow:0 0 40px rgba(59,130,246,0.6);
">

<div>

<h1>${data.firstName} ${data.lastName}</h1>

<div class="badge">${data.instrument}</div>

<!-- ❌ REMOVED SLUG ADDRESS -->

</div>

</div>

</div>


<!-- ✅ ADDRESS BOX (NEW) -->
<div class="card">

<h3>Location</h3>

<p style="line-height:1.8;color:#cbd5f5;">

${getVillageName(data.location.village)} Village<br>
${formatName(data.location.subdistrict)} Mandal<br>
${formatName(data.location.district)} District<br>
${formatName(data.location.state)}<br>
India - ${extractPincode(data.location.village)}

</p>

</div>


<!-- CONTACT -->
<div class="card">

<h3>Contact</h3>

<p><b>Phone:</b> ${data.phone}</p>

</div>


<!-- QR SECTION (UPGRADED DOWNLOAD) -->
<div class="card" style="text-align:center;">

<h3 style="margin-bottom:5px;">Scan & Share</h3>

<p style="color:#94a3b8;font-size:13px;">
Instant profile access
</p>

<div style="
background:white;
padding:15px;
border-radius:16px;
display:inline-block;
margin-top:10px;
">

<img src="${qr}" style="width:180px;" id="qrImage">

</div>

<br><br>

<button id="downloadQRBtn"
data-name="${data.firstName} ${data.lastName}"
data-instrument="${data.instrument}"
data-url="${profileUrl}"
style="
background:#1e40af;
padding:10px 16px;
border-radius:8px;
color:white;
border:none;
cursor:pointer;
">
Download QR
</button>

</div>


<!-- QUICK ACTIONS -->
<div class="card">

<h3>Quick Actions</h3>

<div style="display:flex;gap:10px;flex-wrap:wrap;">

<a href="tel:${data.phone}"
style="background:#16a34a;padding:10px 14px;border-radius:8px;color:white;text-decoration:none;">
Call
</a>

<a href="https://wa.me/91${data.phone}"
style="background:#22c55e;padding:10px 14px;border-radius:8px;color:white;text-decoration:none;">
WhatsApp
</a>

</div>

</div>

`;

renderLayout(layout(data, content));

requestAnimationFrame(()=>{

const btn = document.getElementById("downloadQRBtn");

if(btn){
btn.onclick = function(){
downloadQR(
this.dataset.name,
this.dataset.instrument,
this.dataset.url,
data.phone
);
};
}

});


}



function downloadQR(name, instrument, url, phone){

const scale = 2;

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 600 * scale;
canvas.height = 820 * scale;

ctx.scale(scale, scale);

// ================= BACKGROUND =================
ctx.fillStyle = "#ffffff";
ctx.fillRect(0,0,600,820);

// ================= MAIN CARD =================
ctx.beginPath();
ctx.roundRect(20,20,560,780,20);
ctx.fillStyle = "#ffffff";
ctx.fill();

// ================= HEADER TEXT (NO BLACK BAR) =================
ctx.fillStyle = "#111827";
ctx.font = "bold 26px Inter, Arial";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillText("VIDHWAAN IDENTITY", 300, 70);

// ================= GOLD LINE =================
ctx.fillStyle = "#d4af37";
ctx.fillRect(100,110,400,2);

// ================= NAME =================
ctx.fillStyle = "#111827";
ctx.font = "bold 28px Inter";
ctx.fillText(name, 300, 180);

// ================= ROLE =================
ctx.fillStyle = "#2563eb";
ctx.font = "18px Inter";
ctx.fillText(instrument, 300, 220);

// ================= QR BOX =================
ctx.beginPath();
ctx.roundRect(150,260,300,300,16);
ctx.fillStyle = "#ffffff";
ctx.fill();

ctx.lineWidth = 2;
ctx.strokeStyle = "#d1d5db";
ctx.stroke();

// ================= FETCH QR =================
fetch(`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${url}`)
.then(res => res.blob())
.then(blob => {

const img = new Image();
img.src = URL.createObjectURL(blob);

img.onload = function(){

ctx.drawImage(img, 165, 275, 270, 270);

// ================= ID NUMBER =================
ctx.fillStyle = "#6b7280";
ctx.font = "14px Inter";
ctx.fillText(`VID-${phone}`, 300, 600);

// ================= FOOTER =================
ctx.fillStyle = "#111827";
ctx.font = "bold 18px Inter";
ctx.fillText("Vidhwaan Community", 300, 640);

// TAGLINE
ctx.fillStyle = "#6b7280";
ctx.font = "13px Inter";
ctx.fillText("Tradition • Pride • Legacy", 300, 665);

// ================= SECURITY LINE =================
ctx.fillStyle = "#111827";
ctx.fillRect(120,700,360,1);

// ================= WEBSITE (NEW - BELOW LINE) =================
ctx.fillStyle = "#2563eb";
ctx.font = "bold 13px Inter";
ctx.fillText("www.vidhwaan.com", 300, 730);

// ================= DOWNLOAD =================
const link = document.createElement("a");
link.download = `${name}-vidhwaan-id.png`;
link.href = canvas.toDataURL("image/png", 1.0);
link.click();

};

});

}


/* =========================
   GALLERY
========================= */

function renderGallery(data){

const images = data.gallery && data.gallery.length
? data.gallery
: Array(5).fill("");

const content = `

<h2>Gallery</h2>

<p style="color:#94a3b8;font-size:14px;margin-bottom:10px;">
Photos and event moments
</p>

<div class="grid">

${images.map(img => `
<div class="card" style="padding:10px;">

${img 
? `<img src="${img}" style="height:180px;object-fit:cover;">`
: `<div style="
height:180px;
display:flex;
align-items:center;
justify-content:center;
background:rgba(255,255,255,0.03);
border-radius:10px;
color:#64748b;
font-size:13px;">
No Image
</div>`
}

</div>
`).join("")}

</div>

`;

renderLayout(layout(data, content));

}
/* =========================
   VIDEOS
========================= */

function renderVideos(data){

const videos = data.videos && data.videos.length
? data.videos
: Array(5).fill("");

const content = `

<h2>Videos</h2>

<p style="color:#94a3b8;font-size:14px;margin-bottom:10px;">
Performance highlights and recordings
</p>

<div class="grid">

${videos.map(v => `
<div class="card" style="padding:10px;">

${v 
? `<iframe src="${v.replace("watch?v=","embed/")}" style="height:180px;"></iframe>`
: `<div style="
height:180px;
display:flex;
align-items:center;
justify-content:center;
background:rgba(255,255,255,0.03);
border-radius:10px;
color:#64748b;
font-size:13px;">
No Video
</div>`
}

</div>
`).join("")}

</div>

`;

renderLayout(layout(data, content));

}

/* =========================
   ABOUT
========================= */

function renderAbout(data){

const content = `

<h2>About</h2>

<div class="card">

<p style="line-height:1.6;color:#cbd5f5;">

Hello, I am <b>${data.firstName} ${data.lastName}</b>, a dedicated and professional 
<b>${data.instrument}</b> artist based in 
<b>${data.location.village}</b>, ${data.location.district}, ${data.location.state}.

</p>

<p style="line-height:1.6;color:#cbd5f5;">

I specialize in performing at weddings, cultural events, traditional ceremonies, and special occasions, bringing authentic musical experience to every event.

</p>

<p style="line-height:1.6;color:#cbd5f5;">

With passion and experience in my field, I aim to deliver high-quality performances that create memorable moments for every audience.

</p>

</div>


<div class="card">

<h3>Services</h3>

<ul style="color:#cbd5f5;line-height:1.8;padding-left:18px;">
<li>Wedding Performances</li>
<li>Cultural Events</li>
<li>Temple Programs</li>
<li>Private Functions</li>
</ul>

</div>


<div class="card">

<h3>Location</h3>

<p style="color:#cbd5f5;">
${data.location.village}, ${data.location.subdistrict}, ${data.location.district}, ${data.location.state}
</p>

</div>

`;

renderLayout(layout(data, content));

}
