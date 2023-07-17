import { FooterSimple } from "../../components/FooterSimple/FooterSimple";
import { HeaderSimple } from "../../components/HeaderSimple/HeaderSimple";

import {Outlet} from 'react-router-dom'
import './SimplePage.css'

export const SimplePages = () => {
    return(
        <div className="Simple">
            <HeaderSimple />
            <div className="simpleContainer">
                <Outlet />
            </div>
            <FooterSimple />
        </div>
    )
}