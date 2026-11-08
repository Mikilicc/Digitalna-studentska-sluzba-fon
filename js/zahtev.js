/* STRANICA ZAHTEVA (zahtev.html?salter=...&usluga=...) – forma, prilozi, slanje */

const KLASA_INPUT = 'w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm shadow-xs outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100';

function renderPolje(p) {
  const id = 'f_' + p.name;
  const req = p.required ? 'required' : '';
  const zvezda = p.required ? ' <span class="text-rose-500">*</span>' : '';
  const vrednost = p.auto ? esc(STUDENT[p.auto] || '') : esc(sablon(p.default || ''));
  const zakljucano = p.auto && !p.required;
  const klasa = KLASA_INPUT + (zakljucano ? ' bg-slate-50 text-slate-500' : '');
  let polje;

  if (p.type === 'select') {
    const opcije = p.options || Object.keys(p.uplate || {});
    polje = `<select id="${id}" name="${p.name}" ${req} class="${klasa}" ${p.uplate ? 'onchange="promeniUplatu(this)"' : ''}>
      <option value="">Izaberite...</option>
      ${opcije.map(o => `<option>${esc(o)}</option>`).join('')}
    </select>`;
  } else if (p.type === 'textarea') {
    polje = `<textarea id="${id}" name="${p.name}" rows="${p.rows || 3}" ${req} placeholder="${esc(p.placeholder || '')}" class="${klasa} ${p.rows ? 'resize-y font-mono text-[13px] leading-relaxed' : 'resize-none'}">${vrednost}</textarea>`;
  } else {
    const minMax = (p.min !== undefined ? ` min="${p.min}"` : '') + (p.max !== undefined ? ` max="${p.max}"` : '') + (p.type === 'number' ? ' step="any"' : '');
    polje = `<input id="${id}" name="${p.name}" type="${p.type}" value="${vrednost}" ${req}${minMax} ${zakljucano ? 'readonly' : ''} placeholder="${esc(p.placeholder || '')}" class="${klasa}">`;
  }

  return `
    <div class="${p.full ? 'sm:col-span-2' : ''}">
      <label for="${id}" class="mb-1.5 block text-sm font-medium text-slate-700">${p.label}${zvezda}</label>
      ${polje}
      ${p.hint ? `<p class="mt-1 text-xs text-slate-400">${p.hint}</p>` : ''}
    </div>`;
}

function renderUpload(f) {
  const formati = (f.accept || '').replaceAll('.', '').toUpperCase().split(',').join(', ');
  return `
    <div>
      <p class="mb-1.5 text-sm font-medium text-slate-700">${f.label}${f.required ? ' <span class="text-rose-500">*</span>' : ' <span class="text-xs font-normal text-slate-400">(opciono)</span>'}</p>
      <label data-drop="${f.name}"
        class="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/60 px-6 py-6 text-center transition hover:border-indigo-400 hover:bg-indigo-50/40">
        <span class="text-slate-400 transition group-hover:text-indigo-500">${icon('upload', 'size-8')}</span>
        <p class="mt-2 text-sm text-slate-600"><span class="font-semibold text-indigo-600">Kliknite</span> ili prevucite fajl${f.multiple ? 'ove' : ''} ovde</p>
        <p class="mt-0.5 text-xs text-slate-400">${formati || 'Bilo koji format'} · max 10 MB</p>
        <input type="file" class="sr-only" data-file="${f.name}" accept="${f.accept || ''}" ${f.multiple ? 'multiple' : ''}>
      </label>
      <ul id="lista-${f.name}" class="mt-2 space-y-2"></ul>
    </div>`;
}

/* ---------- Koraci postupka (preuzimanje obrazaca, overa, uplata) ---------- */

function renderKoraci(u, s, t) {
  return `
    <div class="mt-8">
      <h2 class="mb-5 text-xs font-bold uppercase tracking-[.2em] text-amber-500">Postupak</h2>
      <ol class="space-y-6">
        ${u.koraci.map((k, i) => `
          <li class="relative flex gap-4">
            ${i < u.koraci.length - 1 ? '<span class="absolute -bottom-6 left-4 top-9 w-px bg-slate-200"></span>' : ''}
            <span class="relative z-10 grid size-8 shrink-0 place-items-center rounded-full bg-linear-to-br ${t.grad} text-sm font-bold text-white shadow-md">${i + 1}</span>
            <div class="min-w-0 flex-1 pt-1">
              <p class="font-semibold text-slate-900">${k.naslov}</p>
              <p class="mt-0.5 text-sm text-slate-500">${k.opis}</p>
              ${k.dokumenti ? renderObrasci(k.dokumenti) : ''}
              ${k.overa ? renderOvera(salterZaOveru(u, s)) : ''}
              ${k.tabela ? renderTabela(k.tabela) : ''}
              ${k.napomena ? `<p class="mt-2 text-xs text-slate-500">${k.napomena}</p>` : ''}
              ${k.uplata && u.uplata ? renderUplatnica(u.uplata) : ''}
            </div>
          </li>`).join('')}
      </ol>
    </div>`;
}

function renderObrasci(dokumenti) {
  return `
    <div class="mt-3 grid gap-2 sm:grid-cols-2">
      ${dokumenti.map(d => `
        <a href="${esc(d.link)}" target="_blank" rel="noopener"
          class="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-sm transition hover:border-indigo-300 hover:bg-indigo-50/40">
          <span class="grid size-9 shrink-0 place-items-center rounded-lg bg-rose-50 text-[10px] font-bold text-rose-600">PDF</span>
          <span class="min-w-0 flex-1">
            <span class="block truncate font-medium text-slate-800">${esc(d.naziv)}</span>
            <span class="block text-xs text-slate-400">Sajt Ministarstva prosvete</span>
          </span>
          <span class="text-slate-400 group-hover:text-indigo-600">${icon('download', 'size-4')}</span>
        </a>`).join('')}
    </div>`;
}

// Šalter na kome se overa radi (može biti drugi šalter, npr. stipendija -> Šalter 2)
function salterZaOveru(u, s) {
  return (u.overaSalter && SALTERI.find(x => x.id === u.overaSalter)) || s;
}

function renderOvera(s) {
  const vremena = [];
  for (let h = 8; h < 14; h++) vremena.push(`${String(h).padStart(2, '0')}:00`, `${String(h).padStart(2, '0')}:30`);
  const sel = 'rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100';
  return `
    <div class="mt-3 rounded-2xl border border-rose-100 bg-rose-50/50 p-4">
      <div class="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-700">
        <span class="flex items-center gap-2">${icon('building', 'size-4 text-rose-500')} Šalter ${s.broj} – ${s.naziv}</span>
        <span class="flex items-center gap-2">${icon('pin', 'size-4 text-rose-500')} ${s.lokacija}</span>
        <span class="flex items-center gap-2">${icon('clock', 'size-4 text-rose-500')} Pon – Pet, 08:00 – 14:00</span>
      </div>
      <p class="mt-2 text-xs text-slate-500">Ponesite: popunjene i potpisane obrasce, indeks i ličnu kartu.</p>
      <div class="mt-4 flex flex-wrap items-center gap-2">
        <select id="terminDan" class="${sel}">${radniDani(5).map(d => `<option>${d}</option>`).join('')}</select>
        <select id="terminVreme" class="${sel}">${vremena.map(v => `<option>${v}</option>`).join('')}</select>
        <button type="button" onclick="zakaziTermin()" class="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700">Zakaži termin za overu</button>
      </div>
      <div id="terminInfo" class="mt-3 ${state.termin ? '' : 'hidden'} text-sm font-medium text-emerald-700">${state.termin ? `✓ Termin zakazan: ${state.termin}` : ''}</div>
    </div>`;
}

function zakaziTermin() {
  const dan = document.getElementById('terminDan').value;
  const vreme = document.getElementById('terminVreme').value;
  state.termin = `${dan} u ${vreme}`;
  const info = document.getElementById('terminInfo');
  info.textContent = `✓ Termin zakazan: ${state.termin} (Šalter ${salterZaOveru(trenutnaUsluga(), trenutniSalter()).broj})`;
  info.classList.remove('hidden');
  toast(`Termin za overu: ${state.termin}`, 'uspeh');
}

// Tabela u koraku (npr. cenovnik rata školarine)
function renderTabela(t) {
  return `
    <div class="mt-3 overflow-hidden rounded-2xl border border-slate-200">
      <table class="w-full text-left text-sm">
        <thead class="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
          <tr>${t.kolone.map(k => `<th class="px-4 py-2.5 font-semibold">${k}</th>`).join('')}</tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          ${t.redovi.map(r => `
            <tr class="transition hover:bg-slate-50/70">
              ${r.map((c, i) => `<td class="px-4 py-2.5 ${i === 0 ? 'font-semibold text-slate-800' : i === 1 ? 'whitespace-nowrap font-medium text-slate-800' : 'text-slate-500'}">${c}</td>`).join('')}
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

// Kad student izabere ratu, menja iznos i svrhu na uplatnici
function promeniUplatu(sel) {
  const p = trenutnaUsluga().polja.find(x => x.name === sel.name);
  const izbor = p && p.uplate && p.uplate[sel.value];
  if (!izbor) return;
  [['Iznos', izbor.iznos], ['Svrha uplate', izbor.svrha]].forEach(([kljuc, vrednost]) => {
    const el = document.querySelector(`[data-uplata="${kljuc}"]`);
    if (!el || !vrednost) return;
    el.textContent = vrednost;
    el.classList.add('bg-amber-100');
    setTimeout(() => el.classList.remove('bg-amber-100'), 700);
  });
}

function renderUplatnica(up) {
  const redovi = [
    ['Primalac', up.primalac],
    ['Račun primaoca', up.racun],
    ['Model', up.model],
    ['Poziv na broj', sablon(up.poziv)],
    ['Iznos', up.iznos],
    ['Svrha uplate', up.svrha],
  ];
  return `
    <div class="mt-3 overflow-hidden rounded-2xl border border-slate-200">
      <div class="flex items-center justify-between bg-slate-50 px-4 py-2.5">
        <p class="text-xs font-semibold uppercase tracking-wider text-slate-500">Podaci za uplatu</p>
      </div>
      <dl class="divide-y divide-slate-100 text-sm">
        ${redovi.map(([l, v]) => `
          <div class="flex items-center justify-between gap-4 px-4 py-2.5">
            <dt class="text-slate-500">${l}</dt>
            <dd class="flex items-center gap-2 text-right font-medium text-slate-800">
              <span data-uplata="${l}" class="rounded px-1 transition-colors duration-500 ${l === 'Račun primaoca' || l === 'Poziv na broj' ? 'font-mono' : ''}">${esc(v)}</span>
              <button type="button" onclick="kopiraj(this.previousElementSibling.textContent)" title="Kopiraj" class="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700">${icon('copy', 'size-3.5')}</button>
            </dd>
          </div>`).join('')}
      </dl>
    </div>`;
}

// Kopira broj telefona šaltera i kratko prikaže "Kopirano" sa kvačicom
function viewForma() {
  const s = trenutniSalter();
  const u = trenutnaUsluga();
  if (!s || !u) { location.replace(STRANICE.pocetna); return ''; }
  const t = TEME[s.tema];
  const imaKorake = (u.koraci || []).length > 0;
  let br = 0;
  const naslov = tekst => `<h2 class="mb-4 text-xs font-bold uppercase tracking-[.2em] text-amber-500">${++br} · ${tekst}</h2>`;

  return `
    <div class="grid gap-6 lg:grid-cols-3">
      <form id="zahtevForma" onsubmit="posaljiZahtev(event)" class="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 lg:col-span-2">
        <div class="flex items-start gap-4">
          <div class="grid size-12 shrink-0 place-items-center rounded-2xl bg-linear-to-br ${t.grad} text-white">${icon(s.ikona, 'size-6')}</div>
          <div>
            <h2 class="text-2xl font-bold text-indigo-600">${u.naziv}</h2>
            <p class="mt-0.5 text-sm text-slate-500">${u.opis}</p>
          </div>
        </div>

        ${u.obaveznaOvera ? `
        <div class="mt-6 flex items-start gap-3 rounded-lg border-2 border-red-200 bg-red-50 p-4">
          <span class="mt-0.5 text-red-600">${icon('building', 'size-5')}</span>
          <div>
            <p class="font-bold uppercase tracking-wide text-red-600">Obavezna overa</p>
            <p class="mt-0.5 font-semibold text-red-600">${u.obaveznaOvera}</p>
          </div>
        </div>` : ''}

        ${imaKorake ? renderKoraci(u, s, t) : ''}

        <div class="mt-8 ${imaKorake ? 'border-t border-slate-100 pt-8' : ''}">
          ${naslov('Podaci')}
          <div class="grid gap-5 sm:grid-cols-2">
            ${u.polja.map(renderPolje).join('')}
          </div>
        </div>

        ${(u.fajlovi || []).length ? `
        <div class="mt-8">
          ${naslov(u.overa ? 'Overena dokumenta' : 'Prilozi')}
          <div class="grid gap-5 sm:grid-cols-2">
            ${u.fajlovi.map(renderUpload).join('')}
          </div>
        </div>` : ''}

        <div class="mt-8 space-y-3 border-t border-slate-100 pt-6">
          ${(u.potvrde || []).map(p => `
            <label class="flex items-start gap-3 text-sm text-slate-600">
              <input type="checkbox" required class="mt-0.5 size-4 rounded border-slate-300 accent-indigo-600"> ${p}
            </label>`).join('')}
          <label class="flex items-start gap-3 text-sm text-slate-600">
            <input type="checkbox" required class="mt-0.5 size-4 rounded border-slate-300 accent-indigo-600">
            Potvrđujem da su uneti podaci tačni i saglasan/saglasna sam sa obradom ličnih podataka.
          </label>

          <div class="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button type="button" onclick="otvoriSalter('${s.id}')" class="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Odustani</button>
            <button id="posaljiBtn" type="submit" class="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-700 disabled:opacity-70">
              Pošalji zahtev
            </button>
          </div>
        </div>
      </form>

      <aside class="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <div class="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 class="text-lg font-bold text-indigo-600">Pregled zahteva</h3>
          <dl class="mt-4 divide-y divide-slate-100 text-sm">
            <div class="flex justify-between py-2.5"><dt class="text-slate-500">Šalter</dt><dd class="font-medium">${s.broj} – ${s.naziv}</dd></div>
            <div class="flex justify-between gap-4 py-2.5"><dt class="text-slate-500">Usluga</dt><dd class="text-right font-medium">${u.naziv}</dd></div>
            <div class="flex justify-between py-2.5"><dt class="text-slate-500">Rok obrade</dt><dd class="font-medium">${u.rok}</dd></div>
            <div class="flex justify-between py-2.5"><dt class="text-slate-500">Taksa</dt><dd class="font-semibold ${t.text}">${u.taksa}</dd></div>
          </dl>
        </div>
        ${u.overa ? `
        <div class="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-800">
          <p class="flex items-center gap-2 font-semibold">${icon('building', 'size-4')} Potrebna lična overa</p>
          <p class="mt-1">Obrasci moraju biti overeni u studentskoj službi pre otpremanja. Neoverena dokumenta neće biti prihvaćena.</p>
        </div>` : ''}
        ${u.obrada?.potvrda ? `
        <div class="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-800">
          <p class="flex items-center gap-2 font-semibold">${icon('download', 'size-4')} Potvrda online</p>
          <p class="mt-1">Nakon obrade potvrdu preuzimate u sekciji „Moji zahtevi“, bez dolaska na šalter.</p>
        </div>` : ''}
        ${imaKorake ? '' : `
        <div class="rounded-2xl ${t.soft} p-5 text-sm">
          <p class="font-semibold text-slate-800">Kako dalje?</p>
          <ol class="mt-3 space-y-2 text-slate-600">
            <li class="flex gap-2"><b class="${t.text}">1.</b> Popunite podatke i priložite dokumente</li>
            <li class="flex gap-2"><b class="${t.text}">2.</b> Dobijate broj zahteva i broj u redu</li>
            <li class="flex gap-2"><b class="${t.text}">3.</b> Status pratite u „Moji zahtevi“</li>
          </ol>
        </div>`}
      </aside>
    </div>`;
}

/* ============================ FAJLOVI ============================== */

function poveziUpload() {
  document.querySelectorAll('[data-file]').forEach(input => {
    input.addEventListener('change', () => {
      dodajFajlove(input.dataset.file, input.files);
      input.value = '';
    });
  });

  document.querySelectorAll('[data-drop]').forEach(zona => {
    const aktivno = ['border-indigo-500', 'bg-indigo-50'];
    zona.addEventListener('dragover', e => { e.preventDefault(); zona.classList.add(...aktivno); });
    zona.addEventListener('dragleave', () => zona.classList.remove(...aktivno));
    zona.addEventListener('drop', e => {
      e.preventDefault();
      zona.classList.remove(...aktivno);
      dodajFajlove(zona.dataset.drop, e.dataTransfer.files);
    });
  });
}

function dodajFajlove(ime, fileList) {
  const def = trenutnaUsluga().fajlovi.find(f => f.name === ime);
  const novi = [];
  for (const file of fileList) {
    if (file.size > 10 * 1024 * 1024) {
      toast(`„${file.name}“ je veći od 10 MB.`, 'greska');
      continue;
    }
    novi.push({ id: Math.random().toString(36).slice(2), file, gotovo: false });
  }
  if (!novi.length) return;

  state.fajlovi[ime] = def.multiple ? [...(state.fajlovi[ime] || []), ...novi] : [novi[0]];
  renderListu(ime);

  // Simulacija otpremanja
  novi.forEach(n => {
    setTimeout(() => {
      const bar = document.getElementById('bar-' + n.id);
      if (bar) bar.style.width = '100%';
    }, 50);
    setTimeout(() => { n.gotovo = true; renderListu(ime); }, 1000 + Math.random() * 600);
  });
}

function ukloniFajl(ime, id) {
  state.fajlovi[ime] = (state.fajlovi[ime] || []).filter(f => f.id !== id);
  renderListu(ime);
}

function renderListu(ime) {
  const ul = document.getElementById('lista-' + ime);
  if (!ul) return;
  ul.innerHTML = (state.fajlovi[ime] || []).map(f => `
    <li class="fade-up flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
      <div class="grid size-9 shrink-0 place-items-center rounded-lg ${f.gotovo ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'}">
        ${icon(f.gotovo ? 'check' : 'document', 'size-4')}
      </div>
      <div class="min-w-0 flex-1">
        <p class="truncate text-sm font-medium text-slate-800">${esc(f.file.name)}</p>
        ${f.gotovo
          ? `<p class="text-xs text-emerald-600">${velicina(f.file.size)} · Otpremljeno</p>`
          : `<div class="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100"><div id="bar-${f.id}" class="h-full w-0 rounded-full bg-indigo-500 transition-all duration-1000 ease-out"></div></div>`}
      </div>
      <button type="button" onclick="ukloniFajl('${ime}', '${f.id}')" class="rounded-lg p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600" aria-label="Ukloni">${icon('x', 'size-4')}</button>
    </li>`).join('');
}


/* ========================== SLANJE ZAHTEVA ========================== */

function posaljiZahtev(e) {
  e.preventDefault();
  const s = trenutniSalter();
  const u = trenutnaUsluga();

  const nedostaje = (u.fajlovi || []).filter(f => f.required && !(state.fajlovi[f.name] || []).length);
  if (nedostaje.length) {
    toast(`Priložite: ${nedostaje.map(f => f.label).join(', ')}`, 'greska');
    return;
  }
  const uToku = Object.values(state.fajlovi).flat().some(f => !f.gotovo);
  if (uToku) {
    toast('Sačekajte da se fajlovi otpreme.', 'greska');
    return;
  }

  const btn = document.getElementById('posaljiBtn');
  btn.disabled = true;
  btn.innerHTML = `${SPINNER} Slanje...`;

  setTimeout(() => {
    const slovo = ['A', 'B', 'C'][s.broj - 1] || 'D';
    const zahtev = {
      broj: `SS-2026-${String(1000 + Math.floor(Math.random() * 9000))}`,
      redniBroj: `${slovo}-${String(Math.floor(Math.random() * 40) + 42).padStart(3, '0')}`,
      usluga: u.naziv,
      salter: s.broj,
      datum: danas(),
      status: u.obrada?.pocetni || 'Primljeno',
      brojFajlova: Object.values(state.fajlovi).flat().length,
      podaci: Object.fromEntries(new FormData(e.target).entries()),
      termin: state.termin,
      obaveznaOvera: u.obaveznaOvera || null,
      potvrda: !!u.obrada?.potvrda,
      sledeciStatus: u.obrada?.status || null,
      spremnoU: u.obrada ? Date.now() + u.obrada.ms : null,
    };
    state.zahtevi.unshift(zahtev);
    sacuvajZahteve();
    poruka('Zahtev je poslat.', 'uspeh');
    location.href = `uspeh.html?broj=${encodeURIComponent(zahtev.broj)}`;
  }, 1400);
}



state.view = 'forma';
state.salterId = param('salter');
state.uslugaId = param('usluga');
state.termin = null;

function prikazi() {
  const s = trenutniSalter();
  const u = trenutnaUsluga();
  if (!s || !u) { location.replace(STRANICE.pocetna); return; }
  prikaziStranicu(u.naziv, [
    POCETNA_LINK,
    { tekst: `Šalter ${s.broj} – ${s.naziv}`, akcija: `otvoriSalter('${s.id}')` },
    { tekst: u.naziv },
  ], viewForma());
  poveziUpload();
}

if (zastiti()) prikazi();
