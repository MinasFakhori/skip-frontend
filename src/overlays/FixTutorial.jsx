import styled from "styled-components";
import PropTypes from "prop-types";
import useBrowserType from "../hooks/helper-functions/useBrowserType.jsx";
import CloseButton from "../ui-elements/CloseButton.jsx";
import GeoLocationPermission from "../constants/geoLocationPermission.js";
import useIsMobile from "../hooks/helper-functions/useIsMobile.jsx";
import FixStep from "../ui-elements/FixStep.jsx";

const FixTutorial = ({setShowFix}) => {
    const browserType = useBrowserType();
    const isMobile = useIsMobile();

    const name = isMobile ? "MOBILE_" + browserType : "DESKTOP_" + browserType;


    return (
        <Container>
            <CloseButton handelClick={() => setShowFix(false)}/>
            <Title>
                Fix Tutorial for {browserType} {isMobile ? "Mobile" : "Desktop"}
            </Title>

            {GeoLocationPermission[name] ? (
                GeoLocationPermission[name].map((step, index) => (
                    <FixStep key={index} step={step}/>
                ))
            ) : (
                GeoLocationPermission["MOBILE_CHROME"].map((step, index) => (
                    <FixStep key={index} step={step}/>
                ))
            )}

        </Container>
    );
};

export default FixTutorial;


FixTutorial.propTypes = {
    setShowFix: PropTypes.func.isRequired,
};

const Container = styled.div`
    background: white;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
`;

const Title = styled.h1`
    margin-top: 3em;
`