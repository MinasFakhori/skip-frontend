# Skip App

---

### About Skip App

This app promotes re-use sustainability by allowing users to share, map and find materials and household goods found in
skips or offered for free collection in the street.

---

### The app features

- A mobile-optimised progressive web application
- A map view of the local area showing markers for available objects (Default view)
- When clicking on a marker, a detail view pops up with the
  - Title
  - Address
  - Image
  - Description
  - A button to mark the object as taken
  - Button to close the detail view
  - Once an object is taken, it disappears from the map at the end of the day.
- The map interface should also provide an Add button to upload new objects.
- After pressing the Add button users should be able to
  - Add a Title
  - They can take a picture or select one from the gallery
  - Description.
  - The app should automatically pick up the user's location
  - Submit the new object

---

### Technologies used

For the front-end, the app uses:

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [React-Leaflet](https://react-leaflet.js.org/)
- [Leaflet](https://leafletjs.com/)
- [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)

For the back-end, the app uses:

- [PHP](https://www.php.net/)
- [MySQL](https://www.mysql.com/)
- [Brighton Domains](https://brighton.domains/)
- [Geoapify](https://www.geoapify.com/)

---

### How to run the app

1. Run `npm install` to install the dependencies
2. Run `npm run dev` to start the development server
3. To build the app, run `npm run build`
4. To preview the built app, run `npm run serve`
