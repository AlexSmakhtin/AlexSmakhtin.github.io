import './style.css'
import {Card, IconButton, Input} from "@chakra-ui/react"
import {Field} from "@/components/ui/field.tsx";
import {useEffect, useState} from "react";
import {AiOutlineArrowLeft, AiOutlineCheck, AiOutlinePlusSquare} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import {v4 as guid, validate as validateGuid} from "uuid";
import {CatFact} from "@/models/catFact.ts";
import {useAppDispatch} from "@/store/store.ts";
import {addFact} from "@/store/catFactsStore.ts";

const CreateCatFact = () => {
    const initialCatState = {
        id: guid(),
        text: "",
        userId: "",
        createdAt: ""
    }
    const [product, setProduct] =
        useState<{ id: string, text: string, userId: string, createdAt: string }>(initialCatState);
    const [invalidUserId, setInvalidUserId] = useState<boolean>("true");
    const [invalidText, setInvalidText] = useState<boolean>("true");
    const [timeouts, setTimeouts] = useState<number[]>([]);
    const [isAdded, setIsAdded] = useState<boolean>(false);
    const navigate = useNavigate();
    const appDispatch = useAppDispatch();

    const handleGoBack = () => {
        navigate('/products')
    }

    const handleCreateCatFact = () => {
        const catFact: CatFact = {
            ...product,
            createdAt: new Date().toDateString(),
            id: guid(),
            isLiked: false
        }
        appDispatch(addFact(catFact));
        setProduct(initialCatState);
        setIsAdded(true);
    }

    const handleTextChange = (e) => {
        const value = e.target.value;
        if (value.length === 0) {
            setInvalidText(true)
        } else {
            setInvalidText(false)
        }
        setProduct(prev => {
            return {
                ...prev,
                text: value
            }
        })
    }

    useEffect(() => {
        if (isAdded) {
            setTimeouts(prevState => [...prevState, setTimeout(() => {
                    setIsAdded(false)
                }, 1000)]
            )
        }
        return () => {
            for (let timeout of timeouts) {
                clearTimeout(timeout)
            }
        }
    }, [isAdded]);

    const handleUserIdChange = (e) => {
        const value = e.target.value;
        if (!validateGuid(value)) {
            setInvalidUserId(true);
        } else {
            setInvalidUserId(false);
        }
        setProduct(prev => {
            return {
                ...prev,
                userId: value
            }
        })
    };

    return (
        <Card.Root className={'createCard'}>
            <Card.Header>
                <IconButton
                    onClick={handleGoBack}
                >
                    <AiOutlineArrowLeft/>
                    Back to list
                </IconButton>
                <Card.Title>Create product</Card.Title>
            </Card.Header>
            <Card.Body gap={'10px'}>
                <Field
                    errorText="Empty text"
                    invalid={invalidText}
                    label="Text">
                    <Input
                        value={product.text}
                        onChange={(e) => handleTextChange(e)}
                        type={'text'}/>
                </Field>
                <Field
                    errorText="Invalid guid"
                    invalid={invalidUserId}
                    label="User id (guid)"
                >
                    <Input
                        value={product.userId}
                        type={'text'}
                        onChange={(e) => handleUserIdChange(e)}
                    />
                </Field>
            </Card.Body>
            <Card.Footer>
                <IconButton
                    colorPalette={isAdded ? 'green' : 'black'}
                    onClick={handleCreateCatFact}
                    disabled={invalidText || invalidUserId || isAdded}
                    width={'100%'}
                    className={'addBtn'}
                >
                    {isAdded ? <><AiOutlineCheck/> Added</> : <><AiOutlinePlusSquare/> Add product</>}
                </IconButton>
            </Card.Footer>
        </Card.Root>
    )
}

export default CreateCatFact