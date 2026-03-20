export function loadSupport(){

// ❌ DO NOT run on profile pages
if(window.location.pathname.match(/\d{10}$/)) return;

const html = `
<a href="https://wa.me/919440246101" target="_blank"
style="
position:fixed;
bottom:20px;
right:20px;
width:55px;
height:55px;
background:#25D366;
border-radius:50%;
display:flex;
align-items:center;
justify-content:center;
box-shadow:0 8px 20px rgba(0,0,0,0.3);
z-index:9999;
text-decoration:none;
">
💬
</a>
`;

document.body.insertAdjacentHTML("beforeend", html);

}
