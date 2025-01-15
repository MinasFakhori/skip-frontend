import {useCallback, useEffect, useState} from "react";
import {API_URLs} from "../../constants/apisUrl.js";

const useGetCoordFromAddress = ({searchedAddress}) => {
    const [coordinates, setCoordinates] = useState(null);
    const [error, setError] = useState(null);

    const getCoordinates = useCallback(async () => {
        setCoordinates(null);
        setError(null);

        try {
            const response = await fetch(
                `${API_URLs.GEO_LOCATION}?address=${encodeURIComponent(searchedAddress)}`
            );

            if (!response.ok) {
                if (response.status === 404) {
                    setError("Failed to find the location");
                } else {
                    setError("Failed to get data");
                }
                return;
            }

            const fetchedData = await response.json();
            const {coordinates} = fetchedData;

            if (!coordinates) {
                setError("Couldn't find the location");
            } else {
                setCoordinates(coordinates);
            }
        } catch (error) {
            setError(error.message);
        }
    }, [searchedAddress]);

    useEffect(() => {
        if (searchedAddress) {
            (async () => {
                try {
                    await getCoordinates();
                } catch (e) {
                    setError(e.message);
                }
            })();
        }
    }, [getCoordinates, searchedAddress]);

    return {coordinates, error, setError};
};

export default useGetCoordFromAddress;