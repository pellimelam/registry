import { getBaseHTML } from "./baseTemplate.js";

export function generateVideos(data){

const videos = data.videos || ["","","","",""];

const content = `
<h1>Videos</h1>

${videos.map(v => `
<div class="card">
${v 
? `<iframe src="${v.replace("watch?v=","embed/")}" 
style="width:100%;height:220px;border:none;border-radius:10px;"></iframe>` 
: "No Video"}
</div>
`).join("")}
`;

return getBaseHTML("Videos", content);

}
