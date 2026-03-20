export function layout(data, inner){

return `

<div class="nav">
<div class="logo">Vidhwaan</div>

<div class="nav-links">
<a href="/">Home</a>
<a href="/pellimelam">PelliMelam</a>
<a href="/technology">Technology</a>
<a href="/foundation">Foundation</a>
</div>

<div class="menu-btn" onclick="toggleMenu()">☰</div>
</div>

<div id="mobileMenu" class="mobile-menu">
<a href="/">Home</a>
<a href="/pellimelam">PelliMelam</a>
<a href="/technology">Technology</a>
<a href="/foundation">Foundation</a>
</div>

<div class="container">
${inner}
</div>

<div class="footer">
© Vidhwaan Group • Culture • Technology • Impact
</div>

`;
}
