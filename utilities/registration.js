let GEO = null;

export async function loadRegistration(){

const html = `

<section class="section" id="registration">

<div class="container">

<h2 class="section-title">Register as Vidhwaan</h2>

<div class="card" style="max-width:700px;margin:auto;">

<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">

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

<button class="btn btn-primary" style="margin-top:15px;width:100%;" onclick="registerUser()">
Register
</button>

<div id="result" style="margin-top:12px;"></div>

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

const res = await fetch(url);

if(!res.ok){
console.error("Failed:", url);
continue;
}

const data = await res.json();

Object.assign(merged,data);

}

GEO = merged;

console.log("GEO LOADED:", GEO);

}


/* ---------------- STATE ---------------- */

function initState(){

const stateEl = document.getElementById("state");

stateEl.innerHTML = `<option value="">Select State</option>`;

Object.keys(GEO).forEach(key=>{
stateEl.innerHTML += `<option value="${key}">${GEO[key].name}</option>`;
});

stateEl.onchange = handleDistrict;

}


/* ---------------- DISTRICT ---------------- */

function handleDistrict(){

const stateKey = this.value;

const districtEl = document.getElementById("district");
districtEl.innerHTML = `<option value="">Select District</option>`;

if(!stateKey) return;

const districts = GEO[stateKey].districts;

Object.keys(districts).forEach(key=>{
districtEl.innerHTML += `<option value="${key}">${districts[key].name}</option>`;
});

districtEl.onchange = handleSubdistrict;

}


/* ---------------- SUBDISTRICT ---------------- */

function handleSubdistrict(){

const stateKey = document.getElementById("state").value;
const districtKey = this.value;

const subEl = document.getElementById("subdistrict");
subEl.innerHTML = `<option value="">Select Subdistrict</option>`;

if(!districtKey) return;

const subs = GEO[stateKey].districts[districtKey].subdistricts;

Object.keys(subs).forEach(key=>{
subEl.innerHTML += `<option value="${key}">${subs[key].name}</option>`;
});

subEl.onchange = handleVillage;

}


/* ---------------- VILLAGE ---------------- */

function handleVillage(){

const stateKey = document.getElementById("state").value;
const districtKey = document.getElementById("district").value;
const subKey = this.value;

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
