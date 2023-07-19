	import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import ImgTextLogo from '../../assets/BurdeoTextLogo.png';

import './AdminMenu.css';

import { MdHome, MdAssistantPhoto } from 'react-icons/md';

import { SiCashapp } from 'react-icons/si';

import { FaFileSignature, FaUser } from 'react-icons/fa';

import { BsFillBox2Fill } from 'react-icons/bs';

import { SiCoffeescript } from 'react-icons/si';
 
import { GiCoffeeBeans } from 'react-icons/gi';

import { BiCategoryAlt } from 'react-icons/bi';

import { FaShoppingBasket } from 'react-icons/fa';

import {FaUsers} from 'react-icons/fa';

import {FaTrailer} from 'react-icons/fa';

import {AiFillShopping} from 'react-icons/ai';

import {AiFillShop} from 'react-icons/ai';

 
export const AdminMenu = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(true);
	return (
		<header
			className={`Admin__header Admin__header--${
				isMenuOpen ? 'open' : 'close'
			}`}
		>
			
			<div
				className='Admin__header__logo'
				onClick={() => setIsMenuOpen((previousState) => !previousState)}
			>
				<img src={ImgTextLogo} alt='Burdeo Text Logo' />
			</div>
			<nav className='Admin__header__nav'>
				<ul>
					<li className='Admin__header__nav__item'>
						<NavLink
							className={({ isActive }) =>
								`adminMenuLink ${isActive ? 'adminMenuActive' : ''}`
							}
							to={'/admin/'}
						>
							<MdHome /> <span className='adminMenuLink__text'>Dashboard</span>
						</NavLink>
					</li>
					<li className='Admin__header__nav__item'>
						<NavLink
							className={({ isActive }) =>
								`adminMenuLink ${isActive ? 'adminMenuActive' : ''}`
							}
							to={'roles'}
						>
							<MdAssistantPhoto />{' '}
							<span className='adminMenuLink__text'>Roles</span>
						</NavLink>
					</li>
					<li className='Admin__header__nav__item'>
						<NavLink
							className={({ isActive }) =>
								`adminMenuLink ${isActive ? 'adminMenuActive' : ''}`
							}
							to={'pagos'}
						>
							<SiCashapp /> <span className='adminMenuLink__text'>Pagos</span>
						</NavLink>
					</li>
					<li className='Admin__header__nav__item'>
						<NavLink
							className={({ isActive }) =>
								`adminMenuLink ${isActive ? 'adminMenuActive' : ''}`
							}
							to={'contratos'}
						>
							<FaFileSignature />
							<span className='adminMenuLink__text'>Contratos</span>
						</NavLink>
					</li>
					<li className='Admin__header__nav__item'>
						<NavLink
							className={({ isActive }) =>
								`adminMenuLink ${isActive ? 'adminMenuActive' : ''}`
							}
							to={'empaquetados'}
						>
							<BsFillBox2Fill />
							<span className='adminMenuLink__text'>Empaquetados</span>
						</NavLink>
					</li>
					<li className='Admin__header__nav__item'>
						<NavLink
							className={({ isActive }) =>
								`adminMenuLink ${isActive ? 'adminMenuActive' : ''}`
							}
							to={'usuarios'}
						>
							<FaUser />
							<span className='adminMenuLink__text'>Usuarios</span>
						</NavLink>
					</li>
					<li className='Admin__header__nav__item'>
						<NavLink
							className={({ isActive }) =>
								`adminMenuLink ${isActive ? 'adminMenuActive' : ''}`
							}
							to={'compras'}
						>
							<FaShoppingBasket />
							<span className='adminMenuLink__text'>Compras</span>
						</NavLink>
					</li>
					<li className='Admin__header__nav__item'>
						<NavLink
							className={({ isActive }) =>
								`adminMenuLink ${isActive ? 'adminMenuActive' : ''}`
							}
							to={'categoria'}
						>
							<BiCategoryAlt />
							<span className='adminMenuLink__text'>Categoría Insumos</span>
						</NavLink>
					</li>
					<li className='Admin__header__nav__item'>
						<NavLink
							className={({ isActive }) =>
								`adminMenuLink ${isActive ? 'adminMenuActive' : ''}`
							}
							to={'insumos'}
						>
							<GiCoffeeBeans />
							<span className='adminMenuLink__text'>Insumos</span>
						</NavLink>
					</li>
					<li className='Admin__header__nav__item'>
						<NavLink
							className={({ isActive }) =>
								`adminMenuLink ${isActive ? 'adminMenuActive' : ''}`
							}
							to={'productos'}
						>
							<SiCoffeescript />
							<span className='adminMenuLink__text'>Productos</span>
						</NavLink>
					</li>
					<li className='Admin__header__nav__item'>
						<NavLink
							className={({ isActive }) =>
								`adminMenuLink ${isActive ? 'adminMenuActive' : ''}`
							}
							to={'clientes'}
						>
							<FaUsers />
							<span className='adminMenuLink__text'>Clientes</span>
						</NavLink>
					</li>
					<li className='Admin__header__nav__item'>
						<NavLink
							className={({ isActive }) =>
								`adminMenuLink ${isActive ? 'adminMenuActive' : ''}`
							}
							to={'proveedores'}
						>
							<FaTrailer />
							<span className='adminMenuLink__text'>Proveedores</span>
						</NavLink>
					</li>
					<li className='Admin__header__nav__item'>
						<NavLink
							className={({ isActive }) =>
								`adminMenuLink ${isActive ? 'adminMenuActive' : ''}`
							}
							to={'ventas'}
						>
							<AiFillShopping />
							<span className='adminMenuLink__text'>Ventas</span>
						</NavLink>
						
					</li>
					<li className='Admin__header__nav__item'>
						<NavLink
							className={({ isActive }) =>
								`adminMenuLink ${isActive ? 'adminMenuActive' : ''}`
							}
							to={'pedidos'}
						>
							<AiFillShop/>
							<span className='adminMenuLink__text'>Pedidos</span>
						</NavLink>
						
					</li>
					
				</ul>
			</nav>
			
		</header>
	);
};

