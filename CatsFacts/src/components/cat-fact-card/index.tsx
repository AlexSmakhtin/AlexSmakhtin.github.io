import React from "react";
import {CatFact} from "@/models/catFact.ts";
import {Card, IconButton} from "@chakra-ui/react";
import {AiFillHeart, AiFillDelete, AiOutlineHeart} from "react-icons/ai";
import {useAppDispatch} from "@/store/store.ts";
import {changeLikeState, deleteFact} from "@/store/catFactsStore.ts";
import './style.css'
import {useNavigate} from "react-router-dom";

interface CatFactProps {
    catFact: CatFact
}

const CatFactCard: React.FC<CatFactProps> = ({catFact}) => {
    const appDispatch = useAppDispatch();
    const navigate = useNavigate()
    const handleCardClick = (fact: CatFact) => {
        navigate(`/products/${fact.id}`)
    };
    const handleLikeClick = (event, fact: CatFact) => {
        event.stopPropagation();
        appDispatch(changeLikeState(fact))
    }
    const handleDeleteClick = (event, fact: CatFact) => {
        event.stopPropagation();
        appDispatch(deleteFact(fact))
    };
    return (
        <Card.Root
            className={'card'}
            divideY={'1px'}
            onClick={() => handleCardClick(catFact)}
            width={'320px'}
        >
            <Card.Header className={'cardHeader'}>
                {`Cat fact #`}
                <p className={'p'}>{catFact.id}</p>
            </Card.Header>
            <Card.Body>
                {
                    catFact.text.length > 85 ? catFact.text.substring(0, 85) + "..." : catFact.text
                }
            </Card.Body>
            <Card.Footer className={'cardFooter'}>
                <IconButton color={catFact.isLiked ? 'crimson' : 'black'}
                            onClick={(e) => handleLikeClick(e, catFact)} variant={'ghost'}>
                    {
                        catFact.isLiked ? <AiFillHeart/> : <AiOutlineHeart/>
                    }
                </IconButton>
                <IconButton onClick={(e) => handleDeleteClick(e, catFact)} variant={'ghost'}>
                    <AiFillDelete color={'red'}/>
                </IconButton>
            </Card.Footer>
        </Card.Root>
    )
}

export default CatFactCard;