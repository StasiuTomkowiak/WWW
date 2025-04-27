document.addEventListener("DOMContentLoaded", function() {

    const header = document.querySelector("header");
    const navigation = document.querySelector(".navigation");
    const menuList = document.querySelector(".list");
    const hamburgerButton = document.createElement("div");

    hamburgerButton.className = "hamburger-menu";
    hamburgerButton.innerHTML = "<span></span><span></span><span></span>";
    header.insertBefore(hamburgerButton, navigation);
    hamburgerButton.addEventListener("click", function() {
        this.classList.toggle("active");
        navigation.classList.toggle("active");
    });

    const menuItems = document.querySelectorAll(".menu a");
    menuItems.forEach(item => {
        item.addEventListener("click", function() {
            if (window.innerWidth <= 810) {
                hamburgerButton.classList.remove("active");
                navigation.classList.remove("active");
            }
        });
    });

    document.addEventListener("click", function(event) {
        const isClickInsideMenu = navigation.contains(event.target);
        const isClickOnHamburger = hamburgerButton.contains(event.target);
        if (!isClickInsideMenu
                && !isClickOnHamburger
                && navigation.classList.contains("active")) {
            hamburgerButton.classList.remove("active");
            navigation.classList.remove("active");
        }
    });

    window.addEventListener("resize", function() {
        if (window.innerWidth > 810) {
            hamburgerButton.classList.remove("active");
            navigation.classList.remove("active");
        }
    });
});