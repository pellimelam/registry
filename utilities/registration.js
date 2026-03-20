let GEO = null;

export async function loadRegistration(){

const html = `

<section class="section" id="registration">

<div class="container" style="max-width:500px;margin:auto;">

<h2 style="
text-align:center;
font-size:26px;
margin-bottom:25px;
font-weight:600;
">
Register as Vidhwaan
</h2>

<div class="card" style="padding:20px;">

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

<button class="btn btn-primary" style="
margin-top:15px;
width:100%;
height:48px;
font-size:16px;
" onclick="registerUser()">
Register
</button>

<div id="result" style="margin-top:12px;text-align:center;"></div>

</div>

</div>

</section>

`;

document.getElementById("registration").innerHTML = html;

await loadGeo();
initState();

}


/* ---------- LOAD GEO ---------- */

async function loadGeo(){

if(GEO) return;

const files = [
"./geo_dataset_1.json",
"./geo_dataset_2.json",
"./geo_dataset_3.json",
"./geo_dataset_4.json"
];

let merged = {};

for(const file of files){

try{
const res = await fetch(file);

if(!res.ok){
console.error("❌ JSON NOT FOUND:", file);
continue;
}

const data = await res.json();
Object.assign(merged, data);

}catch(e){
console.error("❌ ERROR:", file, e);
}

}

GEO = merged;

console.log("✅ GEO LOADED:", Object.keys(GEO).length);

}


/* ---------- STATE ---------- */

function initState(){

const el = document.getElementById("state");

el.innerHTML = `<option value="">Select State</option>`;

Object.keys(GEO).forEach(key=>{
el.innerHTML += `<option value="${key}">${GEO[key].name}</option>`;
});

el.onchange = () => loadDistrict(el.value);

}


/* ---------- DISTRICT ---------- */

function loadDistrict(stateKey){

const el = document.getElementById("district");
el.innerHTML = `<option value="">Select District</option>`;

if(!stateKey) return;

const districts = GEO[stateKey].districts;

Object.keys(districts).forEach(key=>{
el.innerHTML += `<option value="${key}">${districts[key].name}</option>`;
});

el.onchange = () => loadSubdistrict(stateKey, el.value);

}


/* ---------- SUBDISTRICT ---------- */

function loadSubdistrict(stateKey, districtKey){

const el = document.getElementById("subdistrict");
el.innerHTML = `<option value="">Select Subdistrict</option>`;

if(!districtKey) return;

const subs = GEO[stateKey].districts[districtKey].subdistricts;

Object.keys(subs).forEach(key=>{
el.innerHTML += `<option value="${key}">${subs[key].name}</option>`;
});

el.onchange = () => loadVillage(stateKey, districtKey, el.value);

}


/* ---------- VILLAGE ---------- */

function loadVillage(stateKey, districtKey, subKey){

const el = document.getElementById("village");
el.innerHTML = `<option value="">Select Village</option>`;

if(!subKey) return;

const villages =
GEO[stateKey]
.districts[districtKey]
.subdistricts[subKey]
.villages;

villages.forEach(v=>{
el.innerHTML += `
<option value="${v.slug}">
${v.name} (${v.pincode})
</option>`;
});

}
