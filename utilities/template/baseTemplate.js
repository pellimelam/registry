export function getBaseHTML(title, content){

return `
<!DOCTYPE html>
<html lang="en">
<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>${title}</title>
<meta name="description" content="${title} - Vidhwaan Profile">

<style>
body{
margin:0;
font-family:system-ui;
background:#0f172a;
color:white;
}

.container{
max-width:900px;
margin:auto;
padding:40px 20px;
}

h1{
font-size:36px;
margin-bottom:10px;
}

.nav{
display:flex;
gap:16px;
margin-bottom:30px;
}

.nav a{
color:#94a3b8;
text-decoration:none;
}

.nav a:hover{
color:white;
}

.card{
background:#1e293b;
padding:20px;
border-radius:12px;
margin-bottom:20px;
}

img{
width:100%;
border-radius:10px;
}

iframe{
width:100%;
height:220px;
border:none;
border-radius:10px;
}
</style>

</head>

<body>

<div class="container">

<div class="nav">
<a href="./index.html">Home</a>
<a href="./gallery.html">Gallery</a>
<a href="./videos.html">Videos</a>
<a href="./about.html">About</a>
</div>

${content}

</div>

</body>
</html>
`;

}
