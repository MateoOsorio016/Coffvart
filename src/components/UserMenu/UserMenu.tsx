import BurdeosLogo from '../../assets/BurdeoTextLogo.png';
import { NavLink, useLocation } from 'react-router-dom';
import { MdSearch } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import { BiCart } from 'react-icons/bi';

import './UserMenu.css';
import { createPortal } from 'react-dom';
import { Login, Register } from '../AccountsOptionsModal/AcountsOptionsModal';
import { useState } from 'react';

export const UserMenu = () => {
	const location = useLocation();
	const { search, pathname } = location;
	const [showModal, setShowModal] = useState(false);
	return (
		<>
			<header className='userMenu'>
				<div className='userMenu__logo'>
					<img src={BurdeosLogo} alt='Burdeos Logo' />
				</div>
				<div className='userMenu__menu'>
					<ul>
						<li className='userMenu__nav__item'>
							<NavLink
								className={({ isActive }) =>
									`userMenuItem ${isActive ? 'userMenuActive' : ''}`
								}
								to={'/'}
							>
								Home
							</NavLink>
						</li>
						<li className='userMenu__nav__item'>
							<NavLink
								className={({ isActive }) =>
									`userMenuItem ${isActive ? 'userMenuActive' : ''}`
								}
								to={'about'}
							>
								About Us
							</NavLink>
						</li>
						<li className='userMenu__nav__item'>
							<NavLink
								className={({ isActive }) =>
									`userMenuItem ${isActive ? 'userMenuActive' : ''}`
								}
								to={'/some'}
							>
								Shop
							</NavLink>
						</li>
						<li className='userMenu__nav__item'>
							<NavLink
								className={({ isActive }) =>
									`userMenuItem ${isActive ? 'userMenuActive' : ''}`
								}
								to={'miContrato'}
							>
								Mi Contrato
							</NavLink>
						</li>
					</ul>
				</div>
				<div className='userMenu__huincha'>
					50% de descuento en todos los productos
				</div>
				<div className='userMenu_opciones'>
					<button className='userMenu_opciones__item'>
						<MdSearch />
					</button>
					<button
						className='userMenu_opciones__item'
						onClick={() => setShowModal(true)}
					>
						<FaRegUser />
					</button>
					<button className='userMenu_opciones__item'>
						<BiCart />
					</button>
				</div>
			</header>
			{showModal &&
				createPortal(
					search.includes('login') ? (
						<Login showModal={setShowModal} />
					) : search.includes('register') ? (
						<Register showModal={setShowModal} />
					) : null,
					document.querySelector('#modal') as HTMLElement
				)}
		</>
	);
};
