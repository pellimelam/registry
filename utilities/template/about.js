import { layout } from "./baseTemplate.js";

export function generateAbout(data){

const content = `

<h2>About</h2>

<div class="card">
<p>
Hello, I am <b>${data.firstName} ${data.lastName}</b>, a professional 
<b>${data.instrument}</b> artist from 
<b>${data.location.village}</b>, ${data.location.district}.

I perform in weddings, cultural events, and traditional ceremonies.
</p>
</div>

`;

return layout(data, content);

}
