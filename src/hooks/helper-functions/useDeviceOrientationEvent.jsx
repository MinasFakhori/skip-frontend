import {useEffect, useState} from "react";

const useDeviceOrientationEvent = () => {
    const [direction, setDirection] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const handleOrientation = (event) => {
            try {
                // The direction is the alpha value. There are three values alpha, beta, and gamma. Alpha is the compass direction, which is what I need.
                const newDirection = Math.floor(event.alpha);

                // I'm only updating the state if the new direction is different from the old direction.
                setDirection((oldDirection) => (newDirection !== oldDirection ? newDirection : oldDirection));
            } catch (e) {
                setError("Error finding the device orientation");
            }
        };

        if (window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", handleOrientation);
        } else {
            setError("Device orientation not supported on this device");
        }

        return () => {
            window.removeEventListener("deviceorientation", handleOrientation);
        };
    }, []);

    // This was giving me the opposite direction, so I had to multiply it by -1.
    return {direction: direction * -1, error};
};

export default useDeviceOrientationEvent;