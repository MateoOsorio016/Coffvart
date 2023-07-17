import { Button } from '../Button/Button';

import { FC } from 'react';

import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

import './ProductCard.css';
import Swal from 'sweetalert2';

export interface Product {
	id: number;
	name: string;
	price: number;
	image: string;
	description: string;
	category: string;
	discount?: number;
	new?: boolean;
}

interface ProductCardProps {
	product: Product;
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
	return (
		<div className={`productCardUserView`}>
			<div className='productCard--info-top'>
				{product.new && (
					<div className='productCard__new'>
						<p>New</p>
					</div>
				)}
				{product.discount && (
					<div className='productCard__discount'>
						<p>{product.discount}%</p>
					</div>
				)}
			</div>

			<button className='addFavorite'>
				<AiOutlineHeart />
				<AiFillHeart />
			</button>

			<div className={`productCard__image`}>
				<img src={product.image} alt={product.name} />
			</div>
			<div className={`productCard__info`}>
				<h3 className='product__name'>{product.name}</h3>
				{!product.discount ? (
					<p className='product__price'>
						${new Intl.NumberFormat('es-co').format(product.price) || '0000'}
					</p>
				) : (
					<div className='productCard__priceDiscount'>
						<p className='product__price--discount'>
							${new Intl.NumberFormat('es-co').format(product.price) || '0000'}
						</p>
						<p className='product__price'>
							$
							{new Intl.NumberFormat('es-co').format(
								product.price - (product.price * product.discount) / 100
							) || '0000'}
						</p>
					</div>
				)}
				<div className='product__actions'>
					<Button onClick={() => {
						Swal.fire({
							icon: 'error',
							title: 'No se pudo agregar al carrito',
						})
					}} text={'Add to Cart'} fill={false} />
				</div>
			</div>
		</div>
	);
};
