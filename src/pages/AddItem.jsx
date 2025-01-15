import styled from "styled-components";
import PropTypes from "prop-types";
import OverlayContainer from "../ui-elements/OverlayContainer.jsx";
import {useEffect, useState} from "react";
import CloseButton from "../ui-elements/CloseButton.jsx";
import useAddItem from "../hooks/apis/useAddItem.jsx";
import Loading from "../overlays/Loading.jsx";
import useIsCameraAppAvailable from "../hooks/helper-functions/useIsCameraAppAvailable.jsx";
import useGetAddressFromCoord from "../hooks/apis/useGetAddressFromCoord";
import Success from "../overlays/Success.jsx";
import Error from "../overlays/Error.jsx";

const TITLE_LIMIT = 20;
const DESCRIPTION_LIMIT = 700;

const AddItem = ({geoLocation, setAddPage, setReFetchAllItems}) => {
    const [title, setTitle] = useState("");
    const {address, setAddress, error: addressError} = useGetAddressFromCoord(geoLocation);
    const isCameraAvailable = useIsCameraAppAvailable();
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [newItemObj, setNewItemObj] = useState(null);

    const [isTitleFocus, setIsTitleFocus] = useState(false);
    const [isDescriptionFocus, setIsDescriptionFocus] = useState(false);

    const {newItemId, error: uploadError} = useAddItem({newItemObj, setNewItemObj});
    const [loading, setLoading] = useState(false);

    const [allFieldsFilled, setAllFieldsFilled] = useState(false);

    useEffect(() => {
        if (title && description && image && address) {
            setAllFieldsFilled(true);
        } else {
            setAllFieldsFilled(false);
        }
    }, [title, description, image, address]);

    // In case the geoapify API fails, the app is still usable
    useEffect(() => {
        if (addressError) {
            const strGeoLocation = `(${geoLocation[0]}, ${geoLocation[1]})`;
            setAddress(strGeoLocation);
        }
    }, [addressError, geoLocation, setAddress]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!allFieldsFilled) {
            return;
        }

        setLoading(true);

        const item = {
            title,
            address,
            description,
            image,
            geolocation: geoLocation,
        };

        setNewItemObj(item);
    };

    const handleUnfocus = (str, isTitle) => {
        if (isTitle) {
            setIsTitleFocus(false);
            setTitle(str.trim());
        } else {
            setDescription(str.trim());
            setIsDescriptionFocus(false);
        }
    };

    useEffect(() => {
        if (newItemId) {
            setLoading(false);
            setReFetchAllItems(true);
        }
    }, [newItemId, setReFetchAllItems]);

    return (
        <OverlayContainer>
            {uploadError ? (
                <Error>{uploadError}</Error>
            ) : loading ? (
                <OverlayContainer>
                    <Loading/>
                </OverlayContainer>
            ) : (
                newItemId && (
                    <OverlayContainer>
                        <Success
                            text={"Item Added Successfully"}
                            onClicked={() => {
                                setAddPage(null);
                            }}
                        />
                    </OverlayContainer>
                )
            )}

            <CloseButton
                handelClick={() => {
                    setAddPage(null);
                }}
            />

            <AddItemContainer>
                <Form onSubmit={handleSubmit}>
                    <InputContainer>
                        <ItemTitleInput
                            type={"text"}
                            id={"item-title"}
                            placeholder={"Item Title"}
                            value={title}
                            onChange={(e) => (e.target.value.length <= TITLE_LIMIT ? setTitle(e.target.value) : "")}
                            onFocus={() => setIsTitleFocus(true)}
                            onBlur={() => handleUnfocus(title, true)}
                            required
                        />

                        {isTitleFocus ? (
                            <MaxCharText>
                                Max characters: {title.length} out of {TITLE_LIMIT}
                            </MaxCharText>
                        ) : null}
                    </InputContainer>

                    <InputContainer>
                        <ItemDescriptionInput
                            id={"description"}
                            placeholder={"Write a description about the item..."}
                            value={description}
                            onFocus={() => setIsDescriptionFocus(true)}
                            onBlur={() => {
                                handleUnfocus(description, false);
                            }}
                            onChange={(e) => {
                                const twoNewLine = e.target.value.replace(/\n{3,}/g, "\n\n");
                                twoNewLine.length <= DESCRIPTION_LIMIT ? setDescription(twoNewLine) : "";
                            }}
                            required
                        />
                    </InputContainer>

                    {isDescriptionFocus ? (
                        <MaxCharText>
                            Max characters: {description.length} out of {DESCRIPTION_LIMIT}
                        </MaxCharText>
                    ) : null}

                    <p>
                        <LocationSpan>Location:</LocationSpan> {!address && !addressError ? "loading..." : address}
                    </p>

                    {image ? (
                        <UserUploadedImg src={URL.createObjectURL(image)} alt="item"/>
                    ) : (
                        <AddingImageContainer $isCameraAvailable={isCameraAvailable}>
                            {isCameraAvailable && (
                                <>
                                    <FileInputLabel $isWhiteBg={false} htmlFor="camera-input">
                                        Take a photo
                                    </FileInputLabel>
                                    <FileInput
                                        id="camera-input"
                                        type="file"
                                        capture="camera"
                                        accept="image/jpeg , image/png, image/jpg"
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                    <OrText>OR</OrText>
                                </>
                            )}

                            <FileInputLabel $isWhiteBg={true} htmlFor="file-input">
                                Choose From File
                            </FileInputLabel>
                            <FileInput
                                id="file-input"
                                type="file"
                                accept="image/jpeg , image/png, image/jpg"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </AddingImageContainer>
                    )}

                    <SubmitBtn $allFieldsFilled={allFieldsFilled} type={"submit"} value={"Post item!"}/>
                </Form>
            </AddItemContainer>
        </OverlayContainer>
    );
};


export default AddItem;

AddItem.propTypes = {
    geoLocation: PropTypes.arrayOf(PropTypes.number).isRequired,
    setAddPage: PropTypes.func.isRequired,
    setReFetchAllItems: PropTypes.func.isRequired,
};

const AddItemContainer = styled.div`
    padding: 1em;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 1em;
    overflow-y: auto;
`;


const InputContainer = styled.div`
    width: 99%;

`

const Form = styled.form`
    display: flex;
    width: 100%;
    height: 100dvh;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`;

const OrText = styled.p`
    padding: 1em;
`;

const LocationSpan = styled.span`
    font-weight: bold;
`;

const ItemTitleInput = styled.input`
    margin-top: 2em;
    width: 50%;
    height: 2em;
    border-radius: 5px;
    font-size: 2em;
    text-align: center;
    border: none;
    background-color: var(--secondary);

    @media screen and (max-width: 768px) {
        width: 95%;
    }

    &::placeholder {
        color: rgba(0, 0, 0, 0.42);
    }
`;

const ItemDescriptionInput = styled.textarea`
    border-radius: 5px;
    padding: 1em;
    text-align: center;
    width: 50%;
    height: 10em;
    border: none;
    background-color: var(--secondary);

    font-family: "helvetica", "sans-serif";
    margin: 1em 0 0 0;

    @media screen and (max-width: 768px) {
        width: 90%;
    }
`;

const MaxCharText = styled.p`
    color: var(--primary);
    font-size: small;
    font-weight: lighter;
`;


const SubmitBtn = styled.input`
    border-radius: 5px;
    border: none;
    padding: 1em;
    background-color: ${(props) => (props.$allFieldsFilled ? "#db4a2b" : "grey")};
    cursor: ${(props) => (props.$allFieldsFilled ? "pointer" : "not-allowed")};
    color: white;
    margin: 1em;
`;

const AddingImageContainer = styled.div`
    border: ${(props) => (props.$isCameraAvailable ? "1px solid black" : "none")};
    width: 95%;
    padding: 2em 0;
    border-radius: 5px;
`;

const FileInput = styled.input`
    display: none;
`;

const FileInputLabel = styled.label`
    background-color: ${(props) => (props.$isWhiteBg ? "var(--secondary )" : "var(--primary)")};
    color: ${(props) => (props.$isWhiteBg ? "var(--primary)" : "var(--secondary )")};
    border-radius: 5px;
    padding: 1em;
`;

const UserUploadedImg = styled.img`
    width: 50%;
    height: 25em;
    margin: 1em;
    border-radius: 5px;
    object-fit: contain;

    @media screen and (max-width: 768px) {
        height: 30em;
        width: 90%;

    }

`;

