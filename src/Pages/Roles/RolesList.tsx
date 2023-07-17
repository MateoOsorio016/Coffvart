import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Table } from '../../components/Table/Table';
import { ModalContainer, Modal } from '../../components/Modal/Modal';
import Swal from 'sweetalert2';

export const RolesList = () => {
	const [showModal, setShowModal] = useState(false);
	const columns = ['id', 'Nombre', 'Estado'];
	const dbcolumns = ['id', 'name', 'state'];
	const roles = [
		{
			id: 1,
			name: 'Admin',
			state: 'active',
		},
		{
			id: 2,
			name: 'User',
			state: 'active',
		},
	];
	const buttonsActions = [
		{
			text: 'Ver detalle',
			onClick: () => handleShowModal(),
			fill: true,
		},
	];
	function handleShowModal () {
		setShowModal(true);
	}
	function handleDelete (id: string) {
		console.log(id);
		Swal.fire({
			title: '¿Estás seguro?',
			text: 'No podrás revertir esta acción',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Sí, eliminar',
			cancelButtonText: 'No, cancelar',
		})
	}
	return (
		<>
			<Table
				data={roles}
				columns={columns}
				dbColumns={dbcolumns}
				title='Roles'
				createLink='create'
				createText='Crear Rol'
				label='Buscar Rol'
				deleteFunction={handleDelete}
				nombreArchivo='roles'
				tituloDocumento='Roles'
				buttonsActions={buttonsActions}
			/>
			{showModal &&
				createPortal(
					<DetalleRol showModal={setShowModal} />,
					document.getElementById('modal') as HTMLElement
				)}
		</>
	);
};

const DetalleRol = ({ showModal }: any) => {
	return (
		<ModalContainer ShowModal={showModal}>
			<Modal showModal={showModal} title='User'>
				<ol style={{
					padding: '3rem',
					display: 'flex',
					flexDirection: 'column',
					gap: '1rem',
				}}>
					<li>Ver y navegar por los productos en el catálogo de la tienda.</li>
					<li>Añadir productos al carrito de compra.</li>
					<li>Realizar la compra de productos.</li>
					<li>Ver el historial de pedidos realizados.</li>
					<li>
						Actualizar su información de perfil, como nombre, dirección y número
						de contacto.
					</li>
					<li>Acceder a las promociones o descuentos disponibles.</li>
					<li>
						Suscribirse a boletines de noticias o notificaciones de la tienda.
					</li>
					<li>Ver y dejar reseñas o comentarios en productos.</li>
					<li>Acceder a su lista de deseos o favoritos.</li>
					<li>
						Solicitar soporte o asistencia técnica en caso de problemas con los
						pedidos o productos.
					</li>
				</ol>
			</Modal>
		</ModalContainer>
	);
};
