import styled from "styled-components";
import PropTypes from "prop-types";

//This is for the add item and the recenter map button
const ScreenBtn = ({
                       img,
                       alt,
                       hasOrangeBg,
                       handleClick = () => console.log("clicked"),
                   }) => {
    return (
        <Container $hasOrangeBg={hasOrangeBg} onClick={handleClick}>
            <Img src={img} alt={alt}/>
        </Container>
    );
};
ScreenBtn.propTypes = {
    img: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    hasOrangeBg: PropTypes.bool,
    handleClick: PropTypes.func,
};

export default ScreenBtn;

const Container = styled.div`
    display: flex;
    padding: 1em;
    width: 3em;
    justify-content: center;
    align-content: center;
    background-color: ${(props) => (props.$hasOrangeBg ? "#db4a2b" : "#ffede8")};
    margin: 0 1em 1em 1em;
    border-radius: 5px;
    z-index: 1;
    cursor: pointer;
`;

const Img = styled.img`
    width: 1em;
`;
