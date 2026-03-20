export function layout(data, inner){

return `

<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Loading...</title>

<!-- ✅ FAVICON -->
<link rel="icon" href="https://registry.vidhwaan.com/favicon.ico">

</head>
<body>
<style>

/* ===== GLOBAL ===== */
body{
margin:0;
font-family: Inter, system-ui;
background: radial-gradient(circle at top, #1e3a8a, #020617);
color:white;
}

/* ===== NAV ===== */

.nav{
position:fixed;
top:0;
left:0;
width:100%;
display:flex;
justify-content:space-between;
align-items:center;
padding:12px 24px;
background:linear-gradient(90deg,#1e3a8a,#0f172a);
z-index:999;
box-sizing:border-box;
border-bottom:1px solid rgba(255,255,255,0.08);
}

.nav img{
width:auto !important;
height:32px;
}

.logo{
font-weight:700;
font-size:18px;
}

.nav-links{
display:flex;
gap:20px;
}

.nav-links a{
color:#cbd5f5;
text-decoration:none;
}

/* MOBILE */
.menu-btn{
display:none;
font-size:22px;
cursor:pointer;
}

.mobile-menu{
display:none;
flex-direction:column;
position:fixed;
top:60px;
left:0;
width:100%;
background:#020617;
z-index:998;
}

.mobile-menu.active{
display:flex;
}

/* ===== CONTAINER ===== */
.container{
max-width:1000px;
margin:auto;
padding:90px 20px 30px; /* 👈 push content below fixed navbar */
}

/* ===== HERO ===== */
.hero h1{
font-size:34px;
margin:10px 0;
}

.badge{
background:#1e40af;
padding:6px 12px;
border-radius:20px;
display:inline-block;
font-size:12px;
}

.location{
color:#94a3b8;
}

/* ===== CARD ===== */
.card{
background:rgba(255,255,255,0.05);
border:1px solid rgba(255,255,255,0.1);
padding:20px;
border-radius:14px;
margin-top:20px;
}

/* ===== GRID ===== */
.grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
gap:15px;
margin-top:20px;
}

/* ===== MEDIA ===== */
img{
width:100%;
border-radius:10px;
}

iframe{
width:100%;
height:200px;
border:none;
border-radius:10px;
}

/* ===== FOOTER ===== */
.footer{
margin-top:40px;
padding:20px;
text-align:center;
color:#94a3b8;
border-top:1px solid #1e293b;
}

/* ===== RESPONSIVE ===== */
@media(max-width:768px){
.nav-links{display:none;}
.menu-btn{display:block;}
}


/* FLOATING BUTTONS */
.floating{
position:fixed;
bottom:20px;
right:20px;
display:flex;
flex-direction:column;
gap:10px;
z-index:999;
}

.float-btn{
width:50px;
height:50px;
display:flex;
align-items:center;
justify-content:center;
border-radius:50%;
color:white;
font-size:20px;
text-decoration:none;
box-shadow:0 8px 20px rgba(0,0,0,0.3);
}

.call{background:#16a34a;}
.whatsapp{background:#22c55e;}


</style>


<!-- NAV -->
<div class="nav">

<div class="logo" style="display:flex;align-items:center;gap:10px;">

<img src="https://registry.vidhwaan.com/icons1/logo.png"
style="height:32px;width:auto;display:block;max-width:none;">

<span style="font-weight:700;font-size:18px;color:white;">
Vidhwaan
</span>

</div>

<div class="nav-links">
<a href="/">Home</a>
<a href="https://pellimelam.vidhwaan.com">PelliMelam</a>
<a href="https://vidhwaan.com">Technology</a>
<a href="https://vidhwaan.com">Foundation</a>
</div>

<div class="menu-btn" id="menuBtn">☰</div>
</div>

<div id="mobileMenu" class="mobile-menu">
<a href="/">Home</a>
<a href="https://pellimelam.vidhwaan.com">PelliMelam</a>
<a href="https://vidhwaan.com">Technology</a>
<a href="https://vidhwaan.com">Foundation</a>
</div>


<!-- CONTENT -->
<div class="container">
${inner}
</div>


<div class="floating">

<a href="tel:${data.phone}" class="float-btn call">📞</a>

<a href="https://wa.me/91${data.phone}" class="float-btn whatsapp">💬</a>

</div>



<!-- FOOTER -->
<div class="footer">
© Vidhwaan Group • Culture • Technology • Impact
</div>


<script>

document.addEventListener("click", function(e){

const btn = document.getElementById("menuBtn");
const menu = document.getElementById("mobileMenu");

if(!btn || !menu) return;

// toggle
if(e.target.closest("#menuBtn")){
e.stopPropagation();
menu.classList.toggle("active");
return;
}

// close when clicking outside
if(!menu.contains(e.target)){
menu.classList.remove("active");
}

});

</script>


</body>
</html>

`;
}
