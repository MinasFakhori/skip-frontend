import {useCallback, useEffect, useState} from "react";
import {API_URLs} from "../../constants/apisUrl.js";

const useUpdateToCollected = ({id, markAsCollected, setMarkAsCollected}) => {
    const [collectedID, setCollectedID] = useState(null);
    const [error, setError] = useState(null);

    const updateCollected = useCallback(async () => {
        setCollectedID(null);
        setError(null);

        const urlSearchParams = new URLSearchParams({id});

        try {
            const response = await fetch(API_URLs.ITEMS, {
                method: "PUT",
                body: urlSearchParams,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });

            if (!response.ok) {
                setError("Failed to update the item");
                return;
            }

            if (response.status === 204) {
                setCollectedID(null);
            } else {
                const fetchedData = await response.json();
                setCollectedID(fetchedData.collected_id || null);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            if (markAsCollected) {
                setMarkAsCollected(false);
            }
        }
    }, [id, markAsCollected, setMarkAsCollected]);

    useEffect(() => {
        if (markAsCollected) {
            (async () => {
                try {
                    await updateCollected();
                } catch (e) {
                    setError(e.message);
                }
            })();
        }
    }, [markAsCollected, updateCollected]);

    return {collectedID, error};
};

export default useUpdateToCollected;