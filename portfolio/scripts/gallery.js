/*jslint browser: true, this: true */
/*global Image, console */

document.addEventListener("DOMContentLoaded", function () {
    const galleryConfig = {
        galleryContainerId: "gallery-container",
        images: [
            {src: "images/go.jpg"},
            {src: "images/go.jpg"},
            {src: "images/crosswalk.jpg"},
            {src: "images/test.jpg"},
            {src: "images/test2.jpg"},
            {src: "images/projects.jpg"}
        ]
    };

    let galleryContainer = 
document.getElementById(galleryConfig.galleryContainerId);
    if (!galleryContainer) {
        galleryContainer = document.createElement("div");
        galleryContainer.id = galleryConfig.galleryContainerId;
        galleryContainer.className = "gallery-container";
        const mainSection = document.querySelector("main");
        mainSection.appendChild(galleryContainer);
    }

    function loadImagesInParallel() {
        const galleryTitle = document.createElement("h2");
        galleryTitle.className = "name";
        galleryTitle.textContent = "Galeria zdjęć";
galleryContainer.parentNode.insertBefore(galleryTitle, galleryContainer);

        const imagePromises = galleryConfig.images.map(function (image) {
            return new Promise(function (resolve, reject) {
                const img = new Image();
                img.src = image.src;
                img.alt = image.alt;

                img.onload = function() {
                    const galleryItem = document.createElement("div");
                    galleryItem.className = "gallery-item";
                    galleryItem.innerHTML = `
                        <div class="gallery-image-container">
<img src="${image.src}" alt="${image.alt}" class="gallery-image">
                        </div>
                    `;
                    resolve(galleryItem);
                };

                img.onerror = function() {
console.error(`Nie udało się załadować obrazu: ${image.src}`);
reject(new Error(`Nie udało się załadować obrazu: ${image.src}`));
                };
            });
        });

        Promise.all(imagePromises)
            .then(function (galleryItems) {
                galleryItems.forEach(function (item) {
                    galleryContainer.appendChild(item);
                });
                console.log("Wszystkie obrazy zostały załadowane pomyślnie!");

  setTimeout(function () {
document.querySelectorAll(".gallery-item").forEach(function (item) {
                        item.classList.add("loaded");
                    });
                }, 100);
            })
            .catch(function (error) {
console.error("Wystąpił błąd podczas ładowania obrazów:", error);
                const errorMessage = document.createElement("div");
                errorMessage.className = "gallery-error";
                errorMessage.textContent = "Wystąpił problem galerii";
                galleryContainer.appendChild(errorMessage);
            });
    }
    loadImagesInParallel();
});