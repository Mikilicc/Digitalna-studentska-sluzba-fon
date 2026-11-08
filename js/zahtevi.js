/* MOJI ZAHTEVI (moji-zahtevi.html) */

function viewZahtevi() {
  return `
    <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-xs font-bold uppercase tracking-[.2em] text-amber-500">Pregled</p>
        <h2 class="mt-3 text-3xl font-bold text-indigo-600">Podneti zahtevi</h2>
      </div>
      <button onclick="idi('pocetna')" class="self-start rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 sm:self-auto">+ Novi zahtev</button>
    </div>

    ${state.zahtevi.length === 0 ? `
      <div class="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
        <p class="font-medium text-slate-700">Nemate podnetih zahteva.</p>
        <p class="mt-1 text-sm text-slate-500">Izaberite šalter i podnesite prvi zahtev.</p>
      </div>` : `
      <div class="overflow-hidden rounded-3xl border border-slate-200 bg-white">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="border-b border-slate-200 bg-slate-50/70 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th class="px-6 py-3.5 font-semibold">Broj</th>
                <th class="px-6 py-3.5 font-semibold">Usluga</th>
                <th class="px-6 py-3.5 font-semibold">Šalter</th>
                <th class="px-6 py-3.5 font-semibold">Datum</th>
                <th class="px-6 py-3.5 font-semibold">Status</th>
                <th class="px-6 py-3.5 font-semibold"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${state.zahtevi.map(z => `
                <tr class="transition hover:bg-slate-50/70">
                  <td class="whitespace-nowrap px-6 py-4 font-mono text-xs font-semibold text-slate-700">${esc(z.broj)}</td>
                  <td class="px-6 py-4 font-medium text-slate-900">${esc(z.usluga)}</td>
                  <td class="whitespace-nowrap px-6 py-4 text-slate-500">Šalter ${esc(z.salter)}</td>
                  <td class="whitespace-nowrap px-6 py-4 text-slate-500">${esc(z.datum)}</td>
                  <td class="whitespace-nowrap px-6 py-4">${badge(z.status)}</td>
                  <td class="whitespace-nowrap px-6 py-4 text-right">
                    ${z.potvrda && !z.spremnoU ? `
                      <button onclick="preuzmiPotvrdu('${esc(z.broj)}')" class="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-700">
                        ${icon('download', 'size-4')} Preuzmi potvrdu
                      </button>` : z.potvrda ? '<span class="text-xs text-slate-400">Obrađuje se...</span>' : ''}
                  </td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
      <div class="mt-4 text-right">
        <button onclick="resetujZahteve()" class="text-xs text-slate-400 hover:text-rose-600">Resetuj demo podatke</button>
      </div>`}`;
}

function resetujZahteve() {
  state.zahtevi = [...POCETNI_ZAHTEVI];
  sacuvajZahteve();
  prikazi();
  toast('Demo podaci su resetovani.');
}



state.view = 'zahtevi';

function prikazi() {
  prikaziStranicu('Moji zahtevi', [POCETNA_LINK, { tekst: 'Moji zahtevi' }], viewZahtevi());
}

if (zastiti()) prikazi();
