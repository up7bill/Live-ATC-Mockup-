
/* ========================================
   MOBILE NAVIGATION & MEGA MENUS
======================================== */

const menuToggle =
    document.querySelector(".menu-toggle");

const primaryNavigation =
    document.querySelector(".primary-nav");

const navItems =
    document.querySelectorAll(".nav-item--mega");

const desktopNavigation =
    window.matchMedia("(min-width: 1101px)");


/* ========================================
   CLOSE INDIVIDUAL MEGA MENU
======================================== */

function closeMegaMenu(item) {

    const toggle =
        item.querySelector(".nav-item__toggle");

    item.classList.remove("is-open");

    if (toggle) {
        toggle.setAttribute("aria-expanded", "false");
    }

}


/* ========================================
   CLOSE ALL MEGA MENUS
======================================== */

function closeAllMegaMenus(exceptItem = null) {

    navItems.forEach((item) => {

        if (item !== exceptItem) {
            closeMegaMenu(item);
        }

    });

}


/* ========================================
   OPEN MEGA MENU
======================================== */

function openMegaMenu(item) {

    const toggle =
        item.querySelector(".nav-item__toggle");

    closeAllMegaMenus(item);

    item.classList.add("is-open");

    if (toggle) {
        toggle.setAttribute("aria-expanded", "true");
    }

}


/* ========================================
   MOBILE MENU CONTROLS
======================================== */

function closeMobileNavigation() {

    if (!menuToggle || !primaryNavigation) {
        return;
    }

    primaryNavigation.classList.remove("is-open");

    menuToggle.classList.remove("is-active");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

    document.body.classList.remove("menu-open");

    closeAllMegaMenus();

}


if (menuToggle && primaryNavigation) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            primaryNavigation.classList.contains("is-open");

        if (isOpen) {

            closeMobileNavigation();

        } else {

            primaryNavigation.classList.add("is-open");

            menuToggle.classList.add("is-active");

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Close navigation menu"
            );

            document.body.classList.add("menu-open");

        }

    });

}


/* ========================================
   MEGA MENU BUTTONS
======================================== */

navItems.forEach((item) => {

    const toggle =
        item.querySelector(".nav-item__toggle");

    if (!toggle) {
        return;
    }

    toggle.addEventListener("click", () => {

        const isOpen =
            item.classList.contains("is-open");

        if (isOpen) {

            closeMegaMenu(item);

        } else {

            openMegaMenu(item);

        }

    });


    /* Desktop hover behavior */

    item.addEventListener("mouseenter", () => {

        if (desktopNavigation.matches) {
            openMegaMenu(item);
        }

    });

    item.addEventListener("mouseleave", () => {

        if (desktopNavigation.matches) {
            closeMegaMenu(item);
        }

    });


    /* Keyboard focus behavior */

    item.addEventListener("focusin", () => {

        if (desktopNavigation.matches) {
            openMegaMenu(item);
        }

    });

    item.addEventListener("focusout", (event) => {

        if (
            desktopNavigation.matches &&
            !item.contains(event.relatedTarget)
        ) {

            closeMegaMenu(item);

        }

    });

});


/* ========================================
   CLOSE MENUS WITH ESCAPE
======================================== */

document.addEventListener("keydown", (event) => {

    if (event.key !== "Escape") {
        return;
    }

    const openMegaItem =
        document.querySelector(".nav-item--mega.is-open");

    if (openMegaItem) {

        const toggle =
            openMegaItem.querySelector(".nav-item__toggle");

        closeMegaMenu(openMegaItem);

        if (toggle) {
            toggle.focus();
        }

        return;
    }

    if (
        primaryNavigation &&
        primaryNavigation.classList.contains("is-open")
    ) {

        closeMobileNavigation();

        if (menuToggle) {
            menuToggle.focus();
        }

    }

});


/* ========================================
   CLOSE MENUS WHEN CLICKING OUTSIDE
======================================== */

document.addEventListener("click", (event) => {

    const clickedInsideNavigation =
        primaryNavigation &&
        primaryNavigation.contains(event.target);

    const clickedMobileToggle =
        menuToggle &&
        menuToggle.contains(event.target);

    if (
        !clickedInsideNavigation &&
        !clickedMobileToggle
    ) {

        closeAllMegaMenus();

        if (
            primaryNavigation &&
            primaryNavigation.classList.contains("is-open")
        ) {
            closeMobileNavigation();
        }

    }

});


/* ========================================
   RESET NAVIGATION ON SCREEN RESIZE
======================================== */

desktopNavigation.addEventListener("change", () => {

    closeMobileNavigation();

});


/* ========================================
   HERO SLIDER
======================================== */

const slides =
    document.querySelectorAll(".hero-slide");

const dots =
    document.querySelectorAll(".slider-dot");

const previousButton =
    document.querySelector(".slider-arrow--previous");

const nextButton =
    document.querySelector(".slider-arrow--next");

let currentSlide = 0;
let sliderTimer;


/* ========================================
   DISPLAY SLIDE
======================================== */

function displaySlide(index) {

    if (slides.length === 0) {
        return;
    }

    if (index >= slides.length) {
        index = 0;
    }

    if (index < 0) {
        index = slides.length - 1;
    }

    slides.forEach((slide) => {
        slide.classList.remove("is-active");
    });

    dots.forEach((dot) => {
        dot.classList.remove("is-active");
    });

    slides[index].classList.add("is-active");

    if (dots[index]) {
        dots[index].classList.add("is-active");
    }

    currentSlide = index;

}


/* ========================================
   NEXT SLIDE
======================================== */

function nextSlide() {

    displaySlide(currentSlide + 1);

}


/* ========================================
   PREVIOUS SLIDE
======================================== */

function previousSlide() {

    displaySlide(currentSlide - 1);

}


/* ========================================
   AUTOPLAY
======================================== */

function startSlider() {

    stopSlider();

    if (slides.length <= 1) {
        return;
    }

    sliderTimer = setInterval(
        nextSlide,
        7000
    );

}


function stopSlider() {

    clearInterval(sliderTimer);

}


/* ========================================
   ARROW CONTROLS
======================================== */

if (nextButton) {

    nextButton.addEventListener("click", () => {

        nextSlide();
        startSlider();

    });

}


if (previousButton) {

    previousButton.addEventListener("click", () => {

        previousSlide();
        startSlider();

    });

}


/* ========================================
   PAGINATION CONTROLS
======================================== */

dots.forEach((dot) => {

    dot.addEventListener("click", () => {

        const slideNumber =
            Number(dot.dataset.slide);

        if (!Number.isNaN(slideNumber)) {

            displaySlide(slideNumber);
            startSlider();

        }

    });

});


/* ========================================
   INITIALIZE SLIDER
======================================== */

if (slides.length > 0) {

    displaySlide(0);
    startSlider();

}


/* ========================================
   UTILITY SEARCH
======================================== */

const utilitySearch =
    document.querySelector(".utility-search");

const searchToggle =
    document.querySelector(".utility-search__toggle");

const searchInput =
    document.querySelector("#site-search");


function closeUtilitySearch(restoreFocus = false) {

    if (!utilitySearch || !searchToggle) {
        return;
    }

    utilitySearch.classList.remove("is-open");

    searchToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    searchToggle.setAttribute(
        "aria-label",
        "Open site search"
    );

    if (restoreFocus) {
        searchToggle.focus();
    }

}


if (utilitySearch && searchToggle && searchInput) {

    searchToggle.addEventListener("click", () => {

        const isOpen =
            utilitySearch.classList.toggle("is-open");

        searchToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        searchToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close site search"
                : "Open site search"
        );

        if (isOpen) {

            setTimeout(() => {
                searchInput.focus();
            }, 100);

        }

    });

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            utilitySearch.classList.contains("is-open")
        ) {

            closeUtilitySearch(true);

        }

    });

    document.addEventListener("click", (event) => {

        if (!utilitySearch.contains(event.target)) {
            closeUtilitySearch();
        }

    });

}


/* ========================================
   FOOTER COPYRIGHT YEAR
======================================== */

const footerYear =
    document.getElementById("footer-year");

if (footerYear) {

    footerYear.textContent =
        new Date().getFullYear();

}
