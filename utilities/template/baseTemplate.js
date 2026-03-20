export function layout(data, inner){

return `

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
display:flex;
justify-content:space-between;
align-items:center;
padding:16px 20px;
background:rgba(0,0,0,0.4);
backdrop-filter: blur(10px);
position:sticky;
top:0;
z-index:100;
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
background:#020617;
padding:10px;
}

.mobile-menu.active{
display:flex;
}

.mobile-menu a{
padding:12px;
color:white;
text-decoration:none;
border-bottom:1px solid #1e293b;
}

/* ===== CONTAINER ===== */
.container{
max-width:1000px;
margin:auto;
padding:30px;
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

</style>


<!-- NAV -->
<div class="nav">
<div class="logo">Vidhwaan</div>

<div class="nav-links">
<a href="/">Home</a>
<a href="https://pellimelam.vidhwaan.com">PelliMelam</a>
<a href="https://vidhwaan.com">Technology</a>
<a href="https://vidhwaan.com">Foundation</a>
</div>

<div class="menu-btn" onclick="toggleMenu()">☰</div>
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


<!-- FOOTER -->
<div class="footer">
© Vidhwaan Group • Culture • Technology • Impact
</div>


<script>
function toggleMenu(){
document.getElementById("mobileMenu").classList.toggle("active");
}
</script>

`;
}
