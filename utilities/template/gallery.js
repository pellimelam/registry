import { layout } from "./baseTemplate.js";

export function generateGallery(data){

const content = `

<h2>Gallery</h2>

<div class="grid">
${(data.gallery || Array(5).fill("")).map(img => `
<div class="card" style="padding:10px;">

${img ? `
<div style="width:100%;aspect-ratio:1/1;overflow:hidden;border-radius:10px;">
<img src="${img}" style="width:100%;height:100%;object-fit:cover;">
</div>
` : `
<div style="
width:100%;
aspect-ratio:1/1;
display:flex;
align-items:center;
justify-content:center;
background:rgba(255,255,255,0.03);
border-radius:10px;
color:#64748b;
font-size:13px;
">
No Image
</div>
`}

</div>
`).join("")}
</div>

<div class="card" style="text-align:center;">
<p style="color:#94a3b8;">
To update gallery photos, please contact us on WhatsApp.
</p>
<a href="https://wa.me/919440246101"
style="display:inline-block;margin-top:10px;background:#22c55e;padding:10px 14px;border-radius:8px;color:white;text-decoration:none;">
Contact Us
</a>
</div>



`;

return layout(data, content);

}
