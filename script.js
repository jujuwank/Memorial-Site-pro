/******************************************************************
 * MemorialSite Pro v2.0
 * script.js
 ******************************************************************/

/******************************************************************
 * INITIALISATION
 ******************************************************************/
//#region ===========  INITIALISATION  ==================
document.addEventListener("DOMContentLoaded", () => {

    initLoader();
    initTheme();
    initCountdown();
    initReveal();
    initMenu();
    initGallery();

});

//#endregion

/******************************************************************
 * PAGE DE CHARGEMENT
 ******************************************************************/

function initLoader(){

    const loader = document.getElementById("loader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("hidden");

        },700);

    });

}


/******************************************************************
 * MODE CLAIR / SOMBRE
 ******************************************************************/

function initTheme(){

    const btn = document.getElementById("themeToggle");

    const savedTheme = localStorage.getItem("theme");

    if(savedTheme === "light"){

        document.body.classList.add("light");
        btn.textContent="🌙";

    }

    btn.addEventListener("click",()=>{

        document.body.classList.toggle("light");

        if(document.body.classList.contains("light")){

            localStorage.setItem("theme","light");
            btn.textContent="🌙";

        }else{

            localStorage.setItem("theme","dark");
            btn.textContent="☀️";

        }

    });

}


/******************************************************************
 * COMPTE A REBOURS
 ******************************************************************/

function initCountdown(){

    const targetDate = new Date("2026-07-04T17:00:00").getTime();

    function updateCountdown(){

        const now = new Date().getTime();

        const distance = targetDate - now;

        if(distance <= 0){

            return;

        }

        const days = Math.floor(distance/(1000*60*60*24));

        const hours = Math.floor((distance%(1000*60*60*24))/(1000*60*60));

        const minutes = Math.floor((distance%(1000*60*60))/(1000*60));

        const seconds = Math.floor((distance%(1000*60))/1000);

        document.getElementById("days").textContent = days;

        document.getElementById("hours").textContent = String(hours).padStart(2,"0");

        document.getElementById("minutes").textContent = String(minutes).padStart(2,"0");

        document.getElementById("seconds").textContent = String(seconds).padStart(2,"0");

    }

    updateCountdown();

    setInterval(updateCountdown,1000);

}


/******************************************************************
 * ANIMATION AU SCROLL
 ******************************************************************/

function initReveal(){

    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("visible");

            }

        });

    },{

        threshold:0.15

    });

    reveals.forEach(section=>observer.observe(section));

}


/******************************************************************
 * MENU ACTIF
 ******************************************************************/

function initMenu(){

    const sections=document.querySelectorAll("section[id]");

    const navLinks=document.querySelectorAll(".menu a");

    window.addEventListener("scroll",()=>{

        let current="";

        sections.forEach(section=>{

            const top=section.offsetTop-140;

            if(window.scrollY>=top){

                current=section.getAttribute("id");

            }

        });

        navLinks.forEach(link=>{

            link.classList.remove("active");

            if(link.getAttribute("href")==="#"+current){

                link.classList.add("active");

            }

        });

    });

}


/******************************************************************
 * GALERIE
 ******************************************************************/

function initGallery(){

    const galleryImages=[

        "photo1.jpeg",
        "photo2.jpeg",
        "photo3.jpeg",
        "photo4.jpeg",
        "photo5.jpeg",
        "photo6.jpeg",
        "photo7.jpeg" /*,
        "photo5.jpeg"  */

    ];

    const slidesContainer=document.getElementById("slidesContainer");

    const dotsContainer=document.getElementById("dotsContainer");

    if(!slidesContainer) return;

    galleryImages.forEach((image,index)=>{

        const img=document.createElement("img");

        img.src="images/"+image;

        img.className=index===0?"slide active":"slide";

        slidesContainer.appendChild(img);

        const dot=document.createElement("span");

        dot.className=index===0?"dot active":"dot";

        dot.onclick=()=>showSlide(index);

        dotsContainer.appendChild(dot);

    });

    let current=0;

    const slides=document.querySelectorAll(".slide");

    const dots=document.querySelectorAll(".dot");

    window.changeSlide=function(direction){

        showSlide(current+direction);

    }

    window.showSlide=function(index){

        slides[current].classList.remove("active");

        dots[current].classList.remove("active");

        current=index;

        if(current<0) current=slides.length-1;

        if(current>=slides.length) current=0;

        slides[current].classList.add("active");

        dots[current].classList.add("active");

    }

    setInterval(()=>{

        showSlide(current+1);

    },5000);

}