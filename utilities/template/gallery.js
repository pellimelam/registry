import { getBaseHTML } from "./baseTemplate.js";

export function generateGallery(data){

const content = `

<h2>Gallery</h2>

<div class="grid">
${data.gallery.map(img => img ? `<img src="${img}">` : "").join("")}
</div>

`;

return getBaseHTML("Gallery", content);

}
