document.addEventListener("DOMContentLoaded", function () {

    const links = document.querySelectorAll(".accordion__body-inner a");
    const currentPath = window.location.pathname;

    links.forEach(link => {

        // Ignore empty or # links
        const href = link.getAttribute("href");
        if (!href || href === "#") return;

        // Convert to full URL
        const linkPath = new URL(link.href).pathname;

        // Match exact page OR if current page contains it
        if (currentPath === linkPath || currentPath.includes(linkPath)) {
            link.classList.add("active");

            // Optional: open its accordion automatically
            const panel = link.closest(".course-panel");
            if (panel) {
                panel.style.display = "block";
            }
        }

    });

});

document.querySelectorAll('.accordion__header').forEach(header => {
    header.addEventListener('click', function () {
        const item = this.closest('.accordion__item');
        const content = item.querySelector('.accordion__content');

        // Close all other items (optional - remove if not needed)
        document.querySelectorAll('.accordion__item').forEach(i => {
            if (i !== item) {
                i.querySelector('.accordion__header').classList.remove('active');
                i.querySelector('.accordion__content').style.maxHeight = null;
            }
        });

        // Toggle current item
        this.classList.toggle('active');

        if (this.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + "px";
        } else {
            content.style.maxHeight = null;
        }
    });
});
const menuBtn = document.querySelector(".menu");
const closeBtn = document.querySelector(".menu-close");
const sidebar = document.querySelector(".sidenavbar");

menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
});

closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("active");
});

// Initialize Swiper Banner Slider if elements exist
document.addEventListener("DOMContentLoaded", function () {
    if (document.querySelector('.category__scrolling-banner')) {
        const bannerSwiper = new Swiper('.category__scrolling-banner', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            speed: 1500,
            autoHeight: true,
            pagination: {
                el: '.scrolling-banner__controls .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });

        // Explicitly stop autoplay on hover, resume on mouse leave
        const swiperEl = document.querySelector('.category__scrolling-banner');
        swiperEl.addEventListener('mouseenter', function () {
            bannerSwiper.autoplay.stop();
        });
        swiperEl.addEventListener('mouseleave', function () {
            bannerSwiper.autoplay.start();
        });
    }
});