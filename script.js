"use strict";

// TYPE
const texts=["Instrumentation Engineer","Automation Engineer","PLC Programmer","SCADA Engineer"];
let i=0,j=0,del=false;

function type(){
    const el=document.getElementById("typing-text");
    if(!el) return;

    const cur=texts[i];

    el.textContent=cur.substring(0,del?j--:j++);

    if(!del && j===cur.length){del=true;setTimeout(type,1200);return;}
    if(del && j===0){del=false;i=(i+1)%texts.length;}

    setTimeout(type,del?40:80);
}
type();

// MENU
const menuBtn=document.querySelector(".menu-btn");
const nav=document.querySelector(".nav-links");

menuBtn?.addEventListener("click",()=>nav.classList.toggle("mobile-active"));

// SCROLL REVEAL
const revealItems=document.querySelectorAll(".reveal");

function reveal(){
    const trigger=window.innerHeight*0.85;

    revealItems.forEach(el=>{
        if(el.getBoundingClientRect().top<trigger){
            el.classList.add("active");
        }
    });
}

// NAV ACTIVE + BUTTON
const sections=document.querySelectorAll("section");
const links=document.querySelectorAll(".nav-links a");
const topBtn=document.getElementById("scrollTopBtn");

function scroll(){
    let current="";

    sections.forEach(s=>{
        if(window.scrollY>=s.offsetTop-120){
            current=s.id;
        }
    });

    links.forEach(l=>{
        l.classList.toggle("active",l.getAttribute("href")==="#"+current);
    });

    if(topBtn) topBtn.style.display=window.scrollY>400?"block":"none";

    reveal();
}

window.addEventListener("scroll",scroll);

// PARALLAX
const img=document.querySelector(".hero-image img");
const icons=document.querySelectorAll(".floating-icon");

window.addEventListener("mousemove",(e)=>{
    const x=(window.innerWidth/2-e.clientX)*0.02;
    const y=(window.innerHeight/2-e.clientY)*0.02;

    img&&(img.style.transform=`translate(${x}px,${y}px)`);

    icons.forEach((ic,i)=>{
        ic.style.transform=`translate(${x*(i+1)}px,${y*(i+1)}px)`;
    });
});

// LOAD
window.addEventListener("load",()=>{
    document.body.classList.add("loaded");
    reveal();
});
