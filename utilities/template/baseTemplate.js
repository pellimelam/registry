export function getBaseHTML(title, content){

return `
<!DOCTYPE html>
<html lang="en">
<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>${title}</title>

<style>

/* ===== GLOBAL ===== */
body{
margin:0;
font-family: Inter, system-ui, sans-serif;
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
gap:16px;
}

.nav-links a{
color:#cbd5f5;
text-decoration:none;
font-size:14px;
}

.menu-btn{
display:none;
font-size:20px;
cursor:pointer;
}

/* MOBILE NAV */
.mobile-menu{
display:none;
flex-direction:column;
background:#020617;
padding:15px;
}

.mobile-menu a{
padding:10px 0;
border-bottom:1px solid #1e293b;
color:white;
text-decoration:none;
}

/* ===== CONTAINER ===== */
.container{
max-width:1000px;
margin:auto;
padding:30px;
}

/* ===== HERO ===== */
.hero{
margin-top:30px;
}

.hero h1{
font-size:34px;
margin-bottom:10px;
}

.badge{
display:inline-block;
background:#1e40af;
padding:6px 12px;
border-radius:20px;
font-size:12px;
margin-bottom:10px;
}

.location{
color:#94a3b8;
font-size:14px;
}

/* ===== CARD ===== */
.card{
background:rgba(255,255,255,0.05);
border:1px solid rgba(255,255,255,0.08);
border-radius:14px;
padding:20px;
margin-bottom:20px;
}

/* ===== GRID ===== */
.grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
gap:15px;
}

/* ===== IMAGE ===== */
img{
width:100%;
border-radius:10px;
}

/* ===== VIDEO ===== */
iframe{
width:100%;
height:200px;
border-radius:10px;
border:none;
}

/* ===== FOOTER ===== */
.footer{
margin-top:50px;
padding:30px;
text-align:center;
color:#94a3b8;
font-size:13px;
border-top:1px solid #1e293b;
}

/* ===== RESPONSIVE ===== */
@media(max-width:768px){
.nav-links{display:none;}
.menu-btn{display:block;}
.mobile-menu.active{display:flex;}
}

</style>

</head>

<body>

<!-- NAV -->
<div class="nav">
<div class="logo">Vidhwaan</div>

<div class="nav-links">
<a href="/">Home</a>
<a href="/pellimelam">Pellimelam</a>
<a href="/technology">Technology</a>
<a href="/foundation">Foundation</a>
</div>

<div class="menu-btn" onclick="toggleMenu()">☰</div>
</div>

<div id="mobileMenu" class="mobile-menu">
<a href="/">Home</a>
<a href="/pellimelam">Pellimelam</a>
<a href="/technology">Technology</a>
<a href="/foundation">Foundation</a>
</div>

<!-- CONTENT -->
<div class="container">
${content}
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

</body>
</html>
`;
}
