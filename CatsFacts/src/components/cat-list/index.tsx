import {useAppDispatch, useAppSelector} from "@/store/store.ts";
import {useEffect, useState} from "react";
import {getAllFacts} from "@/store/catFactsStore.ts";
import CatFactCard from "../cat-fact-card";
import './style.css'
import Filter from "@/components/filter";
import Search from "@/components/search";
import Pagination from "@/components/pagination";

const CatList = () => {
    const appDispatch = useAppDispatch();
    const state = useAppSelector(state => state.catsFacts);
    const [filter, setFilter] = useState<'all' | 'liked'>('all');
    const [search, setSearch] = useState<string>("");
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [catFactList, setCatFactList] = useState<[]>([]);

    useEffect(() => {
        const fullList = state.catsFacts
            .filter(e => filter === 'liked' ? e.isLiked : e)
            .filter(e => search ? e.text.toLowerCase().includes(search.toLowerCase()) : e)
        const slicedList = fullList.slice((currentPage - 1) * pageSize, pageSize * currentPage)
            .map((e, index) => {
                return (
                    <CatFactCard
                        key={index}
                        catFact={e}
                    />
                )
            })
        setTotalPages(Math.ceil(fullList.length / pageSize))
        setCatFactList(slicedList);
    }, [filter, search, currentPage, pageSize, state.catsFacts]);

    const onForward = () => {
        if (currentPage < totalPages)
            setCurrentPage(prevState => prevState+1);
    }

    const onBack = () => {
        if (currentPage > 1)
            setCurrentPage(prevState => prevState-1);
    }

    const onPageChange = (page: number) => {
        setCurrentPage(page);
    }

    useEffect(() => {
        if (state.catsFacts.length === 0)
            appDispatch(getAllFacts());
    }, []);

    return (
        <div>
            <Search
                searchStr={search}
                onChange={(value) => setSearch(value)}
            />
            <Filter
                value={filter}
                onChange={(mode) => setFilter(mode)}
            />
            <div className='listContainer'>
                {catFactList}
            </div>
            <Pagination
                onForward={onForward}
                onBack={onBack}
                pagesCount={totalPages}
                onPageChange={onPageChange}
                currentPage={currentPage}
            />
        </div>

    )
}

export default CatList