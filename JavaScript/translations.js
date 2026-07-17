/*
  ============================================================
  TRANSLATIONS
  ============================================================
  This is the only file you need to touch to add languages.

  - "en" is the default language and already has every string
    filled in (it matches the original English site).
  - "id" is where you write your own translations. Fill in as
    many or as few keys as you want — any key you leave out
    (or leave as an empty string "") will automatically fall
    back to the English text, so nothing ever shows up blank.

  To add a THIRD language (say, Japanese):
    1. Add a new object below, e.g. "ja": { ... }
    2. Use the same keys as "en"
    3. The translate button in the top-left corner will
       automatically cycle through every language you add here
       (English → Indonesian → Japanese → English → ...)

  Keys tagged in index.html with `data-i18n-html` are inserted
  as HTML (so things like <strong> still work) — everything
  else is inserted as plain text.
  ============================================================
*/

window.translations = {
  en: {
    // top bar
    "panel.room": "room",

    // hero / home card
    "home.eyebrow": "welcome to my cat house",
    "home.h1": "hi! i'm adit",
    "home.tagline": "administrator, data analyst &amp; developer — try to click the cat, or click an icon below to peek inside :)",

    // mood line (changes automatically depending on what the cat is doing)
    "mood.idle": "mood: wide awake and watching you",
    "mood.patrol": "mood: patrolling before dinner",
    "mood.dinner": "mood: dinner time!",
    "mood.asleep": "mood: full & fast asleep zzz",

    // dock buttons
    "dock.about": "about",
    "dock.work": "work",
    "dock.contact": "contact",

    // about panel
    "about.h2": "about",
    "about.p1": "<strong>adithya p.w</strong> — IDN-based administrator, data analyst &amp; developer.",
    "about.p2": "i'm a random guy who likes making cozy little internet spaces — this one's shaped like a cardboard box because, well, cats.",
    "chip.admin": "administrator",
    "chip.dataAnalyst": "data analyst",
    "chip.webdev": "web dev",
    "about.eduHeading": "education",
    "about.edu1": "Natural Science, MAN 2 Palu City",
    "about.edu2": "2019",
    "about.interestsHeading": "other interests",
    "about.interest1": "game development",
    "about.interest2": "action-adventure games",
    "about.interest3": "music",
    "about.interest4": "reading books",
    "about.interest5": "actual cats",
    "about.langHeading": "languages",
    "about.lang.id.name": "Indonesian",
    "about.lang.id.level": "Native",
    "about.lang.en.name": "English",
    "about.lang.en.level": "Full Professional",
    "about.langNote": "I speak a little bit of Chinese (中文) and Japanese, but at elementary school proficiency.",

    // work panel
    "work.h2": "scratch pad",
    "work.toolsHeading": "Tools",
    "work.devHeading": "Development",
    "work.item1.h3": "Sales Smartphone",
    "work.item1.p": "As a sales excecutive Xiaomi smartphone with 7 months of experience, i have reached 300 units sales targets for each month",
    "work.item2.h3": "Warehouse Administrator",
    "work.item2.p": "1 year experience in inventory management, shipment documentation, stock control, and data entry.",
    "work.item3.h3": "Sales Administrator",
    "work.item3.p": "1 year hands of experience supporting sales operations, administrative support, data management, and sales forecasting.",
    "work.item4.h3": "Data Analyst Staff",
    "work.item4.p": "Experience in collecting, cleaning, and analyzing data to generate actionable insights.",
    "work.certHeading": "certificate",
    "work.cert1": "Microsoft Office Specialist, Widya Prima",
    "work.cert2": "Search and Rescue Certificate, Brigade Penolong",
    "work.orgHeading": "organization experience",
    "work.org1": "Student Council — Public Relations",
    "work.org2": "Brigade Penolong — Member",
    "work.org3": "Wanabakti — Member",

    // contact panel
    "contact.h2": "the food bowl",
    "contact.p": "the easiest way to reach me is email — i'll come running, promise.",
    "contact.mailbtn": "send me an email!"
  },

  id: {
    "panel.room": "room",

    // hero / home card
    "home.eyebrow": "selamat datang di rumah kucingku",
    "home.h1": "hai! saya adit",
    "home.tagline": "administrator, data analyst &amp; developer — coba klik kucingnya, atau klik ikon di bawah untuk melihat ke dalam :)",

    // mood line (changes automatically depending on what the cat is doing)
    "mood.idle": "mood: waspada dan mengawasimu",
    "mood.patrol": "mood: sedang berkeliling",
    "mood.dinner": "mood: waktunya makan!",
    "mood.asleep": "mood: kenyang & saatnya tidur zzz",

    // dock buttons
    "dock.about": "profil",
    "dock.work": "pengalaman",
    "dock.contact": "kontak",

    // about panel
    "about.h2": "Tentang saya",
    "about.p1": "<strong>adithya p.w</strong> — administrator, data analyst &amp; developer yang berbasis di Indonesia.",
    "about.p2": "saya seorang absurd yang suka membuat ruang internet yang nyaman, yang ini berbentuk kotak kardus karena.. begitulah, kucing.",
    "chip.admin": "administrator",
    "chip.dataAnalyst": "data analyst",
    "chip.webdev": "web dev",
    "about.eduHeading": "education",
    "about.edu1": "IPA, MAN 2 Kota Palu",
    "about.edu2": "2019",
    "about.interestsHeading": "minat lain",
    "about.interest1": "game development",
    "about.interest2": "action-adventure games",
    "about.interest3": "musik",
    "about.interest4": "membaca buku",
    "about.interest5": "tentu saja kucing",
    "about.langHeading": "bahasa",
    "about.lang.id.name": "Indonesia",
    "about.lang.id.level": "Bahasa Ibu",
    "about.lang.en.name": "English",
    "about.lang.en.level": "Mahir",
    "about.langNote": "saya sedikit mengerti bahasa China (中文) dan Jepang, namun tingkat penguasaan masih di level dasar.",

    // work panel
    "work.h2": "Catatan",
    "work.toolsHeading": "Aplikasi",
    "work.devHeading": "Pengembangan",
    "work.item1.h3": "Sales Ponsel",
    "work.item1.p": "Sebagai eksekutif penjualan ponsel Xiaomi dengan 7 bulan pengalaman, saya telah mencapai target penjualan sebesar 300 unit per bulan",
    "work.item2.h3": "Admin Gudang",
    "work.item2.p": "1 tahun pengalaman dalam manajemen inventaris, dokumentasi pengiriman, kontrol stok, dan data entri.",
    "work.item3.h3": "Admin Penjualan",
    "work.item3.p": "Dengan 1 tahun pengalaman dalam mendukung operasional penjualan, dukungan administratif, manajemen data, dan sales forecasting.",
    "work.item4.h3": "Staff Data Analis",
    "work.item4.p": "Berpengalaman dalam mengumpulkan, membersihkan, dan menganalisis data untuk menghasilkan wawasan yang dapat diterapkan.",
    "work.certHeading": "sertifikasi",
    "work.cert1": "Spesialis Microsoft Office, Widya Prima",
    "work.cert2": "Sertifikat Search and Rescue, Brigade Penolong",
    "work.orgHeading": "pengalaman organisasi",
    "work.org1": "OSIS — HUMAS",
    "work.org2": "Brigade Penolong — Anggota",
    "work.org3": "Wanabakti — Anggota",

    // contact panel
    "contact.h2": "Mangkuk Makanan",
    "contact.p": "Cara termudah untuk menghubungi saya adalah melalui email — saya akan segera datang, janji.",
    "contact.mailbtn": "kirim email!"
  },
  };