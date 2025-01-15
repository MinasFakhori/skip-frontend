import {useMap} from "react-leaflet";
import {useEffect} from "react";
import PropTypes from "prop-types";

// This has to be a separate component because it needs to be a child of MapContainer.
//Used this for help: https://react-leaflet.js.org/docs/api-map/
const CenterMap = ({center}) => {
    // This allows me to access the map object 
    const map = useMap();

    useEffect(() => {
        // This centers the map on the current location
        map.setView(center, 20);
    }, [center, map]);

    return null;
};

export default CenterMap;

CenterMap.propTypes = {
    center: PropTypes.arrayOf(PropTypes.number).isRequired,
};