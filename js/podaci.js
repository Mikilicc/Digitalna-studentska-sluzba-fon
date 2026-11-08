/* =====================================================================
   PODACI – sve što menjaš: login, student, šalteri, usluge, polja, fajlovi.
   Ovaj fajl koriste sve stranice.
   ===================================================================== */

// Login podaci za demo
const DEMO_NALOG = { korisnicko: 'demo', sifra: 'demo123' };

// Podaci prijavljenog studenta (prikazuju se u zaglavlju i auto-popunjavaju polja)
const STUDENT = {
  ime: 'Marko Marković',
  indeks: '2023/0392',
  email: 'marko.markovic@student.edu.rs',
  telefon: '064 123 4567',
  fakultet: 'Fakultet organizacionih nauka',
  smer: 'ISIT',
  godina: 'II godina · samofinansiranje',
  espb: 96,          // koristi se u potvrdi o ESPB bodovima
  prosek: '8,45',    // koristi se u potvrdi o proseku
  polozeno: 16,      // broj položenih ispita
};

// Link ka sajtu Ministarstva prosvete (zameni tačnim linkovima do obrazaca)
const LINK_MINISTARSTVO = 'https://prosveta.gov.rs';

// Koraci za usluge gde student preuzima obrasce, overava ih i onda otprema
function koraciMinistarstvo(obrasci) {
  return [
    { naslov: 'Preuzmite obrasce', opis: 'Obrasce preuzmite sa sajta Ministarstva prosvete.', dokumenti: obrasci },
    { naslov: 'Popunite obrasce', opis: 'Odštampajte obrasce, čitko ih popunite i potpišite.' },
    { naslov: 'Overite ih u studentskoj službi', opis: 'Popunjene obrasce lično donesite na šalter radi overe. Termin možete zakazati ovde.', overa: true },
    { naslov: 'Otpremite overena dokumenta', opis: 'Skenirajte ili fotografišite overena dokumenta i otpremite ih u formi ispod.' },
  ];
}

const MOLBA_ESPB = `Poštovani,

molim da mi se izda potvrda o broju ostvarenih ESPB bodova i proseku ocena tokom studija.

Ime i prezime: {ime}
Broj indeksa: {indeks}
Studijski program: {smer}

Potvrda mi je potrebna u svrhu: ____________________

S poštovanjem,
{ime}`;

// Boje za šaltere (pune Tailwind klase da bi CDN sigurno video klase)
const TEME = {
  indigo:  { grad: 'from-indigo-600 to-indigo-700',     soft: 'bg-indigo-50', text: 'text-indigo-600', border: 'hover:border-amber-400' },
  emerald: { grad: 'from-[#1d4a80] to-[#163a66]',       soft: 'bg-sky-50',    text: 'text-[#1d4a80]',  border: 'hover:border-amber-400' },
  amber:   { grad: 'from-amber-400 to-amber-500',       soft: 'bg-amber-50',  text: 'text-amber-600',  border: 'hover:border-amber-400' },
};

/*
  ŠALTERI
  Svaki šalter ima listu usluga. Svaka usluga ima:
   - polja:   [{ name, label, type, required, options, placeholder, full, auto, hint, min, max }]
              type: text | email | tel | number | date | select | textarea
              auto: ključ iz STUDENT objekta (polje se automatski popuni i zaključa)
              full: true -> polje zauzima ceo red
   - fajlovi: [{ name, label, accept, required, multiple }]
   - obaveznaOvera: 'tekst' -> prikazuje se CRVENIM slovima (dokument mora lično da se overi)
   - overaSalter: 'id šaltera' -> ako se overa radi na DRUGOM šalteru (npr. 'dokumenta' = Šalter 2)
   - koraci[].tabela: { kolone: [...], redovi: [[...], ...] } -> tabela u koraku (npr. cenovnik rata)
   - polje.uplate: { 'opcija': { iznos, svrha } } -> izbor u polju menja iznos i svrhu na uplatnici
   Takse su po cenovniku FON-a za 2026/27: https://oas.fon.bg.ac.rs/cenovnik/
*/
const SALTERI = [
  {
    id: 'dom',
    broj: 1,
    naziv: 'Studentski dom',
    opis: 'Prijava za smeštaj u dom i studentske stipendije.',
    ikona: 'home',
    tema: 'indigo',
    naRedu: 'A-041',
    cekanje: 8,
    sluzbenik: 'Jelena Petrović',
    lokacija: 'Prizemlje, salter 1',
    telefon: '381 11 3950 809',
    usluge: [
      {
        id: 'prijava-dom',
        naziv: 'Prijava za smeštaj u dom',
        opis: 'Konkurs za useljenje u studentski dom za narednu akademsku godinu.',
        rok: '10 radnih dana',
        taksa: 'Bez naknade',   // FON ne naplaćuje (smeštaj vodi Studentski centar)
        polja: [
          { name: 'ime', label: 'Ime i prezime', type: 'text', auto: 'ime' },
          { name: 'indeks', label: 'Broj indeksa', type: 'text', auto: 'indeks' },
          { name: 'telefon', label: 'Telefon', type: 'tel', required: true, auto: 'telefon' },
          { name: 'napomena', label: 'Napomena', type: 'textarea', full: true, placeholder: 'Dodatne informacije (opciono)' },
        ],
        fajlovi: [
          { name: 'uverenje', label: 'Uverenje o upisu', accept: '.pdf,.jpg,.png', required: true },
          { name: 'primanja', label: 'Potvrda o primanjima domaćinstva', accept: '.pdf,.jpg,.png', required: true },
        
        ],
      },
      {
        id: 'stipendija',
        naziv: 'Studentska stipendija',
        overaSalter: 'dokumenta',   // overa obrazaca se radi na Šalteru 2
        obaveznaOvera: 'Obrasce za stipendiju overavate na Šalteru 2 – Upis i dokumenta (Prizemlje, salter 2), a ne na ovom šalteru.',
        opis: 'Obrasci sa sajta ministarstva, overa na šalteru, pa otpremanje.',
        rok: 'Po konkursu',
        taksa: 'Bez naknade',   // FON ne naplaćuje (konkurs ministarstva)
        overa: true,
        koraci: koraciMinistarstvo([
          { naziv: 'Prijava za stipendiju', link: LINK_MINISTARSTVO },
          { naziv: 'Izjava o članovima domaćinstva', link: LINK_MINISTARSTVO },
        ]),
        obrada: { pocetni: 'Na proveri', status: 'Prosleđeno ministarstvu', ms: 10000 },
        polja: [
          { name: 'ime', label: 'Ime i prezime', type: 'text', auto: 'ime' },
          { name: 'indeks', label: 'Broj indeksa', type: 'text', auto: 'indeks' },
          { name: 'jmbg', label: 'JMBG', type: 'text', required: true, placeholder: '13 cifara' },
          { name: 'vrstaStipendije', label: 'Vrsta stipendije', type: 'select', required: true, options: ['Republička stipendija', 'Stipendija za izuzetno nadarene', 'Stipendija za studente sa invaliditetom'] },
          { name: 'prosek', label: 'Prosečna ocena', type: 'number', required: true, min: 6, max: 10, placeholder: 'npr. 8.45' },
          { name: 'espb', label: 'Ostvareno ESPB u prethodnoj godini', type: 'number', required: true, min: 0, max: 120 },
        ],
        fajlovi: [
          { name: 'prijava', label: 'Overena prijava za stipendiju', accept: '.pdf,.jpg,.png', required: true },
          { name: 'izjavaDomacinstvo', label: 'Overena izjava o članovima domaćinstva', accept: '.pdf,.jpg,.png', required: true },
          { name: 'uverenjeIspiti', label: 'Uverenje o položenim ispitima', accept: '.pdf,.jpg,.png', required: true },
          { name: 'licna', label: 'Fotokopija lične karte', accept: '.pdf,.jpg,.png', required: true },
        ],
        potvrde: ['Potvrđujem da su otpremljeni obrasci prethodno overeni u studentskoj službi.'],
      },
    //   {
    //     id: 'produzenje-dom',
    //     naziv: 'Produženje boravka',
    //     opis: 'Produžite ugovor o smeštaju za naredni semestar.',
    //     rok: '5 radnih dana',
    //     taksa: 'Besplatno',
    //     polja: [
    //       { name: 'ime', label: 'Ime i prezime', type: 'text', auto: 'ime' },
    //       { name: 'indeks', label: 'Broj indeksa', type: 'text', auto: 'indeks' },
    //       { name: 'trenutniDom', label: 'Trenutni dom', type: 'select', required: true, options: ['Dom 1 – Centar', 'Dom 2 – Kampus', 'Dom 3 – Novi grad'] },
    //       { name: 'brojSobe', label: 'Broj sobe', type: 'text', required: true, placeholder: 'npr. 214' },
    //       { name: 'period', label: 'Period produženja', type: 'select', required: true, options: ['Letnji semestar', 'Cela akademska godina'], full: true },
    //     ],
    //     fajlovi: [
    //       { name: 'overa', label: 'Dokaz o overenom semestru', accept: '.pdf,.jpg,.png', required: true },
    //     ],
    //   },
    //   {
    //     id: 'promena-sobe',
    //     naziv: 'Zahtev za promenu sobe',
    //     opis: 'Prelazak u drugu sobu ili drugi dom.',
    //     rok: '7 radnih dana',
    //     taksa: 'Besplatno',
    //     polja: [
    //       { name: 'ime', label: 'Ime i prezime', type: 'text', auto: 'ime' },
    //       { name: 'indeks', label: 'Broj indeksa', type: 'text', auto: 'indeks' },
    //       { name: 'trenutnaSoba', label: 'Trenutna soba', type: 'text', required: true, placeholder: 'npr. Dom 2, soba 105' },
    //       { name: 'zeljenaSoba', label: 'Željena soba / dom', type: 'text', required: true, placeholder: 'npr. Dom 1, soba 310' },
    //       { name: 'razlog', label: 'Razlog promene', type: 'textarea', required: true, full: true, placeholder: 'Ukratko obrazložite zahtev' },
    //     ],
    //     fajlovi: [
    //       { name: 'prilozi', label: 'Dodatni dokumenti', accept: '.pdf,.jpg,.png', multiple: true },
    //     ],
    //   },
    ],
  },

  {
    id: 'dokumenta',
    broj: 2,
    naziv: 'Upis i dokumenta',
    opis: 'Uverenja, potvrde o ESPB i proseku, overa semestra.',
    ikona: 'document',
    tema: 'emerald',
    naRedu: 'B-017',
    cekanje: 12,
    sluzbenik: 'Milan Jovanović',
    lokacija: 'Prizemlje, salter 2',
    telefon: '+381 11 3950 811',
    usluge: [
      {
        id: 'uverenje-status',
        naziv: 'Uverenje o statusu studenta',
        opis: 'Potvrda da ste redovan student (za osiguranje, stipendiju, dodatak...).',
        rok: '2 radna dana',
        taksa: 'Bez naknade',   // cenovnik FON, stavka 16: standardna uverenja o statusu
        obaveznaOvera: 'Uverenje mora biti overeno pečatom na šalteru Studentske službe. Neovereno uverenje nije važeće.',
        polja: [
          { name: 'ime', label: 'Ime i prezime', type: 'text', auto: 'ime' },
          { name: 'indeks', label: 'Broj indeksa', type: 'text', auto: 'indeks' },
          { name: 'svrha', label: 'Svrha izdavanja', type: 'select', required: true, options: ['Zdravstveno osiguranje', 'Dečiji dodatak', 'Stipendija', 'Studentski kredit', 'Ostalo'], hint: 'Za nestandardne svrhe („Ostalo“) taksa je 3.000,00 RSD.' },
          { name: 'primerci', label: 'Broj primeraka', type: 'number', required: true, min: 1, max: 5, placeholder: '1' },
          { name: 'jezik', label: 'Jezik', type: 'select', required: true, options: ['Srpski', 'Engleski'] },
          { name: 'preuzimanje', label: 'Način preuzimanja', type: 'select', required: true, options: ['Lično na šalteru', 'Elektronski (PDF na email)'] },
        ],
        fajlovi: [],   // besplatno – nema uplatnice
      },
      {
        id: 'potvrda-espb',
        naziv: 'Potvrda o ESPB bodovima i proseku',
        opis: 'Napišite molbu, uplatite taksu i preuzmite potvrdu online.',
        rok: '1–2 radna dana',
        taksa: '1.000 RSD',   // cenovnik FON, stavka 11: uverenje o položenim ispitima (aktivni student)
        // Podaci za uplatnicu – {indeksBroj} se menja brojem indeksa
        uplata: {
          primalac: 'Fakultet organizacionih nauka',
          racun: '840-0000032902845-54',   // FON – račun za uplate studenata
          model: '97',
          poziv: '{indeksBroj}',
          iznos: '1.000,00 RSD',
          svrha: 'Taksa – potvrda o ESPB i proseku',
        },
        koraci: [
          { naslov: 'Napišite molbu', opis: 'Molba je već pripremljena u formi ispod. Proverite je i dopunite.' },
          { naslov: 'Uplatite taksu', opis: 'Uplatite taksu po podacima ispod i sačuvajte potvrdu o uplati.', uplata: true },
          { naslov: 'Pošaljite zahtev', opis: 'Priložite potvrdu o uplati i pošaljite zahtev.' },
          { naslov: 'Preuzmite potvrdu', opis: 'Kada zahtev bude obrađen, potvrdu preuzimate u „Moji zahtevi“.' },
        ],
        // Simulacija obrade: posle ms milisekundi status prelazi u 'status' i potvrda je spremna
        obrada: { pocetni: 'Na obradi', status: 'Spremno za preuzimanje', ms: 8000, potvrda: true },
        polja: [
          { name: 'ime', label: 'Ime i prezime', type: 'text', auto: 'ime' },
          { name: 'indeks', label: 'Broj indeksa', type: 'text', auto: 'indeks' },
          { name: 'vrsta', label: 'Šta potvrda treba da sadrži', type: 'select', required: true, options: ['ESPB bodovi i prosečna ocena', 'Samo ESPB bodovi', 'Samo prosečna ocena'] },
          { name: 'period', label: 'Period', type: 'select', required: true, options: ['Tokom celokupnog školovanja', 'Za tekuću akademsku godinu'] },
          { name: 'svrha', label: 'Svrha', type: 'text', required: true, full: true, placeholder: 'npr. konkurs za stipendiju, zaposlenje...' },
          { name: 'molba', label: 'Molba', type: 'textarea', required: true, full: true, rows: 12, default: MOLBA_ESPB },
        ],
        fajlovi: [
          { name: 'uplata', label: 'Potvrda o uplati takse', accept: '.pdf,.jpg,.png', required: true },
          { name: 'molbaPotpisana', label: 'Potpisana molba (sken)', accept: '.pdf,.jpg,.png' },
        ],
      },
      {
        id: 'overa-semestra',
        naziv: 'Overa semestra',
        opis: 'Overa završenog i upis narednog semestra.',
        rok: '3 radna dana',
        taksa: 'Bez naknade',   // u cenovniku FON-a nema posebne stavke za overu semestra
        obaveznaOvera: 'Semestar se overava lično na šalteru Studentske službe – donesite indeks na overu.',
        polja: [
          { name: 'ime', label: 'Ime i prezime', type: 'text', auto: 'ime' },
          { name: 'indeks', label: 'Broj indeksa', type: 'text', auto: 'indeks' },
          { name: 'semestar', label: 'Semestar koji overavate', type: 'select', required: true, options: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'] },
          { name: 'finansiranje', label: 'Način finansiranja', type: 'select', required: true, options: ['Budžet', 'Samofinansiranje'], hint: 'Samofinansiranje: upis godine 180.000,00 RSD. Kasni upis: 7.000,00 RSD.' },
        ],
        fajlovi: [
          { name: 'indeksSken', label: 'Sken indeksa', accept: '.pdf,.jpg,.png', required: true },
          { name: 'sv20', label: 'Obrazac ŠV-20', accept: '.pdf', required: true },
        ],
      },
      
    ],
  },

  {
    id: 'finansije',
    broj: 3,
    naziv: 'Finansije i školarina',
    opis: 'Studentski krediti, naknadna prijava ispita, školarina i povraćaj novca.',
    ikona: 'card',
    tema: 'amber',
    naRedu: 'C-009',
    cekanje: 5,
    sluzbenik: 'Ana Nikolić',
    lokacija: 'Prvi sprat, kancelarija 12',
    telefon: '+381 11 3950 813',
    usluge: [
      {
        id: 'kredit',
        naziv: 'Studentski kredit',
        opis: 'Obrasci sa sajta ministarstva, overa na šalteru, pa otpremanje.',
        rok: 'Po konkursu',
        taksa: 'Bez naknade',   // FON ne naplaćuje (konkurs ministarstva)
        overa: true,
        koraci: koraciMinistarstvo([
          { naziv: 'Prijava za studentski kredit', link: LINK_MINISTARSTVO },
          { naziv: 'Izjava o članovima domaćinstva', link: LINK_MINISTARSTVO },
          { naziv: 'Izjava žiranta', link: LINK_MINISTARSTVO },
        ]),
        obrada: { pocetni: 'Na proveri', status: 'Prosleđeno ministarstvu', ms: 10000 },
        polja: [
          { name: 'ime', label: 'Ime i prezime', type: 'text', auto: 'ime' },
          { name: 'indeks', label: 'Broj indeksa', type: 'text', auto: 'indeks' },
          { name: 'jmbg', label: 'JMBG', type: 'text', required: true, placeholder: '13 cifara' },
          { name: 'telefon', label: 'Telefon', type: 'tel', required: true, auto: 'telefon' },
          { name: 'godinaStudija', label: 'Godina studija', type: 'select', required: true, options: ['I', 'II', 'III', 'IV', 'Master', 'Doktorske'] },
          { name: 'clanovi', label: 'Broj članova domaćinstva', type: 'number', required: true, min: 1, max: 15 },
        ],
        fajlovi: [
          { name: 'prijava', label: 'Overena prijava za kredit', accept: '.pdf,.jpg,.png', required: true },
          { name: 'izjavaDomacinstvo', label: 'Overena izjava o članovima domaćinstva', accept: '.pdf,.jpg,.png', required: true },
          { name: 'zirant', label: 'Izjava žiranta', accept: '.pdf,.jpg,.png', required: true },
          { name: 'licna', label: 'Fotokopija lične karte', accept: '.pdf,.jpg,.png', required: true },
        ],
        potvrde: ['Potvrđujem da su otpremljeni obrasci prethodno overeni u studentskoj službi.'],
      },
      {
        id: 'naknadna-prijava',
        naziv: 'Naknadna prijava ispita',
        opis: 'Prijava ispita posle isteka redovnog roka za prijavu.',
        rok: '1–2 radna dana',
        taksa: '2.000 RSD',   // cenovnik FON, stavka 7: naknadna prijava ispita/kolokvijuma
        // Podaci za uplatnicu – {indeksBroj} se menja brojem indeksa
        uplata: {
          primalac: 'Fakultet organizacionih nauka',
          racun: '840-0000032902845-54',   // FON – račun za uplate studenata
          model: '97',
          poziv: '{indeksBroj}',
          iznos: '2.000,00 RSD',
          svrha: 'Naknadna prijava ispita',
        },
        koraci: [
          { naslov: 'Uplatite taksu', opis: 'Naknadna prijava košta 2.000,00 RSD. Ako je ovo treća ili svaka sledeća prijava istog ispita, uplaćujete još 1.700,00 RSD.', uplata: true },
          { naslov: 'Popunite prijavu', opis: 'Izaberite predmet i ispitni rok i priložite potvrdu o uplati.' },
          { naslov: 'Pošaljite zahtev', opis: 'Status prijave pratite u „Moji zahtevi“.' },
        ],
        obrada: { pocetni: 'Na obradi', status: 'Odobreno', ms: 8000 },
        polja: [
          { name: 'ime', label: 'Ime i prezime', type: 'text', auto: 'ime' },
          { name: 'indeks', label: 'Broj indeksa', type: 'text', auto: 'indeks' },
          { name: 'predmet', label: 'Predmet', type: 'text', required: true, placeholder: 'npr. Programiranje 1' },
          { name: 'ispitniRok', label: 'Ispitni rok', type: 'select', required: true, options: ['Januarski', 'Februarski', 'Aprilski', 'Junski', 'Julski', 'Septembarski', 'Oktobarski'] },
          { name: 'brojPrijave', label: 'Koja je ovo prijava ispita?', type: 'select', required: true, options: ['Prva ili druga prijava – samo 2.000,00 RSD', 'Treća i svaka sledeća – 2.000,00 + 1.700,00 RSD'], full: true, hint: 'Prve dve prijave svakog ispita su bez naknade; od treće se plaća 1.700,00 RSD po ispitu.' },
          { name: 'razlog', label: 'Razlog naknadne prijave', type: 'textarea', full: true, placeholder: 'Opciono – zašto ispit niste prijavili u redovnom roku' },
        ],
        fajlovi: [
          { name: 'uplata', label: 'Potvrda o uplati', accept: '.pdf,.jpg,.png', required: true },
        ],
      },
      {
        id: 'uplata-skolarine',
        naziv: 'Prijava uplate školarine',
        opis: 'Školarina 180.000 RSD – jednokratno ili u 5 rata. Evidentirajte uplatu.',
        rok: '2 radna dana',
        taksa: '180.000 RSD',   // cenovnik FON 2026/27, stavka 1: upis godine – samofinansirajući
        // Podaci za uplatnicu – iznos i svrha se menjaju kad student izabere ratu (polje "rata")
        uplata: {
          primalac: 'Fakultet organizacionih nauka',
          racun: '840-0000032902845-54',   // FON – račun za uplate studenata
          model: '97',
          poziv: '{indeksBroj}',            // pravi poziv na broj student vidi na eStudentu
          iznos: '52.000,00 RSD',
          svrha: 'Školarina 2026/27 – I rata',
        },
        koraci: [
          {
            naslov: 'Izaberite način plaćanja',
            opis: 'Školarina za 2026/27. iznosi 180.000,00 RSD. Možete je platiti odjednom ili u 5 rata.',
            // Cenovnik FON: I rata 52.000 pri upisu; II–V rata po 25% preostalih 128.000 RSD
            tabela: {
              kolone: ['Rata', 'Iznos', 'Rok uplate'],
              redovi: [
                ['Jednokratno', '180.000,00 RSD', 'Prilikom upisa'],
                ['I rata', '52.000,00 RSD', 'Prilikom upisa'],
                ['II rata', '32.000,00 RSD', 'Do 15.12.2026. (brucoši do 15.11.2026.)'],
                ['III rata', '32.000,00 RSD', 'Do 15.01.2027.'],
                ['IV rata', '32.000,00 RSD', 'Do 15.03.2027.'],
                ['V rata', '32.000,00 RSD', 'Do 15.05.2027.'],
              ],
            },
            napomena: 'II–V rata iznose po 25% preostalog iznosa posle I rate. Pri plaćanju na rate iznos može biti usklađen sa rastom troškova (podaci RZS).',
          },
          { naslov: 'Uplatite', opis: 'Iznos i svrha na uplatnici menjaju se prema rati koju izaberete u formi ispod.', uplata: true },
          { naslov: 'Priložite potvrdu', opis: 'Otpremite potvrdu o uplati i pošaljite prijavu.' },
        ],
        polja: [
          { name: 'ime', label: 'Ime i prezime', type: 'text', auto: 'ime' },
          { name: 'indeks', label: 'Broj indeksa', type: 'text', auto: 'indeks' },
          {
            name: 'rata', label: 'Šta uplaćujete', type: 'select', required: true,
            uplate: {
              'Cela školarina (jednokratno) – 180.000,00 RSD': { iznos: '180.000,00 RSD', svrha: 'Školarina 2026/27 – jednokratno' },
              'I rata – 52.000,00 RSD':  { iznos: '52.000,00 RSD', svrha: 'Školarina 2026/27 – I rata' },
              'II rata – 32.000,00 RSD': { iznos: '32.000,00 RSD', svrha: 'Školarina 2026/27 – II rata' },
              'III rata – 32.000,00 RSD': { iznos: '32.000,00 RSD', svrha: 'Školarina 2026/27 – III rata' },
              'IV rata – 32.000,00 RSD': { iznos: '32.000,00 RSD', svrha: 'Školarina 2026/27 – IV rata' },
              'V rata – 32.000,00 RSD':  { iznos: '32.000,00 RSD', svrha: 'Školarina 2026/27 – V rata' },
            },
            hint: 'Iznos i svrha na uplatnici iznad se menjaju prema izboru.',
          },
          { name: 'datum', label: 'Datum uplate', type: 'date', required: true },
        ],
        fajlovi: [
          { name: 'potvrda', label: 'Potvrda o uplati', accept: '.pdf,.jpg,.png', required: true },
        ],
      },
      {
        id: 'povracaj',
        naziv: 'Povraćaj novca',
        opis: 'Vraćanje više uplaćenog ili pogrešno uplaćenog iznosa.',
        rok: '15 radnih dana',
        taksa: 'Bez naknade',
        polja: [
          { name: 'ime', label: 'Ime i prezime', type: 'text', auto: 'ime' },
          { name: 'indeks', label: 'Broj indeksa', type: 'text', auto: 'indeks' },
          { name: 'iznos', label: 'Iznos za povraćaj (RSD)', type: 'number', required: true, min: 1 },
          { name: 'banka', label: 'Banka', type: 'text', required: true, placeholder: 'Naziv banke' },
          { name: 'racun', label: 'Broj tekućeg računa', type: 'text', required: true, full: true, placeholder: '160-0000000000000-00' },
          { name: 'razlog', label: 'Razlog', type: 'textarea', required: true, full: true },
        ],
        fajlovi: [
          { name: 'uplata', label: 'Dokaz o uplati', accept: '.pdf,.jpg,.png', required: true },
        ],
      },
    ],
  },
];

// Primer zahteva koji se vide u "Moji zahtevi" na početku
const POCETNI_ZAHTEVI = [
  { broj: 'SS-2026-1004', usluga: 'Potvrda o ESPB bodovima i proseku', salter: 2, datum: '06.11.2026.', status: 'Spremno za preuzimanje', potvrda: true,
    podaci: { vrsta: 'ESPB bodovi i prosečna ocena', period: 'Tokom celokupnog školovanja', svrha: 'Konkurs za stipendiju' } },
  { broj: 'SS-2026-0987', usluga: 'Prijava uplate školarine', salter: 3, datum: '05.11.2026.', status: 'Odobreno' },
  { broj: 'SS-2026-0912', usluga: 'Uverenje o statusu studenta', salter: 2, datum: '02.11.2026.', status: 'Završeno' },
];


