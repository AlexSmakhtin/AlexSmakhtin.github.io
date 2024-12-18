import {useNavigate, useParams} from "react-router-dom";
import {Card, IconButton, Input} from "@chakra-ui/react";
import {useAppDispatch, useAppSelector} from "@/store/store.ts";
import {AiFillEdit, AiOutlineArrowLeft, AiOutlineCheck, AiOutlineClose} from "react-icons/ai";
import './style.css'
import {CatFact} from "@/models/catFact.ts";
import {useEffect, useState} from "react";
import {Field} from "@/components/ui/field.tsx";
import {validate} from "uuid";
import {updateFact} from "@/store/catFactsStore.ts";

const CatFactBigCard = () => {
    const appDispatch = useAppDispatch();
    const params = useParams<{ id: string }>();
    const state = useAppSelector(state => state.catsFacts);
    const [catFact, setCatFact] = useState<CatFact>({
        id: "",
        isLiked: false,
        createdAt: "",
        text: "",
        userId: ""
    });
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [userIdInvalid, setUserIdInvalid] = useState<boolean>(false);
    const [textInvalid, setTextInvalid] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/products')
    }

    useEffect(() => {
        const fact: CatFact = state.catsFacts.find(e => e.id === params.id)
        if (fact?.id == undefined)
            navigate('/products')
        setCatFact(fact);
    }, [isEdit]);

    const handleConfirmChanges = () => {
        appDispatch(updateFact(catFact));
        setIsEdit(prevState => !prevState);
    }

    const handleChangeEditState = () => {
        setIsEdit(prevState => !prevState);
    }

    const handleTextChange = (e) => {
        const value = e.target.value;
        setTextInvalid(value.length === 0);
        setCatFact(prevState => {
            return {
                ...prevState,
                text: value
            }
        })
    }

    const handleUserIdChange = (e) => {
        const value = e.target.value;
        setUserIdInvalid(!validate(value))
        setCatFact(prevState => {
            return {
                ...prevState,
                userId: value
            }
        })
    }

    return (
        <div className={'bigCardContainer'}>
            <Card.Root className={'bigCard'}>
                <Card.Header>
                    <IconButton
                        onClick={handleGoBack}
                    >
                        <AiOutlineArrowLeft/>
                        Back to list
                    </IconButton>
                </Card.Header>
                <Card.Body
                    className={'cardMiniText'}>
                    Id: {catFact.id}
                </Card.Body>
                <Card.Header
                    className={'cardTitle'}>
                    Text:
                </Card.Header>
                <Card.Body
                    className={'cardText'}>
                    {
                        isEdit ?
                            <Field invalid={textInvalid} errorText={"Text is empty"}>
                                <Input
                                    type={'text'}
                                    className={'inputFiled'}
                                    value={catFact.text}
                                    onChange={handleTextChange}/>
                            </Field>
                            :
                            catFact.text
                    }
                </Card.Body>
                <Card.Header
                    className={'cardTitle'}>
                    User info:
                </Card.Header>
                <Card.Body
                    className={'cardText'}>
                    Id: {
                    isEdit ?
                        <Field invalid={userIdInvalid} errorText={"Invalid guid"}>
                            <Input
                                type={'text'}
                                className={'inputFiled'}
                                value={catFact.userId}
                                onChange={handleUserIdChange}/>
                        </Field>
                        :
                        catFact.userId
                }
                </Card.Body>
                <Card.Body
                    className={'cardText'}>
                    Created at: {catFact.createdAt}
                </Card.Body>
                <Card.Footer>
                    {
                        isEdit ?
                            <>
                                <IconButton
                                    disabled={userIdInvalid || textInvalid}
                                    colorPalette='green'
                                    onClick={handleConfirmChanges}
                                    padding={2}
                                >
                                    <AiOutlineCheck/>
                                    Confirm changes
                                </IconButton>
                                <IconButton
                                    colorPalette='red'
                                    onClick={handleChangeEditState}
                                    padding={2}
                                >
                                    <AiOutlineClose/>
                                    Decline
                                </IconButton>
                            </> :
                            <IconButton
                                colorPalette='black'
                                onClick={handleChangeEditState}
                                padding={2}>
                                <AiFillEdit/>
                                Edit card
                            </IconButton>
                    }
                </Card.Footer>
            </Card.Root>
        </div>
    )
}

export default CatFactBigCard