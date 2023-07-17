import {Outlet} from 'react-router-dom'
import { UserMenu } from "../components/UserMenu/UserMenu"
import './User.css'
import { UserFooter } from '../components/UserFooter/UserFooter'

export const User = () => {
    return(
        <div className="User">
            <UserMenu />
            <div className="userContainer">
                <Outlet />
            </div>
            <UserFooter/>
        </div>
    )
}