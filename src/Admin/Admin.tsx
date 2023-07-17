import { Outlet } from 'react-router-dom';
import { AdminMenu } from '../components/AdminMenu/AdminMenu';

import './Admin.css';

export const Admin = () => {
	return (
		<div className='Admin'>
			<AdminMenu />
			<div className='appContent'>
				<Outlet />
			</div>
		</div>
	);
};
