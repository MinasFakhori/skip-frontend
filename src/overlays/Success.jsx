import styled from "styled-components";
import PropTypes from "prop-types";
import CloseButton from "../ui-elements/CloseButton.jsx";

const Success = ({text, onClicked}) => {
    return (

        <>
            <CloseButton handelClick={onClicked}/>
            <Container>
                <Img src={"imgs/status/success.gif"} alt={"Success GIF"}/>
                <h2>{text}</h2>
            </Container>

        </>
    );
};
Success.propTypes = {
    text: PropTypes.string.isRequired,
    onClicked: PropTypes.func.isRequired,
};

export default Success;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100dvh;
    align-items: center;
    justify-content: center;
    background-color: white;
`;

const Img = styled.img`
    width: 15%;

    @media screen and (max-width: 768px) {
        width: 40%;
    }
`;
