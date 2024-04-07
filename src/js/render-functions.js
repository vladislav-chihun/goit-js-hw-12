export function imageRender(data) {
    return data.hits.map((item) => {
        return `<div class="gallery-item">
            <a href="${item.largeImageURL}" target="_blank">
                <img src="${item.webformatURL}" alt="${item.tags}" />
            </a>
            <ul class="img-data-list">
                <li class="likes">Likes<p>${item.likes}</p></li>
                <li class="views">Views<p>${item.views}</p></li>
                <li class="comments">Comments<p>${item.comments}</p></li>
                <li class="downloads">Downloads<p>${item.downloads}</p></li>
            </ul>
        </div>`;
    }).join('');
}
