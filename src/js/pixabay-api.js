 export function getPhotos(q) {
    const API_KEY = '43242256-64b8ba54a0ed56e09a2e1fe41';
    const BASE_URL = "https://pixabay.com/api/?key=" + API_KEY;
    const params = new URLSearchParams({
        key: `${API_KEY}`,
        q: `${q}`,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
    });
    const URL = `${BASE_URL}&${params}`;
    return fetch(URL).then(res => res.json());
}