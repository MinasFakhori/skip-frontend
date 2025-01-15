import {useEffect, useState} from "react";

const useBrowserType = () => {
    const [browserType, setBrowserType] = useState("CHROME");

    const userAgent = window.navigator.userAgent;

    useEffect(() => {
        if (userAgent.includes("Firefox")) {
            setBrowserType("FIREFOX");
        } else if (userAgent.includes("Chrome")) {
            setBrowserType("CHROME");
        } else if (userAgent.includes("Safari")) {
            setBrowserType("SAFARI");
        } else {
            setBrowserType("CHROME");
        }
    }, [userAgent]);

    return browserType;
};

export default useBrowserType;
