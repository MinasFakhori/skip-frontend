import styled from "styled-components";
import PropTypes from "prop-types";

const OverlayContainer = ({children}) => {
    return <Container>{children}</Container>;
};

export default OverlayContainer;

OverlayContainer.propTypes = {
    children: PropTypes.node.isRequired,
}

const Container = styled.div`
    background: white;
    height: 100dvh;
    width: 100dvw;
    position: absolute;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-content: center;
    text-align: center;
    overflow-y: auto;

    z-index: 10000000;
    justify-content: center;
`;
