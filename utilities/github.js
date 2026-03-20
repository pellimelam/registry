import { generateHome } from "./template/home.js";
import { generateGallery } from "./template/gallery.js";
import { generateVideos } from "./template/videos.js";
import { generateAbout } from "./template/about.js";



const GITHUB_TOKEN = "PASTE_YOUR_TOKEN_HERE";
const ORG = "vidhwaan";

/* =========================
   CHECK REPO
========================= */
export async function checkRepo(phone){

const res = await fetch(`https://api.github.com/repos/${ORG}/${phone}`,{
headers:{
"Authorization":`Bearer ${GITHUB_TOKEN}`,
"Accept":"application/vnd.github+json"
}
});

return res.status === 200;

}


/* =========================
   CREATE REPO
========================= */
export async function createRepo(phone){

const res = await fetch(`https://api.github.com/orgs/${ORG}/repos`,{
method:"POST",
headers:{
"Authorization":`Bearer ${GITHUB_TOKEN}`,
"Accept":"application/vnd.github+json"
},
body:JSON.stringify({
name:phone,
private:false,
auto_init:true
})
});

if(res.status === 422) return "exists";
if(res.status === 201) return "created";

return "error";

}


/* =========================
   PUSH FILE
========================= */
export async function pushFile(repo, path, content){

await fetch(`https://api.github.com/repos/${ORG}/${repo}/contents/${path}`,{
method:"PUT",
headers:{
"Authorization":`Bearer ${GITHUB_TOKEN}`,
"Accept":"application/vnd.github+json"
},
body:JSON.stringify({
message:"init commit",
content:btoa(unescape(encodeURIComponent(content)))
})
});

}


/* =========================
   CREATE USER SITE
========================= */
export async function createUserSite(data){

const { firstName, lastName, phone, instrument, village } = data;

/* CREATE DATA.JSON */

await pushFile(phone, "data.json", JSON.stringify(data, null, 2));

/* BASIC TEMPLATE */

const indexHTML = `
<!DOCTYPE html>
<html>
<head>
<title>Vidhwaan - ${firstName} ${lastName}</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="background:#0f172a;color:white;font-family:sans-serif;text-align:center;padding:40px;">
<h1>${firstName} ${lastName}</h1>
<p>${instrument}</p>
<p>${village}</p>
</body>
</html>
`;

await pushFile(phone, "index.html", indexHTML);

}
