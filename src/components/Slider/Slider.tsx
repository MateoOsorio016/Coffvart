import { FC, useState, useEffect, Fragment } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import './Slider.css';

interface SliderProps {
	images: string[];
	autoPlay?: boolean;
	autoPlayInterval?: number;
	showArrows?: boolean;
	showDots?: boolean;
}

export const Slider: FC<SliderProps> = ({
	images,
	autoPlay = true,
	autoPlayInterval = 1000,
	showArrows = true,
	showDots = true,
}) => {
	const [currentImage, setCurrentImage] = useState(images[0]);
	const [selectedImageIndex, setSelectedImageIndex] = useState(0);
	const [loaded, setLoaded] = useState(false);
	const [isAutoPlay, setIsAutoPlay] = useState(autoPlay);

	useEffect(() => {
		if (isAutoPlay && images?.length > 1) {
			const interval = setInterval(() => {
				handleImageChange(selectedImageIndex, images);
			}, autoPlayInterval);
			return () => clearInterval(interval);
		}
	});

	function handleImageChange(
		index: number,
		images: string[],
		next: boolean = true
	) {
		setLoaded(false);
		setTimeout(() => {
			const condition = next ? index < images.length - 1 : index > 0;
			const newIndex = next
				? condition
					? index + 1
					: 0
				: condition
				? index - 1
				: images.length - 1;
			setCurrentImage(images[newIndex]);
			setSelectedImageIndex(newIndex);
		}, 500);
	}

	function previousImage() {
		isAutoPlay && setIsAutoPlay(false);
		handleImageChange(selectedImageIndex, images, false);
	}

	function nextImage() {
		isAutoPlay && setIsAutoPlay(false);
		handleImageChange(selectedImageIndex, images);
	}

	return (
		<div className='slider'>
			<div className='slider__image-container'>
				<img
					src={currentImage}
					alt='slider'
					className={`slider__image ${loaded ? 'loaded__image' : ''}`}
					onLoad={() => setLoaded(true)}
				/>
			</div>
			{((showArrows && images?.length > 1) ||
				(images?.length > 1 && !autoPlay)) && (
				<div className='slider__arrows'>
					<button
						className='slider__arrow slider__arrow--left'
						onClick={previousImage}
						key={selectedImageIndex}
					>
						<FaChevronLeft />
					</button>
					<button
						className='slider__arrow slider__arrow--right'
						onClick={nextImage}
						key={selectedImageIndex + 1}
					>
						<FaChevronRight />
					</button>
				</div>
			)}
			{((showDots && images?.length > 1) ||
				(images?.length > 1 && !autoPlay)) && (
				<div className='slider__dots'>
					{images.map((image, index) => (
						<Fragment key={index}>
							{false ? image : ''}
							<button
								className={`slider__dot ${
									index === selectedImageIndex ? 'slider__dot--active' : ''
								}`}
								onClick={() => {
									isAutoPlay && setIsAutoPlay(false);
									handleImageChange(index - 1, images);
								}}
							></button>
						</Fragment>
					))}
				</div>
			)}
		</div>
	);
};
