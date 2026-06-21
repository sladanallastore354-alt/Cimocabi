```javascript
/* ==========================================================
   CIMOCABI INTERACTIVE TOUR
   BAGIAN 1
========================================================== */

const TOUR_KEY = "cimocabiTourStep";
const TOUR_DONE = "cimocabiTourDone";

const tourData = [

{
selector:"header",
title:"Selamat datang di CIMOCABI 👋",
text:"Frozen Food & Cemilan Praktis dengan sistem pre-order."
},

{
selector:"#product-grid div",
title:"Pilih produk favoritmu 🍽️",
text:"Klik tombol Detail untuk melihat informasi produk."
},

{
selector:"footer",
title:"Hubungi dan ikuti kami 📱",
text:"Kamu juga bisa melihat informasi terbaru melalui media sosial kami."
},

{
selector:"button[onclick='toggleTerms()']",
title:"Ketentuan Penggunaan",
text:"Silakan baca ketentuan terlebih dahulu sebelum berbelanja."
},

{
selector:"#detail-container",
title:"Buka Produk",
text:"Klik Detail untuk membuka produk."
},

{
selector:"input[value='Tetap Frozen']",
title:"Pilih Varian",
text:"Pilih varian penyajian sesuai keinginanmu."
},

{
selector:"#detail-qty",
title:"Jumlah Pesanan",
text:"Atur jumlah pesanan yang ingin dibeli."
},

{
selector:"button[onclick='addFromModalToCart()']",
title:"Masukkan Keranjang",
text:"Klik untuk memasukkan produk ke keranjang."
},

{
selector:"button[onclick='lanjutKeCheckout()']",
title:"Lanjut Bayar",
text:"Klik Lanjut Bayar untuk menuju halaman checkout."
},

{
selector:"#buyerName",
title:"Form Pengiriman",
text:"Masukkan nama lengkap penerima."
},

{
selector:"#btnSubmitOrder",
title:"🎉 Selamat!",
text:"Pesananmu siap dikirim ke admin melalui WhatsApp.<br><br>Terima kasih telah berbelanja di CIMOCABI ❤️"
}

];

let currentStep = 0;


/* ===== CREATE UI ===== */

document.body.insertAdjacentHTML("beforeend",`

<div id="tour-overlay"></div>

<div id="tour-tooltip">

<div class="tour-progress"></div>

<h3 class="tour-title"></h3>

<div class="tour-text"></div>

<div class="tour-buttons">

<button id="tour-prev">Prev</button>

<button id="tour-next">Next</button>

<button id="tour-skip">Skip</button>

</div>

</div>

<button id="tour-start-btn">❓</button>

`);


/* ===== CSS ===== */

const style = document.createElement("style");

style.innerHTML = `

#tour-overlay{
position:fixed;
inset:0;
background:rgba(0,0,0,.65);
backdrop-filter:blur(2px);
display:none;
z-index:99998;
}

#tour-tooltip{
position:fixed;
width:260px;
max-width:85vw;

background:#9333EA;
color:white;

padding:14px;

border-radius:18px;

display:none;

box-shadow:0 10px 30px rgba(0,0,0,.3);

z-index:99999;
}

.tour-progress{
font-size:10px;
opacity:.7;
margin-bottom:6px;
}

.tour-title{
font-size:14px;
font-weight:bold;
margin-bottom:6px;
}

.tour-text{
font-size:12px;
line-height:1.5;
}

.tour-buttons{
display:flex;
gap:6px;
margin-top:14px;
}

.tour-buttons button{
flex:1;

padding:7px;

border:none;

border-radius:10px;

background:white;

color:#9333EA;

font-size:11px;

font-weight:bold;

cursor:pointer;
}

.tour-highlight{
position:relative;
z-index:99999!important;

box-shadow:0 0 0 5px rgba(147,51,234,.5);

border-radius:16px;
}

#tour-start-btn{
position:fixed;

left:20px;
bottom:100px;

width:58px;
height:58px;

border:none;
border-radius:50%;

background:#9333EA;
color:white;

font-size:24px;
font-weight:bold;

display:flex;
align-items:center;
justify-content:center;

cursor:pointer;

box-shadow:0 8px 20px rgba(147,51,234,.4);

z-index:99997;

user-select:none;
touch-action:none;

transition:.2s;
}

#tour-start-btn:active{
transform:scale(.95);
}

`;

document.head.append(style);

const overlay = document.getElementById("tour-overlay");

const tooltip = document.getElementById("tour-tooltip");
```
```javascript id="st4bcb"
/* ==========================================================
   BAGIAN 2
   LOGIKA TOUR
========================================================== */

function clearHighlight(){

document.querySelectorAll(".tour-highlight")
.forEach(el=>el.classList.remove("tour-highlight"));

}


function showStep(step){

clearHighlight();

currentStep = step;

localStorage.setItem(TOUR_KEY,step);

let data = tourData[step];

let el = document.querySelector(data.selector);

if(!el){

overlay.style.display="none";
tooltip.style.display="none";

return;

}


document.querySelector(".tour-progress").innerHTML =
(step+1)+" / "+tourData.length;

document.querySelector(".tour-title").innerHTML =
data.title;

document.querySelector(".tour-text").innerHTML =
data.text;


el.scrollIntoView({

behavior:"smooth",
block:"center"

});


el.classList.add("tour-highlight");


overlay.style.display="block";

tooltip.style.display="block";


setTimeout(()=>{

let rect = el.getBoundingClientRect();

let tooltipWidth = tooltip.offsetWidth || 260;

let left = rect.left;

if(left + tooltipWidth > window.innerWidth){

left = window.innerWidth - tooltipWidth - 10;

}

left = Math.max(5,left);

let top = rect.top - tooltip.offsetHeight - 20;

if(top < 20){

top = rect.bottom + 20;

}

tooltip.style.left = left+"px";

tooltip.style.top = top+"px";

},500);

}



/* ===== NEXT ===== */

document.getElementById("tour-next")
.onclick=()=>{

if(currentStep < tourData.length-1){

showStep(currentStep+1);

}
else{

finishTour();

}

};



/* ===== PREV ===== */

document.getElementById("tour-prev")
.onclick=()=>{

if(currentStep>0){

showStep(currentStep-1);

}

};



/* ===== SKIP ===== */

document.getElementById("tour-skip")
.onclick=()=>{

finishTour();

};



/* ===== TOMBOL ❓ ===== */

document.getElementById("tour-start-btn")
.onclick=()=>{

localStorage.removeItem(TOUR_DONE);

showStep(0);

};



/* ===== FINISH ===== */

function finishTour(){

clearHighlight();

overlay.style.display="none";

tooltip.style.display="none";

localStorage.setItem(TOUR_DONE,true);

localStorage.removeItem(TOUR_KEY);

}



/* ===== AUTO START ===== */

function jalankanTurOtomatis(){

if(localStorage.getItem(TOUR_DONE))
return;

let saved =
parseInt(localStorage.getItem(TOUR_KEY) || 0);

setTimeout(()=>{

showStep(saved);

},1200);

}


if(document.readyState==="complete"){

jalankanTurOtomatis();

}
else{

window.addEventListener(
"load",
jalankanTurOtomatis
);

}
```
```javascript
/* ==========================================================
   BAGIAN 3
   AUTO STEP + DRAG BUTTON
========================================================== */


/* ===== AUTO STEP ===== */

document.addEventListener("click",(e)=>{

/* step 4 -> step 5 */
if(
currentStep===3 &&
e.target.innerText &&
e.target.innerText.includes("Saya Mengerti")
){

setTimeout(()=>{

showStep(4);

},500);

}


/* step 5 -> step 6 */
if(
currentStep===4 &&
e.target.innerText &&
e.target.innerText.includes("Detail")
){

setTimeout(()=>{

showStep(5);

},700);

}


/* step 8 -> step 9 */
if(
currentStep===7 &&
e.target.closest("button[onclick='addFromModalToCart()']")
){

setTimeout(()=>{

showStep(8);

},700);

}


/* sebelum checkout */
if(
currentStep===8 &&
e.target.closest("button[onclick='lanjutKeCheckout()']")
){

localStorage.setItem(
TOUR_KEY,
9
);

}

});



/* ==================================================
   DRAG BUTTON ❓
================================================== */

const tourBtn =
document.getElementById("tour-start-btn");

let dragging = false;

let offsetX = 0;
let offsetY = 0;



function mulaiDrag(x,y){

dragging = true;

offsetX =
x - tourBtn.offsetLeft;

offsetY =
y - tourBtn.offsetTop;

}



function geser(x,y){

if(!dragging) return;


let posX =
x - offsetX;

let posY =
y - offsetY;


/* batas layar */

let maxX =
window.innerWidth -
tourBtn.offsetWidth;

let maxY =
window.innerHeight -
tourBtn.offsetHeight;

posX =
Math.max(
0,
Math.min(posX,maxX)
);

posY =
Math.max(
0,
Math.min(posY,maxY)
);


tourBtn.style.left =
posX+"px";

tourBtn.style.top =
posY+"px";

tourBtn.style.bottom =
"auto";


/* simpan posisi */

localStorage.setItem(
"tourBtnX",
posX
);

localStorage.setItem(
"tourBtnY",
posY
);

}



function selesaiDrag(){

dragging = false;

}



/* TOUCH HP */

tourBtn.addEventListener(

"touchstart",

(e)=>{

mulaiDrag(

e.touches[0].clientX,

e.touches[0].clientY

);

}

);


document.addEventListener(

"touchmove",

(e)=>{

geser(

e.touches[0].clientX,

e.touches[0].clientY

);

}

);


document.addEventListener(

"touchend",

selesaiDrag

);



/* DESKTOP */

tourBtn.addEventListener(

"mousedown",

(e)=>{

mulaiDrag(

e.clientX,

e.clientY

);

}

);


document.addEventListener(

"mousemove",

(e)=>{

geser(

e.clientX,

e.clientY

);

}

);


document.addEventListener(

"mouseup",

selesaiDrag

);



/* ==================================================
   LOAD POSISI TOMBOL TERAKHIR
================================================== */

const savedX =
localStorage.getItem(
"tourBtnX"
);

const savedY =
localStorage.getItem(
"tourBtnY"
);


if(
savedX &&
savedY
){

tourBtn.style.left =
savedX+"px";

tourBtn.style.top =
savedY+"px";

tourBtn.style.bottom =
"auto";

}
```
