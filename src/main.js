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

form.addEventListener("submit", e => {
    e.preventDefault();
    const q = form.elements.input.value; 
    if (q === "") return;
    loader.style.display = 'block'; 
    getPhotos(q).then(data => {
        if (data.hits.length === 0) {
            iziToast.error({
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: 'topRight'
            });
        } else {
            const markup = imageRender(data);
            gallery.innerHTML = markup;
            lightbox.refresh();
        }
        loader.style.display = 'none'; 
    }).catch(error => {
        iziToast.error({
            position: "topRight",
            message:"Sorry, there are no images matching your search query. Please try again!"
        });
    });
});




