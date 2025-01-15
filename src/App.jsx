import {lazy, useState} from "react";
import styled from "styled-components";
import useGetCurrentLocation from "./hooks/helper-functions/useGetCurrentLocation.jsx";
import Loading from "./overlays/Loading.jsx";
import AddItem from "./pages/AddItem.jsx";
import ItemView from "./pages/ItemView.jsx";
import Error from "./overlays/Error.jsx"


// Using lazy loading to load the components only when needed to improve performance
const Map = lazy(() => import("./map-element/Map.jsx"));
const ScreenBtn = lazy(() => import("./ui-elements/ScreenBtn.jsx"));
const HeaderBar = lazy(() => import("./ui-elements/HeaderBar.jsx"));
const App = () => {
    // This state is used to re-fetch all the items location
    const [reFetchAllItems, setReFetchAllItems] = useState(true);
    const {currentLocation, error: currentLocationError} = useGetCurrentLocation();
    const [mapCenter, setMapCenter] = useState(null);
    const [recenterMap, setRecenterMap] = useState(false);
    const [itemData, setItemData] = useState(null);
    const [addPage, setAddPage] = useState(false);
    const [mapError, setMapError] = useState(null);


    return (
        <Container>
            {currentLocationError || mapError ? (
                <Error>{currentLocationError ? currentLocationError : mapError}</Error>
            ) : currentLocation === null ? (
                    <Loading/>
                ) :
                (
                    <>
                        <HeaderBar setMapCenter={setMapCenter} setRecenterMap={setRecenterMap}
                                   currentLocation={currentLocation} recenterMap={recenterMap}/>
                        <MapWrapper>
                            <Map
                                reFetchAllItems={reFetchAllItems}
                                setReFetchAllItems={setReFetchAllItems}
                                currentLocation={currentLocation}
                                setMapCenter={setMapCenter}
                                mapCenter={mapCenter}
                                recenterMap={recenterMap}
                                setRecenterMap={setRecenterMap}
                                setItemData={setItemData}
                                setMapError={setMapError}
                            />

                        </MapWrapper>

                        {addPage &&
                            <AddItem geoLocation={currentLocation} setAddPage={setAddPage}
                                     setReFetchAllItems={setReFetchAllItems}/>}

                        {itemData && <ItemView itemData={itemData} setItemData={setItemData}
                                               setReFetchAllItems={setReFetchAllItems}/>}


                        <ButtonWrapper>
                            <ScreenBtn
                                hasOrangeBg={false}
                                img="imgs/elements/add.svg"
                                alt="Add Item"
                                handleClick={() => setAddPage(true)}
                            />
                            <ScreenBtn
                                hasOrangeBg={true}
                                img="imgs/elements/location.svg"
                                alt="Recenter Map"
                                handleClick={() => setRecenterMap(true)}
                            />
                        </ButtonWrapper>
                    </>
                )}
        </Container>
    );
}

export default App


const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100dvh;
    width: 100dvw;
    padding: 0;
`;


const MapWrapper = styled.div`
    width: 100%;
    height: 100dvh;
    position: fixed;
`;

const ButtonWrapper = styled.div`
    width: 100%;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    background-color: rgba(255, 255, 255, 0);
`;
