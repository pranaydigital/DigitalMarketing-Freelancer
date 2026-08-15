// PRANAY.DIGITAL — Spider Portfolio
// Replace these three placeholders before publishing.
const CONFIG = {
  email: "YOUR_EMAIL@example.com",
  whatsapp: "YOURNUMBER", // country code + number, no + or spaces
  instagram: "https://www.instagram.com/YOUR_HANDLE/",
};

document.querySelectorAll('a[href="mailto:YOUR_EMAIL@example.com"]').forEach(a => {
  a.href = `mailto:${CONFIG.email}`;
});
document.querySelectorAll('.whatsapp').forEach(a => {
  a.href = `https://wa.me/${CONFIG.whatsapp}`;
});
document.querySelectorAll('.instagram').forEach(a => {
  a.href = CONFIG.instagram;
});
document.querySelectorAll('.social-row a[href*="instagram.com"]').forEach(a => a.href = CONFIG.instagram);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const cursor = document.querySelector('.web-cursor');
window.addEventListener('pointermove', e => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});
document.querySelectorAll('a,button,.skill,.mission-card,.proof-card').forEach(el => {
  el.addEventListener('mouseenter',()=>document.body.classList.add('cursor-active'));
  el.addEventListener('mouseleave',()=>document.body.classList.remove('cursor-active'));
});

document.querySelector('.menu-toggle')?.addEventListener('click',()=>{
  document.body.classList.toggle('menu-open');
});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>document.body.classList.remove('menu-open')));
