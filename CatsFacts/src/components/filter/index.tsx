import './style.css'
import React from "react";
import {MenuContent, MenuRadioItem, MenuRadioItemGroup, MenuRoot, MenuTrigger} from "@/components/ui/menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {AiFillFilter} from "react-icons/ai";

interface FilterProps {
    onChange: (mode: 'all' | 'liked') => void,
    value: 'all' | 'liked'
}

const Filter: React.FC<FilterProps> = ({onChange, value}) => {

    return (
        <div className={'filterContainer'}>
            <MenuRoot positioning={{placement:"bottom-center"}}>
                <MenuTrigger asChild>
                    <Button variant="outline" size="sm">
                        <AiFillFilter/> Filter
                    </Button>
                </MenuTrigger>
                <MenuContent>
                    <MenuRadioItemGroup
                        value={value}
                        onValueChange={(e) => onChange(e.value)}
                    >
                        <MenuRadioItem value="all">All</MenuRadioItem>
                        <MenuRadioItem value="liked">Favourites</MenuRadioItem>
                    </MenuRadioItemGroup>
                </MenuContent>
            </MenuRoot>
        </div>
    )
}

export default Filter;