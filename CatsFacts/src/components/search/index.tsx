import './style.css'
import {InputGroup} from "@/components/ui/input-group.tsx";
import {Input} from "@chakra-ui/react";
import React from "react";
import {AiOutlineSearch} from "react-icons/ai";

interface SearchProps {
    onChange: (value: string) => void;
    searchStr: string
}

const Search: React.FC<SearchProps> = ({onChange, searchStr}) => {
    const handleSearchChange = (e) => {
        const value = e.target.value;
        onChange(value)
    };

    return (
        <div className={'searchContainer'}>
            <InputGroup
                startElement={<AiOutlineSearch/>}
            >
                <Input
                    placeholder={'Text search '}
                    value={searchStr}
                    onChange={(e) => handleSearchChange(e)}/>
            </InputGroup>
        </div>
    )
}

export default Search;