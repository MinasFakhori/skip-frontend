import {useCallback, useEffect, useState} from "react";
import {API_URLs} from "../../constants/apisUrl.js";

const useGetAllItems = ({reFetchAllItems, setReFetchAllItems}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const getItems = useCallback(async () => {
        setError(null);

        setData(null);
        setError(null);

        try {
            const response = await fetch(API_URLs.ITEMS);

            if (!response.ok) {
                setError("Failed to get data");
            } else if (response.status === 204) {
                setData(null);
            } else {
                const fetchedData = await response.json();
                setData(fetchedData);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            // Reset the reFetchAllItems to false
            if (reFetchAllItems) {
                setReFetchAllItems(false);
            }
        }
    }, [reFetchAllItems, setReFetchAllItems]);

    useEffect(() => {
        if (reFetchAllItems) {
            (async () => {
                try {
                    await getItems();
                } catch (e) {
                    setError(e.message);
                }
            })();
        }
    }, [getItems, reFetchAllItems, setReFetchAllItems]);

    return {data, error};
};

export default useGetAllItems;
