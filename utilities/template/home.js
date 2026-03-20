import { getBaseHTML } from "./baseTemplate.js";

export function generateHome(data){

const { firstName, lastName, instrument, location } = data;

const content = `
<h1>${firstName} ${lastName}</h1>

<div class="card">
<p><b>Instrument:</b> ${instrument}</p>
<p><b>Location:</b> ${location.village}</p>
</div>
`;

return getBaseHTML(`Vidhwaan - ${firstName} ${lastName}`, content);

}
