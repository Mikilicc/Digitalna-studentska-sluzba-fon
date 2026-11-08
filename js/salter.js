/* STRANICA ŠALTERA (salter.html?id=...) – izbor usluge */

function viewSalter() {
  const s = trenutniSalter();
  if (!s) { location.replace(STRANICE.pocetna); return ''; }
  const t = TEME[s.tema];

  return `
    <section>
      <p class="text-xs font-bold uppercase tracking-[.2em] text-amber-500">Šalter ${s.broj}</p>
      <h2 class="mt-3 text-3xl font-bold text-indigo-600">${s.naziv}</h2>
      <p class="mt-3 max-w-2xl text-[15px] text-slate-700">${s.opis}</p>
    </section>

    <div class="mt-8 grid gap-6 lg:grid-cols-3">
      <section class="lg:col-span-2">
        <h2 class="mb-4 text-xs font-bold uppercase tracking-[.2em] text-amber-500">Izaberite uslugu</h2>
        <div class="space-y-3">
          ${s.usluge.map((u, i) => `
            <button onclick="otvoriUslugu('${u.id}')" style="animation-delay:${i * 60}ms"
              class="fade-up group flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:shadow-lg hover:shadow-slate-200/60 ${t.border}">
              <div class="grid size-11 shrink-0 place-items-center rounded-xl ${t.soft} ${t.text}">${icon('document', 'size-5')}</div>
              <div class="min-w-0 flex-1">
                <p class="font-semibold text-slate-900">${u.naziv}</p>
                <p class="mt-0.5 text-sm text-slate-500">${u.opis}</p>
                ${u.obaveznaOvera ? `<p class="mt-1.5 flex items-center gap-1.5 text-sm font-bold text-red-600">${icon('building', 'size-4 shrink-0')} ${u.overaSalter ? `Overa na Šalteru ${(SALTERI.find(x => x.id === u.overaSalter) || s).broj}` : 'Mora se overiti na šalteru'}</p>` : ''}
                <div class="mt-2 flex flex-wrap gap-2 text-xs">
                  <span class="rounded-full bg-slate-100 px-2.5 py-0.5 text-slate-600">⏱ ${u.rok}</span>
                  <span class="rounded-full bg-slate-100 px-2.5 py-0.5 text-slate-600">💳 ${u.taksa}</span>
                  ${(u.fajlovi || []).length ? `<span class="rounded-full bg-slate-100 px-2.5 py-0.5 text-slate-600">📎 ${u.fajlovi.length} priloga</span>` : ''}
                  ${u.overa ? '<span class="rounded-full bg-rose-50 px-2.5 py-0.5 font-medium text-rose-700">🏢 Potrebna overa na šalteru</span>' : ''}
                  ${u.obrada?.potvrda ? '<span class="rounded-full bg-emerald-50 px-2.5 py-0.5 font-medium text-emerald-700">⬇ Potvrda se preuzima online</span>' : ''}
                </div>
              </div>
              <span class="text-slate-300 transition group-hover:translate-x-1 group-hover:text-slate-500">${icon('chevron', 'size-5')}</span>
            </button>`).join('')}
        </div>
      </section>

      <aside class="space-y-4">
        <div class="rounded-2xl border border-slate-200 bg-white p-5">
          <p class="text-xs font-bold uppercase tracking-[.2em] text-amber-500">Kontakt i lokacija</p>
          <h3 class="mt-2 text-xl font-bold text-indigo-600">Informacije o šalteru</h3>
          <dl class="mt-4 space-y-3 text-sm">
            <div class="flex items-center gap-3"><span class="text-amber-500">${icon('user', 'size-5')}</span><div><dt class="text-xs text-slate-500">Službenik</dt><dd class="font-medium">${s.sluzbenik}</dd></div></div>
            <div class="flex items-center gap-3"><span class="text-amber-500">${icon('pin', 'size-5')}</span><div><dt class="text-xs text-slate-500">Lokacija</dt><dd class="font-medium">${s.lokacija}</dd></div></div>
            <div class="flex items-center gap-3"><span class="text-amber-500">${icon('clock', 'size-5')}</span><div><dt class="text-xs text-slate-500">Radno vreme</dt><dd class="font-medium">Pon – Pet, 11:00 – 13:00</dd></div></div>
            <div class="flex items-center gap-3">
              <span class="text-amber-500">${icon('phone', 'size-5')}</span>
              <div class="flex-1"><dt class="text-xs text-slate-500">Telefon</dt><dd class="font-mono font-medium">${s.telefon}</dd></div>
              <button type="button" onclick="kopirajTelefon(this, '${s.telefon}')" title="Kopiraj broj"
                class="flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition duration-200 hover:bg-slate-50 active:scale-90">
                <span data-ikona class="inline-flex">${icon('copy', 'size-3.5')}</span><span data-tekst>Kopiraj</span>
              </button>
            </div>
            </dl>
        </div>
        <div class="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
          <p class="font-semibold">Napomena</p>
          <p class="mt-1">Dokumenta otpremite u PDF, JPG ili PNG formatu. Maksimalna veličina fajla je 10 MB.</p>
        </div>
      </aside>
    </div>`;
}


state.view = 'salter';
state.salterId = param('id');

function prikazi() {
  const s = trenutniSalter();
  if (!s) { location.replace(STRANICE.pocetna); return; }
  prikaziStranicu(s.naziv, [POCETNA_LINK, { tekst: `Šalter ${s.broj} – ${s.naziv}` }], viewSalter());
}

if (zastiti()) prikazi();
