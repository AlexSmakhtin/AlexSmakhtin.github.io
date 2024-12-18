import './style.css'
import {IconButton} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai";

interface PaginationProps {
    onForward: () => void,
    onBack: () => void,
    pagesCount: number,
    onPageChange: (page: number) => void,
    currentPage: number
}

const Pagination: React.FC<PaginationProps> = ({onBack, onForward, pagesCount, onPageChange, currentPage}) => {
    const [buttonList, setButtonList] = useState<[]>([]);

    useEffect(() => {
        const list = [];
        for (let i = 0; i < pagesCount; i++) {
            const pageNumber = i + 1;
            list.push(
                <Button
                    width={15}
                    key={i}
                    disabled={currentPage === pageNumber}
                    onClick={() => onPageChange(pageNumber)}
                >
                    {pageNumber}
                </Button>)
        }
        setButtonList(list);
    }, [pagesCount, currentPage])

    return (
        <div className={'paginationContainer'}>
            {
                pagesCount === 0 ? <></> :
                    <>
                        <IconButton
                            width={15}
                            disabled={currentPage === 1}
                            onClick={() => onBack()}
                        >
                            <AiOutlineArrowLeft/>
                        </IconButton>
                        {buttonList}
                        <IconButton
                            width={15}
                            disabled={currentPage === pagesCount}
                            onClick={() => onForward()}
                        >
                            <AiOutlineArrowRight/>
                        </IconButton>
                    </>
            }
        </div>
    )
}

export default Pagination;