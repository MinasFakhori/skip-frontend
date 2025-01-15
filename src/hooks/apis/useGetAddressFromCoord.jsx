import {useCallback, useEffect, useState} from "react";
import {API_URLs} from "../../constants/apisUrl.js";

const useGetAddressFromCoord = (geoLocation) => {
    const [address, setAddress] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const getAddress = useCallback(async () => {
        if (
            !geoLocation ||
            !Array.isArray(geoLocation) ||
            geoLocation.length !== 2
        ) {
            setError("Wrong geoLocation coordinates");
            setAddress(null);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(
                `${API_URLs.GEO_LOCATION}?latitude=${encodeURIComponent(
                    geoLocation[0]
                )}&longitude=${encodeURIComponent(geoLocation[1])}`
            );

            if (!response.ok) {
                const errorMessage =
                    response.status === 404
                        ? "Couldn't find the location"
                        : "Failed to get data";
                setError(errorMessage);
                setAddress(null);
            }

            const fetchedData = await response.json();
            const fetchedAddress = fetchedData.address;

            if (!fetchedAddress) {
                setError("Couldn't find the location");
                setAddress(null);
            }

            setAddress(fetchedAddress);
            setError(null);
        } catch (error) {
            setError(error.message);
            setAddress(null);
        } finally {
            setLoading(false);
        }
    }, [geoLocation]);

    useEffect(() => {
        (async () => {
            try {
                await getAddress();
            } catch (e) {
                setError(e.message);
            }
        })();
    }, [getAddress]);

    return {address, setAddress, error, loading, refetch: getAddress};
};

export default useGetAddressFromCoord;
