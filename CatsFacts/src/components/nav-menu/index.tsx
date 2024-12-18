import './style.css'
import {NavLink} from "react-router-dom";

const NavMenu = () => {

    return (
        <div className={'navContainer'}>
            <NavLink
                to={'/products'}
                className={'navButton'}
            >
                Products
            </NavLink>
            <NavLink
                to={'/create-product'}
                className={'navButton'}
            >
                Create product
            </NavLink>
        </div>
    )
}

export default NavMenu