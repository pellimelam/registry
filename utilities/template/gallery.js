import { layout } from "./template/baseTemplate.js";

function renderLayout(content){
  document.getElementById("app").innerHTML = content;
}

export function renderGallery(data){

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

renderLayout(layout(data, content));

}
