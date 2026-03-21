export function loadSupport(){

// prevent duplicate
if(document.getElementById("supportBtn")) return;

const html = `
<a id="supportBtn"
href="https://wa.me/919440246101"
target="_blank"
style="
position:fixed;
bottom:20px;
right:20px;
width:56px;
height:56px;
background:#25D366;
border-radius:50%;
display:flex;
align-items:center;
justify-content:center;
box-shadow:0 10px 25px rgba(0,0,0,0.3);
z-index:9999;
text-decoration:none;
">
💬
</a>
`;

document.body.insertAdjacentHTML("beforeend", html);

}
