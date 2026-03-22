import { layout } from "./baseTemplate.js";

export function generateVideos(data){

const content = `

<h2>Videos</h2>

<div class="grid">
${(data.videos || Array(5).fill("")).map(v => `
<div class="card" style="padding:10px;">

${v ? `
<div style="
position:relative;
width:100%;
padding-top:56.25%;
border-radius:10px;
overflow:hidden;
">
<iframe src="${v.replace("watch?v=","embed/")}"
style="
position:absolute;
top:0;
left:0;
width:100%;
height:100%;
"
allowfullscreen>
</iframe>
</div>
` : `
<div style="
width:100%;
aspect-ratio:16/9;
display:flex;
align-items:center;
justify-content:center;
background:rgba(255,255,255,0.03);
border-radius:10px;
color:#64748b;
font-size:13px;
">
No Video
</div>
`}

</div>
`).join("")}
</div>


<div class="card" style="text-align:center;">
<p style="color:#94a3b8;">
To update videos, please contact us on WhatsApp.
</p>
<a href="https://wa.me/919440246101"
style="display:inline-block;margin-top:10px;background:#22c55e;padding:10px 14px;border-radius:8px;color:white;text-decoration:none;">
Contact Us
</a>
</div>


`;

return layout(data, content);

}
