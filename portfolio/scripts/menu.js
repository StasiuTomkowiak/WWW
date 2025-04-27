/*jslint browser: true, this: true */
/*global Image, console */
document.addEventListener("DOMContentLoaded", function() {

    const menuItems = [
        { href: "main.html", text: "O mnie" },
        { href: "projects.html", text: "Projekty" },
        { href: "interests.html", text: "Zainteresowania" },
        { href: "contacts.html", text: "Kontakt" },
        { href: "gallery.html", text: "Galeria" }
    ];
const currentPage = window.location.pathname.split("/").pop() || "main.html";

    function createMenu() {
        const header = document.querySelector("header");

        const existingNav = header.querySelector("nav");
        if (existingNav) {
            header.removeChild(existingNav);
        }

        const nav = document.createElement("nav");
        nav.className = "navigation";

        const ul = document.createElement("ul");
        ul.className = "list";

        menuItems.forEach((item) => {
            const li = document.createElement("li");
            li.className = "menu";

            if (currentPage === item.href) {
                li.classList.add("act");
            }

            const a = document.createElement("a");
            a.href = item.href;
            a.textContent = item.text;

            li.appendChild(a);
            ul.appendChild(li);
        });

        const hamburgerButton = document.createElement("div");
        hamburgerButton.className = "hamburger-menu";
        hamburgerButton.innerHTML = "<span></span><span></span><span></span>";

        hamburgerButton.addEventListener("click", function() {
            this.classList.toggle("active");
            nav.classList.toggle("active");
        });

        ul.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", function() {
                if (window.innerWidth <= 810) {
                    hamburgerButton.classList.remove("active");
                    nav.classList.remove("active");
                }
            });
        });

        nav.appendChild(ul);
        header.appendChild(hamburgerButton);
        header.appendChild(nav);
    }

    createMenu();

    document.addEventListener("click", function(event) {
        const nav = document.querySelector(".navigation");
        const hamburgerButton = document.querySelector(".hamburger-menu");

        if (nav && hamburgerButton) {
            const isClickInsideMenu = nav.contains(event.target);
            const isClickOnHamburger = hamburgerButton.contains(event.target);

if (!isClickInsideMenu && !isClickOnHamburger && nav.classList
.contains("active")) {
                hamburgerButton.classList.remove("active");
                nav.classList.remove("active");
            }
        }
    });

    window.addEventListener("resize", function() {
        const nav = document.querySelector(".navigation");
        const hamburgerButton = document.querySelector(".hamburger-menu");

        if (window.innerWidth > 810 && nav && hamburgerButton) {
            hamburgerButton.classList.remove("active");
            nav.classList.remove("active");
        }
    });
});