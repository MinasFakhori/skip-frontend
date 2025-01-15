import styled from "styled-components";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import FixTutorial from "./FixTutorial.jsx";
import OverlayContainer from "../ui-elements/OverlayContainer.jsx";

const Error = ({children}) => {
    const [availableFix, setAvailableFix] = useState(null);
    const [showFix, setShowFix] = useState(false);

    useEffect(() => {
        if (children === "User denied Geolocation" || children === "User denied geolocation prompt") {
            setAvailableFix("User denied Geolocation");
        }
    }, [children]);

    const handleRetry = () => {
        window.location.reload();
    };

    return (
        <OverlayContainer>
            {showFix ? (
                <FixTutorial setShowFix={setShowFix}/>
            ) : (
                <Container>
                    <h1>Oops! It seems we've hit a snag.</h1>
                    <ErrorImg src={"imgs/error-puppy.png"} alt={"Error Image"}/>

                    <ErrorText>Error Message: {children}</ErrorText>

                    {availableFix ? (
                        <Button onClick={() => setShowFix(true)}>Show Fix?</Button>
                    ) : (
                        <Button onClick={handleRetry}>Try Again?</Button>
                    )}
                </Container>
            )}
        </OverlayContainer>
    );
};
Error.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Error;

const Container = styled.div`
    height: 100dvh;
    width: 100%;
    display: flex;
    position: sticky;
    flex-direction: column;
    justify-content: space-evenly;
    z-index: 1000000000;
    margin-top: 3em;
`;

const ErrorImg = styled.img`
    width: 20%;
    align-self: center;

    @media screen and (max-width: 768px) {
        width: 50%;
    }
`;

const ErrorText = styled.p`
    color: var(--primary);
`;

const Button = styled.button`
    align-self: center;
    border-radius: 5px;
    border: 2px solid var(--primary);
    padding: 1em;
    background-color: white;
    cursor: pointer;
`;