import { FC, useRef, useEffect } from 'react';

import './Button.css';

interface BotonProps {
	text: string | JSX.Element;
	onClick: () => void;
	fill?: boolean;
}

export const Button: FC<BotonProps> = ({ text = "", onClick, fill = true }) => {
	const btnUseRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		btnUseRef.current?.addEventListener('click', (e: any) => {
			// Create the circle element
			const circle = document.createElement('span');
			circle.classList.add('circle');

			// Get the button position and size
			const x = e.clientX - e.currentTarget?.offsetLeft;
			const y = e.clientY - e.currentTarget?.offsetTop;
			circle.style.left = `${x}px`;
			circle.style.top = `${y}px`;

			// Add the element
			e.currentTarget?.appendChild(circle);

			// Remove the element after the animation is done
			setTimeout(() => circle.remove(), 500);
		});
		return () => {
			fill &&
				btnUseRef.current?.removeEventListener('click', (e: any) => {
					// Create the circle element
					const circle = document.createElement('span');
					circle.classList.add('circle');

					// Get the button position and size
					const x = e.clientX - e.currentTarget?.offsetLeft;
					const y = e.clientY - e.currentTarget?.offsetTop;
					circle.style.left = `${x}px`;
					circle.style.top = `${y}px`;

					// Add the element
					e.currentTarget?.appendChild(circle);

					// Remove the element after the animation is done
					setTimeout(() => circle.remove(), 500);
				});
		};
	}, []);

	return (
		<button
			onClick={onClick}
			className={`btn--${fill ? 'filled' : 'outline'}`}
			ref={btnUseRef}
		>
			{text}
		</button>
	);
};
