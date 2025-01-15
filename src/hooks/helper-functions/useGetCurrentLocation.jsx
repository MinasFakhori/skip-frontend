import {useEffect, useState} from "react";

const useGetCurrentLocation = () => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // If navigator.geolocation returns null, then the browser does not support geolocation
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
        }

        function handleSuccess(position) {
            const {latitude, longitude} = position.coords;
            // Update location only if it has changed
            if (
                !currentLocation ||
                currentLocation[0] !== latitude ||
                currentLocation[1] !== longitude
            ) {
                setError(null);
                setCurrentLocation([latitude, longitude]);
            }
        }

        function handleError(error) {
            setError(error.message);
        }

        const watchId = navigator.geolocation.watchPosition(
            handleSuccess,
            handleError,
            {
                enableHighAccuracy: true, // uses GPS rather than through internet
                timeout: Infinity, // The user can take long to enable location, if they reject it creates an error which I handle
                maximumAge: 1000,
            },
        );


        // Clear the watch when the component unmounts
        return () => navigator.geolocation.clearWatch(watchId);
    }, [currentLocation]);

    return {currentLocation, error};
};

export default useGetCurrentLocation;