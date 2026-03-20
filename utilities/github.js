import { generateHome } from "./template/home.js";
import { generateGallery } from "./template/gallery.js";
import { generateVideos } from "./template/videos.js";
import { generateAbout } from "./template/about.js";



const GITHUB_TOKEN = "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";
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

const { phone } = data;

/* DEFAULT STRUCTURE */

const fullData = {
...data,
gallery:["","","","",""],
videos:["","","","",""],
about:""
};

/* SAVE DATA */

await pushFile(phone, "data.json", JSON.stringify(fullData, null, 2));

/* GENERATE PAGES */

const home = generateHome(fullData);
const gallery = generateGallery(fullData);
const videos = generateVideos(fullData);
const about = generateAbout(fullData);

/* PUSH FILES */

await pushFile(phone, "index.html", home);
await pushFile(phone, "gallery.html", gallery);
await pushFile(phone, "videos.html", videos);
await pushFile(phone, "about.html", about);

}
