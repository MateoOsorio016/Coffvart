import { MdClose } from 'react-icons/md';

import './Modal.css';

interface ModalContainerProps {
	ShowModal: (showModal: boolean) => void;
	children: JSX.Element | JSX.Element[];
}

interface ModalProps {
	title?: string;
	children: JSX.Element | JSX.Element[];
	showModal: (showModal: boolean) => void;
    [key: string]: any;
}

import { FC } from 'react';

export const ModalContainer: FC<ModalContainerProps> = ({
	children,
	ShowModal,
}) => {
	return (
		<div
			className={`modal__container `}
			onClick={() => ShowModal(false)}
		>
			{children}
		</div>
	);
};

export const Modal: FC<ModalProps> = ({ title, children, showModal, ...props }) => {
	return (
		<div className='modal' onClick={(e) => e.stopPropagation()}>
			<button
				className='modal__close'
				onClick={() => showModal(false)}
			>
				<MdClose />
			</button>
			{title && (
				<div className='modal__header'>
					<h2 className='modal__title'>{title}</h2>
				</div>
			)}
			<div className={`modal__content ${props?.className}`}>{children}</div>
		</div>
	);
};
