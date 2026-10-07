/* Dijalankan di <head> SEBELUM halaman tampil, agar mode gelap & bahasa langsung benar saat di-refresh (tanpa berkedip). */
(function () {
  try {
    if (localStorage.getItem('theme') === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    if (localStorage.getItem('lang') === 'en') document.documentElement.lang = 'en';
  } catch (e) {}
})();