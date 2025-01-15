import styled from "styled-components";
import PropTypes from "prop-types";

const CloseButton = ({handelClick}) => {
    return (
        <Container>
            <CloseBtn
                src={"imgs/elements/close.svg"}
                alt={"Close button"}
                onClick={handelClick}
            />

        </Container>


    );
};

export default CloseButton;

CloseButton.propTypes = {
    handelClick: PropTypes.func.isRequired,
};

const Container = styled.div`
    width: 100dvw;
    top: 0;
    position: fixed;
    display: flex;
    flex-direction: column;
    background: white;


    @media screen and (max-width: 768px) {
        padding: 1em 0 0 1em;
    }

`


const CloseBtn = styled.img`
    width: 1.5em;
    border-radius: 2px;
    align-self: flex-end;
    cursor: pointer;
    margin: 2em;

    @media screen and (max-width: 768px) {
        margin: 0.5em 1.5em 0.5em 0;
    }
`;
