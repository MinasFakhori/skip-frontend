import OverlayContainer from "../ui-elements/OverlayContainer.jsx";
import CloseButton from "../ui-elements/CloseButton.jsx";
import styled from "styled-components";
import useUpdateToCollected from "../hooks/apis/useUpdateToCollected.jsx";
import {useState} from "react";
import Loading from "../overlays/Loading.jsx";
import PropTypes from "prop-types";
import Success from "../overlays/Success.jsx";
import Error from "../overlays/Error.jsx";

const ItemView = ({itemData, setItemData, setReFetchAllItems}) => {
    const [markAsCollected, setMarkAsCollected] = useState(false);

    const {collectedID, error} = useUpdateToCollected({id: itemData.id, markAsCollected, setMarkAsCollected});

    const gmapUrl = `https://www.google.com/maps/search/?api=1&query=${itemData.latitude},${itemData.longitude}`;


    return (


        <OverlayContainer>

            {error && <Error>{error}</Error>}

            {markAsCollected && !collectedID && (
                <OverlayContainer>
                    <Loading/>
                </OverlayContainer>
            )}

            {collectedID && <OverlayContainer><Success text={"Item collected"} onClicked={() => {
                {
                    setItemData(null)
                    setReFetchAllItems(true)
                }
            }}

            /> </OverlayContainer>}

            <CloseButton handelClick={() => setItemData(null)}/>
            <ItemContainer>
                <Title>{itemData.title}</Title>
                <h3>Date Updated: {itemData["date_updated"]}</h3>
                <h4>Location: {itemData.address}</h4>
                <ItemImg src={itemData["image_link"]} alt={itemData.title}/>
                <Description>{itemData.description}</Description>
                <GMapButton onClick={() => window.open(gmapUrl, "_blank")}>Get Directions</GMapButton>
            </ItemContainer>


            <CollectedButton
                onClick={() => itemData.taken ? "" : setMarkAsCollected(true)}
                $taken={itemData.taken}>
                {itemData.taken ? "Item already collected" : "Collect"}
            </CollectedButton>


        </OverlayContainer>

    )
}
ItemView.propTypes = {
    itemData: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        date_updated: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        image_link: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        latitude : PropTypes.string.isRequired,
        longitude: PropTypes.string.isRequired,
        taken: PropTypes.number.isRequired,
    }).isRequired,
    setItemData: PropTypes.func.isRequired,
    setReFetchAllItems: PropTypes.func.isRequired,
};

export default ItemView;

const ItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 95dvh;
    justify-content: space-evenly;
    align-items: center;
    overflow-y: scroll;
    padding: 2em;
`;

const Title = styled.h1`
    margin-top: 2em;
    word-break: break-word;
`;

const Description = styled.p`
    word-break: break-word;
    white-space: pre-wrap;
`;


const ItemImg = styled.img`
    width: 40%;
    height: 25em;
    object-fit: contain;
    border: 1px solid black;
    border-radius: 5px;

    @media screen and (max-width: 768px) {
        width: 75%;
    }
`;

const GMapButton = styled.button`
    border: none;
    border-radius: 5px;
    padding: 1em;
    background: var(--secondary);
    color: var(--primary);
    cursor: pointer;
`

const CollectedButton = styled.button`
    border-radius: 5px;
    border: none;
    background-color: ${props => props.$taken ? "grey" : "var(--primary)"};
    color: var(--secondary);
    padding: 1.5em;
    width: 20%;
    align-self: center;
    margin-bottom: 1em;
    cursor: ${props => props.$taken ? "not-allowed" : "pointer"};

    @media screen and (max-width: 768px) {
        width: 40%;
        align-self: center;
    }


    @media screen and (max-width: 425px) {
        width: 98%;
    }


`;