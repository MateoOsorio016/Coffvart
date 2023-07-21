import { useFetch } from "../../Hooks/useFetch";
import { Table } from '../../components/Table/Table';
import Swal from "sweetalert2";
import { useState } from 'react';
import { ModalContainer, Modal } from '../../components/Modal/Modal';
import { createPortal } from 'react-dom';

export const EmpaquetadoList = () => {
	const {data,error,setBodyRequest,setMethodState,setUrlState}=useFetch({url:'https://coff-v-art-api.onrender.com/api/empaquetado'});
    function handleDelete(id: string){
		Swal.fire({
			title: "Esta seguro de eliminar el Empaquetado?",
			showDenyButton: true,
			confirmButtonText: "Eliminar",
			denyButtonText: `Cancelar`,
		  }).then((result) => {
			if (result.isConfirmed) {
        setUrlState(`https://coff-v-art-api.onrender.com/api/empaquetado/${id}`);
        setMethodState('DELETE');
        setBodyRequest({_id:id})
        setTimeout(()=> {
            setUrlState('https://coff-v-art-api.onrender.com/api/empaquetado');
            setMethodState('GET');
        },500);
		Swal.fire("Empaquetado eliminado con éxito!", "", "success");
	}
	if (result.isDenied) {
	  Swal.fire("Cancelado", "", "info");
	}
  });
}
	const columns = [
		'id',
		'Insumo',
		'Prodcuto Final',
		'Cantidad',
		'Fecha Inicio',
		'Fecha de Compromiso',
		'Estado',
	];
	const dbcolumns =['id','insumo','productoFinal','cantidad','fechaInicio','fechaCompromiso','estado']
	const empaquetados = data.empaquetados || data; 
	const buttonsActions = [
        {
            text: 'Ver Detalle',
        onClick: () => handleShowModal(),
            fill: true,
        },
    ];
	const [showModal, setShowModal] = useState(false);
	function handleShowModal () {
    setShowModal(true);
}


	return (
		<>
			{error && <p>Hubo un error</p>}
			<Table
				data={empaquetados}
				columns={columns}
				dbColumns={dbcolumns}
				buttonsActions={buttonsActions}
				title='Empaquetados'
				createLink='create'
				createText='Crear Empaquetado'
				label='Buscar Empaquetado'
				deleteFunction={handleDelete}
				tituloDocumento={'Empaquetados'}
				nombreArchivo={'Empaquetados'}
			/>
			{showModal &&
				createPortal(
					<DetalleEmpaquetado showModal={setShowModal} />,
					document.getElementById('modal') as HTMLElement
                    )}
		</>
	)
}
const DetalleEmpaquetado = ({ showModal }: any) => {
	return (
		<ModalContainer ShowModal={showModal}>
			<Modal showModal={showModal} title='Empaquetado'>
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