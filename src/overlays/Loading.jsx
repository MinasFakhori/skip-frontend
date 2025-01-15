import styled from "styled-components";

const Loading = () => {
    return (
        <Container>
            <LoadingImg src={"imgs/status/loading.gif"} alt={"Loading GIF"}/>
        </Container>
    );
};

export default Loading;

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100dvh;
    align-items: center;
    justify-content: center;
    background-color: white;
`;

const LoadingImg = styled.img`
    width: 15%;

    @media screen and (max-width: 768px) {
        width: 40%;
    }
`;
