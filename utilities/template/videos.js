import { layout } from "./baseTemplate.js";

export function generateVideos(data){

const content = `

<h2>Videos</h2>

<div class="grid">
${(data.videos || Array(5).fill("")).map(v => `
<div class="card">
${v ? `
<iframe src="${v.replace("watch?v=","embed/")}"></iframe>
` : `
<div style="height:150px;display:flex;align-items:center;justify-content:center;color:#64748b;">
No Video
</div>
`}
</div>
`).join("")}
</div>

`;

return layout(data, content);

}
