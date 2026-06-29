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
    initDynamicTimeline();
    initReveal();
    initMenu();
    initGallery();
    initGalleryMusic();

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
 * TIMELINE DYNAMIQUE
 ******************************************************************/

//#region TIMELINE DYNAMIQUE PROGRAMME

function initDynamicTimeline() {
  const eventDate = "2026-07-04";
  const items = document.querySelectorAll(".dynamic-timeline .timeline-item");

  if (!items.length) return;

  function getTodayDate() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function timeToMinutes(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }

  function resetTimeline() {
    items.forEach(item => {
      item.classList.remove("active", "done", "upcoming");
    });
  }

  function updateTimeline() {
    const today = getTodayDate();

    if (today !== eventDate) {
      resetTimeline();
      return;
    }

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    items.forEach(item => {
      const start = timeToMinutes(item.dataset.start);
      const end = timeToMinutes(item.dataset.end);

      item.classList.remove("active", "done", "upcoming");

      if (currentMinutes >= start && currentMinutes < end) {
        item.classList.add("active");
      }
    });
  }

  updateTimeline();
  setInterval(updateTimeline, 30000);
}

//#endregion

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

//#region MUSIQUE GALERIE

function initGalleryMusic() {
  const music = document.getElementById("galleryMusic");
  const button = document.getElementById("musicToggle");

  if (!music || !button) return;

  music.volume = 0.35;

  music.play().catch(() => {
    // Le navigateur peut bloquer la lecture automatique.
  });

  button.addEventListener("click", () => {
    if (music.muted) {
      music.muted = false;
      music.play();
      button.textContent = "🔊 Couper le son";
    } else {
      music.muted = true;
      button.textContent = "🔇 Activer le son";
    }
  });
}

//#endregion