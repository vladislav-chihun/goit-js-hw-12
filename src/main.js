import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { imageRender } from "./js/render-functions";
import { getPhotos } from "./js/pixabay-api";

const form = document.querySelector(".form");
const gallery = document.querySelector(".gallery");
const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250
});
const loader = document.getElementById('loader');
const loadMoreBtn = document.getElementById('loadMoreBtn');
let currentPage = 1; // Зберігаємо поточну сторінку
let totalHits = 0; 

async function formListener() {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const q = form.elements.input.value; 
        if (q === "") return;
        loader.style.display = 'block'; 
        gallery.innerHTML = ''; 
        currentPage = 1; 
        try {
            const data = await getPhotos(q, currentPage);
            if (data.hits.length === 0) {
                iziToast.error({
                    message: "Sorry, there are no images matching your search query. Please try again!",
                    position: 'topRight'
                });
            } else {
                totalHits = data.totalHits; 
                const markup = imageRender(data);
                gallery.innerHTML = markup;
                lightbox.refresh();
                if (data.totalHits > 15) {
                    loadMoreBtn.style.display = 'block'; 
                } else {
                    loadMoreBtn.style.display = 'none'; 
                }
            }
            loader.style.display = 'none'; 
        } catch (err) {
            iziToast.error({
                position: "topRight",
                message:"Sorry, there are no images matching your search query. Please try again!"
            });
        }
    });
};

async function loadMoreListener() {
    loadMoreBtn.addEventListener("click", async () => {
        const q = form.elements.input.value;
        loader.style.display = 'block'; 
        try {
            const data = await getPhotos(q, currentPage);
            const additionalMarkup = imageRender(data);
            gallery.innerHTML += additionalMarkup;
            lightbox.refresh();
            currentPage++; 
            if (gallery.querySelectorAll('img').length >= totalHits) {
                loadMoreBtn.style.display = 'none'; 
                iziToast.info({
                    position: "topRight",
                    message:"We're sorry, but you've reached the end of search results."
                });
            }
            loader.style.display = 'none'; 
        } catch (err) {
            iziToast.error({
                position: "topRight",
                message:"Sorry, there was an error loading more images. Please try again!"
            });
        }
    });
};

formListener();
loadMoreListener();
