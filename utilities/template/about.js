import { getBaseHTML } from "./baseTemplate.js";

export function generateAbout(data){

const content = `

<h2>About</h2>

<div class="card">
<p>${data.about || "No description yet."}</p>
</div>

`;

return getBaseHTML("About", content);

}
