"use strict";

// CURSOR FOLLOW
const cursor = document.querySelector(".cursor");

window.addEventListener("mousemove", e=>{
cursor.style.left = e.clientX + "px";
cursor.style.top = e.clientY + "px";
});

// TYPING
const texts=[
"Automation Engineer",
"PLC Programmer",
"SCADA Engineer",
"IoT Developer"
];

let i=0,j=0,del=false;

function type(){
const el=document.getElementById("typing");
if(!el) return;

const cur=texts[i];

el.textContent = cur.substring(0, del ? j-- : j++);

if(!del && j===cur.length){del=true;setTimeout(type,1200);return;}
if(del && j===0){del=false;i=(i+1)%texts.length;}

setTimeout(type, del ? 40 : 70);
}
type();

// REVEAL (INTERSECTION OBSERVER VERSION = SMOOTH)
const obs = new IntersectionObserver(entries=>{
entries.forEach(e=>{
if(e.isIntersecting){
e.target.classList.add("active");
}
});
},{threshold:0.15});

document.querySelectorAll(".reveal").forEach(el=>{
obs.observe(el);
});

// COUNTER
const counters=document.querySelectorAll(".count");

const counterObs=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
const el=entry.target;
const target=parseInt(el.innerText);
let c=0;

const run=()=>{
c+=target/60;
if(c<target){
el.innerText=Math.floor(c);
requestAnimationFrame(run);
}else el.innerText=target;
};
run();
counterObs.unobserve(el);
}
});
});

counters.forEach(c=>counterObs.observe(c));

// TOP BUTTON
const topBtn=document.getElementById("top");

window.addEventListener("scroll",()=>{
topBtn.style.display = window.scrollY>300 ? "block":"none";
});

topBtn.addEventListener("click",()=>{
window.scrollTo({top:0,behavior:"smooth"});
});
