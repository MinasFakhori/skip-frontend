import styled from "styled-components";
import PropTypes from "prop-types";


const FixStep = ({step}) => {
    return (
        <Container>
            <h3>{step.title}</h3>
            <Img src={step.img} alt={step.title}/>
        </Container>
    );
};

export default FixStep;


FixStep.propTypes = {
    step: PropTypes.shape({
        title: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
    }).isRequired,
};

const Container = styled.div`
    margin: 1em;
`;

const Img = styled.img`
    width: 50%;
    bottom: 5px;
    border: 1px solid black;


    @media screen and (max-width: 768px) {
        width: 40%;
    }

    @media screen and (max-width: 425px) {
        width: 90%;
    }

`;
