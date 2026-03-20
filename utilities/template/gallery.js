import { layout } from "./baseTemplate.js";

export function generateGallery(data){

const content = `

<h2>Gallery</h2>

<div class="grid">
${(data.gallery || Array(5).fill("")).map(img => `
<div class="card">
${img ? `<img src="${img}">` : `<div style="height:150px;display:flex;align-items:center;justify-content:center;color:#64748b;">No Image</div>`}
</div>
`).join("")}
</div>

`;

return layout(data, content);

}
