import { generateHome } from "./template/home.js";
import { generateGallery } from "./template/gallery.js";
import { generateVideos } from "./template/videos.js";
import { generateAbout } from "./template/about.js";

const API = "https://cold-haze-63a2.needfullfil.workers.dev/";

/* =========================
   CHECK REPO
========================= */
export async function checkRepo(phone){

const res = await fetch(API, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
action: "checkRepo",
phone
})
});

const data = await res.json();
return data.exists;

}


/* =========================
   CREATE REPO
========================= */
export async function createRepo(phone){

const res = await fetch(API, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
action: "createRepo",
phone
})
});

if(res.status !== 200) return "error";

return "created";

}


/* =========================
   PUSH FILE
========================= */
export async function pushFile(repo, path, content){

await fetch(API, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
action: "pushFile",
repo,
path,
content: btoa(unescape(encodeURIComponent(content)))
})
});

}


/* =========================
   CREATE USER SITE
========================= */
export async function createUserSite(data){

const { phone } = data;

const fullData = {
...data,
gallery:["","","","",""],
videos:["","","","",""],
about:""
};

/* SAVE DATA */
await pushFile(phone, "data.json", JSON.stringify(fullData, null, 2));

/* GENERATE PAGES */
await pushFile(phone, "index.html", generateHome(fullData));
await pushFile(phone, "gallery.html", generateGallery(fullData));
await pushFile(phone, "videos.html", generateVideos(fullData));
await pushFile(phone, "about.html", generateAbout(fullData));

}
