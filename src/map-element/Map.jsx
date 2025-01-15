import {MapContainer, Marker, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useMarkerIconMaker from "../hooks/helper-functions/useMarkerIconMaker.jsx";
import Links from "../constants/links.js";
import PropTypes from "prop-types";
import Loading from "../overlays/Loading.jsx";
import {useEffect, useMemo, useRef} from "react";
import "leaflet-rotatedmarker";
import MarkersClusters from "./MarkersClusters.jsx";
import useGetAllItems from "../hooks/apis/useGetAllItems.jsx";
import CenterMap from "./CenterMap.jsx";
import useAbsoluteOrientationSensor from "../hooks/helper-functions/useAbsoluteOrientationSensor.jsx";
import UseDeviceOrientationEvent from "../hooks/helper-functions/useDeviceOrientationEvent.jsx";


// I used there resources to help me with the rotation of the marker:
// https://codesandbox.io/p/sandbox/react-leaflet-marker-rotation-92wjp
// https://stackoverflow.com/questions/74368250/rotate-marker-in-react-leaflet-v4-react-typescript

const Map = ({
                 reFetchAllItems,
                 setReFetchAllItems,
                 currentLocation,
                 setMapCenter,
                 mapCenter,
                 recenterMap,
                 setRecenterMap,
                 setItemData,
                 setMapError,
             }) => {
    const {data: getAllItemsData, error: getAllItemsError} = useGetAllItems({
        reFetchAllItems,
        setReFetchAllItems
    });

    const supportsAbsoluteOrientationSensor = typeof AbsoluteOrientationSensor !== "undefined"


    const {
        direction,
        error: directionError
    } = supportsAbsoluteOrientationSensor 
    ? useAbsoluteOrientationSensor() : UseDeviceOrientationEvent();

    const currentLocationMarkerRef = useRef(null);

    useEffect(() => {
        if (getAllItemsError) {
            setMapError(getAllItemsError);
        }
    }, [setMapError, getAllItemsError]);


    useEffect(() => {
        // If the current location marker ref is not null and the direction is not null, then set the rotation angle of the marker.
        if (currentLocationMarkerRef.current && direction) {
            currentLocationMarkerRef.current.setRotationAngle(direction);
        }
    }, [direction]);

    useEffect(() => {
            if (recenterMap) {
                setRecenterMap(false);
                setMapCenter(null);
            }
        }
        , [recenterMap, setRecenterMap, setMapCenter]);


    // Makes the icons
    const itemMarkerIcon = useMarkerIconMaker("imgs/elements/item-marker.svg", "Item Marker");
    const takenItemMarkerIcon = useMarkerIconMaker("imgs/elements/taken-item-marker.svg", "Collected Item Marker");
    // For some reason the icons of AbsoluteOrientationSensor need to be different because the direction changes. 
    // Could have made a function to generate icon for different directions so it is more efficient and performant, however, this increases memory usage and is not as smooth  
    const currentLocationMarkerIcon = useMarkerIconMaker(
        supportsAbsoluteOrientationSensor ? "imgs/elements/abos-current-location-marker.svg" : "imgs/elements/doe-current-location-marker.svg",
        "Current Location Marker",
        [50, 50]
    );

    // Use memo to prevent re-rendering of the markers, because I was getting a bug where it would close the spider cluster when I clicked on a marker.
    const markers = useMemo(() => {
        if (getAllItemsData === null) {
            return null;
        }
        return getAllItemsData.items.map((marker) => (
            <Marker
                key={marker.id}
                position={[marker.latitude, marker.longitude]}
                icon={marker.taken ? takenItemMarkerIcon : itemMarkerIcon}
                eventHandlers={{
                    click: () => {
                        setItemData(marker);
                    }
                }}
            />
        ));
    }, [getAllItemsData, itemMarkerIcon, takenItemMarkerIcon, setItemData]);


    return (
        <MapContainer center={currentLocation} zoom={20} style={{height: "100dvh"}} zoomControl={false} minZoom={10}
                      worldCopyJump={true}>
            <TileLayer url={Links.OPENSTREETMAP_TILE} attribution="OpenStreetMap"/>

            {getAllItemsData === null ? (
                <Loading/>
            ) : (
                <MarkersClusters>{markers}</MarkersClusters>
            )}

            {recenterMap && <CenterMap center={mapCenter ? mapCenter : currentLocation}/>}


            {currentLocation && (
                <Marker
                    position={currentLocation}
                    icon={currentLocationMarkerIcon}
                    rotationAngle={directionError ? 0 : direction}
                    rotationOrigin="center"
                    interactive={false}
                    ref={currentLocationMarkerRef}
                />
            )}
        </MapContainer>
    );
};

export default Map;

Map.propTypes = {
    reFetchAllItems: PropTypes.bool.isRequired,
    setReFetchAllItems: PropTypes.func.isRequired,
    currentLocation: PropTypes.arrayOf(PropTypes.number).isRequired,
    mapCenter: PropTypes.arrayOf(PropTypes.number),
    setMapCenter: PropTypes.func.isRequired,
    recenterMap: PropTypes.bool.isRequired,
    setRecenterMap: PropTypes.func,
    setItemData: PropTypes.func,
    setMapError: PropTypes.func.isRequired,
};
