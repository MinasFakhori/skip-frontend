import {useEffect, useRef, useState} from 'react';

const useAbsoluteOrientationSensor = () => {
    const [direction, setDirection] = useState(null);
    const [error, setError] = useState(null);
    const sensorRef = useRef(null);

    useEffect(() => {
        // Check if the AbsoluteOrientationSensor is supported on this device, this is already done in the Map component
        // However, it is good practice to check again in case this hook is used in a different component. 
        // Each hook should be self-contained and not rely on the parent component to check for support.
        if (typeof AbsoluteOrientationSensor !== "undefined") {
            const sensor = new AbsoluteOrientationSensor({frequency: 60, referenceFrame: 'device'});
            sensorRef.current = sensor;

            const handleReading = () => {
                const q = sensor.quaternion;
                const w = q[0], x = q[1], y = q[2], z = q[3];
                const yaw = Math.round(Math.atan2(2.0 * (y * z + w * x), w * w - x * x - y * y + z * z) * (180 / Math.PI));
                const rot = yaw > 0 ? yaw : yaw + 360;
                const arc = 3.0; // 3 degree precision
                const deg = arc * Math.floor((rot + (arc / 2)) / arc);
                setDirection(deg);
            };

            const handleError = (error) => {

                setError(`Error reading sensor data: ${error.message}`);
            };

            Promise.all([
                navigator.permissions.query({name: 'accelerometer'}),
                navigator.permissions.query({name: 'magnetometer'}),
                navigator.permissions.query({name: 'gyroscope'}),
            ])
                .then((results) => {
                    if (results.every((result) => result.state === 'granted')) {
                        sensor.addEventListener('reading', handleReading);
                        sensor.addEventListener('error', handleError);
                        sensor.start();
                    } else {
                        setError('Permissions not granted for sensor use.');
                    }
                })
                .catch(() => {
                    setError('Error checking permissions.');
                });

            return () => {
                if (sensorRef.current) {
                    sensorRef.current.removeEventListener('reading', handleReading);
                    sensorRef.current.removeEventListener('error', handleError);
                    sensorRef.current.stop();
                }
            };
        } else {
            setError('AbsoluteOrientationSensor is not supported on this device.');
        }
    }, []);

    return {direction: direction * -1, error};
};

export default useAbsoluteOrientationSensor;