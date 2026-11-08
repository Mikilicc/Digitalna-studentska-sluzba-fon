/* STRANICA POSLE SLANJA (uspeh.html?broj=...) */

function viewUspeh() {
  const z = state.poslednji;
  if (!z) { location.replace(STRANICE.zahtevi); return ''; }
  return `
    <div class="mx-auto max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center sm:p-10">
      <div class="pop mx-auto grid size-20 place-items-center rounded-full bg-emerald-100 text-emerald-600">${icon('check', 'size-10')}</div>
      <h1 class="mt-6 text-2xl font-bold tracking-tight text-slate-900">Zahtev je uspešno podnet!</h1>
      <p class="mt-2 text-sm text-slate-500">Obaveštenje ćete dobiti na ${esc(STUDENT.email)}.</p>

      <div class="mt-8 grid grid-cols-2 gap-3">
        <div class="rounded-2xl bg-slate-50 p-4">
          <p class="text-xs text-slate-500">Broj zahteva</p>
          <p class="mt-1 font-mono text-lg font-bold text-slate-900">${z.broj}</p>
        </div>
        <div class="rounded-2xl bg-indigo-50 p-4">
          <p class="text-xs text-indigo-600">Vaš broj u redu</p>
          <p class="mt-1 font-mono text-lg font-bold text-indigo-700">${z.redniBroj}</p>
        </div>
      </div>

      <dl class="mt-6 divide-y divide-slate-100 text-left text-sm">
        <div class="flex justify-between py-2.5"><dt class="text-slate-500">Usluga</dt><dd class="font-medium">${z.usluga}</dd></div>
        <div class="flex justify-between py-2.5"><dt class="text-slate-500">Šalter</dt><dd class="font-medium">Šalter ${z.salter}</dd></div>
        <div class="flex justify-between py-2.5"><dt class="text-slate-500">Priloženo fajlova</dt><dd class="font-medium">${z.brojFajlova}</dd></div>
        ${z.termin ? `<div class="flex justify-between py-2.5"><dt class="text-slate-500">Termin za overu</dt><dd class="font-medium">${esc(z.termin)}</dd></div>` : ''}
        <div class="flex justify-between py-2.5"><dt class="text-slate-500">Status</dt><dd>${badge(z.status)}</dd></div>
      </dl>

      ${z.potvrda ? (z.spremnoU ? `
        <div class="mt-6 flex items-center gap-3 rounded-2xl bg-amber-50 p-4 text-left text-sm text-amber-800">
          ${SPINNER}<span>Zahtev se obrađuje. Potvrda će uskoro biti spremna za preuzimanje.</span>
        </div>` : `
        <button onclick="preuzmiPotvrdu('${z.broj}')" class="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700">
          ${icon('download', 'size-5')} Preuzmi potvrdu
        </button>`) : ''}

      ${z.obaveznaOvera ? `
        <div class="mt-6 rounded-lg border-2 border-red-200 bg-red-50 p-4 text-left">
          <p class="font-bold uppercase tracking-wide text-red-600">Ne zaboravite overu</p>
          <p class="mt-0.5 text-sm font-semibold text-red-600">${esc(z.obaveznaOvera)}</p>
        </div>` : ''}

      <div class="mt-8 flex flex-col gap-3 sm:flex-row">
        <button onclick="idi('pocetna')" class="flex-1 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Nazad na šaltere</button>
        <button onclick="idi('zahtevi')" class="flex-1 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700">Moji zahtevi</button>
      </div>
    </div>`;
}


state.view = 'uspeh';
state.poslednji = state.zahtevi.find(z => z.broj === param('broj'));

function prikazi() {
  if (!state.poslednji) { location.replace(STRANICE.zahtevi); return; }
  prikaziStranicu('Zahtev je podnet', [POCETNA_LINK, { tekst: 'Potvrda o prijemu' }], viewUspeh());
}

if (zastiti()) prikazi();
