let images = []; 
let currentImageIndex = 0; 
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const wonderName = params.get('name');

    axios.get(`https://www.world-wonders-api.org/v0/wonders`)
        .then(response => {
            const data = response.data.find(wonder => wonder.name === wonderName);
            if(data) {
                document.getElementById('wonder-name').textContent = data.name;
                document.getElementById('wonder-location').innerHTML="<strong>Location:</strong> " + data.location;
                document.getElementById('wonder-build-year').innerHTML="<strong>Build Year:</strong> " +data.build_year;
                document.getElementById('wonder-time-period').innerHTML="<strong>Time Period:</strong> "+data.time_period;
                document.getElementById('wonder-summary').textContent = data.summary;
                createLink("wiki-link-container", data.links.wiki, "Wiki");
                createLink("brit-link-container", data.links.britannica, "Britannica");
                createLink("maps-link-container", data.links.google_maps, "Google Maps")
                createLink("trip-link-container", data.links.trip_advisor, "Trip Advisor")

                images = data.links.images;
                updateImageDisplay();
            }
        })
        .catch(error => console.error('Error fetching details:', error));
});

function createLink(id, href, text) {
    const container = document.getElementById(id);
    const link = document.createElement('a');

    link.href = href;
    link.textContent = text;
    container.appendChild(link);
}
function changeImage(step) {
    currentImageIndex += step;
    if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    }
    updateImageDisplay();
}

function updateImageDisplay() {
    const imageElement = document.getElementById('wonder-image');
    imageElement.src = images[currentImageIndex];
}

function goBack() {
    window.history.back();
}
