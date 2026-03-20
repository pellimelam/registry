import { getBaseHTML } from "./baseTemplate.js";

export function generateAbout(data){

const about = data.about || "No description yet.";

const content = `
<h1>About</h1>

<div class="card">
<p>${about}</p>
</div>
`;

return getBaseHTML("About", content);

}
