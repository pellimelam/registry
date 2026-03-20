import { layout } from "./template/baseTemplate.js";

function renderLayout(content){
  document.getElementById("app").innerHTML = content;
}

export function renderAbout(data){

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

renderLayout(layout(data, content));

}
