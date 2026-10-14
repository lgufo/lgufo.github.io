(function () {
    const root = document.documentElement;
    const toggle = document.querySelector(".theme-toggle");
    const menuBtn = document.querySelector(".menu-btn");
    const nav = document.querySelector("#site-nav");

    function applyTheme(theme) {
        if (theme === "dark") {
            root.setAttribute("data-theme", "dark");
        } else {
            root.removeAttribute("data-theme");
            theme = "light";
        }
        try {
            localStorage.setItem("theme", theme);
        } catch (e) {}
        if (!toggle) return;
        const dark = theme === "dark";
        toggle.textContent = dark ? "Light" : "Dark";
        toggle.setAttribute("aria-pressed", String(dark));
        toggle.setAttribute("aria-label", dark ? "Switch to a white background" : "Switch to a black background");
    }

    applyTheme(root.getAttribute("data-theme") === "dark" ? "dark" : "light");

    toggle?.addEventListener("click", function () {
        applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });

    menuBtn?.addEventListener("click", function () {
        const open = nav.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", String(open));
    });

    nav?.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            nav.classList.remove("open");
            menuBtn?.setAttribute("aria-expanded", "false");
        });
    });

    document.addEventListener("contextmenu", function (event) {
        const overImage = Array.from(document.images).some(function (img) {
            const box = img.getBoundingClientRect();
            return event.clientX >= box.left && event.clientX <= box.right && event.clientY >= box.top && event.clientY <= box.bottom;
        });
        if (overImage) event.preventDefault();
    });
})();
