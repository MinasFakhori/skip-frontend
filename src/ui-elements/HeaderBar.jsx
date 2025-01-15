import styled from "styled-components";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import useGetCoordFromAddress from "../hooks/apis/useGetCoordFromAddress.jsx";
import OverlayContainer from "./OverlayContainer.jsx";
import Loading from "../overlays/Loading.jsx";

const HeaderBar = ({setMapCenter, setRecenterMap, recenterMap}) => {
    const [address, setAddress] = useState("");
    const [searchedAddress, setSearchedAddress] = useState("");
    const {coordinates, error, setError} = useGetCoordFromAddress({searchedAddress});

    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (address.trim()) {
            setSearchedAddress(address);
            setAddress("");
            setLoading(true);
        }
    };

    useEffect(() => {
        setError(null);
    }, [recenterMap, setError]);


    useEffect(() => {
        if (coordinates) {
            setMapCenter(coordinates);
            setRecenterMap(true);
            setLoading(false);
        }
    }, [coordinates, setMapCenter, setRecenterMap]);

    useEffect(() => {
        if (error) {
            setLoading(false);
        }
    }, [error]);

    return (
        <>
            {loading &&
                <OverlayContainer>
                    <Loading/>
                </OverlayContainer>}
            <Container>
                <Logo src={"imgs/logo/skip-no-bg.png"} alt={"Skip Logo"}/>
                <Form onSubmit={handleSubmit}>
                    <SearchInput
                        id="search_btn"
                        value={address}
                        placeholder="Search a city or postcode to discover items..."
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <SubmitInput type={"submit"} value={"Go"}/>
                </Form>
                {error && <ErrorText>{error}</ErrorText>}
            </Container>
        </>
    );
};

export default HeaderBar;


HeaderBar.propTypes = {
    setMapCenter: PropTypes.func.isRequired,
    setRecenterMap: PropTypes.func.isRequired,
    recenterMap: PropTypes.bool.isRequired,
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 1px;
    align-self: center;
    justify-content: center;
    align-content: center;
    z-index: 10000;
    padding: 1em;
    background-color: var(--primary);
    border-radius: 5px;

    @media screen and (max-width: 768px) {
        margin: 0;
        padding: 1em;
        width: 90dvw;
    }
`;

const ErrorText = styled.p`
    color: white;
    width: 100%;
    text-align: center;
`;

const Logo = styled.img`
    width: 5%;
    min-width: 70px;
    align-self: center;
    margin: 0.5em;

    @media screen and (max-width: 768px) {
        width: 15%;
        min-width: 60px;
    }

    @media screen and (max-width: 425px) {
        width: 25%;
        min-width: 50px;
    }
`;

const Form = styled.form`
    align-self: center;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const SearchInput = styled.input`
    border: none;
    border-radius: 5px 0 0 5px;
    width: 20%;
    height: 2em;
    padding: 1em;

    @media screen and (max-width: 768px) {
        width: 50%;
        height: 1em;
    }

    @media screen and (max-width: 425px) {
        width: 70%;
        height: 1em;
    }
`;

const SubmitInput = styled.input`
    border: none;
    border-radius: 0 5px 5px 0;
    width: 5%;
    background-color: var(--secondary);
    color: var(--primary);

    @media screen and (max-width: 768px) {
        width: 10%;
    }

    @media screen and (max-width: 425px) {
        width: 20%;
    }
`;