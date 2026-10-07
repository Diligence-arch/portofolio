/* ===== Kontrol melayang: bahasa (ID | EN) + mode gelap =====
   - Pilihan disimpan di localStorage ('lang' dan 'theme'), jadi tetap sama setelah di-refresh.
   - Terjemahan memakai kamus P: pasangan [Indonesia, English]. Teks yang tidak ada di kamus dibiarkan.
   - Tambah terjemahan baru: tambahkan satu baris ['teks Indonesia', 'English text'].
   - Elemen dengan atribut data-i18n-skip tidak diterjemahkan (dipakai judul contact yang punya animasi ketik). */
(() => {
  const P = [
    // navbar & hero
    ['Profil', 'Profile'], ['Pengalaman', 'Experience'], ['Proyek', 'Projects'], ['Kontak', 'Contact'],
    ['Portofolio', 'Portfolio'],
    ['Fresh Graduate S1 Sistem Informasi dengan fokus pada Data Analysis & IT Governance. Mengolah data menjadi wawasan strategis untuk kebutuhan bisnis dan digital marketing.',
     'Information Systems graduate (S1) focused on Data Analysis & IT Governance. Turning data into strategic insights for business and digital marketing needs.'],
    ['Download CV Saya ↓', 'Download My CV ↓'], ['LinkedIn Saya', 'My LinkedIn'],
    ['Cum Laude · IPK 3.73 · Surabaya', 'Cum Laude · GPA 3.73 · Surabaya'], ['Gulir ↓', 'Scroll ↓'],

    // experience
    ['Pengalaman dan Sertifikasi', 'Experience and Certifications'],
    ['Okt 2025 - Okt 2025', 'Oct 2025 - Oct 2025'],
    ['Staf Pengumpulan Data', 'Data Collection Staff'],
    ['Bertanggung jawab dalam proses administrasi beasiswa. Memastikan akurasi dan integritas data dengan melakukan pengumpulan, verifikasi, serta pengolahan data dalam jumlah besar menggunakan Microsoft Excel dan Google Sheets.',
     'Responsible for scholarship administration. Ensuring data accuracy and integrity by collecting, verifying, and processing large volumes of data using Microsoft Excel and Google Sheets.'],
    ['Input Data', 'Data Entry'], ['Validasi Data', 'Data Validation'], ['Pengelolaan Spreadsheet', 'Spreadsheet Management'],
    ['Spesialis Pemasaran Digital', 'Digital Marketing Specialist'],
    ['Mengelola dan mengembangkan konten media sosial untuk promosi layanan. Menulis dan mengoptimalkan 100 artikel SEO, serta memantau performa menggunakan Google Search Console dan Analytics.',
     'Managed and developed social media content to promote services. Wrote and optimized 100 SEO articles, and monitored performance using Google Search Console and Analytics.'],
    ['Pengelolaan Media Sosial', 'Social Media Management'], ['Analitik Web', 'Web Analytics'],
    ['Tata Kelola TI & Keamanan Siber', 'IT Governance & Cyber Security'],
    ['Menganalisis penerapan IT Governance dan Data Governance menggunakan framework COBIT 2019. Mengidentifikasi tantangan pengelolaan data serta menyusun rekomendasi untuk meningkatkan efisiensi operasional.',
     'Analyzed the implementation of IT Governance and Data Governance using the COBIT 2019 framework. Identified data management challenges and drafted recommendations to improve operational efficiency.'],
    ['Tata Kelola Data', 'Data Governance'], ['Audit TI', 'IT Audit'],

    // sertifikasi / aktivitas
    ['Audit Tata Kelola TI (TKTI)', 'IT Governance Audit (TKTI)'],
    ['Dinas PU SDA Jatim · 2024', 'East Java Water Resources Public Works Agency · 2024'],
    ['Manajemen Risiko ISO 31000', 'Risk Management ISO 31000'],
    ['Badan Standardisasi Nasional · 2026', 'National Standardization Agency · 2026'],
    ['Sistem Manajemen K3 ISO 45001', 'OHS Management System ISO 45001'],
    ['Pengantar Data Science (Python)', 'Intro to Data Science (Python)'],
    ['Panduan Belajar SQL dengan AI', 'Guide to Learn SQL with AI'],
    ['Pengantar Data Science (R)', 'Intro to Data Science (R)'],
    ['Pengantar desain UI/UX', 'UI/UX Design Introdution'],

    // projects
    ['Proyek Pilihan', 'Selected Project'], ['Baca ↗', 'Read now ↗'],
    ['Pengembangan Web(2024)', 'Web Development(2024)'],
    ['Eksplorasi desain web layanan perjalanan wisata dengan tata letak minimalis dan fungsionalitas interaktif.',
     'A web design exploration for a travel service with a minimalist layout and interactive functionality.'],
    ['Segmentasi Potensi UMKM', 'MSME Potential Segmentation'],
    ['Pengembangan model K-Means dan XGBoost untuk mengklasifikasikan potensi dan segmentasi data UMKM secara akurat.',
     'Developing K-Means and XGBoost models to accurately classify and segment MSME potential data.'],
    ['WARKOP (2026)', 'WARKOP (2026)'],
    ['Warkop : Aplikasi Pemesanan', 'Warkop : Ordering Application'],
    ['menyediakan sistem dan aplikasi pemesanan online (serta self-order mandiri) mengurangi antrean panjang dan mempercepat proses transaksi.', 
      'Provides an online ordering system and application (including self-ordering) to reduce long queues and speed up the transaction process.'],
    ['APLIKASI, PAYMENT GATEWAY, FRONTEND', 'APPLICATION, PAYMENT GATEWAY, FRONTEND'],
    ['Personal Portofolio', 'Personal Portfolio'],
    ['Sebuah situs web portofolio pribadi dengan tampilan modern untuk menampilkan profil, pengalaman, keahlian, proyek, dan informasi kontak Anda secara profesional.', 
     'A personal portfolio website with a modern design to professionally showcase your profile, experience, skills, projects, and contact information.'],

    // contact & footer
    ['MARI BICARA', "LET'S TALK"],
    ['ANALISIS DATA', 'DATA ANALYSIS'], ['TATA KELOLA TI', 'IT GOVERNANCE'], ['PEMASARAN DIGITAL', 'DIGITAL MARKETING'], ['OPTIMASI SEO', 'SEO OPTIMIZATION'],
    ['© 2026 Akhmad Sulthon Rabbani. Hak cipta dilindungi.', '© 2026 Akhmad Sulthon Rabbani. All rights reserved.'],
    ['.Beranda', '.Home'], ['.Proyek', '.Project'],
    ['Portofolio | Akhmad Sulthon Rabbani', 'Portfolio | Akhmad Sulthon Rabbani'],

    // halaman detail project (label yang sama di semua halaman)
    ['Konteks Produk', 'Product Context'], ['Ikhtisar Proyek', 'Project Overview'],
    ['Peran Anda (Role)', 'My Role'], ['Peran Sulthon (Role)', "Sulthon's Role"],
    ['Teknologi Utama (Tech Stack)', 'Main Technologies (Tech Stack)'],
    ['Fitur Utama & Cara Kerja Solusi', 'Key Features & How the Solution Works'],
    ['Lihat Repositori GitHub ↗', 'View GitHub Repository ↗'],
    ['Analisis Data UMKM Kabupaten Sampang', 'MSME Data Analysis in Sampang Regency'],
    ['Segmentasi UMKM - Studi Kasus Proyek', 'MSME Segmentation - Project Case Study'],
    ['Warkop 123 - Studi Kasus Proyek', 'Warkop 123 - Project Case Study'],
    ['Detail Proyek - Portofolio Akhmad Sulthon', "Project Details - Akhmad Sulthon's Portfolio"]
  ];

  const K = s => s.replace(/\s+/g, ' ').trim();
  const toEN = {}, toID = {};
  P.forEach(([id, en]) => { toEN[K(id)] = en; toID[K(en)] = id; });

  // Elemen dengan atribut data-en memuat versi English dalam bentuk HTML (boleh berisi <strong>, <em>).
  // Versi Indonesia = isi aslinya, atau atribut data-id jika disediakan (mis. teks asli campuran).
  const dual = [...document.querySelectorAll('[data-en]')];
  dual.forEach(el => { if (el.dataset.id === undefined) el.dataset.id = el.innerHTML; });
  function applyDual() { dual.forEach(el => { el.innerHTML = lang === 'en' ? el.dataset.en : el.dataset.id; }); }

  const root = document.documentElement;
  const store = {
    get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  let lang = store.get('lang') === 'en' ? 'en' : 'id';
  const orig = new WeakMap(), applied = new WeakMap();
  const SKIP = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA']);

  function tr(text) {
    const m = text.match(/^(\s*)([\s\S]*?)(\s*)$/);
    if (!m[2]) return text;
    const out = (lang === 'en' ? toEN : toID)[K(m[2])];
    return out == null ? text : m[1] + out + m[3];
  }

  function apply(n) {
    const p = n.parentNode;
    if (!p || SKIP.has(p.nodeName) || (p.closest && p.closest('[data-i18n-skip],[data-en],.site-controls'))) return;
    const raw = n.nodeValue;
    if (applied.get(n) !== raw) orig.set(n, raw);          // teks baru dari halaman -> catat sebagai aslinya
    const out = tr(orig.get(n));
    applied.set(n, out);
    if (out !== raw) n.nodeValue = out;
  }

  function walk(rootEl) {
    const w = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT);
    const nodes = []; while (w.nextNode()) nodes.push(w.currentNode);
    nodes.forEach(apply);
  }

  // ---------- kontrol melayang ----------
  const bar = document.createElement('div');
  bar.className = 'site-controls';
  bar.innerHTML =
    '<div class="lang-switch" role="group" aria-label="Bahasa / Language">' +
      '<span class="lang-thumb" aria-hidden="true"></span>' +
      '<button type="button" data-lang="id" title="Bahasa Indonesia">ID</button>' +
      '<button type="button" data-lang="en" title="English">EN</button>' +
    '</div>' +
    '<span class="ctl-sep" aria-hidden="true"></span>' +
    '<button type="button" class="theme-btn" aria-pressed="false">' +
      '<svg class="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>' +
      '<svg class="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>' +
    '</button>';
  document.body.appendChild(bar);

  const langSwitch = bar.querySelector('.lang-switch');
  const themeBtn = bar.querySelector('.theme-btn');
  const baseTitle = document.title;

  function setLang(l, save) {
    lang = l;
    root.lang = l;
    walk(document.body); applyDual();
    document.title = tr(baseTitle);
    langSwitch.dataset.active = l;
    langSwitch.querySelectorAll('button').forEach(b => {
      const on = b.dataset.lang === l;
      b.classList.toggle('on', on); b.setAttribute('aria-pressed', on);
    });
    updateThemeLabel();
    if (save) store.set('lang', l);
    document.dispatchEvent(new CustomEvent('langchange', { detail: l }));   // dipakai animasi ketik di judul contact
  }

  function updateThemeLabel() {
    const dark = root.getAttribute('data-theme') === 'dark';
    themeBtn.setAttribute('aria-pressed', dark);
    const label = lang === 'en' ? (dark ? 'Switch to light mode' : 'Switch to dark mode')
                                : (dark ? 'Ganti ke mode terang' : 'Ganti ke mode gelap');
    themeBtn.setAttribute('aria-label', label); themeBtn.title = label;
  }

  function setTheme(t, save) {
    if (t === 'dark') root.setAttribute('data-theme', 'dark'); else root.removeAttribute('data-theme');
    updateThemeLabel();
    if (save) store.set('theme', t);
  }

  langSwitch.addEventListener('click', e => {
    const b = e.target.closest('button[data-lang]');
    if (b && b.dataset.lang !== lang) setLang(b.dataset.lang, true);
  });
  themeBtn.addEventListener('click', () => {
    root.classList.add('theme-anim');
    setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
    setTimeout(() => root.classList.remove('theme-anim'), 450);
  });

  // teks yang dibuat ulang oleh skrip lain (mis. AOS, animasi) ikut diterjemahkan
  new MutationObserver(ms => ms.forEach(m => {
    if (m.type === 'characterData') apply(m.target);
    else m.addedNodes.forEach(n => n.nodeType === 3 ? apply(n) : n.nodeType === 1 && walk(n));
  })).observe(document.body, { childList: true, subtree: true, characterData: true });

  // ---------- judul contact: animasi ketik yang mengikuti bahasa ----------
  // Elemen <h2> lama diganti <div role="heading"> supaya skrip ketik lama (yang menyimpan teks satu bahasa saja)
  // tidak lagi mengendalikannya. Semua logika ketik ada di sini.
  const TITLE = {
    en: "Let's turn your data & ideas into digital solutions people love!",
    id: 'Ayo ubah data & ide Anda menjadi solusi digital yang disukai banyak orang!'
  };
  (function initTitle() {
    const old = document.querySelector('.contact-hero-content h2');
    if (!old) return;
    const el = document.createElement('div');
    el.className = 'contact-title';
    el.setAttribute('role', 'heading'); el.setAttribute('aria-level', '2'); el.setAttribute('data-i18n-skip', '');
    old.replaceWith(el);
    let timer = null, inView = false;
    const full = () => TITLE[lang];
    function type() {
      clearInterval(timer); el.textContent = '';
      const t = full(); let i = 0;
      timer = setInterval(() => { if (i < t.length) el.textContent += t.charAt(i++); else clearInterval(timer); }, 80);
    }
    new IntersectionObserver(es => {
      inView = es[0].isIntersecting;
      if (inView) type(); else { clearInterval(timer); el.textContent = ''; }
    }, { threshold: 0.5 }).observe(el);
    document.addEventListener('langchange', () => {
      el.setAttribute('aria-label', full());
      if (inView) { clearInterval(timer); el.textContent = full(); }   // ganti bahasa saat tampil: langsung teks baru
    });
    el.setAttribute('aria-label', full());
  })();

  // keadaan awal (dibaca dari localStorage)
  setTheme(store.get('theme') === 'dark' ? 'dark' : 'light', false);
  setLang(lang, false);
})();