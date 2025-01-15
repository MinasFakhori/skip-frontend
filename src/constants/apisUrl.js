// One place to store all the APIs used in the app, so that they can be easily changed in the future

const BASE_URL = "https://mf600.brighton.domains/CI609/skip-backend/api"

const API_URLs = Object.freeze({
    GEO_LOCATION: `${BASE_URL}/geolocation.php`,

    ITEMS: `${BASE_URL}/items.php`,

});

export {API_URLs};