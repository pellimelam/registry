let GEO = null;

export async function loadRegistration(){

const html = `

<section class="section" id="registration">

<div class="container">

<h2 style="
text-align:center;
font-size:28px;
margin-bottom:30px;
font-weight:600;
">
Register as Vidhwaan
</h2>

<div style="
max-width:800px;
margin:auto;
background:rgba(30,41,59,0.6);
border:1px solid #334155;
border-radius:20px;
padding:30px;
backdrop-filter:blur(10px);
">

<div style="
display:grid;
grid-template-columns:1fr 1fr;
gap:16px;
">

<select id="state"></select>
<select id="district"></select>

<select id="subdistrict"></select>
<select id="village"></select>

<input id="firstName" placeholder="First Name">
<input id="lastName" placeholder="Last Name">

<input id="phone" placeholder="Mobile Number" maxlength="10">

<select id="instrument">
<option value="">Select Instrument</option>
<option>Nadaswaram</option>
<option>Dolu</option>
<option>Saxophone</option>
<option>Drum</option>
</select>

</div>

<button class="btn btn-primary" style="
margin-top:20px;
width:100%;
height:50px;
font-size:16px;
border-radius:12px;
" onclick="registerUser()">
Register
</button>

<div id="result" style="margin-top:15px;text-align:center;"></div>

</div>

</div>

</section>

`;

document.getElementById("registration").innerHTML = html;

/* LOAD GEO */
await loadGeo();

/* INIT */
initState();

}


/* ---------------- LOAD JSON ---------------- */

async function loadGeo(){

if(GEO) return;

const parts = [
"./geo_dataset_1.json",
"./geo_dataset_2.json",
"./geo_dataset_3.json",
"./geo_dataset_4.json"
];

let merged = {};

for(const url of parts){

try{
const res = await fetch(url);
if(!res.ok) throw new Error();
const data = await res.json();
Object.assign(merged,data);
}catch(e){
console.error("Failed loading:", url);
}

}

GEO = merged;

}


/* ---------------- STATE ---------------- */

function initState(){

const stateEl = document.getElementById("state");

stateEl.innerHTML = `<option value="">Select State</option>`;

Object.keys(GEO).forEach(key=>{
stateEl.innerHTML += `<option value="${key}">${GEO[key].name}</option>`;
});

stateEl.onchange = () => loadDistrict(stateEl.value);

}


/* ---------------- DISTRICT ---------------- */

function loadDistrict(stateKey){

const districtEl = document.getElementById("district");
districtEl.innerHTML = `<option value="">Select District</option>`;

if(!stateKey) return;

const districts = GEO[stateKey].districts;

Object.keys(districts).forEach(key=>{
districtEl.innerHTML += `<option value="${key}">${districts[key].name}</option>`;
});

districtEl.onchange = () => loadSubdistrict(stateKey, districtEl.value);

}


/* ---------------- SUBDISTRICT ---------------- */

function loadSubdistrict(stateKey, districtKey){

const subEl = document.getElementById("subdistrict");
subEl.innerHTML = `<option value="">Select Subdistrict</option>`;

if(!districtKey) return;

const subs = GEO[stateKey].districts[districtKey].subdistricts;

Object.keys(subs).forEach(key=>{
subEl.innerHTML += `<option value="${key}">${subs[key].name}</option>`;
});

subEl.onchange = () => loadVillage(stateKey, districtKey, subEl.value);

}


/* ---------------- VILLAGE ---------------- */

function loadVillage(stateKey, districtKey, subKey){

const villageEl = document.getElementById("village");
villageEl.innerHTML = `<option value="">Select Village</option>`;

if(!subKey) return;

const villages =
GEO[stateKey]
.districts[districtKey]
.subdistricts[subKey]
.villages;

villages.forEach(v=>{
villageEl.innerHTML += `
<option value="${v.slug}">
${v.name} (${v.pincode})
</option>`;
});

}
