/* LOGIN STRANICA (index.html) */

// Ako je već prijavljen, ide pravo na početnu
if (state.prijavljen) location.replace(STRANICE.pocetna);

function prijava(e) {
  e.preventDefault();
  const kor = document.getElementById('korisnicko').value.trim();
  const sif = document.getElementById('sifra').value;
  const btn = document.getElementById('loginBtn');
  const greska = document.getElementById('loginGreska');
  const kartica = document.getElementById('loginKartica');

  greska.classList.add('hidden');
  btn.disabled = true;
  btn.innerHTML = `${SPINNER} Prijavljivanje...`;

  setTimeout(() => {
    if (kor === DEMO_NALOG.korisnicko && sif === DEMO_NALOG.sifra) {
      upisi(sessionStorage, 'ss_prijavljen', '1');
      poruka(`Dobro došli, ${STUDENT.ime.split(' ')[0]}!`, 'uspeh');
      location.href = STRANICE.pocetna;
    } else {
      btn.disabled = false;
      btn.innerHTML = 'Prijavi se';
      greska.classList.remove('hidden');
      kartica.classList.remove('shake');
      void kartica.offsetWidth; // restart animacije
      kartica.classList.add('shake');
    }
  }, 800);
}

function popuniDemo() {
  document.getElementById('korisnicko').value = DEMO_NALOG.korisnicko;
  document.getElementById('sifra').value = DEMO_NALOG.sifra;
}

function prikaziSifru() {
  const s = document.getElementById('sifra');
  s.type = s.type === 'password' ? 'text' : 'password';
}


function viewLogin() {
  const prednosti = ['Podnošenje zahteva bez čekanja u redu', 'Otpremanje dokumenata online', 'Praćenje statusa u realnom vremenu'];
  return `
  <div class="flex min-h-screen">
    <!-- Leva strana -->
    <div class="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-[#1d4a80] p-12 text-white lg:flex">
      <div class="absolute -bottom-72 -right-56 size-[36rem] rounded-full border-[44px] border-amber-400"></div>
      <div class="absolute -bottom-72 -right-40 size-[36rem] rounded-full border-[44px] border-[#163a66]"></div>

      <div class="relative flex items-center gap-3">
        <div class="grid size-11 place-items-center rounded-full border-[3px] border-amber-400">${icon('cap', 'size-6')}</div>
        <div>
          <p class="font-semibold leading-tight">Studentska služba</p>
          <p class="text-xs text-indigo-100">eŠalter</p>
        </div>
      </div>

      <div class="relative">
        <h1 class="text-4xl font-bold leading-tight tracking-tight xl:text-5xl">Studentska služba,<br>bez čekanja u redu.</h1>
        <p class="mt-4 max-w-md text-indigo-100">Podnesite zahteve za dom, dokumenta i finansije online – sa bilo kog uređaja.</p>
        <ul class="mt-8 space-y-3">
          ${prednosti.map(p => `
            <li class="flex items-center gap-3 text-sm">
              <span class="grid size-6 place-items-center rounded-full bg-white/20">${icon('check', 'size-3.5')}</span>${p}
            </li>`).join('')}
        </ul>
      </div>

      <p class="relative text-sm text-indigo-200">© 2026 Studentska služba · Demo verzija</p>
    </div>

    <!-- Desna strana – forma -->
    <div class="flex w-full items-center justify-center p-6 lg:w-1/2">
      <div id="loginKartica" class="fade-up w-full max-w-sm">
        <div class="mb-8 flex items-center gap-3 lg:hidden">
          <div class="grid size-11 place-items-center rounded-full border-[3px] border-amber-400 text-indigo-600">${icon('cap', 'size-6')}</div>
          <p class="font-semibold">Studentska služba</p>
        </div>

        <p class="text-xs font-bold uppercase tracking-[.2em] text-amber-500">eŠalter</p>
        <h2 class="mt-2 text-3xl font-bold text-indigo-600">Prijava</h2>
        <p class="mt-1 text-sm text-slate-500">Unesite korisničko ime i šifru da biste pristupili šalterima.</p>

        <form onsubmit="prijava(event)" class="mt-8 space-y-5">
          <div>
            <label for="korisnicko" class="mb-1.5 block text-sm font-medium text-slate-700">Korisničko ime</label>
            <div class="relative">
              <span class="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-slate-400">${icon('user', 'size-5')}</span>
              <input id="korisnicko" type="text" required autocomplete="username" placeholder="npr. demo"
                class="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm shadow-xs outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100">
            </div>
          </div>

          <div>
            <label for="sifra" class="mb-1.5 block text-sm font-medium text-slate-700">Šifra</label>
            <div class="relative">
              <span class="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-slate-400">${icon('lock', 'size-5')}</span>
              <input id="sifra" type="password" required autocomplete="current-password" placeholder="••••••••"
                class="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-11 text-sm shadow-xs outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100">
              <button type="button" onclick="prikaziSifru()" class="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600" aria-label="Prikaži šifru">${icon('eye', 'size-5')}</button>
            </div>
          </div>

          <div id="loginGreska" class="hidden rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            Pogrešno korisničko ime ili šifra.
          </div>

          <div class="flex items-center justify-between text-sm">
            <label class="flex items-center gap-2 text-slate-600">
              <input type="checkbox" class="size-4 rounded border-slate-300 accent-indigo-600"> Zapamti me
            </label>
            <a href="#" onclick="event.preventDefault(); toast('Demo: obratite se studentskoj službi za novu šifru.')" class="font-medium text-indigo-600 hover:text-indigo-700">Zaboravljena šifra?</a>
          </div>

          <button id="loginBtn" type="submit"
            class="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-700 active:scale-[.99] disabled:opacity-70">
            Prijavi se
          </button>
        </form>

        <div class="mt-8 flex items-start gap-3 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4">
          <span class="mt-0.5 text-indigo-500">${icon('info', 'size-5')}</span>
          <div class="text-sm">
            <p class="font-medium text-slate-800">Demo pristup</p>
            <p class="text-slate-600">Korisnik: <code class="rounded bg-white px-1.5 py-0.5 font-mono text-xs">demo</code> · Šifra: <code class="rounded bg-white px-1.5 py-0.5 font-mono text-xs">demo123</code></p>
            <button type="button" onclick="popuniDemo()" class="mt-2 text-xs font-semibold text-indigo-600 hover:text-indigo-700">Popuni automatski →</button>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}


if (!state.prijavljen) document.getElementById('app').innerHTML = viewLogin();
