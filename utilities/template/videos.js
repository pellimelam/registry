import { getBaseHTML } from "./baseTemplate.js";

export function generateVideos(data){

const content = `

<h2>Videos</h2>

<div class="grid">
${data.videos.map(v => v ? `
<iframe src="${v.replace("watch?v=","embed/")}"></iframe>
` : "").join("")}
</div>

`;

return getBaseHTML("Videos", content);

}
