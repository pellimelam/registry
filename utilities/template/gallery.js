import { getBaseHTML } from "./baseTemplate.js";

export function generateGallery(data){

const images = data.gallery || ["","","","",""];

const content = `
<h1>Gallery</h1>

${images.map(img => `
<div class="card">
${img ? `<img src="${img}">` : "No Image"}
</div>
`).join("")}
`;

return getBaseHTML("Gallery", content);

}
