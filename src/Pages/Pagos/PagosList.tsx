import { useFetch } from "../../Hooks/useFetch";
import { Table } from '../../components/Table/Table';
import Swal from "sweetalert2";
import { useState } from 'react';
import { ModalContainer, Modal } from '../../components/Modal/Modal';
import { createPortal } from 'react-dom';

export const PagosList = () => {
	const {data,error,setBodyRequest,setMethodState,setUrlState}=useFetch({url:'https://coff-v-art-api.onrender.com/api/pay'});
    
    function handleDelete(id: string){
        Swal.fire({
            title: "Esta seguro de eliminar el pago?",
            showDenyButton: true,
            confirmButtonText: "Eliminar",
            denyButtonText: `Cancelar`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              setUrlState(`https://coff-v-art-api.onrender.com/api/pay/${id}`);
              setMethodState("DELETE");
              setBodyRequest({ _id: id });
              setTimeout(() => {
                setUrlState("https://coff-v-art-api.onrender.com/api/pay");
                setMethodState("GET");
              }, 500);
      
              Swal.fire("Pago eliminado con éxito!", "", "success");
            }
            if (result.isDenied) {
                Swal.fire("Cancelado", "", "info");
            }
        });
    }
	const columns = ['id', 'Numero de Contrato', 'Monto a pagar', 'Fecha de Pago'];
	const dbcolumns = ['id','numeroContrato','montoPagado','fechaPago'];
	const pagos = data.pays || data;
    const buttonsActions = [
        {
            text: 'Ver detalle',
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
			<Table data={pagos} 
            columns={columns} 
            dbColumns={dbcolumns} 
            title='pagos' 
            createLink='create' 
            createText='Crear pago' 
            label='Buscar pago' 
            deleteFunction={handleDelete}
            tituloDocumento={'Pagos'}
            nombreArchivo={'Pagos'} 
            deleteButton={false}
            buttonsActions={buttonsActions}/>
           
            {showModal &&
				createPortal(
					<DetallePago showModal={setShowModal} />,
					document.getElementById('modal') as HTMLElement
                    )}
		</>
	)
}
const DetallePago = ({ showModal }: any) => {
	return (
		<ModalContainer ShowModal={showModal}>
			<Modal showModal={showModal} title='Pago'>
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
