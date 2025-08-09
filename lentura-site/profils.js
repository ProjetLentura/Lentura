// Fetch profiles and render
const container = document.getElementById('profiles');
const search = document.getElementById('search');
const selectLang = document.getElementById('lang');

async function loadProfiles() {
  const res = await fetch('data/profiles.json');
  const profiles = await res.json();
  render(profiles);
  search.addEventListener('input', ()=>render(profiles));
  selectLang.addEventListener('change', ()=>render(profiles));
}

function render(profiles){
  const term = (search?.value || '').toLowerCase();
  const lang = (selectLang?.value || '');
  container.innerHTML = '';
  profiles
    .filter(p => !lang || p.language===lang)
    .filter(p => !term || [p.name, p.intention, p.duration, p.language, ...(p.interests||[])].join(' ').toLowerCase().includes(term))
    .forEach(p => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${p.name}, ${p.age} — <span class="small">${p.language}</span></h3>
        <p><strong>Centres d’intérêt / Interessen:</strong> ${(p.interests||[]).map(i=>`<span class="tag">${i}</span>`).join('')}</p>
        <p><strong>Intention:</strong> ${p.intention} — <strong>Durée:</strong> ${p.duration}</p>
        <p>${p.bio||''}</p>
        <a class="btn outline" href="contact-fr.html#via-formulaire">Contacter / Kontakt</a>
      `;
      container.appendChild(card);
    });
}

loadProfiles();
