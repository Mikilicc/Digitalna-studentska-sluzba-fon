/* =====================================================================
   TEMA – boje, font, zaobljenost i animacije za SVE stranice.
   Menjaš ovde, važi svuda.
   ===================================================================== */

(function () {
  const stil = document.createElement('style');
  stil.type = 'text/tailwindcss';
  stil.textContent = `
    @theme {
      --font-sans: "Nunito", ui-sans-serif, system-ui, sans-serif;

      /* Glavna ljubičasta (naslovi, dugmad) */
      --color-indigo-50:  #f2f2fa;
      --color-indigo-100: #e3e4f3;
      --color-indigo-200: #c8c9e8;
      --color-indigo-300: #a4a6d6;
      --color-indigo-400: #7d80c0;
      --color-indigo-500: #5d60ad;
      --color-indigo-600: #4b4e9d;
      --color-indigo-700: #3e4086;
      --color-indigo-800: #33356c;
      --color-indigo-900: #2a2b57;

      /* Narandžasti akcenat (oznake, ikone, linije) */
      --color-amber-400: #f6a821;
      --color-amber-500: #e9961a;

      /* Manje zaobljeni uglovi */
      --radius-xl:  0.375rem;
      --radius-2xl: 0.5rem;
      --radius-3xl: 0.625rem;
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: none; }
    }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%, 60% { transform: translateX(-6px); }
      40%, 80% { transform: translateX(6px); }
    }
    @keyframes pop {
      0%   { transform: scale(.5); opacity: 0; }
      70%  { transform: scale(1.1); opacity: 1; }
      100% { transform: scale(1); }
    }
    .fade-up { animation: fadeUp .4s ease-out both; }
    .shake   { animation: shake .4s ease-in-out; }
    .pop     { animation: pop .5s ease-out both; }
  `;
  document.head.appendChild(stil);
})();
