import {useEffect, useState} from "react";

const useIsCameraAppAccessible = () => {
    const [isCameraAppAccessible, setIsCameraAppAccessible] = useState(false);

    useEffect(() => {
        const checkCameraCaptureSupport = () => {
            if (!navigator.mediaDevices && !navigator.getUserMedia) {
                setIsCameraAppAccessible(false);
                return;
            }

            // Creates a test input element to check if the camera app is accessible, this is a hacky way of doing it but it is the only way I found.
            // Used this for help: https://stackoverflow.com/questions/51273828/how-to-test-if-the-browser-support-input-capture
            const input = document.createElement("input");
            input.type = "file";
            input.style.display = "none";
            if ("capture" in input) {
                setIsCameraAppAccessible(true);
            }
        };

        checkCameraCaptureSupport();
    }, []);

    return isCameraAppAccessible;
};

export default useIsCameraAppAccessible;
