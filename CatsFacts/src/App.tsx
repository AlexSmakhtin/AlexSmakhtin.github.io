import './App.css'
import CatList from "@/components/cat-list";
import NavMenu from "@/components/nav-menu";
import {Navigate, Route, Routes} from "react-router-dom";
import CatFactBigCard from "@/components/cat-fact-big-card";
import CreateCatFact from "@/components/create-cat-fact";

function App() {

    return (
        <div>
            <NavMenu/>
            <Routes>
                <Route index element={<CatList/>}/>
                <Route path={'/products'} element={<CatList/>}/>
                <Route path={'/products/:id'} element={<CatFactBigCard/>}/>
                <Route path={'/create-product'} element={<CreateCatFact/>}/>
                <Route path={'*'} element={<Navigate to={'/products'}/>}/>
            </Routes>
        </div>
    )
}

export default App
