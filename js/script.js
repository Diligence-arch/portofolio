const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
let current = '';
    
sections.forEach(section => {
const sectionTop = section.offsetTop;
const sectionHeight = section.clientHeight;
// Jika posisi scroll berada di dalam area section tersebut
if (window.scrollY >= (sectionTop - 200)) {
    current = section.getAttribute('id');
}
});

navLinks.forEach(link => {
link.classList.remove('active');
if (link.getAttribute('href') === `#${current}`) {
    link.classList.add('active');
}
});
});

// Efek magnetic pada tombol LET'S TALK
const btnTalk = document.querySelector('.btn-lets-talk');

if(btnTalk) {
    btnTalk.addEventListener('mousemove', function(e) {
        const position = btnTalk.getBoundingClientRect();
        const x = e.pageX - position.left - position.width / 2;
        const y = e.pageY - position.top - position.height / 2;

        // Menggerakkan tombol sedikit sesuai posisi kursor
        btnTalk.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
    });

    btnTalk.addEventListener('mouseout', function() {
        // Mengembalikan ke posisi semula saat kursor pergi
        btnTalk.style.transform = 'translate(0px, 0px)';
    });
}


document.addEventListener("DOMContentLoaded", function() {
const titleElement = document.querySelector('.contact-hero-content h2');

if (titleElement) {
    // Simpan teks asli dan kosongkan judulnya
    const text = titleElement.textContent.trim();
    titleElement.textContent = ''; 
    
    let typeWriterInterval;

    const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        // Ketika judul mulai terlihat di layar, mulai ngetik
        titleElement.textContent = ''; 
        clearInterval(typeWriterInterval);
        
        let i = 0;
        typeWriterInterval = setInterval(() => {
        if (i < text.length) {
            titleElement.textContent += text.charAt(i); // Munculkan 1 huruf
            i++;
        } else {
            clearInterval(typeWriterInterval); // Hentikan jika teks sudah selesai
        }
        }, 80); // KECEPATAN KETIK: 80 milidetik per huruf (ubah angka ini jika ingin lebih lambat/cepat)
    } else {
        // Kosongkan teks kembali saat di-scroll ke atas agar animasi bisa diulang
        titleElement.textContent = '';
        clearInterval(typeWriterInterval);
    }
    }, { threshold: 0.5 });

    observer.observe(titleElement);
}
});
