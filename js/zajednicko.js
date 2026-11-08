/* =====================================================================
   ZAJEDNIČKO – ikonice, stanje, header, footer, toast, potvrde...
   Koriste ga sve stranice (učitava se posle podaci.js).
   ===================================================================== */

/* ============================== IKONE =============================== */

const IKONE = {
  cap: 'M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5',
  home: 'm2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25',
  document: 'M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z',
  card: 'M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z',
  upload: 'M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z',
  check: 'm4.5 12.75 6 6 9-13.5',
  back: 'M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18',
  logout: 'M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9',
  x: 'M6 18 18 6M6 6l12 12',
  clock: 'M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  chevron: 'm8.25 4.5 7.5 7.5-7.5 7.5',
  user: 'M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z',
  lock: 'M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z',
  eye: 'M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178ZM15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
  info: 'm11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z',
  pin: 'M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z',
  download: 'M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3',
  building: 'M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21',
  copy: 'M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25',
  phone: 'M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z',
  list: 'M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z',
};

function icon(ime, klase = 'size-5') {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.6" stroke="currentColor" class="${klase}" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="${IKONE[ime]}"/></svg>`;
}

const SPINNER = `<svg class="size-5 animate-spin" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"/></svg>`;


/* ============================== STANJE ============================== */

const state = {
  prijavljen: citaj(sessionStorage, 'ss_prijavljen') === '1',
  view: '',           // postavlja svaka stranica (za aktivni link u meniju)
  salterId: null,
  uslugaId: null,
  fajlovi: {},        // { imePolja: [{ id, file, gotovo }] }
  zahtevi: ucitajZahteve(),
  poslednji: null,
};

function citaj(storage, kljuc) {
  try { return storage.getItem(kljuc); } catch { return null; }
}
function upisi(storage, kljuc, vrednost) {
  try { storage.setItem(kljuc, vrednost); } catch { /* demo – ignoriši */ }
}
function ucitajZahteve() {
  try {
    const s = localStorage.getItem('ss_zahtevi_v2');
    return s ? JSON.parse(s) : [...POCETNI_ZAHTEVI];
  } catch { return [...POCETNI_ZAHTEVI]; }
}
function sacuvajZahteve() {
  upisi(localStorage, 'ss_zahtevi_v2', JSON.stringify(state.zahtevi));
}

// Zamenjuje {ime}, {indeks}... podacima iz STUDENT
function sablon(tekst) {
  const podaci = { ...STUDENT, indeksBroj: STUDENT.indeks.replace(/\D/g, '') };
  return String(tekst ?? '').replace(/\{(\w+)\}/g, (m, k) => (k in podaci ? podaci[k] : m));
}

// "1 usluga", "3 usluge", "5 usluga"
function brojUsluga(n) {
  return `${n} ${n === 1 ? 'usluga' : n >= 2 && n <= 4 ? 'usluge' : 'usluga'}`;
}

// Narednih n radnih dana (bez vikenda)
function radniDani(n) {
  const dani = ['Ned', 'Pon', 'Uto', 'Sre', 'Čet', 'Pet', 'Sub'];
  const rez = [];
  const d = new Date();
  while (rez.length < n) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) {
      rez.push(`${dani[d.getDay()]}, ${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.`);
    }
  }
  return rez;
}

const trenutniSalter = () => SALTERI.find(s => s.id === state.salterId);
const trenutnaUsluga = () => trenutniSalter()?.usluge.find(u => u.id === state.uslugaId);

function esc(t) {
  return String(t ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function velicina(b) {
  if (b < 1024) return b + ' B';
  if (b < 1024 * 1024) return (b / 1024).toFixed(0) + ' KB';
  return (b / 1024 / 1024).toFixed(1) + ' MB';
}
function danas() {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}.`;
}



// Čita parametar iz adrese, npr. salter.html?id=dom -> param('id') = 'dom'
function param(ime) {
  return new URLSearchParams(location.search).get(ime);
}


/* ============================ NAVIGACIJA ============================ */

const STRANICE = {
  login: 'index.html',
  pocetna: 'pocetna.html',
  zahtevi: 'moji-zahtevi.html',
};

function idi(view) {
  location.href = STRANICE[view] || STRANICE.pocetna;
}
function otvoriSalter(id) {
  location.href = `salter.html?id=${encodeURIComponent(id)}`;
}
function otvoriUslugu(id) {
  location.href = `zahtev.html?salter=${encodeURIComponent(state.salterId)}&usluga=${encodeURIComponent(id)}`;
}

// Ako student nije prijavljen, vraća ga na login
function zastiti() {
  if (!state.prijavljen) {
    location.replace(STRANICE.login);
    return false;
  }
  return true;
}

function odjava() {
  upisi(sessionStorage, 'ss_prijavljen', '0');
  poruka('Uspešno ste se odjavili.');
  location.href = STRANICE.login;
}

// Poruka koja se prikaže na sledećoj stranici (posle prelaska)
function poruka(tekst, tip = 'info') {
  upisi(sessionStorage, 'ss_poruka', JSON.stringify({ tekst, tip }));
}


/* ========================== IZGLED STRANICE ========================= */

function header() {
  const inicijali = STUDENT.ime.split(' ').map(d => d[0]).join('');
  const aktivni = state.zahtevi.filter(z => z.status !== 'Završeno').length;
  const link = (view, tekst, extra = '') => {
    const aktivan = state.view === view || (view === 'pocetna' && ['salter', 'forma', 'uspeh'].includes(state.view));
    return `<button onclick="idi('${view}')" class="relative flex h-20 items-center gap-2 text-[15px] font-semibold transition ${aktivan ? 'text-slate-900' : 'text-slate-700 hover:text-indigo-600'}">
      ${tekst}${extra}
      ${aktivan ? '<span class="absolute inset-x-0 bottom-5 h-0.5 bg-amber-400"></span>' : ''}
    </button>`;
  };
  return `
  <!-- Gornja traka -->
  <div class="border-b border-slate-200 bg-slate-50 text-[13px] text-slate-500">
    <div class="mx-auto flex h-11 max-w-6xl items-center justify-end gap-5 px-4 sm:px-6">
      <span class="hidden sm:inline">${esc(STUDENT.fakultet)}</span>
      <span class="hidden sm:inline">Indeks: ${esc(STUDENT.indeks)}</span>
      <button onclick="odjava()" class="flex items-center gap-1.5 transition hover:text-indigo-600">${icon('logout', 'size-4')} Odjava</button>
    </div>
  </div>

  <!-- Glavni meni -->
  <header class="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
    <div class="mx-auto flex h-20 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
      <button onclick="idi('pocetna')" class="flex items-center gap-3">
        <div class="grid size-11 place-items-center rounded-full border-[3px] border-amber-400 text-indigo-600">${icon('cap', 'size-6')}</div>
        <div class="hidden text-left leading-tight sm:block">
          <p class="text-base font-bold text-indigo-600">Studentska služba</p>
          <p class="text-xs text-slate-500">eŠalter</p>
        </div>
      </button>

      <nav class="flex items-center gap-6 md:gap-10">
        ${link('pocetna', 'Šalteri')}
        ${link('zahtevi', 'Moji zahtevi', aktivni ? `<span class="grid size-5 place-items-center rounded-full bg-amber-400 text-[10px] font-bold text-slate-900">${aktivni}</span>` : '')}
      </nav>

      <div class="flex items-center gap-4">
        <button onclick="idi('pocetna')" class="hidden rounded-md border-2 border-amber-400 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-400 md:block">Novi zahtev</button>
        <div title="${esc(STUDENT.ime)}" class="grid size-10 place-items-center rounded-full bg-indigo-600 text-sm font-bold text-white">${inicijali}</div>
      </div>
    </div>
  </header>`;
}

// Plava traka sa naslovom stranice (kao na sajtu fakulteta)
function pageHero(naslov) {
  return `
  <section class="relative overflow-hidden bg-[#1d4a80]">
    <div class="absolute inset-0 bg-linear-to-r from-[#1d4a80] via-[#1d4a80] to-[#2b5d96]"></div>
    <div class="pointer-events-none absolute -right-28 top-1/2 hidden size-[34rem] -translate-y-1/2 rounded-full border-[34px] border-amber-400 md:block"></div>
    <div class="pointer-events-none absolute -right-12 top-1/2 hidden size-[34rem] -translate-y-1/2 rounded-full border-[34px] border-[#163a66] md:block"></div>
    <div class="relative mx-auto flex h-40 max-w-6xl items-center px-4 sm:px-6 md:h-48">
      <h1 class="fade-up text-3xl font-bold text-white md:text-4xl">${naslov}</h1>
    </div>
  </section>`;
}

// Naslov i putanja za svaku stranicu
function footer() {
  return `
  <footer class="mt-12 bg-[#163a66]">
    <div class="mx-auto max-w-6xl px-4 py-8 text-center text-xs text-white/70 sm:px-6">
      © 2026 Studentska služba · Demo aplikacija – podaci nisu stvarni i ništa se ne šalje na server.
    </div>
  </footer>`;
}

function mrvice(delovi) {
  return `
    <nav class="flex flex-wrap items-center gap-2 border-b border-slate-200 py-4 text-sm text-slate-600">
      ${delovi.map((d, i) => {
        const poslednji = i === delovi.length - 1;
        const el = d.akcija && !poslednji
          ? `<button onclick="${d.akcija}" class="transition hover:text-amber-500">${d.tekst}</button>`
          : `<span>${d.tekst}</span>`;
        return el + (poslednji ? '' : icon('chevron', 'size-3.5 text-slate-500'));
      }).join('')}
    </nav>`;
}

// Iscrtava celu stranicu: header, plava traka, putanja, sadržaj, footer
function prikaziStranicu(naslov, putanja, sadrzaj) {
  document.getElementById('app').innerHTML = `
    ${header()}
    ${pageHero(naslov)}
    <div class="mx-auto max-w-6xl px-4 sm:px-6">${mrvice(putanja)}</div>
    <main class="fade-up mx-auto max-w-6xl px-4 py-12 sm:px-6">${sadrzaj}</main>
    ${footer()}`;
}

const POCETNA_LINK = { tekst: 'Početna', akcija: "idi('pocetna')" };


/* ============================== KOPIRANJE =========================== */

function kopirajTelefon(dugme, broj) {
  try { navigator.clipboard.writeText(broj); } catch { /* demo */ }
  const ikona = dugme.querySelector('[data-ikona]');
  const tekst = dugme.querySelector('[data-tekst]');
  const zeleno = ['border-emerald-300', 'bg-emerald-50', 'text-emerald-700'];

  ikona.innerHTML = icon('check', 'size-3.5');
  ikona.classList.remove('pop');
  void ikona.offsetWidth; // restart animacije
  ikona.classList.add('pop');
  tekst.textContent = 'Kopirano';
  dugme.classList.add(...zeleno);

  clearTimeout(dugme._tajmer);
  dugme._tajmer = setTimeout(() => {
    ikona.innerHTML = icon('copy', 'size-3.5');
    ikona.classList.remove('pop');
    tekst.textContent = 'Kopiraj';
    dugme.classList.remove(...zeleno);
  }, 1500);
}

function kopiraj(tekst) {
  try { navigator.clipboard.writeText(tekst); } catch { /* demo */ }
  toast(`Kopirano: ${tekst}`);
}


/* =============================== STATUS ============================= */

function badge(status) {
  const boje = {
    'Primljeno': 'bg-sky-50 text-sky-700 ring-sky-200',
    'Na obradi': 'bg-amber-50 text-amber-700 ring-amber-200',
    'Na proveri': 'bg-amber-50 text-amber-700 ring-amber-200',
    'Spremno za preuzimanje': 'bg-violet-50 text-violet-700 ring-violet-200',
    'Prosleđeno ministarstvu': 'bg-indigo-50 text-indigo-700 ring-indigo-200',
    'Odobreno': 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    'Završeno': 'bg-slate-100 text-slate-600 ring-slate-200',
    'Odbijeno': 'bg-rose-50 text-rose-700 ring-rose-200',
  };
  return `<span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${boje[status] || boje['Završeno']}">${status}</span>`;
}

/* ===================== SIMULACIJA OBRADE ZAHTEVA ==================== */

// Proverava da li je neki zahtev "obrađen" i menja mu status
function osveziStatuse() {
  let promena = false;
  state.zahtevi.forEach(z => {
    if (z.spremnoU && Date.now() >= z.spremnoU) {
      z.status = z.sledeciStatus || z.status;
      z.spremnoU = null;
      promena = true;
      if (state.prijavljen) toast(`${z.usluga}: ${z.status.toLowerCase()}`, 'uspeh');
    }
  });
  if (promena) {
    sacuvajZahteve();
    // Stranice koje prikazuju status se same osveže
    if (state.prijavljen && ['zahtevi', 'uspeh'].includes(state.view) && typeof prikazi === 'function') prikazi();
  }
}
setInterval(osveziStatuse, 2000);


/* ======================== PREUZIMANJE POTVRDE ======================= */

function preuzmiPotvrdu(broj) {
  const z = state.zahtevi.find(x => x.broj === broj);
  if (!z) return;
  const p = z.podaci || {};
  const vrsta = p.vrsta || 'ESPB bodovi i prosečna ocena';
  const saEspb = vrsta.includes('ESPB');
  const saProsekom = vrsta.includes('prosečn');
  const period = p.period === 'Za tekuću akademsku godinu' ? 'u tekućoj akademskoj godini' : 'tokom dosadašnjeg školovanja';

  let tvrdnja = `${period} ostvario/la `;
  if (saEspb) tvrdnja += `ukupno <b>${STUDENT.espb} ESPB bodova</b>`;
  if (saEspb && saProsekom) tvrdnja += ', sa ';
  if (saProsekom) tvrdnja += `prosečnom ocenom <b>${STUDENT.prosek}</b>`;

  const html = `<!DOCTYPE html>
<html lang="sr"><head><meta charset="UTF-8"><title>Potvrda ${esc(z.broj)}</title>
<style>
  body { font-family: Georgia, 'Times New Roman', serif; background:#f1f5f9; margin:0; padding:40px 16px; color:#0f172a; }
  .list { max-width:720px; margin:0 auto; background:#fff; padding:56px 64px; box-shadow:0 10px 40px rgba(0,0,0,.08); }
  .zag { display:flex; justify-content:space-between; border-bottom:2px solid #0f172a; padding-bottom:16px; font-size:14px; }
  h1 { text-align:center; letter-spacing:.25em; font-size:22px; margin:48px 0 32px; }
  p { line-height:1.8; font-size:15px; text-align:justify; }
  table { width:100%; border-collapse:collapse; margin:24px 0; font-size:14px; }
  td, th { border:1px solid #cbd5e1; padding:10px 12px; text-align:left; }
  th { background:#f8fafc; }
  .potpis { display:flex; justify-content:space-between; margin-top:72px; font-size:14px; }
  .linija { border-top:1px solid #0f172a; width:220px; padding-top:6px; text-align:center; }
  .demo { text-align:center; color:#94a3b8; font-size:11px; margin-top:40px; font-family:sans-serif; }
  .alat { max-width:720px; margin:0 auto 16px; text-align:right; }
  .alat button { font-family:sans-serif; background:#4f46e5; color:#fff; border:0; padding:10px 18px; border-radius:10px; font-weight:600; cursor:pointer; }
  @media print { body { background:#fff; padding:0; } .list { box-shadow:none; } .alat { display:none; } }
</style></head>
<body>
  <div class="alat"><button onclick="window.print()">Štampaj / Sačuvaj kao PDF</button></div>
  <div class="list">
    <div class="zag">
      <div><b>${esc(STUDENT.fakultet)}</b><br>Studentska služba</div>
      <div style="text-align:right">Broj: ${esc(z.broj)}<br>Datum: ${danas()}</div>
    </div>
    <h1>POTVRDA</h1>
    <p>Na osnovu službene evidencije, potvrđuje se da je student <b>${esc(STUDENT.ime)}</b>, broj indeksa <b>${esc(STUDENT.indeks)}</b>,
    upisan na studijski program <b>${esc(STUDENT.smer)}</b> (${esc(STUDENT.godina)}), ${tvrdnja}.</p>
    <table>
      <tr><th>Položenih ispita</th>${saEspb ? '<th>Ukupno ESPB</th>' : ''}${saProsekom ? '<th>Prosečna ocena</th>' : ''}</tr>
      <tr><td>${STUDENT.polozeno}</td>${saEspb ? `<td>${STUDENT.espb}</td>` : ''}${saProsekom ? `<td>${STUDENT.prosek}</td>` : ''}</tr>
    </table>
    <p>Potvrda se izdaje na lični zahtev studenta u svrhu: <b>${esc(p.svrha || '—')}</b> i u druge svrhe se ne može koristiti.</p>
    <div class="potpis">
      <div>M.P.</div>
      <div class="linija">Referent studentske službe</div>
    </div>
    <div class="demo">DEMO DOKUMENT – nije važeći</div>
  </div>
</body></html>`;

  const url = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
  const prozor = window.open(url, '_blank');
  if (!prozor) {
    const a = document.createElement('a');
    a.href = url;
    a.download = `Potvrda-${z.broj}.html`;
    a.click();
  }
  toast('Potvrda je otvorena. Sačuvajte je kao PDF (Ctrl+P).', 'uspeh');
}


/* ============================== TOAST =============================== */

function toast(poruka, tip = 'info') {
  const boje = {
    info: 'bg-slate-900 text-white',
    uspeh: 'bg-emerald-600 text-white',
    greska: 'bg-rose-600 text-white',
  };
  const el = document.createElement('div');
  el.className = `fade-up pointer-events-auto flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium shadow-xl ${boje[tip]}`;
  el.innerHTML = `${icon(tip === 'uspeh' ? 'check' : tip === 'greska' ? 'x' : 'info', 'size-5 shrink-0')}<span>${esc(poruka)}</span>`;
  document.getElementById('toasts').appendChild(el);
  setTimeout(() => {
    el.style.transition = 'opacity .3s, transform .3s';
    el.style.opacity = '0';
    el.style.transform = 'translateY(8px)';
    setTimeout(() => el.remove(), 300);
  }, 3200);
}




// Prikaži poruku sa prethodne stranice (npr. "Zahtev je poslat")
(function () {
  const p = citaj(sessionStorage, 'ss_poruka');
  if (!p) return;
  sessionStorage.removeItem('ss_poruka');
  try {
    const { tekst, tip } = JSON.parse(p);
    setTimeout(() => toast(tekst, tip), 300);
  } catch { /* ignoriši */ }
})();
