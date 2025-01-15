import React from "react";
import MarkerClusterGroup from "react-leaflet-cluster";
import PropTypes from "prop-types";

const MarkersClusters = React.memo(
    ({children}) => {
        return <MarkerClusterGroup chunkedLoading>{children}</MarkerClusterGroup>;
    },
    (oldProps, newProps) => {
        // Only rerender if markers prop has changed
        return oldProps.data === newProps.data;
    },
);

MarkersClusters.propTypes = {
    children: PropTypes.node.isRequired,
};

MarkersClusters.displayName = "MarkersClusters";

export default MarkersClusters;
