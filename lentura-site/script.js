// Simple helpers for navigation highlighting and language persistence
(function(){
  const path = location.pathname.split('/').pop();
  document.querySelectorAll('.nav a').forEach(a=>{
    if(a.getAttribute('href')===path){ a.classList.add('active'); }
  });
  const langLinks = document.querySelectorAll('[data-lang]');
  langLinks.forEach(l=>l.addEventListener('click', ()=>{
    localStorage.setItem('lentura_lang', l.dataset.lang);
  }));
})();
