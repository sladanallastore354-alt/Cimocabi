/* ==========================================================
   CIMOCABI INTERACTIVE TOUR
   file : tour.js
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
text:"Masukkan data pembeli dengan lengkap."
},

{
selector:"#btnSubmitOrder",
title:"🎉 Selamat!",
text:"Pesananmu siap dikirim ke admin melalui WhatsApp.<br><br>Terima kasih telah berbelanja di CIMOCABI ❤️"
}
];

let currentStep=0;

/* ========= create ui ========= */

document.body.insertAdjacentHTML("beforeend",`

<div id="tour-overlay"></div>

<div id="tour-tooltip">

<div class="tour-progress"></div>

<h3 class="tour-title"></h3>

<div class="tour-text"></div>

<div class="tour-buttons">
<button id="tour-prev">Previous</button>
<button id="tour-next">Next</button>
<button id="tour-skip">Skip</button>
</div>

</div>

<button id="tour-start-btn">
❓ Mulai Tur
</button>

`);

/* ========= css ========= */

const style=document.createElement("style");

style.innerHTML=`

#tour-overlay{
position:fixed;
inset:0;
background:rgba(0,0,0,.65);
display:none;
z-index:99998;
backdrop-filter:blur(2px);
}

#tour-tooltip{
position:fixed;
width:300px;
max-width:90vw;
background:#9333EA;
color:white;
padding:18px;
border-radius:20px;
display:none;
z-index:99999;
box-shadow:0 20px 60px rgba(0,0,0,.35);
}

.tour-highlight{
position:relative;
z-index:99999!important;
box-shadow:0 0 0 5px rgba(147,51,234,.5);
border-radius:20px;
animation:pulseTour 1s infinite;
}

@keyframes pulseTour{
50%{
transform:scale(1.02);
}
}

#tour-start-btn{
position:fixed;
left:20px;
bottom:20px;
background:#9333EA;
color:white;
border:none;
padding:12px 16px;
border-radius:14px;
cursor:pointer;
z-index:99997;
}

.tour-buttons{
display:flex;
gap:8px;
margin-top:15px;
}

.tour-buttons button{
flex:1;
padding:10px;
border:none;
border-radius:12px;
cursor:pointer;
font-weight:bold;
}

`;

document.head.append(style);

const overlay=document.getElementById("tour-overlay");
const tooltip=document.getElementById("tour-tooltip");

function clearHighlight(){
document.querySelectorAll(".tour-highlight")
.forEach(e=>e.classList.remove("tour-highlight"));
}

function showStep(step){

clearHighlight();

currentStep=step;

localStorage.setItem(TOUR_KEY,step);

document.querySelector(".tour-progress").innerHTML=
(step+1)+" / "+tourData.length;

document.querySelector(".tour-title").innerHTML=
tourData[step].title;

document.querySelector(".tour-text").innerHTML=
tourData[step].text;

let el=document.querySelector(tourData[step].selector);

if(!el)return;

el.scrollIntoView({
behavior:"smooth",
block:"center"
});

el.classList.add("tour-highlight");

overlay.style.display="block";
tooltip.style.display="block";

setTimeout(()=>{

let rect=el.getBoundingClientRect();

tooltip.style.left=
Math.max(10,rect.left)+"px";

tooltip.style.top=
(rect.top-160)+"px";

},300);

}

/* next */

document.getElementById("tour-next")
.onclick=()=>{

if(currentStep<tourData.length-1){

showStep(currentStep+1);

}else{

finishTour();

}

};

/* prev */

document.getElementById("tour-prev")
.onclick=()=>{

if(currentStep>0){

showStep(currentStep-1);

}

};

/* skip */

document.getElementById("tour-skip")
.onclick=finishTour;

/* start */

document.getElementById("tour-start-btn")
.onclick=()=>{

showStep(0);

};

/* finish */

function finishTour(){

clearHighlight();

overlay.style.display="none";

tooltip.style.display="none";

localStorage.setItem(TOUR_DONE,true);

localStorage.removeItem(TOUR_KEY);

}

/* auto run */
function jalankanTurOtomatis() {
    if(localStorage.getItem(TOUR_DONE)) return;

    let saved = parseInt(localStorage.getItem(TOUR_KEY) || 0);

    setTimeout(() => {
        showStep(saved);
    }, 1200);
}

// Mengecek apakah halaman sudah selesai dimuat atau belum
if (document.readyState === "complete") {
    jalankanTurOtomatis();
} else {
    window.addEventListener("load", jalankanTurOtomatis);
}


/* ===================================================
AUTO STEP
=================================================== */

/* setelah klik detail */

window.addEventListener("click",(e)=>{

if(currentStep===4){

if(
e.target.innerText.includes("Detail")
){
setTimeout(()=>{
showStep(5);
},700);
}

}

});

/* setelah masukkan keranjang */

document.addEventListener("click",(e)=>{

if(
currentStep===7 &&
e.target.innerText.includes("Masukkan Keranjang")
){

setTimeout(()=>{
showStep(8);
},700);

}

});

/* ketentuan */

document.addEventListener("click",(e)=>{

if(
currentStep===3 &&
e.target.innerText.includes("Saya Mengerti")
){

setTimeout(()=>{
showStep(4);
},500);

}

});


```
