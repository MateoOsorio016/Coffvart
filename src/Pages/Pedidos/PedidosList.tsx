import { useFetch } from "../../Hooks/useFetch";
import { Table } from "../../components/Table/Table";
import Swal from "sweetalert2";
import { useState } from 'react';
import { ModalContainer, Modal } from '../../components/Modal/Modal';
import { createPortal } from 'react-dom';


export const PedidosList = () => {
    // const {data, error, setBodyRequest, setMethodState} = useFetch({ url: 'https://coff-v-art-api.onrender.com/api/user'});
    const {data, error, setBodyRequest, setMethodState, setUrlState} = useFetch({ url: 'https://coffevart.onrender.com/api/pedidos'});
    function handleDelete(id: string) {
        Swal.fire({
          title: "Esta seguro de eliminar el Pedido?",
          showDenyButton: true,
          confirmButtonText: "Eliminar",
          denyButtonText: `Cancelar`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            setUrlState(`https://coffevart.onrender.com/api/pedidos/${id}`);
            setMethodState("DELETE");
            setBodyRequest({ _id: id });
            setTimeout(() => {
              setUrlState("https://coffevart.onrender.com/api/pedidos");
              setMethodState("GET");
            }, 500);
    
            Swal.fire("Pedido eliminada con éxito!", "", "success");
          }
          if (result.isDenied) {
            Swal.fire("Cancelado", "", "info");
          }
        });
      }

    const dbcolumns = ['id', 'Nit', 'Proveedor', 'Telefono', 'Fecha' ,'Total', 'Estado'];
    const columns = ['id', 'Nit', 'Cliente', 'Telefono', 'Fecha', 'Total', 'Estado'];
    const pedidos = data.pedidos || data;
    const datoQuemado = 100; // Valor que deseas agregar a la columna 'Total'

const nuevoPedido = {
  id: 1,
  Nit: '123456789',
  Proveedor: 'Mateo Osorio',
  Telefono: '987654321',
  Fecha: '2023-07-17',
  Total: datoQuemado,
  Estado: 'Pendiente'
};

pedidos.push(nuevoPedido);
    console.log(pedidos)

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
            <Table data={pedidos} columns={columns} dbColumns={dbcolumns} title='Pedidos' createLink='create' createText='Crear Pedido' label='Buscar Pedido' 
        deleteFunction={handleDelete} tituloDocumento={'Pedido'} nombreArchivo={'Pedido'}
        buttonsActions={buttonsActions}/>
         {showModal &&
				createPortal(
					<DetalleCompra showModal={setShowModal} />,
					document.getElementById('modal') as HTMLElement
                    )}
        </>
    )
}
const DetalleCompra = ({ showModal }: any) => {
    const dbcolumns = ['id', 'Producto', 'Cantidad', 'PrecioUnitario', 'Subtotal', 'IVA', 'Total'];
    const columns = ['id', 'Producto', 'Cantidad', 'PrecioUnitario', 'Subtotal', 'IVA', 'Total'];
     const products = [
      {
        id: 1,
        Producto: "Cafe molido",
        Cantidad:35,
        PrecioUnitario: 12000,
        Subtotal: 120000,
        IVA: "19%",
        Total: 142800
      }
    ]
	return (
		<ModalContainer ShowModal={showModal}>
			<Modal showModal={showModal} title='Detalle'>
            <Table data={products} columns={columns} dbColumns={dbcolumns} title='' createLink='' createText='' label='' 
        deleteFunction={()=>false} tituloDocumento={'Pedidos'} nombreArchivo={'Pedidos'}/>
			</Modal>
		</ModalContainer>
	);
};
