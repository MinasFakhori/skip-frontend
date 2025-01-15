import {useCallback, useEffect, useState} from "react"; 
import useUploadImage from "./useUploadImage.jsx";
import {API_URLs} from "../../constants/apisUrl.js";
import getDateSQLFormat from "../../utils/getDateSQLFormat.js";

const useAddItem = ({newItemObj, setNewItemObj}) => {
    const [newItemId, setNewItemId] = useState(null);
    const [error, setError] = useState(null);

    //To upload image
    const {imageLink, error: imageLinkError} = useUploadImage(
        newItemObj?.image
    );

    const addDataToDB = useCallback(async () => {
        if (!newItemObj || !imageLink) return;

        if (imageLinkError) {
            setError(imageLinkError);
            return;
        }

        const date = getDateSQLFormat();
        const {title, address, description, geolocation} = newItemObj;
        const [latitude, longitude] = geolocation;

        const urlSearchParams = new URLSearchParams({
            title,
            date_updated: date,
            address,
            latitude,
            longitude,
            description,
            image_link: imageLink,
        });

        try {
            const response = await fetch(`${API_URLs.ITEMS}`, {
                method: "POST",
                body: urlSearchParams,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setNewItemId(data.id);
                setNewItemObj(null); // Reset newItemObj
            } else {
                const errorText = await response.text();
                setError(`Failed to add item: ${errorText}`);
            }
        } catch (e) {
            setError(e.message);
        }
    }, [newItemObj, imageLink, setNewItemObj, imageLinkError]);

    useEffect(() => {
        if (imageLinkError) {
            setError(imageLinkError);
        } else if (newItemObj && imageLink) {
            (async () => {
                try {
                    await addDataToDB();
                } catch (e) {
                    setError(e.message);
                }
            })();
        }
    }, [newItemObj, imageLink, imageLinkError, addDataToDB]);

    return {newItemId, error};
};

export default useAddItem;
