// ==== ADATOK: MATEMATIKA ====
// ==== ADATOK: Dinamikus betöltés (dev mode) ====
const MATEK_DATA = [];
const FIZIKA_DATA = [];
const INFORMATIKA_DATA = [];

async function loadData() {
  try {
    const [m, f, i] = await Promise.all([
      fetch('data/matek.json').then(r => r.json()),
      fetch('data/fizika.json').then(r => r.json()),
      fetch('data/informatika.json').then(r => r.json())
    ]);
    MATEK_DATA.push(...m);
    FIZIKA_DATA.push(...f);
    INFORMATIKA_DATA.push(...i);
  } catch(e) {
    console.warn('Adatfájlok nem elérhetők, üres adatok.', e);
  }
  init();
}
loadData();

// ==== ADATOK: FIZIKA, KÉMIA & BIOLÓGIA ====


// ==== VEZÉRLŐ LOGIKA ====



// ==== CORE (visszaállítva a gyökér index.html-ből): DOMAINS, DOM-ref-ek, segédfüggvények ====
const DOMAINS = {
  matek: {
    label: "Matematika",
    eyebrowText: "Szubjektív rangsor · matematika",
    titleHTML: "A <em class='title-gold'>legszebb</em> matematikai<br>egyenletek",
    subHTML: "A szépség közös mintája: minden tétel <b style=\"color:var(--paper)\">váratlan kapcsolatot</b> teremt két látszólag független terület között. Nem a számolás szép — a struktúra.",
    data: MATEK_DATA,
    categoryLabels: {
      analizis: "Analízis",
      topologia: "Topológia",
      szamelmelet: "Számelmélet",
      "logika-halmaz": "Logika & halmazelmélet",
      valoszinuseg: "Valószínűség",
      "kombinatorika-geometria": "Kombinatorika & geometria",
      "szamitastudomany-mernoki": "Számítástudomány & mérnöki"
    },
    categoryOrder: ["analizis","topologia","szamelmelet","logika-halmaz","valoszinuseg","kombinatorika-geometria","szamitastudomany-mernoki"],
    categoryColors: {
      analizis: "#e07a5f",
      topologia: "#81b29a",
      szamelmelet: "#f2cc8f",
      "logika-halmaz": "#5b8dd9",
      valoszinuseg: "#c86bfa",
      "kombinatorika-geometria": "#4fb8c4",
      "szamitastudomany-mernoki": "#e8a0bf"
    },
    footerNames: "Euler \u00b7 Fourier \u00b7 Ramanujan \u00b7 Gauss \u00b7 Riemann \u00b7 Cauchy \u00b7 Pitagorasz \u00b7 Stirling \u00b7 Basel \u00b7 Gauss\u2013Bonnet \u00b7 Euler-szorzat \u00b7 Stokes \u00b7 Fermat\u2013Wiles \u00b7 G\u00f6del \u00b7 Bayes \u00b7 Liouville \u00b7 Cayley \u00b7 Borsuk\u2013Ulam \u00b7 S\u00fcndiszn\u00f3 \u00b7 Cantor \u00b7 Aranymetsz\u00e9s \u00b7 Banach \u00b7 Brouwer \u00b7 Pr\u00edmsz\u00e1mt\u00e9tel \u00b7 CHT \u00b7 Pell \u00b7 Sylvester\u2013Gallai \u00b7 N\u00e9gysz\u00edn-t\u00e9tel \u00b7 Jordan \u00b7 Collatz \u00b7 Goldbach \u00b7 P vs NP \u00b7 Hilbert-sz\u00e1lloda \u00b7 Monty Hall \u00b7 Sz\u00fclet\u00e9snapi paradoxon \u00b7 Bell/CHSH \u00b7 Lagrange-n\u00e9gyzett\u00e9tel \u00b7 Erd\u0151s\u2013Ko\u2013Rado \u00b7 Banach\u2013Tarski \u00b7 Arrow \u00b7 Poincar\u00e9 \u00b7 Euler-poli\u00e9der \u00b7 Ramsey \u00b7 Szemer\u00e9di \u00b7 Green\u2013Tao \u00b7 Kontinuumhipot\u00e9zis \u00b7 Algebra alapt\u00e9tele \u00b7 Catalan\u2013Mihailescu \u00b7 Kalkulus alapt\u00e9tele \u00b7 Pi transzcendenci\u00e1ja \u00b7 Happy Ending \u00b7 Nash-egyenl\u0151s\u00e9g \u00b7 Kepler-sejt\u00e9s \u00b7 Pick-t\u00e9tel \u00b7 Goodstein-t\u00e9tel \u00b7 Riemann-lek\u00e9pez\u00e9s \u00b7 Korl\u00e1tos pr\u00edmr\u00e9s \u00b7 Cook\u2013Levin \u00b7 Meg\u00e1ll\u00e1si probl\u00e9ma \u00b7 Nagy sz\u00e1mok t\u00f6rv\u00e9nye \u00b7 Rogers\u2013Ramanujan \u00b7 Hardy\u2013Ramanujan \u00b7 Ramanujan \u03c4-f\u00fcggv\u00e9ny \u00b7 Chudnovsky \u00b7 Lax\u2013Milgram \u00b7 Nyquist\u2013Shannon \u00b7 Kalman-sz\u0171r\u0151 \u00b7 Wilson-tétel \u00b7 Brun-tétel \u00b7 Bertrand-posztulátum \u00b7 Hall-tétel \u00b7 Erdős\u2013Szekeres \u00b7 Helly-tétel \u00b7 Sperner-lemma \u00b7 Szimplex-módszer \u00b7 Perron\u2013Frobenius \u00b7 Gauss\u2013Markov \u00b7 Cauchy\u2013Schwarz \u00b7 Weierstrass-approximáció \u00b7 Picard\u2013Lindelöf \u00b7 Csebisev \u00b7 Kolmogorov 0-1 \u00b7 Markov-ergodikus \u00b7 Löwenheim\u2013Skolem \u00b7 Tarski \u00b7 Kruskal-fatétel \u00b7 Radon-tétel \u00b7 Nielsen\u2013Schreier \u00b7 Jones-polinom \u00b7 Church\u2013Turing \u00b7 Shannon-kapacitás \u00b7 FFT \u00b7 Lebesgue-konvergencia \u00b7 Fubini-t\u00e9tel \u00b7 Arzel\u00e0\u2013Ascoli \u00b7 Poisson-folyamat \u00b7 It\u014d-formula \u00b7 Erd\u0151s\u2013R\u00e9nyi \u00b7 Kolmogorov-komplexit\u00e1s \u00b7 L\u00f6b-t\u00e9tel \u00b7 Robertson\u2013Seymour \u00b7 Tur\u00e1n-t\u00e9tel \u00b7 Poincar\u00e9\u2013Bendixson \u00b7 Whitney-be\u00e1gyaz\u00e1s \u00b7 Lefschetz-fixpont \u00b7 Dijkstra \u00b7 Karmarkar \u00b7 Wald-azonoss\u00e1g \u00b7 Berry\u2013Esseen \u00b7 Banach\u2013Steinhaus \u00b7 Sobolev-be\u00e1gyaz\u00e1s \u00b7 Hopf-fibr\u00e1ci\u00f3 \u00b7 Van Kampen \u00b7 De Bruijn\u2013Erd\u0151s \u00b7 Borsuk-sejt\u00e9s \u00b7 Amdahl-t\u00f6rv\u00e9ny \u00b7 RSA \u00b7 Hessian-D-teszt \u00b7 Green-tétel \u00b7 Gauss-divergenciatétel \u00b7 Cauchy\u2013Riemann \u00b7 Wallis-szorzat \u00b7 Mittag-Leffler \u00b7 Mandelbrot-halmaz \u00b7 Zorn-lemma \u00b7 Gödel II. \u00b7 Kompaktsági tétel \u00b7 Kolmogorov-axiómák \u00b7 Borel\u2013Cantelli \u00b7 Nagy eltérések \u00b7 Dilworth-tétel \u00b7 Menger-tétel \u00b7 Catalan-számok \u00b7 Neumann-minimax \u00b7 Poincaré\u2013Hopf \u00b7 Jordan\u2013Brouwer \u00b7 Theorema Egregium \u00b7 Königsberg-hidak \u00b7 Skatulya-elv \u00b7 Valószínűségi módszer \u00b7 Markov-egyenlőtlenség \u00b7 Jensen-egyenlőtlenség \u00b7 Kruskal-algoritmus \u00b7 Huffman-kódolás \u00b7 Radon-transzformáció \u00b7 Lorenz-attraktor \u00b7 Newton\u2013Raphson \u00b7 Monte Carlo \u00b7 Bézier-görbék \u00b7 Backpropagation \u00b7 Diffie\u2013Hellman \u00b7 Hamming-kód \u00b7 Galois-elmélet \u00b7 Runge\u2013Kutta \u00b7 Logisztikus leképezés \u00b7 Gradiensmódszer \u00b7 Bayes-hálózatok \u00b7 DCT-képtömörítés \u00b7 LP-dualitás",
    ghostFormulas: ["e^{i\\pi}+1=0", "\\zeta(s)=\\sum_{n=1}^{\\infty}\\frac{1}{n^s}", "\\int_{-\\infty}^{\\infty} e^{-x^2}dx=\\sqrt{\\pi}", "\\forall\\varepsilon>0\\,\\exists\\delta", "\\aleph_0 < \\mathfrak{c}", "\\nabla^2\\phi=0"]
  },
  fizika: {
    label: "Fizika · Kémia · Biológia",
    eyebrowText: "Szubjektív rangsor · fizika, kémia & biológia",
    titleHTML: "A világ <em class='title-gold'>legszebb</em><br>fizikai egyenletei",
    subHTML: "Kevés szóval sok valóság. Az igazi szépség ott van, ahol néhány szimbólum az univerzum egy teljes szeletét leírja — és még <b style=\"color:var(--paper)\">megjósol olyat is</b>, amit senki nem mért még.",
    data: FIZIKA_DATA,
    categoryLabels: {
      klasszikus: "Klasszikus mechanika",
      kvantum: "Kvantummechanika",
      relativitas: "Relativitás",
      termodinamika: "Termodinamika & infó",
      reszecskefizika: "Részecskefizika",
      "kemia-biologia": "Kémia & biológia",
      "mernoki-alkalmazasok": "Mérnöki alkalmazások"
    },
    categoryOrder: ["klasszikus","kvantum","relativitas","reszecskefizika","termodinamika","kemia-biologia","mernoki-alkalmazasok"],
    categoryColors: {
      klasszikus: "#e07a5f",
      kvantum: "#81b29a",
      relativitas: "#f2cc8f",
      reszecskefizika: "#5b8dd9",
      termodinamika: "#c86bfa",
      "kemia-biologia": "#4fb8c4",
      "mernoki-alkalmazasok": "#e8a0bf"
    },
    footerNames: "Maxwell \u00b7 Noether \u00b7 Schr\u00f6dinger \u00b7 Boltzmann \u00b7 Feynman \u00b7 Dirac \u00b7 Bekenstein\u2013Hawking \u00b7 Euler\u2013Lagrange \u00b7 E=mc\u00b2 \u00b7 Yang\u2013Mills \u00b7 Heisenberg \u00b7 Shannon \u00b7 Navier\u2013Stokes \u00b7 Planck \u00b7 Lorentz \u00b7 Hawking-h\u0151m\u00e9rs\u00e9klet \u00b7 Aszimptotikus szabads\u00e1g \u00b7 Peri\u00f3dusos rendszer \u00b7 Kepler \u00b7 Hamilton \u00b7 Lotka\u2013Volterra \u00b7 Hardy\u2013Weinberg \u00b7 Snellius\u2013Descartes \u00b7 Viri\u00e1lt\u00e9tel \u00b7 Hodgkin\u2013Huxley \u00b7 Arrhenius \u00b7 Le Chatelier \u00b7 Bell/CHSH \u00b7 Carnot \u00b7 Higgs \u00b7 Casimir \u00b7 Michaelis\u2013Menten \u00b7 Az id\u0151 nyila \u00b7 Kvarkbez\u00e1r\u00e1s \u00b7 Holografikus elv \u00b7 BCS-elm\u00e9let \u00b7 Drake-egyenlet \u00b7 Fick-t\u00f6rv\u00e9ny \u00b7 Einstein-mez\u0151egyenletek \u00b7 Faraday-indukci\u00f3 \u00b7 Wien-t\u00f6rv\u00e9ny \u00b7 Levinthal-paradoxon \u00b7 Doppler-effektus \u00b7 Bernoulli-egyenlet \u00b7 ATP-szint\u00e1z \u00b7 Homokiralit\u00e1s \u00b7 Hubble\u2013Lema\u00eetre \u00b7 Lorentz-er\u0151 \u00b7 Avogadro-\u00e1lland\u00f3 \u00b7 Compton-effektus \u00b7 Van 't Hoff \u00b7 Pauli-elv \u00b7 Hull\u00e1megyenlet \u00b7 Reynolds-sz\u00e1m \u00b7 Seebeck-effektus \u00b7 Chandrasekhar-hat\u00e1r \u00b7 Bose\u2013Einstein-kondenz\u00e1ci\u00f3 \u00b7 CPT-t\u00e9tel \u00b7 Onsager-reciprocit\u00e1s \u00b7 Landauer-elv \u00b7 Euler-kihajl\u00e1s \u00b7 Saint-Venant \u00b7 Mohr-k\u00f6r \u00b7 Betti-t\u00e9tel \u00b7 Clausius\u2013Clapeyron \u00b7 Gibbs-energia \u00b7 Fermi\u2013Dirac \u00b7 Neutrínó-oszcilláció \u00b7 Gell-Mann\u2013Nishijima \u00b7 Schwarzschild-sugár \u00b7 Friedmann-egyenletek \u00b7 Euler\u2013Bernoulli \u00b7 Castigliano \u00b7 Buckingham π-tétel \u00b7 Alag\u00fathat\u00e1s \u00b7 No-cloning \u00b7 Josephson \u00b7 Meissner \u00b7 Nernst-t\u00e9tel \u00b7 Maxwell\u2013Boltzmann \u00b7 Stefan\u2013Boltzmann \u00b7 Cserenkov \u00b7 M\u00fcon g-2 \u00b7 Ekvivalenciaelv \u00b7 Kerr-metrika \u00b7 Gravit\u00e1ci\u00f3s hull\u00e1mok \u00b7 Timoshenko \u00b7 Navier (rugalmass\u00e1gtan) \u00b7 Rayleigh\u2013Ritz \u00b7 Hooke-t\u00f6rv\u00e9ny \u00b7 Darcy-t\u00f6rv\u00e9ny \u00b7 Terzaghi-konszolid\u00e1ci\u00f3 \u00b7 Coriolis-er\u0151 \u00b7 Foucault-inga \u00b7 Euler-forg\u00e1segyenletek \u00b7 Van der Waals \u00b7 Joule\u2013Thomson \u00b7 Fourier-h\u0151vezet\u00e9s \u00b7 Nernst-egyenlet \u00b7 CKM-m\u00e1trix \u00b7 Aharonov\u2013Bohm \u00b7 Penrose\u2013Hawking \u00b7 Shapiro-k\u00e9sleltet\u00e9s \u00b7 Penrose-folyamat \u00b7 Watson\u2013Crick \u00b7 Griffith-t\u00f6r\u00e9smechanika \u00b7 Coulomb-s\u00fars\u00fbrl\u00f3d\u00e1s \u00b7 Elektrogyenge egyes\u00edt\u00e9s \u00b7 Rutherford-sz\u00f3r\u00e1s \u00b7 Kvantum-teleport\u00e1ci\u00f3 \u00b7 D'Alembert-elv \u00b7 Lense\u2013Thirring \u00b7 Kirchhoff-sug\u00e1rz\u00e1s \u00b7 Kvark-gluon plazma \u00b7 Rüchardt-módszer \u00b7 Saha-egyenlet \u00b7 Eddington\u2013Dirac nagy szám \u00b7 Bőrhatás \u00b7 Lencsekészítő-egyenlet \u00b7 Liouville-egyenlet \u00b7 Ideális gáztörvény \u00b7 Newton-gravitáció \u00b7 De Broglie \u00b7 Ehrenfest-tétel \u00b7 Christoffel-szimbólumok \u00b7 Planck-hossz \u00b7 Young\u2013Laplace \u00b7 Paritássértés \u00b7 Antianyag/pozitron \u00b7 Neutrínó-detektálás \u00b7 Mendel-törvények \u00b7 Tömeghatás törvénye \u00b7 Henderson\u2013Hasselbalch \u00b7 Maxwell-démon \u00b7 Adiabatikus egyenlet \u00b7 Kármán-örvénysor \u00b7 Mohr\u2013Coulomb \u00b7 Bjorken-skálázás \u00b7 CP-sértés kaonokban \u00b7 Gravitációs lencsehatás \u00b7 Sötét energia \u00b7 Tolman\u2013Oppenheimer\u2013Volkoff \u00b7 Fáradásos törés \u00b7 Boussinesq-eloszlás \u00b7 Kepler-egyenlet \u00b7 Lamb-eltolódás \u00b7 Szuperfolyékonyság \u00b7 Fotoelektromos hatás \u00b7 Bohr-modell \u00b7 Ohm-törvény \u00b7 Kirchhoff-törvények \u00b7 Bragg-törvény \u00b7 NMR/MRI \u00b7 Stimulált emisszió \u00b7 Tranzisztor \u00b7 Haber\u2013Bosch \u00b7 PCR \u00b7 CRISPR\u2013Cas9 \u00b7 Fotoszintézis \u00b7 Citrátkör \u00b7 Ozmotikus nyomás \u00b7 Penicillin",
    ghostFormulas: ["\\nabla\\times\\vec{E}=-\\frac{\\partial \\vec{B}}{\\partial t}", "E=mc^2", "\\hat{H}\\psi=i\\hbar\\frac{\\partial\\psi}{\\partial t}", "S=k_B\\ln\\Omega", "F=ma", "ds^2=g_{\\mu\\nu}dx^\\mu dx^\\nu"]
  }  ,
  informatika: {
    label: "Informatika",
    eyebrowText: "Szubjektív rangsor · algoritmusok, kód, gépi ész",
    titleHTML: "A <em class='title-gold'>legszebb</em><br>informatikai tételek",
    subHTML: "Itt a szépség a <b style=\"color:var(--paper)\">struktúra és a korlát</b>: egy jó algoritmus nem erőlködik, hanem átlátja a problémát. A matek és a fizika után ez a harmadik nyelv, amivel a világot leírjuk.",
    data: INFORMATIKA_DATA,
    categoryLabels: {
      infoelmelet: "Információelmélet",
      "szamelmelet-it": "Számításelmélet",
      komplexitas: "Komplexitáselmélet",
      algoritmusok: "Algoritmusok",
      kripto: "Kriptográfia",
      ml: "Mesterséges intelligencia",
      halozatok: "Hálózatok & gráfok",
      elosztott: "Elosztott rendszerek",
      "kvantum-it": "Kvantumszámítás"
    },
    categoryOrder: ["infoelmelet","szamelmelet-it","komplexitas","algoritmusok","kripto","ml","halozatok","elosztott","kvantum-it"],
    categoryColors: {
      infoelmelet: "#5fe0a8",
      "szamelmelet-it": "#7d9bff",
      komplexitas: "#c08bff",
      algoritmusok: "#ffcf6b",
      kripto: "#ff8fb0",
      ml: "#6bd0ff",
      halozatok: "#9be36b",
      elosztott: "#ffa96b",
      "kvantum-it": "#b08cff"
    },
    footerNames: "Shannon \\u00b7 Turing \\u00b7 Dijkstra \\u00b7 RSA \\u00b7 A* \\u00b7 PageRank \\u00b7 Huffman \\u00b7 Bayes \\u00b7 Bloom \\u00b7 Diffie\\u2013Hellman \\u00b7 Merkle \\u00b7 Levenshtein \\u00b7 SGD \\u00b7 CNN \\u00b7 P vs NP \\u00b7 MapReduce \\u00b7 Kvantum-Fourier",
    ghostFormulas: ["H=-\\\\sum p_i\\\\log p_i", "f(n)=O(g(n))", "c=m^e\\\\bmod n", "PR(p_i)=\\\\frac{1-d}{N}+d\\\\sum\\\\frac{PR(p_j)}{L(p_j)}", "\\theta_{t+1}=\\\\theta_t-\\\\eta\\\\nabla\\\\mathcal{L}", "P(A\\\\mid B)=\\\\frac{P(B\\\\mid A)P(A)}{P(B)}"]
  }

};

const grid = document.getElementById("grid");
const deckView = document.getElementById("deckView");
const deckCard = document.getElementById("deckCard");
const deckTag = document.getElementById("deckTag");
const deckYear = document.getElementById("deckYear");
const deckName = document.getElementById("deckName");
const deckIllu = document.getElementById("deckIllu");
const deckFormula = document.getElementById("deckFormula");
const deckWhy = document.getElementById("deckWhy");
const deckFav = document.getElementById("deckFav");
const deckJump = document.getElementById("deckJump");
const deckPrev = document.getElementById("deckPrev");
const deckNext = document.getElementById("deckNext");
const deckRand = document.getElementById("deckRand");
const deckPos = document.getElementById("deckPos");
const deckTotal = document.getElementById("deckTotal");
let deckItems = [];
let deckIndex = 0;
const deckCats = document.getElementById("deckCats");
const deckSearch = document.getElementById("deckSearch");
const FAV_SVG = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.3l-5.4 3.2 1.4-6.1-4.7-4.1 6.2-.5L12 4l2.5 5.8 6.2.5-4.7 4.1 1.4 6.1z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>';
const SHARE_SVG = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 15V4M12 4l-4 4M12 4l4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 15v3a2 2 0 002 2h10a2 2 0 002-2v-3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
deckFav.innerHTML = FAV_SVG;

const filterbar = document.getElementById("filterbar");
const tagcloud = document.getElementById("tagcloud");
const countDisplay = document.getElementById("countDisplay");
const emptyState = document.getElementById("emptyState");
const eyebrowEl = document.getElementById("eyebrow");
const titleEl = document.getElementById("title");
const subtitleEl = document.getElementById("subtitle");
const footerCountEl = document.getElementById("footerCount");
const footerNamesEl = document.getElementById("footerNames").querySelector("span");
const grandTotalEl = document.getElementById("grandTotal");
const domainSwitch = document.getElementById("domainSwitch");
const searchBox = document.getElementById("searchBox");
const searchClear = document.getElementById("searchClear");
const viewSwitch = document.getElementById("viewSwitch");
const ghostBg = document.getElementById("ghostBg");
const favToggle = document.getElementById("favToggle");
const infoBtn = document.getElementById("infoBtn");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const formulaLightbox = document.getElementById("formulaLightbox");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxContent = document.getElementById("lightboxContent");
const statsBtn = document.getElementById("statsBtn");
const statsOverlay = document.getElementById("statsOverlay");
const statsClose = document.getElementById("statsClose");
const statsCategories = document.getElementById("statsCategories");
const statsEras = document.getElementById("statsEras");
const groupControls = document.getElementById("groupControls");
const expandAllBtn = document.getElementById("expandAllBtn");
const collapseAllBtn = document.getElementById("collapseAllBtn");
const dailyCard = document.getElementById("dailyCard");
const dailyDate = document.getElementById("dailyDate");
const dailyFormula = document.getElementById("dailyFormula");
const dailyName = document.getElementById("dailyName");
const dailyTag = document.getElementById("dailyTag");
const dailyWhy = document.getElementById("dailyWhy");
const dailyJump = document.getElementById("dailyJump");
const dailyDismiss = document.getElementById("dailyDismiss");
const weeklyCard = document.getElementById("weeklyCard");
const weeklyWeek = document.getElementById("weeklyWeek");
const weeklyName = document.getElementById("weeklyName");
const weeklyTag = document.getElementById("weeklyTag");
const weeklyFormula = document.getElementById("weeklyFormula");
const weeklyWhy = document.getElementById("weeklyWhy");
const weeklyJump = document.getElementById("weeklyJump");
const weeklyFav = document.getElementById("weeklyFav");
const weeklyDismiss = document.getElementById("weeklyDismiss");
const weeklyMeteor = document.getElementById("weeklyMeteor");
const weeklyBanner = document.getElementById("weeklyBanner");
const graphBtn = document.getElementById("graphBtn");
const graphOverlay = document.getElementById("graphOverlay");
const graphCanvas = document.getElementById("graphCanvas");
const graphClose = document.getElementById("graphClose");
const graphLegend = document.getElementById("graphLegend");
const graphTooltip = document.getElementById("graphTooltip");
const graphResetBtn = document.getElementById("graphResetBtn");
const graphDomainBtn = document.getElementById("graphDomainBtn");

const simLabBtn = document.getElementById("simLabBtn");
const simOverlay = document.getElementById("simOverlay");
const simClose = document.getElementById("simClose");
const simTitle = document.getElementById("simTitle");
const simTabs = document.getElementById("simTabs");
const simCanvas = document.getElementById("simCanvas");
const simControls = document.getElementById("simControls");
const simInfo = document.getElementById("simInfo");

const SIMULATION_TARGETS = {
  "lorentz-transzformacio": "lorentz",
  "kvantum-alaguthatas": "tunnel",
  "schrodinger-egyenlet": "tunnel",
  "hidrogenatom-schrodinger-egyenlete": "tunnel",
  "mandelbrot-halmaz": "mandelbrot",
  "fourier-transzformalt": "fourier",
  "gyors-fourier-transzformacio-fft": "fourier",
  "fast-fourier-transzformacio-alkalmazasa-keptomoritesre-dct": "fourier",
  "conway-elet-jateka": "conway"
};

let activeDomain = "matek";
let activeCategory = "all";
let activeTagFilter = null;   // téma-szűrő (tag cloud) — a keresőmezőt is meghajtja
let searchQuery = "";
let viewMode = "rank";
let onlyFavorites = false;
let rowElements = [];
let headerElements = [];

function buildIllustration(theme, color) {
  // Egyszerű, stílusos, absztrakt SVG a tétel 'lényegéhez'. Offline működik.
  const c = color || 'var(--primary)';
  const c2 = 'var(--tag-color)';
  let inner = '';
  if (theme === 'wave') {
    let d = 'M0,80';
    for (let x=0; x<=320; x+=8) { const y = 80 + Math.sin(x/22)*34*Math.exp(-Math.abs(x-160)/200); d += ' L'+x+','+y.toFixed(1); }
    inner = `<path d="${d}" fill="none" stroke="${c}" stroke-width="2.4" opacity="0.9"/>`
      + `<path d="${d.replace(/80/g,'120')}" fill="none" stroke="${c2}" stroke-width="1.4" opacity="0.4" transform="translate(0,8)"/>`;
  } else if (theme === 'lattice') {
    for (let i=0;i<6;i++) for (let j=0;j<4;j++){
      const x=40+i*48, y=30+j*40;
      inner += `<rect x="${x}" y="${y}" width="30" height="30" rx="5" fill="none" stroke="${c}" stroke-width="1.6" opacity="${0.3+0.1*((i+j)%3)}"/>`;
    }
    inner += `<circle cx="160" cy="90" r="6" fill="${c2}"/>`;
  } else if (theme === 'graph') {
    const pts=[[60,130],[140,50],[220,140],[280,70],[160,160],[100,90]];
    const edges=[[0,1],[1,3],[3,2],[2,4],[4,5],[5,0],[0,3],[1,5]];
    edges.forEach(e=>{ inner += `<line x1="${pts[e[0]][0]}" y1="${pts[e[0]][1]}" x2="${pts[e[1]][0]}" y2="${pts[e[1]][1]}" stroke="${c}" stroke-width="1.6" opacity="0.5"/>`; });
    pts.forEach(p=>{ inner += `<circle cx="${p[0]}" cy="${p[1]}" r="7" fill="${c2}"/>`; });
  } else if (theme === 'spiral') {
    let d='M160,90';
    for (let a=0; a<Math.PI*6; a+=0.2){ const r=a*7; const x=160+r*Math.cos(a), y=90+r*Math.sin(a); d+=' L'+x.toFixed(1)+','+y.toFixed(1); }
    inner = `<path d="${d}" fill="none" stroke="${c}" stroke-width="2.2" opacity="0.85"/>`;
  } else {
    inner = `<circle cx="160" cy="90" r="40" fill="none" stroke="${c}" stroke-width="2" opacity="0.6"/><circle cx="160" cy="90" r="18" fill="${c2}" opacity="0.5"/>`;
  }
  return `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">${inner}</svg>`;
}

function safeKatex(tex, el, opts) {
  if (window.katex) {
    try { katex.render(tex, el, opts); return; } catch(e) { /* fall through to text */ }
  }
  // KaTeX not available or render failed: show raw TeX as fallback
  el.textContent = tex || '';
}

function stripHtml(str) {
  return str.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function slugify(str) {
  return str.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function extractYear(entry) {
  if (entry.year !== undefined) return entry.year;
  let m = entry.tag.match(/Kr\.e\.\s*(\d+)/i);
  if (m) return -parseInt(m[1], 10);
  m = entry.tag.match(/(\d{3,4})/);
  if (m) return parseInt(m[1], 10);
  return 9999;
}

function eraLabel(year) {
  if (year < 0) return "Ókor (i. e.)";
  const century = Math.floor((year - 1) / 100) + 1;
  return century + ". század";
}

function loadFavorites() {
  try {
    const raw = localStorage.getItem("tsz_favorites_v1");
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch (e) { return new Set(); }
}
function saveFavorites() {
  try { localStorage.setItem("tsz_favorites_v1", JSON.stringify([...favorites])); } catch (e) {}
}
let favorites = loadFavorites();

function loadCollapsed() {
  try {
    const raw = localStorage.getItem("tsz_collapsed_v1");
    return raw ? new Set(JSON.parse(raw)) : null;
  } catch (e) { return null; }
}
function saveCollapsed() {
  try { localStorage.setItem("tsz_collapsed_v1", JSON.stringify([...collapsedGroups])); } catch (e) {}
}
let collapsedGroups = loadCollapsed() || new Set();
let collapsedInitialized = loadCollapsed() !== null;

function toggleFavorite(key, btnEl) {
  if (favorites.has(key)) { favorites.delete(key); btnEl.classList.remove("active"); }
  else {
    favorites.add(key); btnEl.classList.add("active");
    // Fénycsóva a kedvenc gombnál
    if (btnEl && btnEl.classList.contains("fav-star")) {
      btnEl.classList.remove("burst");
      void btnEl.offsetWidth;
      btnEl.classList.add("burst");
      setTimeout(() => btnEl.classList.remove("burst"), 600);
    }
  }
  saveFavorites();
  if (onlyFavorites) applyFilter();
  if (typeof rebuildConstellation === "function") rebuildConstellation();
}

let toastTimeout;
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("visible");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("visible"), 2200);
}

function legacyCopy(text) {
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch (e) { return false; }
}

function copyRowLink(id, btnEl) {
  const url = location.origin + location.pathname + "#" + id;
  history.replaceState(null, "", "#" + id);

  const row = document.getElementById(id);
  if (row) {
    row.classList.remove("highlight-flash");
    void row.offsetWidth;
    row.classList.add("highlight-flash");
    setTimeout(() => row.classList.remove("highlight-flash"), 2300);
  }

  const finish = (copied) => {
    btnEl.classList.add("copied");
    setTimeout(() => btnEl.classList.remove("copied"), 1500);
    showToast(copied ? "Link másolva a vágólapra!" : "Ez a tétel linkje — másold a címsorból");
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(() => finish(true)).catch(() => finish(legacyCopy(url)));
  } else {
    finish(legacyCopy(url));
  }
}

function goToRelated(rel) {
  if (rel.domain !== activeDomain) {
    renderDomain(rel.domain);
  }
  searchBox.value = rel.name;
  searchQuery = rel.name;
  activeTagFilter = null;
  searchClear.classList.add("visible");
  activeCategory = "all";
  syncCategoryChips();
  [...tagcloud.children].forEach(c => { if (c.classList.contains("tchip")) c.classList.remove("active"); });
  applyFilter();
  window.scrollTo({top: 0, behavior: "smooth"});
  showToast(`Ugrás ide: „${rel.name}"`);
}


function setupExpandableWhy(el){
  if (!el) return;
  el.addEventListener("focus", () => { el.classList.add("why-open"); el.setAttribute("aria-expanded", "true"); });
  el.addEventListener("blur", () => { el.classList.remove("why-open"); el.setAttribute("aria-expanded", "false"); });
  el.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); el.classList.add("why-open"); el.setAttribute("aria-expanded", "true"); }
  });
}

function buildRow(entry, index, domainKey) {
  const rank = entry.rank !== undefined ? entry.rank : index + 1;
  const slug = slugify(entry.name);
  const row = document.createElement("div");
  row.className = "row";
  row.id = `entry-${domainKey}-${slug}`;
  row.style.animationDelay = (Math.min(index, 14) * 0.06) + "s";
  row.dataset.category = entry.category;
  const catColor = DOMAINS[domainKey].categoryColors && DOMAINS[domainKey].categoryColors[entry.category];
  if (catColor) row.style.borderLeftColor = catColor + "cc";

  if (entry.illustration) {
    const illu = document.createElement("div");
    illu.className = "row-illu";
    illu.innerHTML = buildIllustration(entry.illustration, catColor);
    row.appendChild(illu);
    row.style.gridTemplateColumns = "84px 84px 1fr";
  }

  const rankEl = document.createElement("div");
  rankEl.className = "rank";
  rankEl.textContent = rank;

  const plateLabel = document.createElement("span");
  plateLabel.className = "plate-label";
  plateLabel.textContent = "Tábla";

  const rankPlate = document.createElement("div");
  rankPlate.className = "rank-plate";
  rankPlate.appendChild(plateLabel);
  rankPlate.appendChild(rankEl);

  const body = document.createElement("div");
  body.className = "body";

  if (entry.type === "maxwell") {
    const fWrap = document.createElement("div");
    fWrap.className = "formula multi formula-clickable";
    const label = document.createElement("div");
    label.className = "system-label";
    label.style.gridColumn = "1 / -1";
    label.textContent = "négy egyenlet · teljes elektromágnesség";
    fWrap.appendChild(label);
    entry.equations.forEach(eq => {
      const span = document.createElement("div");
      fWrap.appendChild(span);
      safeKatex(eq, span, {throwOnError: false, displayMode: true});
    });
    fWrap.addEventListener("click", () => openFormulaLightbox(entry));
    body.appendChild(fWrap);

    const derBox = document.createElement("div");
    derBox.style.cssText = "font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:var(--primary);margin:-4px 0 8px;opacity:.7;";
    derBox.textContent = "ebből következik →";
    body.appendChild(derBox);
    const derF = document.createElement("div");
    derF.className = "formula formula-clickable";
    derF.style.marginBottom = "14px";
    safeKatex(entry.derived, derF, {throwOnError: false, displayMode: true});
    derF.addEventListener("click", () => openFormulaLightbox({name: entry.name, type: "single", tex: entry.derived}));
    body.appendChild(derF);

  } else if (entry.type === "noether") {
    const box = document.createElement("div");
    box.className = "noether-box formula-clickable";
    box.innerHTML = `„${entry.quote}"`;
    const nt = document.createElement("div");
    nt.className = "noether-table";
    entry.pairs.forEach(p => {
      const item = document.createElement("div");
      item.className = "nt-item";
      item.innerHTML = `<span class="nt-sym">${p.sym}</span><span class="nt-arrow">${p.arrow}</span><span>${p.law}</span>`;
      nt.appendChild(item);
    });
    box.appendChild(nt);
    box.addEventListener("click", () => openFormulaLightbox(entry));
    body.appendChild(box);

  } else {
    if (entry.scrollHint) {
      const hint = document.createElement("div");
      hint.className = "scroll-hint";
      hint.textContent = "← görgethető →";
      body.appendChild(hint);
    }
    const fEl = document.createElement("div");
    fEl.className = "formula formula-clickable";
    safeKatex(entry.tex, fEl, {throwOnError: false, displayMode: true});
    fEl.addEventListener("click", () => openFormulaLightbox(entry));
    body.appendChild(fEl);
  }

  const meta = document.createElement("div");
  meta.className = "meta";
  const nameEl = document.createElement("span");
  nameEl.className = "name";
  nameEl.textContent = entry.name;
  meta.appendChild(nameEl);
  if (entry.badge) {
    const b = document.createElement("span");
    b.className = "badge";
    b.textContent = entry.badge;
    meta.appendChild(b);
  }
  const tagEl = document.createElement("span");
  tagEl.className = "tag" + ((entry.mega || entry.special) ? " special" : "");
  if (catColor) {
    const dot = document.createElement("span");
    dot.className = "row-cat-dot";
    dot.style.background = catColor;
    dot.style.color = catColor;
    dot.title = DOMAINS[domainKey].categoryLabels[entry.category];
    tagEl.appendChild(dot);
  }
  tagEl.appendChild(document.createTextNode(entry.tag));
  meta.appendChild(tagEl);

  const yearEl = document.createElement("span");
  yearEl.className = "year-badge";
  const yr = extractYear(entry);
  yearEl.textContent = yr < 0 ? ("Kr. e. " + Math.abs(yr) + ".") : String(yr);
  meta.appendChild(yearEl);

  const actions = document.createElement("div");
  actions.className = "row-actions";

  const favKey = domainKey + ":" + slug;
  const favBtn = document.createElement("button");
  favBtn.type = "button";
  favBtn.className = "icon-btn fav-star" + (favorites.has(favKey) ? " active" : "");
  favBtn.setAttribute("aria-label", "Kedvencekhez adás");
  favBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.3l-5.4 3.2 1.4-6.1-4.7-4.1 6.2-.5L12 4l2.5 5.8 6.2.5-4.7 4.1 1.4 6.1z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  favBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleFavorite(favKey, favBtn);
  });
  actions.appendChild(favBtn);

  const linkBtn = document.createElement("button");
  linkBtn.type = "button";
  linkBtn.className = "icon-btn link-btn";
  linkBtn.setAttribute("aria-label", "Link másolása");
  linkBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 15l6-6M10 6l1-1a3.5 3.5 0 015 5l-1 1M14 18l-1 1a3.5 3.5 0 01-5-5l1-1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
  linkBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    copyRowLink(row.id, linkBtn);
  });
  actions.appendChild(linkBtn);

  const shareBtn = document.createElement("button");
  shareBtn.type = "button";
  shareBtn.className = "icon-btn share-btn";
  shareBtn.setAttribute("aria-label", "Megosztás");
  shareBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 15V4M12 4l-4 4M12 4l4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 15v3a2 2 0 002 2h10a2 2 0 002-2v-3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
  shareBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    shareEntry(entry, domainKey, shareBtn);
  });
  actions.appendChild(shareBtn);

  const cardBtn = document.createElement("button");
  cardBtn.type = "button";
  cardBtn.className = "icon-btn card-btn";
  cardBtn.setAttribute("aria-label", "Kártya letöltése");
  cardBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="16" height="16" rx="2.5" stroke="currentColor" stroke-width="1.6"/><path d="M4 9h16M8 4v16" stroke="currentColor" stroke-width="1.6"/></svg>';
  cardBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    generateShareCard(entry, domainKey, cardBtn);
  });
  actions.appendChild(cardBtn);

  if (SIMULATION_TARGETS[slug]) {
    const simKey = SIMULATION_TARGETS[slug];
    const simBtn = document.createElement("button");
    simBtn.type = "button";
    simBtn.className = "icon-btn sim-btn";
    simBtn.setAttribute("aria-label", "Interaktív szimuláció");
    simBtn.title = "Interaktív szimuláció indítása";
    simBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="6" width="18" height="12" rx="3.5" stroke="currentColor" stroke-width="1.6"/><circle cx="8" cy="12" r="1.8" fill="currentColor"/><path d="M14 10v4M12 12h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
    simBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openSimulation(simKey);
    });
    actions.appendChild(simBtn);
  }

  if (entry.wiki) {
    const wikiBtn = document.createElement("button");
    wikiBtn.type = "button";
    wikiBtn.className = "icon-btn wiki-btn";
    wikiBtn.setAttribute("aria-label", "Tudj meg többet (Wikipedia)");
    wikiBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M12 11v5M12 7.5v.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
    wikiBtn.addEventListener("click", (e) => { e.stopPropagation(); window.open(entry.wiki, "_blank", "noopener"); });
    actions.appendChild(wikiBtn);
  }

  meta.appendChild(actions);
  body.appendChild(meta);

  if (entry.whyMore) {
    const why = document.createElement("div");
    why.className = "why-expand";
    why.tabIndex = 0;
    why.setAttribute("role", "button");
    why.setAttribute("aria-expanded", "false");
    why.innerHTML = `<span class="why-head">${entry.why}</span><span class="why-more">${entry.whyMore}</span><span class="why-chevron" aria-hidden="true">▾</span>`;
    setupExpandableWhy(why);
    body.appendChild(why);
  } else {
    const why = document.createElement("p");
    why.className = "why";
    why.innerHTML = entry.why;
    body.appendChild(why);
  }

  if (entry.related && entry.related.length) {
    const rc = document.createElement("div");
    rc.className = "related-chips";
    const label = document.createElement("span");
    label.className = "related-label";
    label.textContent = "Lásd még:";
    rc.appendChild(label);
    entry.related.forEach(rel => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "related-chip";
      chip.textContent = rel.name;
      chip.addEventListener("click", () => goToRelated(rel));
      rc.appendChild(chip);
    });
    body.appendChild(rc);
  }

  row.appendChild(rankPlate);
  row.appendChild(body);
  return row;
}

function buildFilterBar(domainKey) {
  const domain = DOMAINS[domainKey];
  filterbar.innerHTML = "";
  const counts = {};
  domain.data.forEach(d => { counts[d.category] = (counts[d.category] || 0) + 1; });

  const allChip = document.createElement("span");
  allChip.className = "chip active";
  allChip.dataset.cat = "all";
  allChip.innerHTML = `Összes<span class="count">${domain.data.length}</span>`;
  filterbar.appendChild(allChip);

  domain.categoryOrder.forEach(key => {
    if (!counts[key]) return;
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.dataset.cat = key;
    chip.innerHTML = `${domain.categoryLabels[key]}<span class="count">${counts[key]}</span>`;
    filterbar.appendChild(chip);
  });
}

/* B4: kategória-szűrő a lapozó (deck) nézetben is — ugyanazt az activeCategory
   állapotot kezeli, mint a fejléc filterbar, így a kettő mindig szinkronban van. */
function buildDeckCats(domainKey) {
  const domain = DOMAINS[domainKey];
  deckCats.innerHTML = "";
  const counts = {};
  domain.data.forEach(d => { counts[d.category] = (counts[d.category] || 0) + 1; });

  const mkChip = (cat, label, count) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip" + (activeCategory === cat ? " active" : "");
    chip.dataset.cat = cat;
    chip.innerHTML = `${label}<span class="count">${count}</span>`;
    chip.addEventListener("click", () => setCategory(cat));
    return chip;
  };
  deckCats.appendChild(mkChip("all", "Összes", domain.data.length));
  domain.categoryOrder.forEach(key => {
    if (!counts[key]) return;
    deckCats.appendChild(mkChip(key, domain.categoryLabels[key], counts[key]));
  });
}

function setCategory(cat) {
  activeCategory = cat;
  syncCategoryChips();
  applyFilter();
}

function syncCategoryChips() {
  [...filterbar.children].forEach(c => c.classList.toggle("active", c.dataset.cat === activeCategory));
  [...deckCats.children].forEach(c => c.classList.toggle("active", c.dataset.cat === activeCategory));
}

/* B4: a lapozóban meglátogatott lap száma domain-önként megjegyezzük */
function saveDeckPos() {
  try { localStorage.setItem("tsz_deck_pos_" + activeDomain, String(deckIndex)); } catch (e) {}
}
function loadDeckPos() {
  try {
    const v = parseInt(localStorage.getItem("tsz_deck_pos_" + activeDomain), 10);
    return Number.isFinite(v) && v >= 0 ? v : 0;
  } catch (e) { return 0; }
}

// Téma-kulcsszavak kinyerése a tag mezőkből (· és , mentén bontva, év/szerző szűrve)
function buildTagCloud(domainKey) {
  const domain = DOMAINS[domainKey];
  tagcloud.innerHTML = "";
  const freq = {};
  const catLabelsLower = new Set(Object.values(domain.categoryLabels).map(s => s.toLowerCase()));
  domain.data.forEach(d => {
    if (!d.tag) return;
    // minden · és , mentén bontunk, aztán a részeket tovább daraboljuk szóköz/perjellel
    const parts = d.tag.split(/[·,]/).flatMap(p => p.split(/\s+\/\s+|\s+/));
    parts.forEach(raw => {
      const t = raw.trim().replace(/[.\u00b7]+$/, "").trim();
      if (!t) return;
      if (/^\d{3,4}$/.test(t)) return;            // évszám
      if (/(Kr\.?\s*e\.?|i\.?\s*e\.?)/i.test(t)) return; // időszámítás maradvány
      if (t.toLowerCase() === "megoldatlan") return;
      if (catLabelsLower.has(t.toLowerCase())) return;  // maga a kategória neve
      if (t.length < 3) return;
      const key = t.toLowerCase();
      freq[key] = freq[key] || { label: t, n: 0 };
      freq[key].n++;
    });
  });
  const top = Object.values(freq)
    .filter(f => f.n >= 2)
    .sort((a, b) => b.n - a.n || a.label.localeCompare(b.label))
    .slice(0, 16);

  const label = document.createElement("span");
  label.className = "tc-label";
  label.textContent = "Téma:";
  tagcloud.appendChild(label);

  top.forEach(f => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "tchip";
    chip.dataset.tag = f.label;
    chip.textContent = f.label;
    if (activeTagFilter && activeTagFilter.toLowerCase() === f.label.toLowerCase()) {
      chip.classList.add("active");
    }
    chip.addEventListener("click", () => toggleTagFilter(f.label));
    tagcloud.appendChild(chip);
  });
  tagcloud.style.display = top.length ? "flex" : "none";
}

function toggleTagFilter(tagLabel) {
  if (activeTagFilter && activeTagFilter.toLowerCase() === tagLabel.toLowerCase()) {
    activeTagFilter = null;            // ki
  } else {
    activeTagFilter = tagLabel;        // be
  }
  // tükrözzük a keresőmezőre, hogy a meglévő applyFilter() is találjon
  searchQuery = activeTagFilter ? activeTagFilter : "";
  searchBox.value = searchQuery;
  searchClear.classList.toggle("visible", !!activeTagFilter);
  // chip-ek állapota
  [...tagcloud.children].forEach(c => {
    if (c.classList.contains("tchip")) c.classList.toggle("active",
      activeTagFilter && activeTagFilter.toLowerCase() === c.dataset.tag.toLowerCase());
  });
  applyFilter();
}

function renderGrid() {
  if (viewMode === "quiz") return; // játék módban a gridet nem rajzoljuk
  const domain = DOMAINS[activeDomain];
  grid.innerHTML = "";
  headerElements = [];

  if (viewMode === "rank" || viewMode === "fav") {
    rowElements.forEach(r => grid.appendChild(r.el));
  } else if (viewMode === "grouped") {
    domain.categoryOrder.forEach(key => {
      const rowsInCat = rowElements.filter(r => r.category === key);
      if (rowsInCat.length === 0) return;
      const header = document.createElement("div");
      header.className = "category-header collapsible";
      header.dataset.category = key;
      const color = domain.categoryColors ? domain.categoryColors[key] : null;
      const dot = color ? `<span class="cat-dot" style="background:${color};color:${color};"></span>` : "";
      const isCollapsed = collapsedGroups.has("cat:" + key);
      header.innerHTML = `<span class="collapse-arrow">▾</span>${dot}<span class="cat-name">${domain.categoryLabels[key]}</span><span class="cat-count">${rowsInCat.length} tétel</span>`;
      header.classList.toggle("collapsed", isCollapsed);
      header.addEventListener("click", () => toggleGroup("cat:" + key, header));
      grid.appendChild(header);
      headerElements.push({el: header, keyType: "category", key, groupKey: "cat:" + key});
      rowsInCat.forEach(r => {
        r.groupKey = "cat:" + key;
        grid.appendChild(r.el);
      });
    });
  } else if (viewMode === "timeline") {
    const sorted = [...rowElements].sort((a, b) => a.year - b.year);
    const eraCounts = {};
    sorted.forEach(r => { eraCounts[r.era] = (eraCounts[r.era] || 0) + 1; });
    let lastEra = null;
    sorted.forEach(r => {
      if (r.era !== lastEra) {
        const header = document.createElement("div");
        header.className = "category-header era-header collapsible";
        const isCollapsed = collapsedGroups.has("era:" + r.era);
        header.innerHTML = `<span class="collapse-arrow">▾</span><span class="cat-name">${r.era}</span><span class="cat-count">${eraCounts[r.era]} tétel</span>`;
        header.classList.toggle("collapsed", isCollapsed);
        const eraKey = "era:" + r.era;
        header.addEventListener("click", () => toggleGroup(eraKey, header));
        grid.appendChild(header);
        headerElements.push({el: header, keyType: "era", key: r.era, groupKey: eraKey});
        lastEra = r.era;
      }
      r.groupKey = "era:" + r.era;
      grid.appendChild(r.el);
    });
  } else {
    rowElements.forEach(r => { r.groupKey = null; grid.appendChild(r.el); });
  }
  if (viewMode === "deck") {
    grid.hidden = true;
    deckView.hidden = false;
    renderDeck();
    return;
  } else {
    grid.hidden = false;
    deckView.hidden = true;
  }
  if (viewMode === "rank") rowElements.forEach(r => { r.groupKey = null; });
  applyFilter();
}

function toggleGroup(groupKey, headerEl) {
  if (collapsedGroups.has(groupKey)) collapsedGroups.delete(groupKey);
  else collapsedGroups.add(groupKey);
  headerEl.classList.toggle("collapsed", collapsedGroups.has(groupKey));
  saveCollapsed();
  applyFilter();
}

function setAllGroups(collapsed) {
  headerElements.forEach(({el, groupKey}) => {
    if (!groupKey) return;
    if (collapsed) collapsedGroups.add(groupKey);
    else collapsedGroups.delete(groupKey);
    el.classList.toggle("collapsed", collapsed);
  });
  saveCollapsed();
  applyFilter();
}

function applyFilter() {
  const domain = DOMAINS[activeDomain];
  const q = searchQuery.trim().toLowerCase();
  // B5: a deck-kereső és a fejléc-kereső ugyanazt a searchQuery-t tükrözi
  if (deckSearch && deckSearch.value !== searchQuery) deckSearch.value = searchQuery;
  let visibleCount = 0;
  const visibleCats = new Set();
  const visibleEras = new Set();
  // Keresés vagy kedvenc-szűrés közben mindig kinyitjuk a csoportokat,
  // különben a találatok rejtve maradnának egy összecsukott fejléc alatt.
  const forceExpand = q !== "" || onlyFavorites;

  rowElements.forEach((r) => {
    const matchesCategory = activeCategory === "all" || r.category === activeCategory;
    const matchesSearch = q === "" || r.searchText.includes(q);
    const matchesFav = !onlyFavorites || favorites.has(r.favKey);
    const passesFilters = matchesCategory && matchesSearch && matchesFav;
    const inCollapsedGroup = !forceExpand && r.groupKey && collapsedGroups.has(r.groupKey);
    const show = passesFilters && !inCollapsedGroup;
    r.el.classList.toggle("hidden", !show);
    if (passesFilters) { visibleCount++; visibleCats.add(r.category); visibleEras.add(r.era); }
  });

  headerElements.forEach(({el, keyType, key, groupKey}) => {
    let visible;
    if (keyType === "category") {
      const matchesCategory = activeCategory === "all" || key === activeCategory;
      visible = matchesCategory && visibleCats.has(key);
    } else {
      visible = visibleEras.has(key);
    }
    el.classList.toggle("hidden", !visible);
    if (groupKey) {
      el.classList.toggle("collapsed", !forceExpand && collapsedGroups.has(groupKey));
    }
  });

  if (groupControls) {
    groupControls.style.display = (viewMode === "grouped" || viewMode === "timeline") ? "flex" : "none";
  }

  emptyState.style.display = visibleCount === 0 ? "block" : "none";

  let label;
  if (q !== "") {
    label = `<b>${visibleCount}</b> találat "${searchQuery.trim()}"-ra`
      + (activeTagFilter ? ` · téma: ${activeTagFilter}` : "")
      + (activeCategory !== "all" ? ` a "${domain.categoryLabels[activeCategory]}" kategóriában` : "")
      + (onlyFavorites ? " a kedvencek között" : "");
  } else if (onlyFavorites) {
    label = `<b>${visibleCount}</b> kedvenc tétel` + (activeCategory !== "all" ? ` a "${domain.categoryLabels[activeCategory]}" kategóriában` : "");
  } else if (activeTagFilter) {
    label = `<b>${visibleCount}</b> tétel · téma: ${activeTagFilter}`;
  } else {
    label = activeCategory === "all"
      ? `<b>${domain.data.length}</b> tétel összesen`
      : `<b>${visibleCount}</b> tétel a "${domain.categoryLabels[activeCategory]}" kategóriában`;
  }
  countDisplay.innerHTML = label;
  if (viewMode === "deck") renderDeck();
}

/* B5: keresés közvetlenül a lapozó nézetben is */
let deckSearchDebounce;
deckSearch.addEventListener("input", () => {
  clearTimeout(deckSearchDebounce);
  deckSearchDebounce = setTimeout(() => {
    searchQuery = deckSearch.value;
    searchBox.value = deckSearch.value;
    searchClear.classList.toggle("visible", deckSearch.value.length > 0);
    applyFilter();
  }, 120);
});

const GHOST_POSITIONS = [
  {top:"6%",  left:"3%",  size:"2.6rem", rot:"-6deg"},
  {top:"16%", left:"84%", size:"2.1rem", rot:"5deg"},
  {top:"38%", left:"1%",  size:"3.1rem", rot:"4deg"},
  {top:"55%", left:"87%", size:"2.4rem", rot:"-4deg"},
  {top:"74%", left:"4%",  size:"2rem",   rot:"7deg"},
  {top:"88%", left:"80%", size:"2.8rem", rot:"-5deg"}
];

function renderGhostBg(domainKey) {
  const domain = DOMAINS[domainKey];
  ghostBg.innerHTML = "";
  if (!domain.ghostFormulas || !window.katex) return;
  domain.ghostFormulas.forEach((tex, i) => {
    const pos = GHOST_POSITIONS[i % GHOST_POSITIONS.length];
    const el = document.createElement("div");
    el.className = "ghost-formula";
    el.style.top = pos.top;
    el.style.left = pos.left;
    el.style.fontSize = pos.size;
    el.style.setProperty("--gr", pos.rot);
    el.style.animationDuration = (55 + i * 9) + "s";
    el.style.animationDelay = (-i * 7) + "s";
    try {
      safeKatex(tex, el, {throwOnError: false, displayMode: false});
    } catch (e) { /* ignore ghost render failures */ }
    ghostBg.appendChild(el);
  });
}

function renderDomain(domainKey) {
  const domain = DOMAINS[domainKey];
  activeDomain = domainKey;
  activeCategory = "all";
  activeTagFilter = null;     // téma-szűrő törlése domain-váltáskor
  searchQuery = "";
  searchBox.value = "";
  if (deckSearch) deckSearch.value = "";
  searchClear.classList.remove("visible");

  document.body.dataset.domain = domainKey;
  [...domainSwitch.children].forEach(b => b.classList.toggle("active", b.dataset.domain === domainKey));

  eyebrowEl.textContent = `${domain.eyebrowText} · ${domain.data.length} tétel`;
  titleEl.innerHTML = domain.titleHTML;
  subtitleEl.innerHTML = domain.subHTML;
  footerCountEl.textContent = `Szedés: KaTeX · ${domain.data.length} tétel`;
  footerNamesEl.textContent = domain.footerNames;

  deckIndex = loadDeckPos(); // B4: visszatérve a domainre ott folytatjuk, ahol abbahagytuk
  rowElements = [];
  domain.data.forEach((d, i) => {
    const row = buildRow(d, i, domainKey);
    const searchText = `${d.name} ${d.tag} ${stripHtml(d.why)}`.toLowerCase();
    const year = extractYear(d);
    const slug = slugify(d.name);
    rowElements.push({
      el: row,
      entry: d,
      category: d.category,
      searchText,
      favKey: domainKey + ":" + slug,
      year,
      era: eraLabel(year)
    });
  });

  buildFilterBar(domainKey);
  buildDeckCats(domainKey);
  buildTagCloud(domainKey);
  renderGrid();
  renderGhostBg(domainKey);
}

filterbar.addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  setCategory(chip.dataset.cat);
});

domainSwitch.addEventListener("click", (e) => {
  const btn = e.target.closest(".dbtn");
  if (!btn || btn.dataset.domain === activeDomain) return;
  renderDomain(btn.dataset.domain);
});

viewSwitch.addEventListener("click", (e) => {
  const btn = e.target.closest(".vbtn");
  if (!btn || btn.dataset.view === viewMode) return;
  const prevView = viewMode;
  viewMode = btn.dataset.view;
  [...viewSwitch.children].forEach(b => b.classList.toggle("active", b === btn));
  // B7: a Kedvencek fül belépéskor kedvenc-szűrőt kapcsol, kilépéskor feloldja
  if (viewMode === "fav") onlyFavorites = true;
  else if (prevView === "fav") onlyFavorites = false;
  favToggle.classList.toggle("active", onlyFavorites);
  favToggle.setAttribute("aria-pressed", String(onlyFavorites));
  // Kilépés a játék módból (ha épp ott voltunk)
  if (viewMode !== "quiz") closeQuiz();
  // Térkép nézetből kilépés (ha épp ott voltunk)
  if (viewMode !== "map") closeStarMap();
  // Első alkalommal, amikor csoportos nézetre vált a felhasználó, alapból mindent
  // becsukunk — így egy képernyőn átlátható a teljes szerkezet.
  if (!collapsedInitialized && (viewMode === "grouped" || viewMode === "timeline")) {
    collapsedInitialized = true;
    renderGrid();
    setAllGroups(true);
    return;
  }
  if (viewMode === "quiz") {
    grid.hidden = true;
    deckView.hidden = true;
    openQuiz();
    return;
  }
  if (viewMode === "map") {
    openStarMap();
    return;
  }
  renderGrid();
});

expandAllBtn.addEventListener("click", () => setAllGroups(false));
collapseAllBtn.addEventListener("click", () => setAllGroups(true));

favToggle.addEventListener("click", () => {
  onlyFavorites = !onlyFavorites;
  favToggle.classList.toggle("active", onlyFavorites);
  favToggle.setAttribute("aria-pressed", String(onlyFavorites));
  // Ha a Kedvencek nézetből kapcsoljuk ki a szűrőt, térjünk vissza a rangsorra
  if (!onlyFavorites && viewMode === "fav") {
    viewMode = "rank";
    [...viewSwitch.children].forEach(b => b.classList.toggle("active", b.dataset.view === "rank"));
    renderGrid();
  }
  applyFilter();
});

function openModal() {
  modalOverlay.classList.add("visible");
  modalOverlay.setAttribute("aria-hidden", "false");
}
function closeModal() {
  modalOverlay.classList.remove("visible");
  modalOverlay.setAttribute("aria-hidden", "true");
}
infoBtn.addEventListener("click", openModal);
modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => { if (e.target === modalOverlay) closeModal(); });

function openFormulaLightbox(entry) {
  if (!window.katex) return;
  lightboxTitle.textContent = entry.name;
  lightboxContent.innerHTML = "";
  try {
    if (entry.type === "maxwell") {
      const wrap = document.createElement("div");
      wrap.style.cssText = "display:grid;gap:20px;";
      entry.equations.forEach(eq => {
        const div = document.createElement("div");
        safeKatex(eq, div, {throwOnError: false, displayMode: true});
        wrap.appendChild(div);
      });
      lightboxContent.appendChild(wrap);
    } else if (entry.type === "noether") {
      const div = document.createElement("div");
      div.style.cssText = "font-family:'Fraunces',serif;font-style:italic;font-size:clamp(1.2rem,3vw,1.7rem);color:var(--primary-bright);line-height:1.5;";
      div.textContent = `„${entry.quote}"`;
      lightboxContent.appendChild(div);
    } else {
      const div = document.createElement("div");
      safeKatex(entry.tex, div, {throwOnError: false, displayMode: true});
      lightboxContent.appendChild(div);
    }
  } catch (e) { /* ignore render errors */ }
  formulaLightbox.classList.add("visible");
  formulaLightbox.setAttribute("aria-hidden", "false");
}
function closeLightbox() {
  formulaLightbox.classList.remove("visible");
  formulaLightbox.setAttribute("aria-hidden", "true");
}
lightboxClose.addEventListener("click", closeLightbox);
formulaLightbox.addEventListener("click", (e) => { if (e.target === formulaLightbox) closeLightbox(); });

function renderStats() {
  const domain = DOMAINS[activeDomain];
  const catCounts = {};
  const eraCounts = {};
  const eraOrder = [];
  rowElements.forEach(r => {
    catCounts[r.category] = (catCounts[r.category] || 0) + 1;
    if (!(r.era in eraCounts)) eraOrder.push(r.era);
    eraCounts[r.era] = (eraCounts[r.era] || 0) + 1;
  });
  const total = rowElements.length;
  const maxCat = Math.max(...Object.values(catCounts));
  const maxEra = Math.max(...Object.values(eraCounts));

  statsCategories.innerHTML = "";
  domain.categoryOrder.forEach(key => {
    const count = catCounts[key] || 0;
    if (!count) return;
    const color = domain.categoryColors ? domain.categoryColors[key] : "var(--primary)";
    const row = document.createElement("div");
    row.className = "stat-row";
    row.innerHTML = `<span class="stat-label">${domain.categoryLabels[key]}</span>
      <span class="stat-bar-track"><span class="stat-bar-fill" style="width:0%;background:${color};color:${color}"></span></span>
      <span class="stat-count">${count}</span>`;
    statsCategories.appendChild(row);
    requestAnimationFrame(() => {
      row.querySelector(".stat-bar-fill").style.width = (count / maxCat * 100) + "%";
    });
  });

  statsEras.innerHTML = "";
  eraOrder.forEach(era => {
    const count = eraCounts[era];
    const row = document.createElement("div");
    row.className = "stat-row";
    row.innerHTML = `<span class="stat-label">${era}</span>
      <span class="stat-bar-track"><span class="stat-bar-fill" style="width:0%;background:var(--primary);color:var(--primary)"></span></span>
      <span class="stat-count">${count}</span>`;
    statsEras.appendChild(row);
    requestAnimationFrame(() => {
      row.querySelector(".stat-bar-fill").style.width = (count / maxEra * 100) + "%";
    });
  });

  document.getElementById("statsTitle").textContent = `${domain.label} · ${total} tétel eloszlása`;
}
statsBtn.addEventListener("click", () => {
  renderStats();
  statsOverlay.classList.add("visible");
  statsOverlay.setAttribute("aria-hidden", "false");
});
statsClose.addEventListener("click", () => {
  statsOverlay.classList.remove("visible");
  statsOverlay.setAttribute("aria-hidden", "true");
});
statsOverlay.addEventListener("click", (e) => { if (e.target === statsOverlay) {
  statsOverlay.classList.remove("visible");
  statsOverlay.setAttribute("aria-hidden", "true");
}});

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
  const words = text.split(" ");
  let line = "";
  const lines = [];
  for (const w of words) {
    const test = line + w + " ";
    if (ctx.measureText(test).width > maxWidth && line !== "") {
      lines.push(line.trim());
      line = w + " ";
    } else {
      line = test;
    }
  }
  if (line.trim()) lines.push(line.trim());
  const shown = lines.slice(0, maxLines);
  shown.forEach((l, i) => ctx.fillText(l, x, y + i * lineHeight));
  return shown.length;
}

function renderTexToImage(tex) {
  return new Promise((resolve) => {
    if (!tex || !window.katex) { resolve(null); return; }
    const tempDiv = document.createElement("div");
    tempDiv.style.cssText = "position:fixed;left:-9999px;top:-9999px;font-size:34px;color:#eef1f7;background:transparent;";
    document.body.appendChild(tempDiv);
    try {
      safeKatex(tex, tempDiv, {throwOnError: false, displayMode: true});
    } catch (e) { document.body.removeChild(tempDiv); resolve(null); return; }

    let cssText = "";
    try {
      for (const sheet of document.styleSheets) {
        try {
          if (sheet.href && sheet.href.indexOf("katex") !== -1) {
            for (const rule of sheet.cssRules) cssText += rule.cssText + "\n";
          }
        } catch (e) { /* cross-origin sheet, skip */ }
      }
    } catch (e) {}

    const w = Math.max(tempDiv.scrollWidth, 80);
    const h = Math.max(tempDiv.scrollHeight, 50);
    const innerHTML = tempDiv.innerHTML;
    document.body.removeChild(tempDiv);

    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">
          <style>${cssText}</style>
          <div style="font-size:34px;color:#eef1f7;display:inline-block;">${innerHTML}</div>
        </div>
      </foreignObject>
    </svg>`;

    const blob = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
    const url = URL.createObjectURL(blob);
    const img = new Image();
    const timeout = setTimeout(() => { URL.revokeObjectURL(url); resolve(null); }, 1200);
    img.onload = () => { clearTimeout(timeout); URL.revokeObjectURL(url); resolve(img); };
    img.onerror = () => { clearTimeout(timeout); URL.revokeObjectURL(url); resolve(null); };
    img.src = url;
  });
}

async function generateShareCard(entry, domainKey, btnEl) {
  if (btnEl) btnEl.classList.add("copied");
  showToast("Kártya készítése…");
  try {

  const palette = domainKey === "matek"
    ? {ink: "#0b0f1f", ink2: "#121a33", primary: "#c9a24b", primaryBright: "#e9c877", paper: "#eef1f7", muted: "#9aa6c4"}
    : {ink: "#080f1c", ink2: "#0c1526", primary: "#3eb8f0", primaryBright: "#7fd8ff", paper: "#e8f0fa", muted: "#7a9abc"};

  const W = 1200, H = 630;
  const canvas = document.createElement("canvas");
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d");

  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, palette.ink2);
  grad.addColorStop(1, palette.ink);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  if (document.fonts && document.fonts.ready) { try { await document.fonts.ready; } catch (e) {} }

  const domainLabel = DOMAINS[domainKey].label;
  ctx.fillStyle = palette.primary;
  ctx.font = "700 14px Inter, sans-serif";
  ctx.fillText("HALHATATLAN TUDOMÁNYOS SZÉPSÉGEK · " + domainLabel.toUpperCase(), 64, 66);

  ctx.strokeStyle = palette.primary;
  ctx.globalAlpha = 0.55;
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(64, 82); ctx.lineTo(280, 82); ctx.stroke();
  ctx.globalAlpha = 1;

  ctx.fillStyle = palette.paper;
  ctx.font = "italic 500 50px Fraunces, serif";
  wrapCanvasText(ctx, entry.name, 64, 160, W - 560, 56, 2);

  ctx.font = "500 15px 'JetBrains Mono', monospace";
  ctx.fillStyle = palette.muted;
  wrapCanvasText(ctx, entry.tag || "", 64, 280, W - 560, 20, 2);

  const texSource = entry.type === "maxwell" ? entry.equations[0] : (entry.type === "noether" ? null : entry.tex);
  let formulaBottom = 300;
  if (texSource) {
    ctx.save();
    ctx.fillStyle = palette.muted;
    ctx.font = "500 17px 'JetBrains Mono', monospace";
    ctx.textAlign = "right";
    const fx = W - 64;
    const fy = 300;
    const maxLen = 38;
    let texStr = texSource.replace(/\\/g, "").replace(/[{}]/g, "").replace(/\$/g, "");
    if (texStr.length > maxLen) texStr = texStr.slice(0, maxLen) + "…";
    ctx.fillText(texStr, fx, fy);
    ctx.restore();
  }

  const plain = stripHtml(entry.why || "").replace(/^<b>|<\/b>$/g, "");
  ctx.font = "17px Inter, sans-serif";
  ctx.fillStyle = palette.muted;
  wrapCanvasText(ctx, plain, 64, 360, W - 560, 27, 6);

  ctx.font = "12px 'JetBrains Mono', monospace";
  ctx.fillStyle = palette.primary;
  ctx.globalAlpha = 0.75;
  ctx.fillText("tudomanyos-szepsegek", 64, H - 40);
  ctx.globalAlpha = 1;

  canvas.toBlob(async (blob) => {
    if (btnEl) setTimeout(() => btnEl.classList.remove("copied"), 1200);
    if (!blob) { showToast("A kártya generálása nem sikerült."); return; }
    const filename = slugify(entry.name) + ".png";

    if (navigator.share && navigator.canShare) {
      try {
        const file = new File([blob], filename, {type: "image/png"});
        if (navigator.canShare({files: [file]})) {
          await navigator.share({files: [file], title: entry.name, text: "Halhatatlan tudományos szépségek"});
          showToast("Megosztva!");
          return;
        }
      } catch (e) {
        if (e && e.name === "AbortError") { return; }
        /* megosztás nem sikerült, letöltésre váltunk */
      }
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    showToast("Kártya letöltve!");
  }, "image/png");

  } catch (err) {
    if (btnEl) btnEl.classList.remove("copied");
    const msg = (err && err.message) ? err.message : String(err);
    showToast("Hiba: " + msg.slice(0, 120));
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
    closeLightbox();
    closeGraph();
    closeSimulation();
    statsOverlay.classList.remove("visible");
    statsOverlay.setAttribute("aria-hidden", "true");
  }
  if (e.key === "/" && document.activeElement !== searchBox && !modalOverlay.classList.contains("visible")) {
    e.preventDefault();
    searchBox.focus();
  }
});

let searchDebounce;
searchBox.addEventListener("input", () => {
  searchClear.classList.toggle("visible", searchBox.value.length > 0);
  // ha a felhasználó kézzel gépel, a téma-szűrő (tag cloud) kikapcsol
  if (activeTagFilter) {
    activeTagFilter = null;
    [...tagcloud.children].forEach(c => { if (c.classList.contains("tchip")) c.classList.remove("active"); });
  }
  clearTimeout(searchDebounce);
  searchDebounce = setTimeout(() => {
    searchQuery = searchBox.value;
    applyFilter();
  }, 120);
});

searchClear.addEventListener("click", () => {
  searchBox.value = "";
  searchQuery = "";
  activeTagFilter = null;
  searchClear.classList.remove("visible");
  [...tagcloud.children].forEach(c => { if (c.classList.contains("tchip")) c.classList.remove("active"); });
  applyFilter();
  searchBox.focus();
});

function handleDeepLink() {
  const hash = location.hash.replace(/^#/, "");
  if (!hash.startsWith("entry-")) return;
  const rest = hash.slice("entry-".length);
  const m = rest.match(/^(matek|fizika|informatika)-(.+)$/);
  if (!m) return;
  const [, domainKey] = m;
  if (domainKey !== activeDomain) {
    renderDomain(domainKey);
  }
  requestAnimationFrame(() => {
    const el = document.getElementById(hash);
    if (el) {
      if (el.scrollIntoView) el.scrollIntoView({behavior: "smooth", block: "center"});
      el.classList.add("highlight-flash");
      setTimeout(() => el.classList.remove("highlight-flash"), 2300);
    }
  });
}

// ==== TUDÁS-GRÁF ====
const graphState = {
  nodes: [], edges: [], catCenters: [],
  scale: 1, offsetX: 0, offsetY: 0,
  dragging: false, moved: false,
  lastX: 0, lastY: 0,
  hoverNode: null, domain: "matek",
  raf: null, t: 0
};

function buildGraph(domainKey) {
  const domain = DOMAINS[domainKey];
  const data = domain.data;
  const cats = domain.categoryOrder.filter(k => data.some(d => d.category === k));
  const R = 320; // kategória-központok köre
  graphState.catCenters = cats.map((key, i) => {
    const ang = (i / cats.length) * Math.PI * 2 - Math.PI / 2;
    return {
      key,
      label: domain.categoryLabels[key],
      color: (domain.categoryColors && domain.categoryColors[key]) || "#c9a24b",
      x: Math.cos(ang) * R,
      y: Math.sin(ang) * R
    };
  });

  const byName = {};
  graphState.nodes = data.map((entry, idx) => {
    const center = graphState.catCenters.find(c => c.key === entry.category) || {x: 0, y: 0, color: "#c9a24b"};
    const inCat = data.filter(d => d.category === entry.category);
    const localIdx = inCat.indexOf(entry);
    // Phyllotaxis (aranyszög) elrendezés: egyenletes, természetes kitöltés
    const golden = Math.PI * (3 - Math.sqrt(5));
    const rad = 13 * Math.sqrt(localIdx + 0.6);
    const ang = localIdx * golden;
    const important = !!(entry.mega || entry.special);
    const node = {
      entry, domain: domainKey,
      x: center.x + Math.cos(ang) * rad,
      y: center.y + Math.sin(ang) * rad,
      baseX: center.x + Math.cos(ang) * rad,
      baseY: center.y + Math.sin(ang) * rad,
      r: important ? 5.2 : 3.4,
      color: center.color,
      important,
      phase: (idx % 17) / 17 * Math.PI * 2
    };
    byName[entry.name] = node;
    return node;
  });

  graphState.edges = [];
  data.forEach(entry => {
    if (!entry.related) return;
    const from = byName[entry.name];
    if (!from) return;
    entry.related.forEach(rel => {
      if (rel.domain !== domainKey) return; // kereszt-domain élt itt nem rajzolunk
      const to = byName[rel.name];
      if (to && from !== to) graphState.edges.push({from, to});
    });
  });

  // Jelmagyarázat
  graphLegend.innerHTML = graphState.catCenters.map(c =>
    `<span class="graph-legend-item"><span class="graph-legend-dot" style="background:${c.color};color:${c.color}"></span>${c.label}</span>`
  ).join("");
}

function resetGraphView() {
  const rect = graphCanvas.getBoundingClientRect();
  // Mobilra (kis képernyő) nagyobb alap scale: az 820-as "világ" jobban kitölti a nézetet.
  const fit = Math.min(rect.width, rect.height) / 560;
  graphState.scale = Math.max(0.35, Math.min(fit, 1.6));
  graphState.offsetX = rect.width / 2;
  graphState.offsetY = rect.height / 2;
}

function resizeGraphCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const rect = graphCanvas.getBoundingClientRect();
  graphCanvas.width = Math.max(1, Math.round(rect.width * dpr));
  graphCanvas.height = Math.max(1, Math.round(rect.height * dpr));
  const ctx = graphCanvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function graphToScreen(x, y) {
  return {
    x: x * graphState.scale + graphState.offsetX,
    y: y * graphState.scale + graphState.offsetY
  };
}

function drawGraph() {
  const ctx = graphCanvas.getContext("2d");
  const rect = graphCanvas.getBoundingClientRect();
  const styles = getComputedStyle(document.body);
  const inkColor = styles.getPropertyValue("--ink").trim() || "#0b0f1f";
  const mutedColor = styles.getPropertyValue("--muted").trim() || "#9aa6c4";
  const paperColor = styles.getPropertyValue("--paper").trim() || "#eef1f7";

  ctx.fillStyle = inkColor;
  ctx.fillRect(0, 0, rect.width, rect.height);

  graphState.t += 0.006;
  // Lassú, finom lebegés — "él" a gráf
  graphState.nodes.forEach(n => {
    n.x = n.baseX + Math.sin(graphState.t + n.phase) * 2.6;
    n.y = n.baseY + Math.cos(graphState.t * 0.85 + n.phase) * 2.6;
  });

  // Élek
  ctx.lineWidth = Math.max(0.6, 1.1 * graphState.scale);
  graphState.edges.forEach(e => {
    const a = graphToScreen(e.from.x, e.from.y);
    const b = graphToScreen(e.to.x, e.to.y);
    const highlighted = graphState.hoverNode === e.from || graphState.hoverNode === e.to;
    ctx.strokeStyle = highlighted ? e.from.color : mutedColor;
    ctx.globalAlpha = highlighted ? 0.85 : 0.22;
    // enyhe ív, hogy ne legyen mértani rideg
    const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
    const dx = b.x - a.x, dy = b.y - a.y;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.quadraticCurveTo(mx - dy * 0.12, my + dx * 0.12, b.x, b.y);
    ctx.stroke();
  });
  ctx.globalAlpha = 1;

  // Kategória-címkék
  ctx.textAlign = "center";
  ctx.font = `600 ${Math.max(9, 12 * graphState.scale)}px Inter, sans-serif`;
  graphState.catCenters.forEach(c => {
    const p = graphToScreen(c.x, c.y - 78);
    ctx.fillStyle = c.color;
    ctx.globalAlpha = 0.85;
    ctx.fillText(c.label, p.x, p.y);
  });
  ctx.globalAlpha = 1;

  // Csomópontok
  graphState.nodes.forEach(n => {
    const p = graphToScreen(n.x, n.y);
    const isHover = graphState.hoverNode === n;
    const r = (isHover ? n.r * 1.9 : n.r) * Math.max(0.55, graphState.scale);
    if (n.important || isHover) {
      ctx.shadowColor = n.color;
      ctx.shadowBlur = isHover ? 18 : 8;
    } else {
      ctx.shadowBlur = 0;
    }
    ctx.beginPath();
    ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
    ctx.fillStyle = isHover ? paperColor : n.color;
    ctx.globalAlpha = isHover ? 1 : (n.important ? 0.95 : 0.7);
    ctx.fill();
  });
  ctx.shadowBlur = 0;
  ctx.globalAlpha = 1;

  graphState.raf = requestAnimationFrame(drawGraph);
}

function findNodeAt(clientX, clientY) {
  const rect = graphCanvas.getBoundingClientRect();
  const mx = clientX - rect.left, my = clientY - rect.top;
  let best = null, bestDist = 18;
  graphState.nodes.forEach(n => {
    const p = graphToScreen(n.x, n.y);
    const d = Math.hypot(p.x - mx, p.y - my);
    if (d < bestDist) { bestDist = d; best = n; }
  });
  return best;
}

function openGraph() {
  graphState.domain = activeDomain;
  graphOverlay.classList.add("visible");
  graphOverlay.setAttribute("aria-hidden", "false");
  requestAnimationFrame(() => {
    resizeGraphCanvas();
    buildGraph(graphState.domain);
    resetGraphView();
    if (graphState.raf) cancelAnimationFrame(graphState.raf);
    drawGraph();
  });
}
function closeGraph() {
  graphOverlay.classList.remove("visible");
  graphOverlay.setAttribute("aria-hidden", "true");
  if (graphState.raf) { cancelAnimationFrame(graphState.raf); graphState.raf = null; }
}

graphBtn.addEventListener("click", openGraph);
graphClose.addEventListener("click", closeGraph);
graphResetBtn.addEventListener("click", resetGraphView);
graphDomainBtn.addEventListener("click", () => {
  graphState.domain = graphState.domain === "matek" ? "fizika" : "matek";
  document.body.dataset.domain = graphState.domain;
  buildGraph(graphState.domain);
  resetGraphView();
  showToast(DOMAINS[graphState.domain].label);
});

graphCanvas.addEventListener("pointerdown", (e) => {
  graphState.dragging = true;
  graphState.moved = false;
  graphState.lastX = e.clientX;
  graphState.lastY = e.clientY;
  graphCanvas.classList.add("dragging");
  if (graphCanvas.setPointerCapture) graphCanvas.setPointerCapture(e.pointerId);
});
graphCanvas.addEventListener("pointermove", (e) => {
  if (graphState.dragging) {
    const dx = e.clientX - graphState.lastX, dy = e.clientY - graphState.lastY;
    if (Math.abs(dx) + Math.abs(dy) > 3) graphState.moved = true;
    graphState.offsetX += dx;
    graphState.offsetY += dy;
    graphState.lastX = e.clientX;
    graphState.lastY = e.clientY;
    graphTooltip.classList.remove("visible");
    return;
  }
  const node = findNodeAt(e.clientX, e.clientY);
  graphState.hoverNode = node;
  if (node) {
    const rect = graphCanvas.getBoundingClientRect();
    graphTooltip.innerHTML = `<span class="gt-name">${node.entry.name}</span><span class="gt-tag">${node.entry.tag}</span>`;
    graphTooltip.style.left = Math.min(e.clientX - rect.left + 14, rect.width - 270) + "px";
    graphTooltip.style.top = (e.clientY - rect.top + 14) + "px";
    graphTooltip.classList.add("visible");
  } else {
    graphTooltip.classList.remove("visible");
  }
});
graphCanvas.addEventListener("pointerup", (e) => {
  graphState.dragging = false;
  graphCanvas.classList.remove("dragging");
  if (graphState.moved) return;
  const node = findNodeAt(e.clientX, e.clientY);
  if (!node) return;
  closeGraph();
  if (node.domain !== activeDomain) renderDomain(node.domain);
  searchBox.value = node.entry.name;
  searchQuery = node.entry.name;
  searchClear.classList.add("visible");
  activeCategory = "all";
  syncCategoryChips();
  applyFilter();
  requestAnimationFrame(() => {
    const el = document.getElementById(`entry-${node.domain}-${slugify(node.entry.name)}`);
    if (el) {
      if (el.scrollIntoView) el.scrollIntoView({behavior: "smooth", block: "center"});
      el.classList.add("highlight-flash");
      setTimeout(() => el.classList.remove("highlight-flash"), 2300);
    }
  });
});
graphCanvas.addEventListener("pointercancel", () => {
  graphState.dragging = false;
  graphCanvas.classList.remove("dragging");
});
graphCanvas.addEventListener("wheel", (e) => {
  e.preventDefault();
  const rect = graphCanvas.getBoundingClientRect();
  const mx = e.clientX - rect.left, my = e.clientY - rect.top;
  const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
  const newScale = Math.max(0.2, Math.min(4, graphState.scale * factor));
  // zoom a kurzor felé
  graphState.offsetX = mx - (mx - graphState.offsetX) * (newScale / graphState.scale);
  graphState.offsetY = my - (my - graphState.offsetY) * (newScale / graphState.scale);
  graphState.scale = newScale;
}, {passive: false});

// === Pinch-zoom iPhone-on / érintőképernyőn (két ujj) ===
let pinchPrevDist = 0;
let pinchPrevMid = null;
graphCanvas.addEventListener("touchstart", (e) => {
  if (e.touches.length === 2) {
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    pinchPrevDist = Math.hypot(dx, dy);
    pinchPrevMid = {
      x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
      y: (e.touches[0].clientY + e.touches[1].clientY) / 2
    };
    graphState.dragging = false; // ne ütközzön a drag-vel
  }
}, {passive: false});
graphCanvas.addEventListener("touchmove", (e) => {
  if (e.touches.length === 2 && pinchPrevDist > 0) {
    e.preventDefault(); // ne görgessen az oldal pinch közben
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    const dist = Math.hypot(dx, dy);
    const mid = {
      x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
      y: (e.touches[0].clientY + e.touches[1].clientY) / 2
    };
    const rect = graphCanvas.getBoundingClientRect();
    const mx = mid.x - rect.left, my = mid.y - rect.top;
    const factor = dist / pinchPrevDist;
    const newScale = Math.max(0.2, Math.min(5, graphState.scale * factor));
    graphState.offsetX = mx - (mx - graphState.offsetX) * (newScale / graphState.scale);
    graphState.offsetY = my - (my - graphState.offsetY) * (newScale / graphState.scale);
    graphState.scale = newScale;
    // a két ujj mozgását is követjük (pánik a felezőponttal)
    if (pinchPrevMid) {
      graphState.offsetX += mid.x - pinchPrevMid.x;
      graphState.offsetY += mid.y - pinchPrevMid.y;
    }
    pinchPrevDist = dist;
    pinchPrevMid = mid;
    drawGraph();
  }
}, {passive: false});
graphCanvas.addEventListener("touchend", (e) => {
  if (e.touches.length < 2) { pinchPrevDist = 0; pinchPrevMid = null; }
}, {passive: false});

window.addEventListener("resize", () => {
  if (!graphOverlay.classList.contains("visible")) return;
  resizeGraphCanvas();
  resetGraphView();
});

// ==== A NAP SZÉPSÉGE ====
// Dátumból számolt, determinisztikus választás: mindenki ugyanazt látja
// az adott napon, és éjfélkor magától vált.
function dayKey(d) {
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

function dayIndex(d, modulo) {
  // Napok száma egy fix kezdőponttól — stabil, időzónától független sorszám.
  const utcDays = Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);
  // Egy nagy prímmel szorozva jól "keverünk", hogy egymást követő napokon
  // ne szomszédos tételek jöjjenek elő.
  return ((utcDays * 7919) % modulo + modulo) % modulo;
}

function renderDailyFeature() {
  const today = new Date();
  const key = dayKey(today);

  let dismissed = null;
  try { dismissed = localStorage.getItem("tsz_daily_dismissed"); } catch (e) {}
  if (dismissed === key) { dailyCard.hidden = true; return; }

  const pool = [
    ...MATEK_DATA.map((d, i) => ({entry: d, domain: "matek"})),
    ...FIZIKA_DATA.map((d, i) => ({entry: d, domain: "fizika"}))
  ];
  if (!pool.length) return;

  const pick = pool[dayIndex(today, pool.length)];
  const entry = pick.entry;

  dailyDate.textContent = today.toLocaleDateString("hu-HU", {year: "numeric", month: "long", day: "numeric"});
  dailyName.textContent = entry.name;
  dailyTag.textContent = entry.tag;
  dailyWhy.innerHTML = entry.why;

  dailyFormula.innerHTML = "";
  const texSource = entry.type === "maxwell" ? entry.equations[0] : (entry.type === "noether" ? null : entry.tex);
  if (texSource && window.katex) {
    try {
      safeKatex(texSource, dailyFormula, {throwOnError: false, displayMode: true});
      dailyFormula.style.display = "";
    } catch (e) { dailyFormula.style.display = "none"; }
  } else if (entry.type === "noether") {
    dailyFormula.style.display = "";
    dailyFormula.textContent = "„" + entry.quote + "\"";
  } else {
    dailyFormula.style.display = "none";
  }

  dailyFormula.onclick = () => openFormulaLightbox(entry);

  dailyJump.onclick = () => {
    if (pick.domain !== activeDomain) renderDomain(pick.domain);
    const targetId = `entry-${pick.domain}-${slugify(entry.name)}`;
    // Ha csoportos nézetben rejtve lenne egy összecsukott fejléc alatt,
    // a keresőn keresztül biztosan láthatóvá tesszük.
    searchBox.value = entry.name;
    searchQuery = entry.name;
    searchClear.classList.add("visible");
    activeCategory = "all";
    syncCategoryChips();
    applyFilter();
    requestAnimationFrame(() => {
      const el = document.getElementById(targetId);
      if (el) {
        if (el.scrollIntoView) el.scrollIntoView({behavior: "smooth", block: "center"});
        el.classList.add("highlight-flash");
        setTimeout(() => el.classList.remove("highlight-flash"), 2300);
      }
    });
  };

  dailyDismiss.onclick = () => {
    dailyCard.hidden = true;
    try { localStorage.setItem("tsz_daily_dismissed", key); } catch (e) {}
  };

  dailyCard.hidden = false;
}

function getFilteredEntries() {
  return rowElements.filter(r => !r.el.classList.contains("hidden"));
}
function renderDeck() {
  deckItems = getFilteredEntries();
  deckTotal.textContent = deckItems.length;
  if (deckItems.length === 0) {
    deckName.textContent = "Nincs találat";
    deckTag.textContent = ""; deckYear.textContent = ""; deckFormula.innerHTML = ""; deckWhy.textContent = "";
    deckPos.textContent = 0; deckPrev.disabled = true; deckNext.disabled = true; return;
  }
  deckPrev.disabled = false; deckNext.disabled = false;
  if (deckIndex >= deckItems.length) deckIndex = deckItems.length - 1;
  if (deckIndex < 0) deckIndex = 0;
  const r = deckItems[deckIndex];
  const entry = r.entry || (r.el && r._entry);
  // az entry-t a rowElements-ben tároljuk
  const e = r.entry;
  const domain = DOMAINS[activeDomain];
  const catColor = domain.categoryColors ? domain.categoryColors[e.category] : null;
  deckTag.textContent = e.tag;
  deckTag.style.color = catColor || "var(--tag-color)";
  const yr = extractYear(e);
  deckYear.textContent = yr < 0 ? ("Kr. e. " + Math.abs(yr) + ".") : String(yr);
  deckName.textContent = e.name;
  if (e.whyMore) {
    deckWhy.className = "why why-expand";
    deckWhy.tabIndex = 0;
    deckWhy.setAttribute("role", "button");
    deckWhy.setAttribute("aria-expanded", "false");
    deckWhy.innerHTML = '<span class="why-head">' + e.why + '</span><span class="why-more">' + e.whyMore + '</span><span class="why-hint">kattints a képlet magyarázatáért</span>';
    setupExpandableWhy(deckWhy);
  } else {
    deckWhy.className = "why";
    deckWhy.innerHTML = e.why;
  }
  if (e.illustration) {
    deckIllu.style.display = "flex";
    deckIllu.innerHTML = buildIllustration(e.illustration, catColor);
  } else {
    deckIllu.style.display = "none";
    deckIllu.innerHTML = "";
  }
  // Wiki gomb a decken
  let dw = document.getElementById("deckWiki");
  if (e.wiki) {
    if (!dw) { dw = document.createElement("button"); dw.id="deckWiki"; dw.className="icon-btn wiki-btn"; dw.setAttribute("aria-label","Tudj meg többet"); dw.innerHTML = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M12 11v5M12 7.5v.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>'; deckCard.querySelector(".deck-actions").appendChild(dw); }
    dw.style.display = "inline-flex";
    dw.onclick = () => window.open(e.wiki, "_blank", "noopener");
  } else if (dw) { dw.style.display = "none"; }

  // Szimuláció gomb a decken
  let dSim = document.getElementById("deckSim");
  const deckSlug = slugify(e.name);
  if (SIMULATION_TARGETS[deckSlug]) {
    const simKey = SIMULATION_TARGETS[deckSlug];
    if (!dSim) {
      dSim = document.createElement("button");
      dSim.id = "deckSim";
      dSim.className = "icon-btn sim-btn";
      dSim.setAttribute("aria-label", "Interaktív szimuláció");
      dSim.title = "Interaktív szimuláció indítása";
      dSim.innerHTML = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="6" width="18" height="12" rx="3.5" stroke="currentColor" stroke-width="1.6"/><circle cx="8" cy="12" r="1.8" fill="currentColor"/><path d="M14 10v4M12 12h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
      deckCard.querySelector(".deck-actions").appendChild(dSim);
    }
    dSim.style.display = "inline-flex";
    dSim.onclick = () => openSimulation(simKey);
  } else if (dSim) {
    dSim.style.display = "none";
  }
  const favKey = activeDomain + ":" + slugify(e.name);
  deckFav.classList.toggle("active", favorites.has(favKey));
  deckFav.onclick = () => { toggleFavorite(favKey, deckFav); };
  deckFormula.innerHTML = "";
  const texSource = e.type === "maxwell" ? e.equations[0] : (e.type === "noether" ? null : e.tex);
  if (texSource) {
    // safeKatex már kezeli a KaTeX-hiányos fallbacket (nyers TeX szöveg)
    try { safeKatex(texSource, deckFormula, {throwOnError: false, displayMode: true}); deckFormula.style.display = ""; }
    catch (err) {
      deckFormula.style.display = "";
      deckFormula.textContent = texSource.replace(/\\/g, "").replace(/[{}]/g, "").replace(/\$/g, "");
    }
  } else if (e.type === "noether") {
    deckFormula.style.display = ""; deckFormula.textContent = "„" + e.quote + "”";
  } else {
    deckFormula.style.display = "none";
  }
  deckFormula.onclick = () => openFormulaLightbox(e);
  deckJump.onclick = () => {
    // vissza a rangsor nézetre, és odaugrik az elemre
    const targetId = "entry-" + activeDomain + "-" + slugify(e.name);
    viewMode = "rank";
    [...viewSwitch.children].forEach(b => b.classList.toggle("active", b.dataset.view === "rank"));
    grid.hidden = false; deckView.hidden = true;
    renderGrid();
    requestAnimationFrame(() => {
      const el = document.getElementById(targetId);
      if (el) { if (el.scrollIntoView) el.scrollIntoView({behavior:"smooth", block:"center"}); el.classList.add("highlight-flash"); setTimeout(() => el.classList.remove("highlight-flash"), 2300); }
    });
  };
  deckPos.textContent = deckIndex + 1;
  saveDeckPos();
  deckCard.classList.remove("swap"); void deckCard.offsetWidth; deckCard.classList.add("swap");
}
function deckStep(d) {
  if (deckItems.length === 0) return;
  deckIndex = (deckIndex + d + deckItems.length) % deckItems.length;
  renderDeck();
  launchConfetti();
}
deckPrev.addEventListener("click", () => deckStep(-1));
deckNext.addEventListener("click", () => deckStep(1));
deckRand.addEventListener("click", () => { if (deckItems.length) { deckIndex = Math.floor(Math.random()*deckItems.length); renderDeck(); launchConfetti(); } });

/* ===== Konfitti a deck váltásnál ===== */
const confettiCanvas = document.getElementById("deckConfetti");
let confettiParticles = [];
let confettiRAF = null;

function launchConfetti() {
  if (!confettiCanvas) return;
  const rect = confettiCanvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  confettiCanvas.width = Math.max(1, rect.width * dpr);
  confettiCanvas.height = Math.max(1, rect.height * dpr);
  const ctx = confettiCanvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  // Domain színét követő paletta
  const cs = getComputedStyle(document.documentElement);
  const hl = cs.getPropertyValue("--highlight").trim() || "#e8b06a";
  const pr = cs.getPropertyValue("--primary").trim() || "#5b8dd9";
  const palette = [hl, pr, "#50ffbe", "#be8cff", "#f2cc8f"];
  const w = rect.width, h = rect.height;
  const cx = w / 2, cy = h * 0.42;
  confettiParticles = [];
  const count = 70;
  for (let i = 0; i < count; i++) {
    const ang = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 7;
    confettiParticles.push({
      x: cx, y: cy,
      vx: Math.cos(ang) * speed,
      vy: Math.sin(ang) * speed - 3,
      size: 4 + Math.random() * 5,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.4,
      color: palette[Math.floor(Math.random() * palette.length)],
      life: 1
    });
  }
  confettiCanvas.classList.add("active");
  if (confettiRAF) cancelAnimationFrame(confettiRAF);
  const start = performance.now();
  function frame(now) {
    const t = now - start;
    ctx.clearRect(0, 0, w, h);
    let alive = false;
    for (const p of confettiParticles) {
      p.vy += 0.22;            // gravitáció
      p.vx *= 0.99;
      p.x += p.vx; p.y += p.vy;
      p.rot += p.vr;
      p.life = Math.max(0, 1 - t / 900);
      if (p.life > 0 && p.y < h + 40) alive = true;
      ctx.save();
      ctx.globalAlpha = p.life;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    }
    if (alive && t < 1200) { confettiRAF = requestAnimationFrame(frame); }
    else { ctx.clearRect(0, 0, w, h); confettiCanvas.classList.remove("active"); confettiRAF = null; }
  }
  confettiRAF = requestAnimationFrame(frame);
}
document.addEventListener("keydown", (e) => {
  if (deckView.hidden || deckItems.length === 0) return;
  // gépelés közben (keresőmező) ne lapozzon a billentyű
  const typing = e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.isContentEditable);
  if (e.key === "ArrowRight") { if (!typing) deckStep(1); }
  else if (e.key === "ArrowLeft") { if (!typing) deckStep(-1); }
  else if (e.key === "f" || e.key === "F") { if (!typing) { e.preventDefault(); deckFav.click(); } }
  else if (e.key === "r" || e.key === "R") { if (!typing) { e.preventDefault(); deckRand.click(); } }
});
let deckTouchX = null;
deckCard.addEventListener("touchstart", (e) => { deckTouchX = e.changedTouches[0].clientX; }, {passive:true});
deckCard.addEventListener("touchend", (e) => {
  if (deckTouchX === null) return;
  const dx = e.changedTouches[0].clientX - deckTouchX;
  if (Math.abs(dx) > 40) deckStep(dx < 0 ? 1 : -1);
  deckTouchX = null;
}, {passive:true});

/* =========================================================
   ÉJSZAKAI ÉGBOLT — kedvencek csillagképe
   ========================================================= */
const constellationCanvas = document.getElementById("constellationBg");
const constellationLabel = (() => {
  let el = document.getElementById("constellationLabel");
  if (!el) {
    el = document.createElement("div");
    el.id = "constellationLabel";
    el.className = "constellation-label";
    document.body.appendChild(el);
  }
  return el;
})();
let constellationOn = false;
let constellationStars = [];
let constellationRAF = null;
let constellationHover = -1;

function loadNightSky() {
  try { return localStorage.getItem("tsz_nightsky_v1") === "1"; } catch (e) { return false; }
}
function saveNightSky(v) {
  try { localStorage.setItem("tsz_nightsky_v1", v ? "1" : "0"); } catch (e) {}
}

// Determinísztikus pozíció a kedvenc kulcsból (stabil, nem ugrál)
function starHash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return (h >>> 0);
}
function starPos(key) {
  const h = starHash(key);
  const x = 6 + (h % 880) / 1000 * 88;   // 6% .. 94%
  const y = 8 + ((h >> 11) % 880) / 1000 * 84; // 8% .. 92%
  return { x, y };
}

function findEntryByKey(key) {
  const idx = key.indexOf(":");
  const domainKey = key.slice(0, idx);
  const slug = key.slice(idx + 1);
  const domain = DOMAINS[domainKey];
  if (!domain) return null;
  for (const d of domain.data) {
    if (slugify(d.name) === slug) return { entry: d, domainKey };
  }
  return null;
}

function rebuildConstellation() {
  if (!constellationCanvas) return;
  constellationStars = [];
  for (const key of favorites) {
    const found = findEntryByKey(key);
    if (!found) continue;
    const p = starPos(key);
    const tex = found.entry.type === "maxwell" ? (found.entry.equations && found.entry.equations[0]) :
                (found.entry.type === "noether" ? null : found.entry.tex);
    constellationStars.push({
      key, x: p.x, y: p.y,
      name: found.entry.name,
      tex: tex ? tex.replace(/\\/g, "").replace(/[{}]/g, "").replace(/\$/g, "") : "",
      phase: (starHash(key) % 100) / 100 * Math.PI * 2
    });
  }
  if (constellationOn && constellationStars.length === 0) {
    showToast("Még nincsenek kedvenceid — jelölj meg párat a csillaggal!");
  }
  if (constellationOn && !constellationRAF) drawConstellation();
}

function drawConstellation() {
  if (!constellationCanvas) return;
  const dpr = window.devicePixelRatio || 1;
  const w = window.innerWidth, h = window.innerHeight;
  if (constellationCanvas.width !== w * dpr || constellationCanvas.height !== h * dpr) {
    constellationCanvas.width = w * dpr;
    constellationCanvas.height = h * dpr;
  }
  const ctx = constellationCanvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);

  // Auróra-szín a csillagképhez (domain színét követi a testen keresztül)
  const cs = getComputedStyle(document.documentElement);
  const hl = cs.getPropertyValue("--highlight").trim() || "#e8b06a";
  const pr = cs.getPropertyValue("--primary").trim() || "#5b8dd9";

  // Hullámos összekötő vonalak a csillagok között (konstelláció)
  if (constellationStars.length > 1) {
    ctx.save();
    ctx.strokeStyle = "rgba(140,170,255,0.18)";
    ctx.lineWidth = 1;
    for (let i = 0; i < constellationStars.length - 1; i++) {
      const a = constellationStars[i], b = constellationStars[i + 1];
      const ax = a.x / 100 * w, ay = a.y / 100 * h;
      const bx = b.x / 100 * w, by = b.y / 100 * h;
      const mx = (ax + bx) / 2, my = (ay + by) / 2 - 26;
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.quadraticCurveTo(mx, my, bx, by);
      ctx.stroke();
    }
    ctx.restore();
  }

  // Csillagok (pulzáló glow)
  const t = performance.now() / 1000;
  constellationStars.forEach((s, i) => {
    const px = s.x / 100 * w, py = s.y / 100 * h;
    const pulse = 0.6 + 0.4 * Math.sin(t * 1.6 + s.phase);
    const r = 2.4 + pulse * 2.2;
    const isHover = i === constellationHover;
    const rr = isHover ? r + 4 : r;
    const grad = ctx.createRadialGradient(px, py, 0, px, py, rr * 5);
    grad.addColorStop(0, isHover ? hl : "rgba(235,240,255,0.95)");
    grad.addColorStop(0.3, isHover ? hl : "rgba(160,190,255,0.55)");
    grad.addColorStop(1, "rgba(120,150,220,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(px, py, rr * 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = isHover ? "#fff" : "rgba(245,248,255,0.95)";
    ctx.beginPath();
    ctx.arc(px, py, isHover ? 3 : 2, 0, Math.PI * 2);
    ctx.fill();
  });

  if (constellationOn) constellationRAF = requestAnimationFrame(drawConstellation);
  else { ctx.clearRect(0, 0, w, h); constellationRAF = null; }
}

function scrollToEntry(domainKey, slug) {
  // Domain váltás
  if (domainKey !== activeDomain) {
    const dbtn = [...domainSwitch.children].find(b => b.dataset.domain === domainKey);
    if (dbtn) dbtn.click();
  }
  // Rangsor nézet
  if (viewMode !== "rank") {
    const vbtn = [...viewSwitch.children].find(b => b.dataset.view === "rank");
    if (vbtn) vbtn.click();
  }
  requestAnimationFrame(() => {
    const el = document.getElementById("entry-" + domainKey + "-" + slug);
    if (el) {
      if (el.scrollIntoView) el.scrollIntoView({behavior:"smooth", block:"center"});
      el.classList.add("highlight-flash");
      setTimeout(() => el.classList.remove("highlight-flash"), 2300);
    }
  });
}

/* ================= Univerzum-térkép (star map) ================= */
const starMapView = document.getElementById("starMapView");
const starMapCanvas = document.getElementById("starMapCanvas");
const starMapLabel = document.getElementById("starMapLabel");
const starMapHint = document.getElementById("starMapHint");
const starMapReset = document.getElementById("starMapReset");
let starMapRAF = null;
let starMapStars = [];      // {key,domain,slug,x,y,r,color,name,tex,phase}
let starMapLinks = [];      // [i,j] indexek a starMapStars-ban
let smView = { x: 0, y: 0, scale: 1 };   // pan/zoom state (world->screen)
let smHover = -1;
let smDrag = null;          // {sx,sy,ox,oy}
let smMoved = false;

// determinisztikus pseudo-random a csillagok helyéhez (stabil elrendezés)
function smRand(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

function buildStarMap() {
  if (!starMapCanvas) return;
  starMapStars = [];
  starMapLinks = [];
  const domains = [
    { key: "matek",     cx: 0.22, cy: 0.50, hue: "primary" },
    { key: "fizika",    cx: 0.50, cy: 0.42, hue: "highlight" },
    { key: "informatika", cx: 0.78, cy: 0.54, hue: "secondary" }
  ];
  const colorByCat = {};
  // gyűjtjük a kategória-színeket domainenként
  let gi = 0;
  for (const d of domains) {
    const dom = DOMAINS[d.key];
    for (const cat of dom.categoryOrder) {
      colorByCat[d.key + ":" + cat] = dom.categoryColors[cat] || "#9fb4ff";
    }
    const total = dom.data.length;
    const rng = smRand(1000 + gi * 7);
    dom.data.forEach((entry, idx) => {
      const rankFrac = idx / Math.max(1, total - 1);   // 0 (legjobb) .. 1
      const ang = rng() * Math.PI * 2;
      const rad = (0.10 + 0.30 * rng()) * (1 - 0.5 * rankFrac);
      const x = d.cx + Math.cos(ang) * rad;
      const y = d.cy + Math.sin(ang) * rad * 0.85;
      const r = 1.8 + (1 - rankFrac) * 3.4;            // rang szerinti méret
      const tex = entry.type === "maxwell" ? (entry.equations && entry.equations[0]) : entry.tex;
      const slug = slugify(entry.name); // a JSON-okban nincs slug mező → slugify kell, különben minden kulcs "undefined" lenne
      starMapStars.push({
        key: d.key + ":" + slug, domain: d.key, slug: slug,
        x: x * 100, y: y * 100, r,
        color: colorByCat[d.key + ":" + entry.category] || "#9fb4ff",
        name: entry.name,
        tex: tex ? tex.replace(/\\/g,"").replace(/[{}]/g,"").replace(/\$/g,"") : "",
        phase: rng() * Math.PI * 2
      });
    });
    gi++;
  }
  // related linkek (csak ugyanazon a domainen belül, hogy ne legyen áttekinthetetlen)
  const keyToIdx = {};
  starMapStars.forEach((s, i) => { keyToIdx[s.key] = i; });
  starMapStars.forEach((s, i) => {
    const entry = findEntryByKey(s.key);
    if (!entry || !entry.related) return;
    entry.related.forEach(rel => {
      if (rel.domain !== s.domain) return;
      const j = keyToIdx[rel.domain + ":" + slugify(rel.name)];
      if (j !== undefined && j > i) starMapLinks.push([i, j]);
    });
  });

  // kezdeti nézet: minden látszódjon
  const cv = starMapCanvas;
  const w = window.innerWidth || cv.clientWidth || 800, h = window.innerHeight || cv.clientHeight || 600;
  smView = { x: 0, y: 0, scale: Math.min(w, h) / 100 * 0.92 };
  smHover = -1;
  if (!starMapRAF) requestAnimationFrame(drawStarMap);
}

function drawStarMap() {
  if (!starMapCanvas || starMapView.hidden) return;
  const dpr = window.devicePixelRatio || 1;
  const w = window.innerWidth || starMapCanvas.clientWidth || 800;
  const h = window.innerHeight || starMapCanvas.clientHeight || 600;
  if (w === 0 || h === 0) { starMapRAF = requestAnimationFrame(drawStarMap); return; }
  if (starMapCanvas.width !== Math.floor(w * dpr) || starMapCanvas.height !== Math.floor(h * dpr)) {
    starMapCanvas.width = Math.floor(w * dpr); starMapCanvas.height = Math.floor(h * dpr);
  }
  const ctx = starMapCanvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);

  const t = performance.now() / 1000;
  const toScreen = (wx, wy) => ({ x: w/2 + (wx - 50) * smView.scale + smView.x, y: h/2 + (wy - 50) * smView.scale + smView.y });

  // related vonalak (fátyol)
  ctx.lineWidth = 1;
  starMapLinks.forEach(([i, j]) => {
    const a = toScreen(starMapStars[i].x, starMapStars[i].y);
    const b = toScreen(starMapStars[j].x, starMapStars[j].y);
    const hl = (i === smHover || j === smHover);
    ctx.strokeStyle = hl ? "rgba(232,176,106,0.5)" : "rgba(140,170,255,0.06)";
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
  });

  // csillagok
  starMapStars.forEach((s, i) => {
    const p = toScreen(s.x, s.y);
    if (p.x < -40 || p.x > w + 40 || p.y < -40 || p.y > h + 40) return;
    const pulse = 0.65 + 0.35 * Math.sin(t * 1.4 + s.phase);
    const isHover = (i === smHover);
    const baseR = s.r * (isHover ? 1.6 : 1) * (0.85 + 0.3 * pulse);
    const glow = baseR * (isHover ? 6 : 3.2);
    const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glow);
    grad.addColorStop(0, isHover ? "#fff" : s.color);
    grad.addColorStop(0.35, s.color + (isHover ? "" : "88"));
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.arc(p.x, p.y, glow, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = isHover ? "#fff" : s.color;
    ctx.beginPath(); ctx.arc(p.x, p.y, isHover ? 2.6 : 1.6, 0, Math.PI * 2); ctx.fill();
  });

  starMapRAF = requestAnimationFrame(drawStarMap);
}

function starMapHitTest(mx, my) {
  const w = window.innerWidth || starMapCanvas.clientWidth;
  const h = window.innerHeight || starMapCanvas.clientHeight;
  const toScreen = (wx, wy) => ({ x: w/2 + (wx - 50) * smView.scale + smView.x, y: h/2 + (wy - 50) * smView.scale + smView.y });
  for (let i = starMapStars.length - 1; i >= 0; i--) {
    const s = starMapStars[i];
    const p = toScreen(s.x, s.y);
    const rr = Math.max(8, s.r * smView.scale * 0.6 + 6);
    if ((mx - p.x) ** 2 + (my - p.y) ** 2 <= rr * rr) return i;
  }
  return -1;
}

function handleStarTap(mx, my) {
  const i = starMapHitTest(mx, my);
  if (i < 0) return;
  const s = starMapStars[i];
  hideStarLabel();
  starMapView.hidden = true;        // térkép elrejtése, rangsor nézetbe ugrik
  if (starMapRAF) { cancelAnimationFrame(starMapRAF); starMapRAF = null; }
  scrollToEntry(s.domain, s.slug);
}

function showStarLabel(i, mx, my) {
  const s = starMapStars[i];
  starMapLabel.innerHTML = `<span class="sl-name">${s.name}</span>` + (s.tex ? `<span class="sl-tex">${s.tex}</span>` : "");
  starMapLabel.style.left = mx + "px";
  starMapLabel.style.top = my + "px";
  starMapLabel.hidden = false;
}
function hideStarLabel() { starMapLabel.hidden = true; }

if (starMapCanvas) {
  starMapCanvas.addEventListener("mousedown", (e) => {
    smDrag = { sx: e.clientX, sy: e.clientY, ox: smView.x, oy: smView.y };
    smMoved = false;
  });
  window.addEventListener("mousemove", (e) => {
    if (!starMapView || starMapView.hidden) return;
    if (smDrag) {
      smView.x = smDrag.ox + (e.clientX - smDrag.sx);
      smView.y = smDrag.oy + (e.clientY - smDrag.sy);
      if (Math.abs(e.clientX - smDrag.sx) + Math.abs(e.clientY - smDrag.sy) > 4) smMoved = true;
      return;
    }
    const rect = starMapCanvas.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;
    const i = starMapHitTest(mx, my);
    if (i !== smHover) {
      smHover = i;
      starMapCanvas.style.cursor = i >= 0 ? "pointer" : "grab";
    }
    if (i >= 0) showStarLabel(i, mx, my); else hideStarLabel();
  });
  window.addEventListener("mouseup", () => { smDrag = null; });
  starMapCanvas.addEventListener("click", (e) => {
    const rect = starMapCanvas.getBoundingClientRect();
    handleStarTap(e.clientX - rect.left, e.clientY - rect.top);
  });
  starMapCanvas.addEventListener("wheel", (e) => {
    e.preventDefault();
    const rect = starMapCanvas.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;
    const factor = e.deltaY < 0 ? 1.12 : 0.89;
    const newScale = Math.max(0.3, Math.min(8, smView.scale * factor));
    // zoom az egérpont körül
    const w = rect.width, h = rect.height;
    const wx = (mx - w/2 - smView.x) / smView.scale + 50;
    const wy = (my - h/2 - smView.y) / smView.scale + 50;
    smView.x = mx - w/2 - (wx - 50) * newScale;
    smView.y = my - h/2 - (wy - 50) * newScale;
    smView.scale = newScale;
  }, { passive: false });
  // touch (egy ujjal húz, két ujjal zoom)
  let touchMode = null, touchStart = null, pinchDist = 0;
  starMapCanvas.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
      touchMode = "pan";
      touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY, ox: smView.x, oy: smView.y };
      smMoved = false;
    } else if (e.touches.length === 2) {
      touchMode = "zoom";
      pinchDist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
    }
  }, { passive: false });
  starMapCanvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
    if (touchMode === "pan" && e.touches.length === 1) {
      const t0 = e.touches[0];
      smView.x = touchStart.ox + (t0.clientX - touchStart.x);
      smView.y = touchStart.oy + (t0.clientY - touchStart.y);
      if (Math.abs(t0.clientX - touchStart.x) + Math.abs(t0.clientY - touchStart.y) > 10) smMoved = true;
    } else if (touchMode === "zoom" && e.touches.length === 2) {
      const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      const factor = d / Math.max(1, pinchDist);
      smView.scale = Math.max(0.3, Math.min(8, smView.scale * factor));
      pinchDist = d;
    }
  }, { passive: false });
  starMapCanvas.addEventListener("touchend", (e) => {
    if (touchMode === "pan" && !smMoved && e.changedTouches.length) {
      const rect = starMapCanvas.getBoundingClientRect();
      const mx = e.changedTouches[0].clientX - rect.left, my = e.changedTouches[0].clientY - rect.top;
      handleStarTap(mx, my);
    }
    touchMode = null;
  });
  starMapReset.addEventListener("click", () => {
    const w = starMapCanvas.clientWidth || window.innerWidth, h = starMapCanvas.clientHeight || window.innerHeight;
    smView = { x: 0, y: 0, scale: Math.min(w, h) / 100 * 0.92 };
  });
}

function openStarMap() {
  starMapView.hidden = false;
  grid.hidden = true;
  deckView.hidden = true;
  closeQuiz && closeQuiz();
  hideStarLabel();
  if (starMapHint) starMapHint.classList.remove("fade");
  setTimeout(() => { if (starMapHint) starMapHint.classList.add("fade"); }, 4200);
  buildStarMap();
}
function closeStarMap() {
  starMapView.hidden = true;
  if (starMapRAF) { cancelAnimationFrame(starMapRAF); starMapRAF = null; }
  hideStarLabel();
}

function setNightSky(on) {
  constellationOn = on;
  saveNightSky(on);
  constellationCanvas.classList.toggle("on", on);
  document.getElementById("nightSkyBtn").classList.toggle("active", on);
  document.getElementById("nightSkyBtn").setAttribute("aria-pressed", String(on));
  if (on) { rebuildConstellation(); if (constellationStars.length) drawConstellation(); }
  else { if (constellationRAF) { cancelAnimationFrame(constellationRAF); constellationRAF = null; } ctx_clear(); }
}
function ctx_clear() { if (constellationCanvas) { const c = constellationCanvas.getContext("2d"); c.clearRect(0,0,constellationCanvas.width,constellationCanvas.height); } }

// Hover / kattintás a canvas-on
if (constellationCanvas) {
  constellationCanvas.addEventListener("mousemove", (e) => {
    if (!constellationOn) return;
    const w = window.innerWidth, h = window.innerHeight;
    let hit = -1;
    constellationStars.forEach((s, i) => {
      const px = s.x / 100 * w, py = s.y / 100 * h;
      if (Math.hypot(e.clientX - px, e.clientY - py) < 16) hit = i;
    });
    constellationHover = hit;
    if (hit >= 0) {
      const s = constellationStars[hit];
      constellationLabel.innerHTML = s.name + (s.tex ? `<span class="cl-formula">${s.tex}</span>` : "");
      constellationLabel.style.left = s.x / 100 * w + "px";
      constellationLabel.style.top = s.y / 100 * h + "px";
      constellationLabel.classList.add("show");
      constellationCanvas.style.cursor = "pointer";
    } else {
      constellationLabel.classList.remove("show");
      constellationCanvas.style.cursor = "default";
    }
  });
  constellationCanvas.addEventListener("click", (e) => {
    if (!constellationOn || constellationHover < 0) return;
    const s = constellationStars[constellationHover];
    const key = s.key;
    const idx = key.indexOf(":");
    scrollToEntry(key.slice(0, idx), key.slice(idx + 1));
  });
  constellationCanvas.addEventListener("mouseleave", () => {
    constellationHover = -1;
    constellationLabel.classList.remove("show");
  });
  window.addEventListener("resize", () => { if (constellationOn) drawConstellation(); });
}

document.getElementById("nightSkyBtn").addEventListener("click", () => {
  setNightSky(!constellationOn);
  if (constellationOn && constellationStars.length === 0) {
    showToast("Még nincsenek kedvenceid — jelölj meg párat a ⭐ csillaggal!");
  }
});


/* =========================================================
   JÁTÉK MÓD — "Tippeld meg a képletet"
   ========================================================= */
const quizOverlay = document.getElementById("quizOverlay");
const quizPanel = document.getElementById("quizPanel");
let quizActive = false;
let quizScore = 0;
let quizRound = 0;
const QUIZ_ROUNDS = 10;
let quizCurrent = null;      // {entry, domainKey, options:[...], correctIndex}
let quizAnswered = false;

function texForEntry(e) {
  if (e.type === "maxwell") return e.equations && e.equations[0] ? e.equations[0] : null;
  if (e.type === "noether") return null; // idézet, nem képlet
  return e.tex || null;
}

function quizPool() {
  // Csak azok a tételek, amelyeknek van képletük (tex / equations)
  const pool = [];
  Object.keys(DOMAINS).forEach(dk => {
    DOMAINS[dk].data.forEach(d => {
      if (texForEntry(d)) pool.push({ entry: d, domainKey: dk });
    });
  });
  return pool;
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function openQuiz() {
  quizActive = true;
  quizScore = 0;
  quizRound = 0;
  quizOverlay.classList.add("visible");
  quizOverlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  quizNextRound();
}

function closeQuiz() {
  quizActive = false;
  quizOverlay.classList.remove("visible");
  quizOverlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function quizNextRound() {
  if (quizRound >= QUIZ_ROUNDS) { quizShowSummary(); return; }
  const pool = quizPool();
  if (pool.length < 4) { quizShowSummary(); return; }
  const correct = pool[Math.floor(Math.random() * pool.length)];
  // 3 ál-képlet ugyanarról a domainről ha lehet, különben bármely más tételről
  const sameDomain = pool.filter(p => p.domainKey === correct.domainKey && p.entry !== correct.entry && texForEntry(p.entry));
  const others = shuffle(sameDomain.length >= 3 ? sameDomain : pool.filter(p => p.entry !== correct.entry));
  const distractors = others.slice(0, 3).map(p => ({ tex: texForEntry(p.entry), entry: p.entry }));
  const options = shuffle([
    { tex: texForEntry(correct.entry), entry: correct.entry, correct: true },
    ...distractors.map(d => ({ ...d, correct: false }))
  ]);
  quizCurrent = { entry: correct.entry, domainKey: correct.domainKey, options, correctIndex: options.findIndex(o => o.correct) };
  quizAnswered = false;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const e = quizCurrent.entry;
  const domain = DOMAINS[quizCurrent.domainKey];
  const catColor = domain.categoryColors ? domain.categoryColors[e.category] : null;
  const illu = e.illustration ? `<div class="quiz-illu">${buildIllustration(e.illustration, catColor)}</div>` : "";
  quizPanel.innerHTML = `
    <div class="quiz-head">
      <div class="quiz-title">Tippeld meg a <b>képletet</b></div>
      <div class="quiz-score">Pont: <b id="quizScore">${quizScore}</b> / ${QUIZ_ROUNDS}</div>
    </div>
    <div class="quiz-round">${quizRound + 1}. kör / ${QUIZ_ROUNDS}</div>
    <div class="quiz-name">${e.name}</div>
    <div class="quiz-tag">${e.tag || ""}</div>
    <div class="quiz-why">${e.why}</div>
    ${illu}
    <div class="quiz-formula-mystery" id="quizMystery">？ ？ ？</div>
    <div class="quiz-options" id="quizOptions"></div>
    <div class="quiz-feedback" id="quizFeedback"></div>
    <div class="quiz-foot">
      <button type="button" class="quiz-quit" id="quizQuit">Kilépés</button>
      <button type="button" class="quiz-next" id="quizNext" hidden>Következő →</button>
    </div>`;
  const optsEl = document.getElementById("quizOptions");
  quizCurrent.options.forEach((o, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "quiz-opt";
    btn.dataset.idx = i;
    if (window.katex) {
      const span = document.createElement("span");
      safeKatex(o.tex, span, { throwOnError: false, displayMode: false });
      btn.appendChild(span);
    } else {
      btn.textContent = o.tex.replace(/\\/g, "").replace(/[{}]/g, "").replace(/\$/g, "");
    }
    btn.addEventListener("click", () => quizAnswer(i));
    optsEl.appendChild(btn);
  });
  document.getElementById("quizQuit").addEventListener("click", closeQuiz);
  document.getElementById("quizNext").addEventListener("click", () => { quizRound++; quizNextRound(); });
}

function quizAnswer(idx) {
  if (quizAnswered) return;
  quizAnswered = true;
  const opts = document.getElementById("quizOptions").children;
  const correctIdx = quizCurrent.correctIndex;
  for (let i = 0; i < opts.length; i++) {
    opts[i].disabled = true;
    if (i === correctIdx) opts[i].classList.add("correct");
    else if (i === idx) opts[i].classList.add("wrong");
  }
  const mystery = document.getElementById("quizMystery");
  // Képlet felfedése
  if (window.katex) {
    mystery.classList.add("revealed");
    mystery.innerHTML = "";
    safeKatex(quizCurrent.options[correctIdx].tex, mystery, { throwOnError: false, displayMode: true });
  } else {
    mystery.classList.add("revealed");
    mystery.textContent = quizCurrent.options[correctIdx].tex.replace(/\\/g, "").replace(/[{}]/g, "").replace(/\$/g, "");
  }
  const fb = document.getElementById("quizFeedback");
  if (idx === correctIdx) {
    quizScore++;
    document.getElementById("quizScore").textContent = quizScore;
    fb.textContent = "✔ Helyes! +1 pont";
    fb.className = "quiz-feedback ok";
  } else {
    fb.textContent = "✘ Nem talált — ez lett volna a helyes.";
    fb.className = "quiz-feedback no";
  }
  document.getElementById("quizNext").hidden = false;
}

function quizShowSummary() {
  const pct = Math.round((quizScore / QUIZ_ROUNDS) * 100);
  let msg = "";
  if (pct === 100) msg = "Tökéletes! Te vagy a tudományos szépségek mestere.";
  else if (pct >= 70) msg = "Szép teljesítmény — látszik, hogy jártas vagy a szépségekben.";
  else if (pct >= 40) msg = "Ígéretes. Nézz vissza a Lapozó módba, és próbáld újra!";
  else msg = "Gyakorolj még — a Lapozó mód a barátod.";
  quizPanel.innerHTML = `
    <div class="quiz-summary">
      <h3>Vége a menetnek!</h3>
      <div class="big">${quizScore} / ${QUIZ_ROUNDS}</div>
      <p>${msg}</p>
      <div class="quiz-foot" style="justify-content:center;">
        <button type="button" class="quiz-quit" id="quizQuit2">Bezárás</button>
        <button type="button" class="quiz-next" id="quizAgain">Újra játszom</button>
      </div>
    </div>`;
  document.getElementById("quizQuit2").addEventListener("click", closeQuiz);
  document.getElementById("quizAgain").addEventListener("click", () => { quizScore = 0; quizRound = 0; quizNextRound(); });
}

// Kilépés a játékból Escape-szel, ha a quiz nyitva van (ne ütközzön a deck arrow-kkal)
document.addEventListener("keydown", (e) => {
  if (quizActive && e.key === "Escape") closeQuiz();
});

/* =========================================================
   OSZD MEG — social share menü
   ========================================================= */
const shareBackdrop = document.getElementById("shareBackdrop");
const shareMenu = document.getElementById("shareMenu");
let shareMenuOpen = false;

function shareText(entry, domainKey) {
  const tex = texForEntry(entry);
  const texPlain = tex ? tex.replace(/\\/g, "").replace(/[{}]/g, "").replace(/\$/g, "").trim() : "";
  const base = `Halhatatlan tudományos szépség: ${entry.name}`;
  const formula = texPlain ? ` — ${texPlain}` : "";
  return `${base}${formula} · #TudomanyosSzepsegek`;
}

function shareUrl(entry) {
  return entry.wiki || "https://en.wikipedia.org/wiki/List_of_scientific_equations_named_after_people";
}

function buildShareMenu(entry, domainKey, anchorEl) {
  const text = encodeURIComponent(shareText(entry, domainKey));
  const url = encodeURIComponent(shareUrl(entry));
  const name = encodeURIComponent(entry.name);
  const targets = [
    { label: "X (Twitter)", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z", href: `https://twitter.com/intent/tweet?text=${text}&url=${url}` },
    { label: "Facebook", icon: "M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0022 12z", href: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
    { label: "Reddit", icon: "M14 9.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM9 9.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM12 2a10 10 0 00-9.3 6.3c-.2.6.28 1.2.9 1.2h16.8c.62 0 1.1-.6.9-1.2A10 10 0 0012 2zm-.5 13.8l-1.6-1.5a3.4 3.4 0 01-1.9-1.2.8.8 0 011.3-.9 1.8 1.8 0 001 1.1l1.1 1a4 4 0 005 0l1.1-1a1.8 1.8 0 001 1.1.8.8 0 01.9 1.3 3.4 3.4 0 01-1.9 1.2l-1.6 1.5a1 1 0 01-1.4-1.4l.7-.7H11.2l.7.7a1 1 0 01-1.4 1.4z", href: `https://www.reddit.com/submit?url=${url}&title=${name}` },
    { label: "WhatsApp", icon: "M17.5 14.4l-2.3-.6a.8.8 0 00-.8.2l-1 1a7 7 0 01-3.4-3.4l1-1a.8.8 0 00.2-.8l-.6-2.3a.8.8 0 00-.8-.6H7.7A3 3 0 004.7 14c1.4 3.4 4 6 7.4 7.4a3 3 0 003.6-2.9v-1.8a.8.8 0 00-.6-.8z", href: `https://api.whatsapp.com/send?text=${text}%20${url}` },
  ];
  shareMenu.innerHTML = "";
  targets.forEach(t => {
    const a = document.createElement("a");
    a.href = t.href;
    a.target = "_blank";
    a.rel = "noopener";
    a.setAttribute("role", "menuitem");
    a.innerHTML = `<svg class="sm-ico" viewBox="0 0 24 24" fill="currentColor"><path d="${t.icon}"/></svg><span>${t.label}</span>`;
    a.addEventListener("click", () => { closeShareMenu(); });
    shareMenu.appendChild(a);
  });
  const sep = document.createElement("div");
  sep.className = "sm-sep";
  shareMenu.appendChild(sep);
  const copyBtn = document.createElement("button");
  copyBtn.type = "button";
  copyBtn.setAttribute("role", "menuitem");
  copyBtn.innerHTML = `<svg class="sm-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 15l6-6M10 6l1-1a3.5 3.5 0 015 5l-1 1M14 18l-1 1a3.5 3.5 0 01-5-5l1-1" stroke-linecap="round"/></svg><span>Link másolása</span>`;
  copyBtn.addEventListener("click", () => {
    const link = shareUrl(entry);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(link).then(() => showToast("Link másolva!")).catch(() => showToast("Nem sikerült másolni."));
    } else {
      showToast(link);
    }
    closeShareMenu();
  });
  shareMenu.appendChild(copyBtn);

  // Pozicionálás az anchor gomb alatt
  shareMenu.classList.add("visible");
  shareBackdrop.classList.add("visible");
  const rect = anchorEl.getBoundingClientRect();
  const mw = shareMenu.offsetWidth, mh = shareMenu.offsetHeight;
  let left = rect.left;
  if (left + mw > window.innerWidth - 8) left = window.innerWidth - mw - 8;
  if (left < 8) left = 8;
  let top = rect.bottom + 6;
  if (top + mh > window.innerHeight - 8) top = rect.top - mh - 6;
  shareMenu.style.left = left + "px";
  shareMenu.style.top = top + "px";
  shareMenuOpen = true;
}

function closeShareMenu() {
  shareMenu.classList.remove("visible");
  shareBackdrop.classList.remove("visible");
  shareMenuOpen = false;
}
shareBackdrop.addEventListener("click", closeShareMenu);

async function shareEntry(entry, domainKey, anchorEl) {
  // Mobilon natív megosztás, ha elérhető
  if (navigator.share) {
    try {
      const link = shareUrl(entry);
      await navigator.share({ title: entry.name, text: shareText(entry, domainKey), url: link });
      showToast("Megosztva!");
      return;
    } catch (e) {
      if (e && e.name === "AbortError") return;
      // natív nem sikerült → menu-re váltunk
    }
  }
  buildShareMenu(entry, domainKey, anchorEl);
}

/* ===== Heti kiemelt (Weekly Spotlight) — lélegzetelállító hőskártya ===== */
function isoWeekKey(d) {
  // Hétfőtől kezdődő ISO-hét azonosító: pl. "2026-W32"
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = (date.getUTCDay() + 6) % 7; // hétfő = 0
  date.setUTCDate(date.getUTCDate() - dayNum + 3); // az adott hét csütörtöke
  const firstThursday = new Date(Date.UTC(date.getUTCFullYear(), 0, 4));
  const firstDayNum = (firstThursday.getUTCDay() + 6) % 7;
  firstThursday.setUTCDate(firstThursday.getUTCDate() - firstDayNum + 3);
  const week = 1 + Math.round((date - firstThursday) / (7 * 24 * 3600 * 1000));
  return date.getUTCFullYear() + "-W" + String(week).padStart(2, "0");
}

let weeklyCurrent = null; // { entry, domain }

function renderWeeklySpotlight() {
  if (!weeklyCard) return;
  const today = new Date();
  const wk = isoWeekKey(today);
  let dismissed = null;
  try { dismissed = localStorage.getItem("tsz_weekly_dismissed"); } catch (e) {}
  if (dismissed === wk) { weeklyCard.hidden = true; return; }

  const pool = [
    ...MATEK_DATA.map(e => ({ entry: e, domain: "matek" })),
    ...FIZIKA_DATA.map(e => ({ entry: e, domain: "fizika" })),
    ...INFORMATIKA_DATA.map(e => ({ entry: e, domain: "informatika" })) // "informatika" = a DOMAINS/grid kulcs; a "info" fantomkedvencet és elcsúszó ugrást okozott
  ];
  if (!pool.length) return;

  // Determináz: ISO-hétszám -> stabil index (minden felhasználó ugyanazt látja a héten)
  const weekNum = parseInt(wk.split("-W")[1], 10);
  const pick = pool[(weekNum * 7 + today.getFullYear()) % pool.length];
  weeklyCurrent = pick;
  const entry = pick.entry;

  weeklyWeek.textContent = "🗓 " + wk.replace("-", " ").toUpperCase();
  weeklyName.textContent = entry.name;
  weeklyTag.textContent = entry.tag || "";
  weeklyWhy.innerHTML = entry.why || "";

  // Képlet (ugyanaz a logika, mint a daily-nél)
  weeklyFormula.innerHTML = "";
  const texSource = entry.type === "maxwell" ? entry.equations[0] : (entry.type === "noether" ? null : entry.tex);
  if (texSource && window.katex) {
    try { safeKatex(texSource, weeklyFormula, { throwOnError: false, displayMode: true }); weeklyFormula.style.display = ""; }
    catch (e) { weeklyFormula.style.display = "none"; }
  } else if (entry.type === "noether") {
    weeklyFormula.style.display = ""; weeklyFormula.textContent = "„" + entry.quote + "\"";
  } else {
    weeklyFormula.style.display = "none";
  }

  // Kedvenc állapot
  const favKey = pick.domain + ":" + slugify(entry.name);
  weeklyFav.classList.toggle("on", favorites.has(favKey));
  weeklyFav.textContent = favorites.has(favKey) ? "★ Kedvenc" : "☆ Kedvenc";

  weeklyCard.hidden = false;
  // Ünnepi meteor-zápor + banner (csak ha nem ma hétfőnként már látta)
  launchWeeklyMeteors();
}

function launchWeeklyMeteors() {
  if (!weeklyMeteor) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const canvas = weeklyMeteor;
  const ctx = canvas.getContext("2d");
  function resize() { canvas.width = window.innerWidth * (window.devicePixelRatio || 1); canvas.height = window.innerHeight * (window.devicePixelRatio || 1); }
  resize();
  window.addEventListener("resize", resize);

  const meteors = [];
  const N = 26;
  for (let i = 0; i < N; i++) meteors.push(spawnMeteor(canvas, true));
  canvas.classList.add("on");
  if (weeklyBanner) { weeklyBanner.classList.add("show"); setTimeout(() => weeklyBanner.classList.remove("show"), 3200); }

  let raf = null, startT = performance.now();
  function frame(t) {
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    let alive = 0;
    for (const m of meteors) {
      m.x += m.vx; m.y += m.vy; m.life -= 1;
      if (m.life <= 0 || m.y > h + 50 || m.x > w + 50) { Object.assign(m, spawnMeteor(canvas, false)); continue; }
      alive++;
      const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.trail * m.dx, m.y - m.trail * m.dy);
      grad.addColorStop(0, "rgba(255,255,255,0.95)");
      grad.addColorStop(0.4, "rgba(233,200,119,0.6)");
      grad.addColorStop(1, "rgba(233,200,119,0)");
      ctx.strokeStyle = grad; ctx.lineWidth = m.size; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(m.x - m.trail * m.dx, m.y - m.trail * m.dy); ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,0.95)";
      ctx.beginPath(); ctx.arc(m.x, m.y, m.size * 0.6, 0, Math.PI * 2); ctx.fill();
    }
    if (alive > 0 && t - startT < 4000) raf = requestAnimationFrame(frame);
    else { canvas.classList.remove("on"); ctx.clearRect(0, 0, w, h); }
  }
  if (raf) cancelAnimationFrame(raf);
  raf = requestAnimationFrame(frame);
}

function spawnMeteor(canvas, initial) {
  const w = canvas.width, h = canvas.height;
  const startX = Math.random() * w * 0.9;
  const startY = initial ? Math.random() * h * -0.5 : Math.random() * h * -0.3;
  const ang = (Math.PI / 6) + (Math.random() - 0.5) * 0.5; // ~30°-os lejtés
  const speed = 6 + Math.random() * 8;
  const dx = Math.cos(ang), dy = Math.sin(ang);
  return {
    x: startX, y: startY,
    vx: dx * speed, vy: dy * speed,
    dx, dy, size: 1.2 + Math.random() * 1.8,
    trail: 14 + Math.random() * 16,
    life: 60 + Math.random() * 60
  };
}

if (weeklyJump) weeklyJump.addEventListener("click", () => {
  if (!weeklyCurrent) return;
  scrollToEntry(weeklyCurrent.domain, slugify(weeklyCurrent.entry.name));
});
if (weeklyFav) weeklyFav.addEventListener("click", () => {
  if (!weeklyCurrent) return;
  const key = weeklyCurrent.domain + ":" + slugify(weeklyCurrent.entry.name);
  // Helyi gomb frissítése (a toggleFavorite a grid gombokat is kezeli)
  const fakeBtn = { classList: { add(){}, remove(){} } };
  const wasFav = favorites.has(key);
  toggleFavorite(key, fakeBtn);
  const nowFav = favorites.has(key);
  weeklyFav.classList.toggle("on", nowFav);
  weeklyFav.textContent = nowFav ? "★ Kedvenc" : "☆ Kedvenc";
  if (typeof rebuildConstellation === "function") rebuildConstellation();
});
if (weeklyDismiss) weeklyDismiss.addEventListener("click", () => {
  weeklyCard.hidden = true;
  try { localStorage.setItem("tsz_weekly_dismissed", isoWeekKey(new Date())); } catch (e) {}
});

// ============================================================================
// ==== INTERAKTÍV TUDOMÁNYOS LABORATÓRIUM (SZIMULÁCIÓK) =======================
// ============================================================================

let currentSimId = "lorentz";
let simRaf = null;
let simCtx = null;
let simActive = false;

const SIM_TITLES = {
  lorentz: "⚡ Lorentz-transzformáció és Idődilatáció",
  tunnel: "🌊 Kvantum-alagúthatás (Schrödinger-egyenlet)",
  mandelbrot: "🌀 Mandelbrot-halmaz és Komplex fraktálok",
  fourier: "🎼 Fourier-sorfejtés és Epiciklikus szintézis",
  conway: "👾 Conway: Élet játéka (Sejtautomata)"
};

// 1. Lorentz állapot
const simLorentz = {
  beta: 0.70,
  running: true,
  tau: 0,
  t: 0,
  xMoving: 100,
  lightRestY: 0,
  lightRestDir: 1,
  lightMovY: 0,
  lightMovDir: 1,
  trail: []
};

// 2. Kvantum-alagút állapot
const simTunnel = {
  E: 3.0,
  V0: 4.8,
  barrierWidth: 46,
  running: true,
  t: 0
};

// 3. Mandelbrot állapot
const simMandelbrot = {
  cx: -0.7,
  cy: 0.0,
  zoom: 1.0,
  maxIter: 64,
  palette: "aurora",
  needsRedraw: true
};
let mandelbrotOffscreen = null;

// 4. Fourier állapot
const simFourier = {
  waveType: "square",
  harmonics: 5,
  speed: 1.0,
  running: true,
  time: 0,
  waveHistory: []
};

// 5. Conway állapot
const simConway = {
  cols: 64,
  rows: 36,
  grid: null,
  nextGrid: null,
  cellAge: null,
  running: true,
  lastStep: 0,
  speedMs: 100,
  generation: 0
};

function drawLorentz(ctx, width, height) {
  const L0 = 120;
  const H = 70;
  const c = 2.4;
  const beta = simLorentz.beta;
  const gamma = 1 / Math.sqrt(Math.max(0.001, 1 - beta * beta));
  const L = L0 / gamma;

  if (simLorentz.running) {
    simLorentz.tau += 0.04;
    simLorentz.t += 0.04 * gamma;

    simLorentz.lightRestY += simLorentz.lightRestDir * c;
    if (simLorentz.lightRestY >= H) {
      simLorentz.lightRestY = H;
      simLorentz.lightRestDir = -1;
    } else if (simLorentz.lightRestY <= 0) {
      simLorentz.lightRestY = 0;
      simLorentz.lightRestDir = 1;
    }

    simLorentz.xMoving += beta * c * 1.3;
    const maxX = width - 40;
    const minX = 40;
    if (simLorentz.xMoving > maxX) {
      simLorentz.xMoving = minX;
      simLorentz.trail = [];
    }

    simLorentz.lightMovY += simLorentz.lightMovDir * (c / gamma);
    if (simLorentz.lightMovY >= H) {
      simLorentz.lightMovY = H;
      simLorentz.lightMovDir = -1;
    } else if (simLorentz.lightMovY <= 0) {
      simLorentz.lightMovY = 0;
      simLorentz.lightMovDir = 1;
    }

    simLorentz.trail.push({ x: simLorentz.xMoving, y: 220 + simLorentz.lightMovY });
    if (simLorentz.trail.length > 70) simLorentz.trail.shift();
  }

  ctx.fillStyle = "#050813";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(125, 163, 255, 0.07)";
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 40) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
  }
  ctx.beginPath(); ctx.moveTo(0, 160); ctx.lineTo(width, 160); ctx.stroke();

  // Felső: Nyugalmi rendszer
  ctx.font = "600 12px Inter, sans-serif";
  ctx.fillStyle = "#9aa6c4";
  ctx.fillText("NYUGALMI RENDSZER (FÖLD) — v = 0, sajátidő (τ)", 20, 26);

  const restX = 80;
  const restY = 48;
  ctx.strokeStyle = "rgba(201, 162, 75, 0.6)";
  ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(restX, restY); ctx.lineTo(restX + L0, restY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(restX, restY + H); ctx.lineTo(restX + L0, restY + H); ctx.stroke();

  ctx.strokeStyle = "rgba(201, 162, 75, 0.25)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(restX, restY, L0, H);

  ctx.strokeStyle = "rgba(255, 230, 120, 0.3)";
  ctx.setLineDash([3, 3]);
  ctx.beginPath(); ctx.moveTo(restX + L0 / 2, restY); ctx.lineTo(restX + L0 / 2, restY + H); ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = "#ffe066";
  ctx.shadowColor = "#ffe066";
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.arc(restX + L0 / 2, restY + simLorentz.lightRestY, 4.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.font = "500 12px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#e9c877";
  ctx.fillText(`τ = ${simLorentz.tau.toFixed(1)} s (1.00×)`, restX + L0 + 25, restY + H / 2 + 4);

  // Alsó: Mozgó rendszer
  ctx.font = "600 12px Inter, sans-serif";
  ctx.fillStyle = "#9aa6c4";
  ctx.fillText(`MOZGÓ RENDSZER — v = ${beta.toFixed(2)}c, Lorentz-faktor γ = ${gamma.toFixed(2)}`, 20, 185);

  const movY = 220;
  if (simLorentz.trail.length > 1) {
    ctx.beginPath();
    ctx.strokeStyle = "rgba(62, 184, 240, 0.4)";
    ctx.lineWidth = 2;
    for (let i = 0; i < simLorentz.trail.length; i++) {
      const p = simLorentz.trail[i];
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
  }

  const mx = simLorentz.xMoving - L / 2;
  ctx.strokeStyle = "rgba(62, 184, 240, 0.7)";
  ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(mx, movY); ctx.lineTo(mx + L, movY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(mx, movY + H); ctx.lineTo(mx + L, movY + H); ctx.stroke();

  ctx.strokeStyle = "rgba(62, 184, 240, 0.35)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(mx, movY, L, H);

  ctx.fillStyle = "#7fd8ff";
  ctx.shadowColor = "#7fd8ff";
  ctx.shadowBlur = 12;
  ctx.beginPath();
  ctx.arc(simLorentz.xMoving, movY + simLorentz.lightMovY, 4.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.font = "500 12px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#7fd8ff";
  ctx.fillText(`t' = ${simLorentz.t.toFixed(1)} s (${gamma.toFixed(2)}× lassabb)`, 20, movY + H + 30);
}

function drawTunnel(ctx, width, height) {
  const { E, V0, barrierWidth } = simTunnel;
  const baseLine = 250;
  const scaleV = 16;
  const scaleE = 16;

  ctx.fillStyle = "#050813";
  ctx.fillRect(0, 0, width, height);

  const bx1 = width / 2 - barrierWidth / 2;
  const bx2 = width / 2 + barrierWidth / 2;
  const bHeight = V0 * scaleV;
  const eHeight = E * scaleE;

  const grad = ctx.createLinearGradient(0, baseLine - bHeight, 0, baseLine);
  grad.addColorStop(0, "rgba(233, 110, 60, 0.5)");
  grad.addColorStop(1, "rgba(233, 110, 60, 0.08)");
  ctx.fillStyle = grad;
  ctx.fillRect(bx1, baseLine - bHeight, barrierWidth, bHeight);

  ctx.strokeStyle = "#e97244";
  ctx.lineWidth = 2;
  ctx.strokeRect(bx1, baseLine - bHeight, barrierWidth, bHeight);

  ctx.font = "500 11px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#e97244";
  ctx.fillText(`V₀ = ${V0.toFixed(1)} eV`, bx1 + 4, baseLine - bHeight - 8);

  ctx.strokeStyle = "rgba(125, 163, 255, 0.6)";
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(20, baseLine - eHeight);
  ctx.lineTo(width - 20, baseLine - eHeight);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "#7da3ff";
  ctx.fillText(`E = ${E.toFixed(1)} eV`, 24, baseLine - eHeight - 6);

  let T = 0;
  if (E < V0) {
    const kappa = Math.sqrt(Math.max(0.01, 2 * (V0 - E))) * 0.07;
    const sinhVal = Math.sinh(kappa * barrierWidth);
    T = 1 / (1 + (V0 * V0 * sinhVal * sinhVal) / (4 * E * (V0 - E)));
  } else {
    const k1 = Math.sqrt(Math.max(0.01, 2 * (E - V0))) * 0.07;
    const sinVal = Math.sin(k1 * barrierWidth);
    T = 1 / (1 + (V0 * V0 * sinVal * sinVal) / (4 * E * (E - V0)));
  }
  T = Math.min(1, Math.max(0, T));
  const R = 1 - T;

  if (simTunnel.running) {
    simTunnel.t += 0.06;
  }

  const k0 = Math.sqrt(2 * E) * 0.12;
  const cycle = (simTunnel.t * 30) % (width + 200);
  const packetCenter = cycle - 100;

  ctx.beginPath();
  ctx.strokeStyle = "#4fd6a0";
  ctx.lineWidth = 2;

  for (let x = 20; x < width - 20; x += 2) {
    let amp = 0;
    const sigma = 35;
    if (x < bx1) {
      const inc = Math.exp(-Math.pow(x - packetCenter, 2) / (2 * sigma * sigma));
      const refDist = bx1 + (bx1 - packetCenter);
      const ref = Math.sqrt(R) * Math.exp(-Math.pow(x - refDist, 2) / (2 * sigma * sigma));
      amp = (inc * Math.cos(k0 * x - simTunnel.t * 4) + ref * Math.cos(-k0 * x - simTunnel.t * 4)) * 36;
    } else if (x >= bx1 && x <= bx2) {
      const decay = Math.exp(-0.06 * Math.sqrt(Math.max(0.1, V0 - E)) * (x - bx1));
      const atEntry = Math.exp(-Math.pow(bx1 - packetCenter, 2) / (2 * sigma * sigma));
      amp = atEntry * decay * Math.sqrt(T) * Math.cos(k0 * x - simTunnel.t * 4) * 36;
    } else {
      const transCenter = packetCenter;
      const trans = Math.sqrt(T) * Math.exp(-Math.pow(x - transCenter, 2) / (2 * sigma * sigma));
      amp = trans * Math.cos(k0 * x - simTunnel.t * 4) * 36;
    }

    const y = baseLine - amp;
    if (x === 20) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
  ctx.beginPath(); ctx.moveTo(10, baseLine); ctx.lineTo(width - 10, baseLine); ctx.stroke();

  ctx.font = "600 12px Inter, sans-serif";
  ctx.fillStyle = "#9aa6c4";
  ctx.fillText("SCHRÖDINGER KVANTUM-ALAGÚTHATÁS SZIMULÁCIÓ", 20, 26);

  ctx.font = "500 12px 'JetBrains Mono', monospace";
  ctx.fillStyle = T > 0.05 ? "#4fd6a0" : "#9aa6c4";
  ctx.fillText(`Áthaladás (T): ${(T * 100).toFixed(2)}% | Visszaverődés (R): ${(R * 100).toFixed(2)}%`, 20, height - 16);
}

function drawMandelbrot(ctx, width, height) {
  if (!simMandelbrot.needsRedraw && mandelbrotOffscreen) {
    ctx.drawImage(mandelbrotOffscreen, 0, 0, width, height);
    return;
  }

  const renderW = Math.floor(width / 2);
  const renderH = Math.floor(height / 2);
  if (!mandelbrotOffscreen || mandelbrotOffscreen.width !== renderW || mandelbrotOffscreen.height !== renderH) {
    mandelbrotOffscreen = document.createElement("canvas");
    mandelbrotOffscreen.width = renderW;
    mandelbrotOffscreen.height = renderH;
  }
  const offCtx = mandelbrotOffscreen.getContext("2d");
  const imgData = offCtx.createImageData(renderW, renderH);
  const data = imgData.data;

  const { cx, cy, zoom, maxIter, palette } = simMandelbrot;
  const aspect = renderW / renderH;
  const rx = 1.4 / zoom;
  const ry = rx / aspect;

  for (let py = 0; py < renderH; py++) {
    const y0 = cy + (py / renderH - 0.5) * ry * 2;
    for (let px = 0; px < renderW; px++) {
      const x0 = cx + (px / renderW - 0.5) * rx * 2;
      let x = 0.0;
      let y = 0.0;
      let iter = 0;
      while (x * x + y * y <= 4 && iter < maxIter) {
        const xTemp = x * x - y * y + x0;
        y = 2 * x * y + y0;
        x = xTemp;
        iter++;
      }

      const idx = (py * renderW + px) * 4;
      if (iter === maxIter) {
        data[idx] = 4;
        data[idx + 1] = 6;
        data[idx + 2] = 16;
        data[idx + 3] = 255;
      } else {
        const mu = iter + 1 - Math.log(Math.max(1, Math.log(x * x + y * y))) / Math.LN2;
        const norm = Math.max(0, mu / maxIter);

        if (palette === "fire") {
          data[idx] = Math.min(255, Math.floor(norm * 450));
          data[idx + 1] = Math.min(255, Math.floor(norm * norm * 350));
          data[idx + 2] = Math.min(255, Math.floor(norm * norm * norm * 200));
        } else if (palette === "neon") {
          data[idx] = Math.min(255, Math.floor(norm * 60));
          data[idx + 1] = Math.min(255, Math.floor(norm * 320));
          data[idx + 2] = Math.min(255, Math.floor(norm * 240));
        } else {
          data[idx] = Math.min(255, Math.floor(Math.sin(norm * 6.28) * 80 + 100));
          data[idx + 1] = Math.min(255, Math.floor(Math.sin(norm * 6.28 + 2.0) * 90 + 140));
          data[idx + 2] = Math.min(255, Math.floor(Math.sin(norm * 6.28 + 4.0) * 80 + 160));
        }
        data[idx + 3] = 255;
      }
    }
  }

  offCtx.putImageData(imgData, 0, 0);
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(mandelbrotOffscreen, 0, 0, width, height);

  simMandelbrot.needsRedraw = false;

  ctx.font = "500 12px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#e9c877";
  ctx.fillText(`Zoom: ${zoom.toFixed(1)}× | Re: ${cx.toFixed(4)}, Im: ${cy.toFixed(4)} (Kattints a nagyításhoz!)`, 20, height - 16);
}

function drawFourier(ctx, width, height) {
  const { waveType, harmonics, speed } = simFourier;
  const centerY = height / 2;
  const centerX = 140;
  const baseRadius = 55;

  if (simFourier.running) {
    simFourier.time += 0.025 * speed;
  }

  ctx.fillStyle = "#050813";
  ctx.fillRect(0, 0, width, height);

  let x = centerX;
  let y = centerY;

  for (let i = 0; i < harmonics; i++) {
    const prevX = x;
    const prevY = y;
    let n = 1;
    let radius = 0;

    if (waveType === "square") {
      n = i * 2 + 1;
      radius = baseRadius * (4 / (n * Math.PI));
    } else if (waveType === "sawtooth") {
      n = i + 1;
      radius = baseRadius * (2 / (n * Math.PI)) * (i % 2 === 0 ? 1 : -1);
    } else if (waveType === "triangle") {
      n = i * 2 + 1;
      const sign = (i % 2 === 0) ? 1 : -1;
      radius = baseRadius * (8 / (n * n * Math.PI * Math.PI)) * sign;
    }

    x += radius * Math.cos(n * simFourier.time);
    y += radius * Math.sin(n * simFourier.time);

    ctx.strokeStyle = "rgba(125, 163, 255, 0.22)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(prevX, prevY, Math.abs(radius), 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = "rgba(201, 162, 75, 0.6)";
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(x, y);
    ctx.stroke();

    ctx.fillStyle = "#e9c877";
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  if (simFourier.running) {
    simFourier.waveHistory.unshift(y);
    if (simFourier.waveHistory.length > width - 280) {
      simFourier.waveHistory.pop();
    }
  }

  ctx.strokeStyle = "rgba(79, 214, 160, 0.4)";
  ctx.setLineDash([3, 3]);
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(280, y);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.strokeStyle = "#4fd6a0";
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i < simFourier.waveHistory.length; i++) {
    const wx = 280 + i;
    const wy = simFourier.waveHistory[i];
    if (i === 0) ctx.moveTo(wx, wy);
    else ctx.lineTo(wx, wy);
  }
  ctx.stroke();

  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.beginPath(); ctx.moveTo(280, centerY); ctx.lineTo(width - 20, centerY); ctx.stroke();

  ctx.font = "600 12px Inter, sans-serif";
  ctx.fillStyle = "#9aa6c4";
  ctx.fillText(`FOURIER-SORFEJTÉS: ${harmonics} HARMONIKUS (EPICIKLUSOK)`, 20, 26);

  ctx.font = "500 12px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#4fd6a0";
  ctx.fillText(`Típus: ${waveType.toUpperCase()} | Gibbs-jelenség az éleknél`, 280, height - 16);
}

function initConwayGrid() {
  const { cols, rows } = simConway;
  simConway.grid = new Uint8Array(cols * rows);
  simConway.nextGrid = new Uint8Array(cols * rows);
  simConway.cellAge = new Uint8Array(cols * rows);
  simConway.generation = 0;
  loadConwayPreset("glider");
}

function loadConwayPreset(name) {
  if (!simConway.grid) initConwayGrid();
  simConway.grid.fill(0);
  simConway.cellAge.fill(0);
  simConway.generation = 0;
  const { cols, rows, grid } = simConway;
  const midX = Math.floor(cols / 2);
  const midY = Math.floor(rows / 2);

  if (name === "glider") {
    const coords = [[0, -1], [1, 0], [-1, 1], [0, 1], [1, 1]];
    coords.forEach(([dx, dy]) => {
      const x = (midX + dx + cols) % cols;
      const y = (midY + dy + rows) % rows;
      grid[y * cols + x] = 1;
    });
  } else if (name === "pulsar") {
    const p = [-6, -1, 1, 6];
    const q = [-4, -3, -2, 2, 3, 4];
    p.forEach(x => q.forEach(y => {
      grid[((midY + y + rows) % rows) * cols + ((midX + x + cols) % cols)] = 1;
      grid[((midY + x + rows) % rows) * cols + ((midX + y + cols) % cols)] = 1;
    }));
  } else if (name === "lwss") {
    const coords = [[-2, -1], [1, -1], [2, 0], [-2, 1], [2, 1], [-1, 2], [0, 2], [1, 2], [2, 2]];
    coords.forEach(([dx, dy]) => {
      const x = (midX + dx + cols) % cols;
      const y = (midY + dy + rows) % rows;
      grid[y * cols + x] = 1;
    });
  } else if (name === "random") {
    for (let i = 0; i < grid.length; i++) {
      grid[i] = Math.random() < 0.22 ? 1 : 0;
    }
  }
}

function stepConway() {
  const { cols, rows, grid, nextGrid, cellAge } = simConway;
  if (!grid) return;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let neighbors = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const nx = (x + dx + cols) % cols;
          const ny = (y + dy + rows) % rows;
          if (grid[ny * cols + nx]) neighbors++;
        }
      }
      const idx = y * cols + x;
      const alive = grid[idx];
      if (alive) {
        if (neighbors === 2 || neighbors === 3) {
          nextGrid[idx] = 1;
          cellAge[idx] = Math.min(255, cellAge[idx] + 1);
        } else {
          nextGrid[idx] = 0;
          cellAge[idx] = 0;
        }
      } else {
        if (neighbors === 3) {
          nextGrid[idx] = 1;
          cellAge[idx] = 1;
        } else {
          nextGrid[idx] = 0;
          cellAge[idx] = 0;
        }
      }
    }
  }
  grid.set(nextGrid);
  simConway.generation++;
}

function drawConway(ctx, width, height) {
  if (!simConway.grid) initConwayGrid();

  const now = performance.now();
  if (simConway.running && now - simConway.lastStep > simConway.speedMs) {
    stepConway();
    simConway.lastStep = now;
  }

  const { cols, rows, grid, cellAge } = simConway;
  const cellW = width / cols;
  const cellH = height / rows;

  ctx.fillStyle = "#050813";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
  ctx.lineWidth = 0.5;
  for (let x = 0; x <= cols; x++) {
    ctx.beginPath(); ctx.moveTo(x * cellW, 0); ctx.lineTo(x * cellW, height); ctx.stroke();
  }
  for (let y = 0; y <= rows; y++) {
    ctx.beginPath(); ctx.moveTo(0, y * cellH); ctx.lineTo(width, y * cellH); ctx.stroke();
  }

  let aliveCount = 0;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const idx = y * cols + x;
      if (grid[idx]) {
        aliveCount++;
        const age = cellAge[idx];
        if (age === 1) ctx.fillStyle = "#7fd8ff";
        else if (age < 6) ctx.fillStyle = "#4fd6a0";
        else ctx.fillStyle = "#e9c877";

        ctx.fillRect(x * cellW + 1, y * cellH + 1, cellW - 2, cellH - 2);
      }
    }
  }

  ctx.font = "600 12px Inter, sans-serif";
  ctx.fillStyle = "#9aa6c4";
  ctx.fillText("CONWAY: ÉLET JÁTÉKA — B3/S23 (Kattints a sejtekre rajzoláshoz!)", 20, 24);

  ctx.font = "500 12px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#4fd6a0";
  ctx.fillText(`Generáció: ${simConway.generation} | Élő sejtek: ${aliveCount}`, 20, height - 14);
}

function renderSimControls(simId) {
  if (!simControls) return;
  simControls.innerHTML = "";

  if (simId === "lorentz") {
    simControls.innerHTML = `
      <div class="sim-row">
        <span class="sim-label">Sebesség: <b>v = ${(simLorentz.beta * 100).toFixed(0)}% c</b></span>
        <div class="sim-slider-wrap">
          <input type="range" class="sim-slider" id="simBetaSlider" min="0" max="0.98" step="0.01" value="${simLorentz.beta}">
          <span class="sim-val" id="simBetaVal">${simLorentz.beta.toFixed(2)}c</span>
        </div>
        <div class="sim-btn-group">
          <button type="button" class="sim-ctrl-btn" id="simLorentzPlay">${simLorentz.running ? "⏸ Szünet" : "▶ Indítás"}</button>
          <button type="button" class="sim-ctrl-btn" id="simLorentzReset">↺ Visszaállítás</button>
        </div>
      </div>
      <div class="sim-hud">
        <div class="sim-hud-item">Lorentz-faktor (γ)<b id="simHudGamma">1.40</b></div>
        <div class="sim-hud-item">Hosszkontrakció<b id="simHudLength">71.4%</b></div>
        <div class="sim-hud-item">Idődilatáció<b id="simHudDilation">1.40×</b></div>
      </div>
    `;

    const slider = document.getElementById("simBetaSlider");
    const valLabel = document.getElementById("simBetaVal");
    const playBtn = document.getElementById("simLorentzPlay");
    const resetBtn = document.getElementById("simLorentzReset");
    const hudGamma = document.getElementById("simHudGamma");
    const hudLength = document.getElementById("simHudLength");
    const hudDilation = document.getElementById("simHudDilation");

    function updateLorentzHud() {
      const g = 1 / Math.sqrt(Math.max(0.001, 1 - simLorentz.beta * simLorentz.beta));
      if (hudGamma) hudGamma.textContent = g.toFixed(3);
      if (hudLength) hudLength.textContent = ((1 / g) * 100).toFixed(1) + "%";
      if (hudDilation) hudDilation.textContent = g.toFixed(2) + "×";
    }
    updateLorentzHud();

    if (slider) slider.addEventListener("input", (e) => {
      simLorentz.beta = parseFloat(e.target.value);
      if (valLabel) valLabel.textContent = simLorentz.beta.toFixed(2) + "c";
      updateLorentzHud();
    });
    if (playBtn) playBtn.addEventListener("click", () => {
      simLorentz.running = !simLorentz.running;
      playBtn.textContent = simLorentz.running ? "⏸ Szünet" : "▶ Indítás";
    });
    if (resetBtn) resetBtn.addEventListener("click", () => {
      simLorentz.tau = 0;
      simLorentz.t = 0;
      simLorentz.trail = [];
    });

  } else if (simId === "tunnel") {
    simControls.innerHTML = `
      <div class="sim-row">
        <span class="sim-label">Részecske E: <b>${simTunnel.E.toFixed(1)} eV</b></span>
        <div class="sim-slider-wrap">
          <input type="range" class="sim-slider" id="simESlider" min="0.5" max="8.0" step="0.1" value="${simTunnel.E}">
          <span class="sim-val" id="simEVal">${simTunnel.E.toFixed(1)} eV</span>
        </div>
        <span class="sim-label">Gát V₀: <b>${simTunnel.V0.toFixed(1)} eV</b></span>
        <div class="sim-slider-wrap">
          <input type="range" class="sim-slider" id="simV0Slider" min="1.0" max="10.0" step="0.1" value="${simTunnel.V0}">
          <span class="sim-val" id="simV0Val">${simTunnel.V0.toFixed(1)} eV</span>
        </div>
      </div>
      <div class="sim-row">
        <span class="sim-label">Gát szélesség (a): <b>${simTunnel.barrierWidth} px</b></span>
        <div class="sim-slider-wrap">
          <input type="range" class="sim-slider" id="simBarrierSlider" min="15" max="90" step="1" value="${simTunnel.barrierWidth}">
          <span class="sim-val" id="simBarrierVal">${simTunnel.barrierWidth} px</span>
        </div>
        <div class="sim-btn-group">
          <button type="button" class="sim-ctrl-btn" id="simTunnelRestart">↺ Újraindítás</button>
        </div>
      </div>
    `;

    const eSlider = document.getElementById("simESlider");
    const vSlider = document.getElementById("simV0Slider");
    const bSlider = document.getElementById("simBarrierSlider");
    const eVal = document.getElementById("simEVal");
    const vVal = document.getElementById("simV0Val");
    const bVal = document.getElementById("simBarrierVal");
    const restartBtn = document.getElementById("simTunnelRestart");

    if (eSlider) eSlider.addEventListener("input", (e) => {
      simTunnel.E = parseFloat(e.target.value);
      if (eVal) eVal.textContent = simTunnel.E.toFixed(1) + " eV";
    });
    if (vSlider) vSlider.addEventListener("input", (e) => {
      simTunnel.V0 = parseFloat(e.target.value);
      if (vVal) vVal.textContent = simTunnel.V0.toFixed(1) + " eV";
    });
    if (bSlider) bSlider.addEventListener("input", (e) => {
      simTunnel.barrierWidth = parseInt(e.target.value, 10);
      if (bVal) bVal.textContent = simTunnel.barrierWidth + " px";
    });
    if (restartBtn) restartBtn.addEventListener("click", () => {
      simTunnel.t = 0;
    });

  } else if (simId === "mandelbrot") {
    simControls.innerHTML = `
      <div class="sim-row">
        <span class="sim-label">Max. iteráció: <b>${simMandelbrot.maxIter}</b></span>
        <div class="sim-slider-wrap">
          <input type="range" class="sim-slider" id="simMandelIterSlider" min="24" max="192" step="4" value="${simMandelbrot.maxIter}">
          <span class="sim-val" id="simMandelIterVal">${simMandelbrot.maxIter}</span>
        </div>
        <span class="sim-label">Paletta:</span>
        <select class="sim-select" id="simMandelPalette">
          <option value="aurora" ${simMandelbrot.palette === "aurora" ? "selected" : ""}>🌌 Kozmikus Aurora</option>
          <option value="fire" ${simMandelbrot.palette === "fire" ? "selected" : ""}>🔥 Napkitörés</option>
          <option value="neon" ${simMandelbrot.palette === "neon" ? "selected" : ""}>⚡ Elektromos Neon</option>
        </select>
        <div class="sim-btn-group">
          <button type="button" class="sim-ctrl-btn" id="simMandelZoomIn">🔍 Nagyítás (+)</button>
          <button type="button" class="sim-ctrl-btn" id="simMandelZoomOut">🔍 Kicsinyítés (-)</button>
          <button type="button" class="sim-ctrl-btn" id="simMandelReset">↺ Alaphelyzet</button>
        </div>
      </div>
    `;

    const iterSlider = document.getElementById("simMandelIterSlider");
    const iterVal = document.getElementById("simMandelIterVal");
    const palSelect = document.getElementById("simMandelPalette");
    const zIn = document.getElementById("simMandelZoomIn");
    const zOut = document.getElementById("simMandelZoomOut");
    const reset = document.getElementById("simMandelReset");

    if (iterSlider) iterSlider.addEventListener("input", (e) => {
      simMandelbrot.maxIter = parseInt(e.target.value, 10);
      if (iterVal) iterVal.textContent = simMandelbrot.maxIter;
      simMandelbrot.needsRedraw = true;
    });
    if (palSelect) palSelect.addEventListener("change", (e) => {
      simMandelbrot.palette = e.target.value;
      simMandelbrot.needsRedraw = true;
    });
    if (zIn) zIn.addEventListener("click", () => {
      simMandelbrot.zoom *= 1.8;
      simMandelbrot.needsRedraw = true;
    });
    if (zOut) zOut.addEventListener("click", () => {
      simMandelbrot.zoom = Math.max(0.4, simMandelbrot.zoom / 1.8);
      simMandelbrot.needsRedraw = true;
    });
    if (reset) reset.addEventListener("click", () => {
      simMandelbrot.cx = -0.7;
      simMandelbrot.cy = 0.0;
      simMandelbrot.zoom = 1.0;
      simMandelbrot.needsRedraw = true;
    });

  } else if (simId === "fourier") {
    simControls.innerHTML = `
      <div class="sim-row">
        <span class="sim-label">Hullámforma:</span>
        <select class="sim-select" id="simFourierWave">
          <option value="square" ${simFourier.waveType === "square" ? "selected" : ""}>Négyszögjel (Square)</option>
          <option value="sawtooth" ${simFourier.waveType === "sawtooth" ? "selected" : ""}>Fűrészfog (Sawtooth)</option>
          <option value="triangle" ${simFourier.waveType === "triangle" ? "selected" : ""}>Háromszögjel (Triangle)</option>
        </select>
        <span class="sim-label">Harmónikusok (N): <b>${simFourier.harmonics}</b></span>
        <div class="sim-slider-wrap">
          <input type="range" class="sim-slider" id="simFourierHarmSlider" min="1" max="25" step="1" value="${simFourier.harmonics}">
          <span class="sim-val" id="simFourierHarmVal">${simFourier.harmonics}</span>
        </div>
        <div class="sim-btn-group">
          <button type="button" class="sim-ctrl-btn" id="simFourierPlay">${simFourier.running ? "⏸ Szünet" : "▶ Indítás"}</button>
          <button type="button" class="sim-ctrl-btn" id="simFourierClear">↺ Törlés</button>
        </div>
      </div>
    `;

    const waveSel = document.getElementById("simFourierWave");
    const harmSlider = document.getElementById("simFourierHarmSlider");
    const harmVal = document.getElementById("simFourierHarmVal");
    const playBtn = document.getElementById("simFourierPlay");
    const clearBtn = document.getElementById("simFourierClear");

    if (waveSel) waveSel.addEventListener("change", (e) => {
      simFourier.waveType = e.target.value;
      simFourier.waveHistory = [];
    });
    if (harmSlider) harmSlider.addEventListener("input", (e) => {
      simFourier.harmonics = parseInt(e.target.value, 10);
      if (harmVal) harmVal.textContent = simFourier.harmonics;
      simFourier.waveHistory = [];
    });
    if (playBtn) playBtn.addEventListener("click", () => {
      simFourier.running = !simFourier.running;
      playBtn.textContent = simFourier.running ? "⏸ Szünet" : "▶ Indítás";
    });
    if (clearBtn) clearBtn.addEventListener("click", () => {
      simFourier.time = 0;
      simFourier.waveHistory = [];
    });

  } else if (simId === "conway") {
    simControls.innerHTML = `
      <div class="sim-row">
        <div class="sim-btn-group">
          <button type="button" class="sim-ctrl-btn" id="simConwayPlay">${simConway.running ? "⏸ Szünet" : "▶ Indítás"}</button>
          <button type="button" class="sim-ctrl-btn" id="simConwayStep">⏭ 1 lépés</button>
          <button type="button" class="sim-ctrl-btn" id="simConwayRandom">🎲 Véletlen</button>
          <button type="button" class="sim-ctrl-btn" id="simConwayClear">🗑 Törlés</button>
        </div>
        <span class="sim-label">Sablonok:</span>
        <select class="sim-select" id="simConwayPreset">
          <option value="glider">Sikló (Glider)</option>
          <option value="pulsar">Pulzár (Pulsar)</option>
          <option value="lwss">Űrhajó (LWSS)</option>
        </select>
      </div>
    `;

    const playBtn = document.getElementById("simConwayPlay");
    const stepBtn = document.getElementById("simConwayStep");
    const randBtn = document.getElementById("simConwayRandom");
    const clearBtn = document.getElementById("simConwayClear");
    const presetSel = document.getElementById("simConwayPreset");

    if (playBtn) playBtn.addEventListener("click", () => {
      simConway.running = !simConway.running;
      playBtn.textContent = simConway.running ? "⏸ Szünet" : "▶ Indítás";
    });
    if (stepBtn) stepBtn.addEventListener("click", () => {
      simConway.running = false;
      if (playBtn) playBtn.textContent = "▶ Indítás";
      stepConway();
    });
    if (randBtn) randBtn.addEventListener("click", () => {
      loadConwayPreset("random");
    });
    if (clearBtn) clearBtn.addEventListener("click", () => {
      if (simConway.grid) simConway.grid.fill(0);
      if (simConway.cellAge) simConway.cellAge.fill(0);
      simConway.generation = 0;
    });
    if (presetSel) presetSel.addEventListener("change", (e) => {
      loadConwayPreset(e.target.value);
    });
  }
}

function renderSimInfo(simId) {
  if (!simInfo) return;
  if (simId === "lorentz") {
    simInfo.innerHTML = `
      <p><b>A tétel lényege:</b> Albert Einstein speciális relativitáselméletének alappillére: a vákuumbeli fénysebesség (<i>c</i>) minden inerciarendszerben azonos. Ebből következik, hogy a mozgó megfigyelő számára a fényórában a foton hosszabb, átlós utat jár be — emiatt <b>a mozgó óra lassabban jár</b> (idődilatáció), a mozgó test hossza pedig a mozgás irányában <b>megrövidül</b> (Lorentz-kontrakció: <i>L = L₀ / γ</i>).</p>
      <p><b>Mit látsz a szimuláción?</b> A felső fényóra nyugalomban van (Föld). Az alsó óra <i>v</i> sebességgel halad. Állítsd a sebességet 0.90c fölé, és figyeld meg az űrhajó radikális összenyomódását és az órák közötti szétcsúszást!</p>
    `;
  } else if (simId === "tunnel") {
    simInfo.innerHTML = `
      <p><b>A tétel lényege:</b> A klasszikus fizikában a részecske nem képes átjutni egy nála magasabb energiaszintű gáton (<i>E &lt; V₀</i>). A Schrödinger-egyenlet szerint azonban a kvantumrészecske hullámcsomagja nem vész el hirtelen a falnál, hanem exponenciálisan lecsengve áthatol rajta. Véges vastagságú gát esetén véges valószínűséggel (<i>T &gt; 0</i>) megjelenik a túlsó oldalon.</p>
      <p><b>Mit látsz a szimuláción?</b> A zöld hullámcsomag megközelíti a narancs potenciálfalat. Figyeld meg, hogy még akkor is átjut egy kisebb hullámcsomag (kvantum-alagutazás), amikor a részecske energiája (kék vonal) alacsonyabb, mint a gát magassága!</p>
    `;
  } else if (simId === "mandelbrot") {
    simInfo.innerHTML = `
      <p><b>A tétel lényege:</b> A <i>zₙ₊₁ = zₙ² + c</i> iteráció azon komplex <i>c</i> paramétereinek halmaza, amelyekre a sorozat korlátos marad (|zₙ| ≤ 2). A határvonal végtelen komplexitású fraktál: bármeddig nagyítod, soha nem ismétlődik tökéletesen, mégis végtelenül önhasonló struktúrák, mini-Mandelbrotok és spirálok bukkannak fel belőle.</p>
      <p><b>Interakció:</b> Kattints a képre bárhol az egérrel a <b>2.5× nagyításhoz</b>! A Shift-kattintás kicsinyít. Növeld az iterációk számát a finomabb határvonal-részletekért.</p>
    `;
  } else if (simId === "fourier") {
    simInfo.innerHTML = `
      <p><b>A tétel lényege:</b> Joseph Fourier korszakalkotó tétele: minden periodikus függvény felbontható különböző frekvenciájú szinuszos harmonikusok összegére. Geometriai formában ezek egymáshoz láncolt forgó körök (epiciklusok), melyek csúcsa kirajzolja a hullámot.</p>
      <p><b>Mit látsz a szimuláción?</b> Négyszögjel esetén figyelhető meg a leglátványosabban a <b>Gibbs-jelenség</b>: a sarkoknál a szintézis enyhén túllövi a célértéket, de a harmónikusok számának (N) növelésével a hullám egyre tökéletesebben felveszi a formát.</p>
    `;
  } else if (simId === "conway") {
    simInfo.innerHTML = `
      <p><b>A tétel lényege:</b> John Conway 1970-es sejt-automatája az emergens komplexitás legszebb példája. Csupán 4 egyszerű helyi szabályból (alulnépesedés, túlnépesedés, túlélés, születés) intelligens viselkedésnek tűnő, vándorló és pulzáló struktúrák születnek. A rendszer bizonyítottan <b>Turing-teljes</b>.</p>
      <p><b>Interakció:</b> Kattints vagy húzd az egeret a rácson a saját sejtek felrajzolásához! Válassz a sablonok közül (Sikló, Pulzár, Űrhajó) a klasszikus minták megtekintéséhez.</p>
    `;
  }
}

function simLoop() {
  if (!simActive) return;
  if (simCanvas && simCtx) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = simCanvas.getBoundingClientRect();
    const w = rect.width || 640;
    const h = rect.height || 360;
    if (simCanvas.width !== Math.floor(w * dpr) || simCanvas.height !== Math.floor(h * dpr)) {
      simCanvas.width = Math.floor(w * dpr);
      simCanvas.height = Math.floor(h * dpr);
      if (currentSimId === "mandelbrot") simMandelbrot.needsRedraw = true;
    }
    simCtx.save();
    simCtx.scale(dpr, dpr);
    if (currentSimId === "lorentz") drawLorentz(simCtx, w, h);
    else if (currentSimId === "tunnel") drawTunnel(simCtx, w, h);
    else if (currentSimId === "mandelbrot") drawMandelbrot(simCtx, w, h);
    else if (currentSimId === "fourier") drawFourier(simCtx, w, h);
    else if (currentSimId === "conway") drawConway(simCtx, w, h);
    simCtx.restore();
  }
  simRaf = requestAnimationFrame(simLoop);
}

function switchSimulation(simId) {
  currentSimId = simId;
  if (simTabs) {
    [...simTabs.children].forEach(tab => {
      tab.classList.toggle("active", tab.dataset.sim === simId);
    });
  }
  if (simTitle && SIM_TITLES[simId]) {
    simTitle.textContent = SIM_TITLES[simId];
  }
  renderSimControls(simId);
  renderSimInfo(simId);

  if (simId === "mandelbrot") {
    simMandelbrot.needsRedraw = true;
  }
  if (simId === "conway" && !simConway.grid) {
    initConwayGrid();
  }
}

function openSimulation(simId) {
  if (simId) currentSimId = simId;
  if (!simOverlay) return;

  simActive = true;
  simOverlay.classList.add("visible");
  simOverlay.setAttribute("aria-hidden", "false");

  if (!simCtx && simCanvas) {
    simCtx = simCanvas.getContext("2d");
  }

  switchSimulation(currentSimId);

  if (simRaf) cancelAnimationFrame(simRaf);
  simRaf = requestAnimationFrame(simLoop);
}

function closeSimulation() {
  simActive = false;
  if (simOverlay) {
    simOverlay.classList.remove("visible");
    simOverlay.setAttribute("aria-hidden", "true");
  }
  if (simRaf) {
    cancelAnimationFrame(simRaf);
    simRaf = null;
  }
}

// Canvas interakciók (Mandelbrot zoom + Conway rajzolás)
if (simCanvas) {
  let isDrawingConway = false;

  simCanvas.addEventListener("click", (e) => {
    if (currentSimId === "mandelbrot") {
      const rect = simCanvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      const aspect = rect.width / rect.height;
      const rx = 1.4 / simMandelbrot.zoom;
      const ry = rx / aspect;

      simMandelbrot.cx = simMandelbrot.cx + (clickX / rect.width - 0.5) * rx * 2;
      simMandelbrot.cy = simMandelbrot.cy + (clickY / rect.height - 0.5) * ry * 2;
      simMandelbrot.zoom *= 2.2;
      simMandelbrot.needsRedraw = true;
    }
  });

  simCanvas.addEventListener("contextmenu", (e) => {
    if (currentSimId === "mandelbrot") {
      e.preventDefault();
      simMandelbrot.zoom = Math.max(0.4, simMandelbrot.zoom / 2.2);
      simMandelbrot.needsRedraw = true;
    }
  });

  function handleConwayDraw(e) {
    if (currentSimId !== "conway" || !simConway.grid) return;
    const rect = simCanvas.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * simConway.cols);
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * simConway.rows);
    if (x >= 0 && x < simConway.cols && y >= 0 && y < simConway.rows) {
      const idx = y * simConway.cols + x;
      simConway.grid[idx] = 1;
      simConway.cellAge[idx] = 1;
    }
  }

  simCanvas.addEventListener("mousedown", (e) => {
    if (currentSimId === "conway") {
      isDrawingConway = true;
      handleConwayDraw(e);
    }
  });
  window.addEventListener("mousemove", (e) => {
    if (isDrawingConway && currentSimId === "conway") handleConwayDraw(e);
  });
  window.addEventListener("mouseup", () => { isDrawingConway = false; });
}

if (simLabBtn) simLabBtn.addEventListener("click", () => openSimulation());
if (simClose) simClose.addEventListener("click", closeSimulation);
if (simOverlay) simOverlay.addEventListener("click", (e) => {
  if (e.target === simOverlay) closeSimulation();
});
if (simTabs) simTabs.addEventListener("click", (e) => {
  const tab = e.target.closest(".sim-tab");
  if (tab && tab.dataset.sim) switchSimulation(tab.dataset.sim);
});

function init() {
  const total = MATEK_DATA.length + FIZIKA_DATA.length + INFORMATIKA_DATA.length;
  grandTotalEl.innerHTML = `Összesen <b>${total}</b> halhatatlan tudományos szépség a három gyűjteményben`;
  renderDomain("matek");
  renderDailyFeature();
  handleDeepLink();

  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const spin = document.getElementById("logoSpin");
    if (spin && spin.endElement) spin.endElement();
    const electron = document.querySelector(".logo-electron");
    if (electron) electron.removeAttribute("transform");
  }
  // Éjszakai égbolt visszaállítása (ha korábban be volt kapcsolva)
  if (loadNightSky()) setNightSky(true);
  // Heti kiemelt hőskártya (új hét → új tudományos szépség)
  if (typeof renderWeeklySpotlight === "function") renderWeeklySpotlight();
}

function boot() {
  // App starts immediately, regardless of whether KaTeX CDN loaded.
  init();
  // If KaTeX arrives later (slow CDN / offline-then-online), re-render formulas.
  if (!window.katex) {
    const check = setInterval(() => {
      if (window.katex) {
        clearInterval(check);
        if (typeof renderGrid === "function") renderGrid();
        if (typeof renderDailyFeature === "function") renderDailyFeature();
        if (typeof renderDeck === "function" && deckItems && deckItems.length) renderDeck();
        if (typeof renderWeeklySpotlight === "function") renderWeeklySpotlight();
      }
    }, 80);
  }
  // Kozmikus parallax: a háttérrétegek lassabban mozognak, mint a tartalom.
  const pStars = document.querySelector(".stardust-bg");
  const pNeb = document.querySelector(".nebula-bg");
  const pGal = document.querySelector(".galaxy-bg");
  const pAur = document.querySelector(".aurora-bg");
  let pTicking = false;
  function applyParallax() {
    const y = window.scrollY || window.pageYOffset || 0;
    if (pStars) pStars.style.transform = "translateY(" + (y * 0.25) + "px)";
    if (pNeb) pNeb.style.transform = "translateY(" + (y * 0.12) + "px)";
    if (pGal) pGal.style.transform = "translateY(" + (y * 0.06) + "px) rotate(" + (y * 0.01) + "deg)";
    if (pAur) pAur.style.transform = "translateY(" + (y * 0.04) + "px)";
    pTicking = false;
  }
  window.addEventListener("scroll", () => {
    if (!pTicking) { pTicking = true; requestAnimationFrame(applyParallax); }
  }, {passive: true});
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}


