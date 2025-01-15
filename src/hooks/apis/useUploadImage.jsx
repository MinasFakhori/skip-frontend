import {useCallback, useEffect, useState} from "react";
import {API_URLs} from "../../constants/apisUrl.js";

const useUploadImage = (image) => {
    const [imageLink, setImageLink] = useState(null);
    const [error, setError] = useState(null);

    const uploadImage = useCallback(async () => {
        if (!image) return;

        try {
            const formData = new FormData();
            formData.append("image", image);

            const response = await fetch(`${API_URLs.ITEMS}`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                setError(errorText);
            }

            const fetchedData = await response.json();
            setImageLink(fetchedData.image_link);
        } catch (e) {
            setError(e.message);
        }
    }, [image]);

    useEffect(() => {
        if (image) {
            (async () => {
                try {
                    await uploadImage();
                } catch (e) {
                    setError(e.message);
                }
            })();
        }
    }, [image, uploadImage]);

    return {imageLink, error};
};

export default useUploadImage;