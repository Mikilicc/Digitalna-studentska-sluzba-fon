/* POČETNA STRANICA (pocetna.html) – izbor šaltera */

// Radno vreme šaltera (prikazuje se na početnoj)
const RADNO_VREME = { dani: 'Ponedeljak – petak', od: '11:00', do: '13:00' };

// Da li su šalteri trenutno otvoreni
function salteriOtvoreni() {
  const d = new Date();
  if (d.getDay() === 0 || d.getDay() === 6) return false;
  const min = t => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
  const sad = d.getHours() * 60 + d.getMinutes();
  return sad >= min(RADNO_VREME.od) && sad < min(RADNO_VREME.do);
}

function viewPocetna() {
  const aktivni = state.zahtevi.filter(z => z.status !== 'Završeno').length;
  const zavrseni = state.zahtevi.length - aktivni;
  const inicijali = STUDENT.ime.split(' ').map(d => d[0]).join('');
  const otvoreno = salteriOtvoreni();

  const podatak = (naslov, vrednost) => `
    <div class="px-6 py-4">
      <dt class="text-xs font-semibold uppercase tracking-wider text-slate-400">${naslov}</dt>
      <dd class="mt-1 font-semibold text-slate-800">${esc(vrednost)}</dd>
    </div>`;

  const brojac = (ikona, naslov, vrednost, boja) => `
    <button onclick="idi('zahtevi')" class="group flex items-center gap-4 px-6 py-5 text-left transition hover:bg-slate-50">
      <span class="grid size-11 shrink-0 place-items-center rounded-full ${boja}">${icon(ikona, 'size-5')}</span>
      <span class="flex-1">
        <span class="block text-3xl font-bold leading-none text-slate-900">${vrednost}</span>
        <span class="mt-1 block text-sm text-slate-500">${naslov}</span>
      </span>
      <span class="text-slate-300 transition group-hover:translate-x-1 group-hover:text-amber-500">${icon('chevron', 'size-5')}</span>
    </button>`;

  return `
    <!-- Dobrodošlica -->
    <section class="grid gap-6 lg:grid-cols-3">

      <!-- Profil studenta -->
      <div class="overflow-hidden rounded-lg border border-slate-200 bg-white lg:col-span-2">
        <div class="flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
          <div class="grid size-16 shrink-0 place-items-center rounded-full bg-indigo-600 text-xl font-bold text-white ring-4 ring-amber-400/40">${inicijali}</div>
          <div class="min-w-0">
            <p class="text-xs font-bold uppercase tracking-[.2em] text-amber-500">Dobro došli</p>
            <h2 class="mt-1 text-2xl font-bold text-indigo-600 sm:text-3xl">${esc(STUDENT.ime)}</h2>
            <p class="mt-1 text-sm text-slate-500">${esc(STUDENT.fakultet)}</p>
          </div>
        </div>

        <dl class="grid border-t border-slate-100 bg-slate-50/60 sm:grid-cols-3 sm:divide-x sm:divide-slate-100">
          ${podatak('Studijski program', STUDENT.smer)}
          ${podatak('Broj indeksa', STUDENT.indeks)}
          ${podatak('Godina studija', STUDENT.godina)}
        </dl>

        <div class="grid border-t border-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-slate-100">
          ${brojac('list', 'Aktivni zahtevi', aktivni, 'bg-amber-50 text-amber-500')}
          ${brojac('check', 'Završeni zahtevi', zavrseni, 'bg-emerald-50 text-emerald-600')}
        </div>
      </div>

      <!-- Radno vreme -->
      <div class="relative flex flex-col overflow-hidden rounded-lg bg-[#1d4a80] p-6 text-white">
        <div class="pointer-events-none absolute -bottom-44 -right-44 size-72 rounded-full border-[20px] border-amber-400"></div>
        <div class="pointer-events-none absolute -bottom-44 -right-32 size-72 rounded-full border-[20px] border-[#163a66]"></div>

        <div class="relative">
          <p class="text-xs font-bold uppercase tracking-[.2em] text-amber-400">Radno vreme</p>
          <h3 class="mt-1 text-2xl font-bold">Šalteri službe</h3>

          <span class="mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${otvoreno ? 'bg-emerald-400/15 text-emerald-300' : 'bg-white/10 text-white/70'}">
            <span class="relative flex size-2">
              ${otvoreno ? '<span class="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>' : ''}
              <span class="relative inline-flex size-2 rounded-full ${otvoreno ? 'bg-emerald-400' : 'bg-white/50'}"></span>
            </span>
            ${otvoreno ? 'Trenutno otvoreno' : 'Trenutno zatvoreno'}
          </span>

          <p class="mt-5 text-4xl font-bold tracking-tight">${RADNO_VREME.od} <span class="text-white/50">–</span> ${RADNO_VREME.do}</p>
          <p class="mt-1 text-sm text-white/70">${RADNO_VREME.dani}</p>
        </div>

        <p class="relative mt-6 max-w-[15rem] text-sm leading-relaxed text-white/80">
          Online zahteve možete podneti <b class="text-white">bilo kada</b>, i van radnog vremena.
        </p>
      </div>
    </section>

    <!-- Šalteri -->
    <section class="mt-10">
      <div class="mb-5 flex items-end justify-between">
        <div>
          <p class="text-xs font-bold uppercase tracking-[.2em] text-amber-500">Šalterske usluge</p>
          <h2 class="mt-3 text-3xl font-bold text-indigo-600">Izaberite šalter</h2>
        </div>
      </div>

      <div class="grid gap-5 md:grid-cols-3">
        ${SALTERI.map((s, i) => {
          const t = TEME[s.tema];
          return `
          <button onclick="otvoriSalter('${s.id}')" style="animation-delay:${i * 70}ms"
            class="fade-up group relative flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white p-6 text-left transition duration-200 hover:-translate-y-1 hover:shadow-lg ${t.border}">
            <span class="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-amber-400 transition duration-300 group-hover:scale-x-100"></span>
            <div class="flex items-start justify-between">
              <div class="grid size-12 place-items-center rounded-2xl bg-linear-to-br ${t.grad} text-white shadow-lg">${icon(s.ikona, 'size-6')}</div>
              <span class="text-xs font-bold uppercase tracking-[.2em] text-amber-500">Šalter ${s.broj}</span>
            </div>
            <h3 class="mt-5 text-xl font-bold text-indigo-600">${s.naziv}</h3>
            <p class="mt-1 flex-1 text-sm text-slate-500">${s.opis}</p>
            <div class="mt-4 flex items-center gap-1 text-sm font-semibold ${t.text}">
              ${brojUsluga(s.usluge.length)}
              <span class="transition group-hover:translate-x-1">${icon('chevron', 'size-4')}</span>
            </div>
          </button>`;
        }).join('')}
      </div>
    </section>`;
}


state.view = 'pocetna';

function prikazi() {
  prikaziStranicu('Šalterske usluge', [POCETNA_LINK, { tekst: 'Šalteri' }], viewPocetna());
}

if (zastiti()) prikazi();
