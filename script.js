const menuButton=document.querySelector(".menu-button");const siteNav=document.querySelector(".site-nav");menuButton?.addEventListener("click",()=>{const open=siteNav.classList.toggle("open");menuButton.setAttribute("aria-expanded",String(open));});siteNav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{siteNav.classList.remove("open");menuButton?.setAttribute("aria-expanded","false");}));const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target);}}),{threshold:.12});document.querySelectorAll(".reveal").forEach(e=>observer.observe(e));document.querySelectorAll("#year").forEach(e=>e.textContent=new Date().getFullYear());
const declinedSlider=document.querySelector("#declined-slider"),declinedDisplay=document.querySelector("#declined-range-display"),declinedBadge=document.querySelector("#declined-badge");
if(declinedSlider&&declinedDisplay&&declinedBadge){const ranges=[["3–5","3–5 checks per month"],["5–7","5–7 checks per month"],["7–10+","7–10+ checks per month"]];const update=()=>{const r=ranges[Number(declinedSlider.value)];declinedBadge.textContent=r[0];declinedDisplay.textContent=r[1]};declinedSlider.addEventListener("input",update);update();}

const averageCheckSlider=document.querySelector("#average-check-slider"),averageCheckDisplay=document.querySelector("#average-check-display"),averageCheckBadge=document.querySelector("#average-check-badge");
if(averageCheckSlider&&averageCheckDisplay&&averageCheckBadge){
 const updateAverageCheck=()=>{const v=Number(averageCheckSlider.value),d=v>=700?"$700+":`$${v}`;averageCheckBadge.textContent=d;averageCheckDisplay.textContent=`${d} average check`;};
 averageCheckSlider.addEventListener("input",updateAverageCheck);updateAverageCheck();
}

const monthlyRevenueLost=document.querySelector("#monthly-revenue-lost");
const annualRevenueLost=document.querySelector("#annual-revenue-lost");
const revenueDeclinedSlider=document.querySelector("#declined-slider");
const revenueAverageCheckSlider=document.querySelector("#average-check-slider");

if(monthlyRevenueLost&&annualRevenueLost&&revenueDeclinedSlider&&revenueAverageCheckSlider){
  const checkRanges=[[3,5],[5,7],[7,10]];
  const money=n=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:0}).format(n);
  const updateRevenueLost=()=>{
    const range=checkRanges[Math.max(0,Math.min(2,Number(revenueDeclinedSlider.value)))];
    const averageCheck=Number(revenueAverageCheckSlider.value);
    const monthlyLow=range[0]*averageCheck;
    const monthlyHigh=range[1]*averageCheck;
    monthlyRevenueLost.textContent=`${money(monthlyLow)}–${money(monthlyHigh)}`;
    annualRevenueLost.textContent=`${money(monthlyLow*12)}–${money(monthlyHigh*12)}`;
  };
  revenueDeclinedSlider.addEventListener("input",updateRevenueLost);
  revenueAverageCheckSlider.addEventListener("input",updateRevenueLost);
  updateRevenueLost();
}
