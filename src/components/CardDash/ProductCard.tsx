

import { FC } from 'react';


import { IoIosArrowForward, IoIosArrowBack, IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';
 

 
import './ProductCardD.css';

export interface Product {
	id: number;
	name: string;
	price: number;
	image: string;
	title: string;
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
		<div className={`productCard`}>
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
				<IoIosArrowForward />
				<IoIosArrowDroprightCircle />
			</button>
			<button className='arrow'>
				<IoIosArrowBack />
				<IoIosArrowDropleftCircle />
			</button>


			<div className={`productCard__image`}>
				<img src={product.image} alt={product.name} />
			</div>
			<div className={`productCard__info`}>
				<h3 className='product__name'>{product.name}</h3>
				<h3 className='product__name'>{product.title}</h3>
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
			</div>
		</div>
	);
};
