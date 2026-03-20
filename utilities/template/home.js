import { layout } from "./template/baseTemplate.js";

function renderLayout(content){
  document.getElementById("app").innerHTML = content;
}

export function renderHome(data){

const content = `

<div class="hero">

<div class="badge">${data.instrument}</div>

<h1>${data.firstName} ${data.lastName}</h1>

<div class="location">
${data.location.village}, ${data.location.district}
</div>

</div>

<div class="card">
<h3>About</h3>
<p>${data.about || "Professional artist available for events."}</p>
</div>

`;

renderLayout(layout(data, content));

}
