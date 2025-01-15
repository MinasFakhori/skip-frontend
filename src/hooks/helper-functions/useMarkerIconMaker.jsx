import {Icon} from "leaflet/src/layer/index.js";
import {useMemo} from "react";

// A helper function to create marker icons, with memoization to stop re-renders when the parent component re-renders and so it can be a hook
const useMarkerIconMaker = (iconUrl, title, iconSize = [38, 38]) => {
    return useMemo(
        () =>
            new Icon({
                iconUrl: iconUrl,
                iconSize: iconSize,
                title: title,
            }),
        [iconUrl, title, iconSize],
    );
};

export default useMarkerIconMaker;
