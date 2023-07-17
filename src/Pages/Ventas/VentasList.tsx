import { useFetch } from "../../Hooks/useFetch";
import { Table } from "../../components/Table/Table";
import Swal from "sweetalert2";
import { useState } from 'react';
import { ModalContainer, Modal } from '../../components/Modal/Modal';
import { createPortal } from 'react-dom';


export const VentasList = () => {
    // const {data, error, setBodyRequest, setMethodState} = useFetch({ url: 'https://coff-v-art-api.onrender.com/api/user'});
    const {data, error, setBodyRequest, setMethodState, setUrlState} = useFetch({ url: 'https://coffevart.onrender.com/api/ventas'});
    function handleDelete(id: string) {
        Swal.fire({
          title: "Esta seguro de eliminar la venta?",
          showDenyButton: true,
          confirmButtonText: "Eliminar",
          denyButtonText: `Cancelar`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            setUrlState(`https://coffevart.onrender.com/api/ventas/${id}`);
            setMethodState("DELETE");
            setBodyRequest({ _id: id });
            setTimeout(() => {
              setUrlState("https://coffevart.onrender.com/api/ventas");
              setMethodState("GET");
            }, 500);
    
            Swal.fire("Venta eliminada con éxito!", "", "success");
          }
          if (result.isDenied) {
            Swal.fire("Cancelado", "", "info");
          }
        });
      }

    const dbcolumns = ['id', 'Factura', 'Cliente', 'Producto', 'Subtotal', 'IVA', 'Total'];
    const columns = ['id', 'Factura', 'Cliente', 'Producto', 'Subtotal', 'IVA', 'Total'];
    const ventas = data.ventas || data;
    console.log(data)

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
            <Table data={ventas} columns={columns} dbColumns={dbcolumns} title='Ventas' createLink='create' createText='Crear Venta' label='Buscar Venta' 
        deleteFunction={handleDelete} tituloDocumento={'Ventas'} nombreArchivo={'Ventas'}
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
    const dbcolumns = ['id', 'Producto', 'Categoria', 'Cantidad', 'ValorUnitario', 'Total'];
    const columns = ['id', 'Producto','Categoria', 'Cantidad', 'ValorUnitario', 'Total'];
    const shop = [
      {
        id: 1,
        Producto: "Cafe Ciego",
        Categoria: 'Grano',
        Cantidad: 35,
        ValorUnitario: 6000,
        Total: 210000
      }
    ]
	return (
		<ModalContainer ShowModal={showModal}>
			<Modal showModal={showModal} title='Venta'>
            <Table data={shop} columns={columns} dbColumns={dbcolumns} title='' createLink='' createText='' label='' 
        deleteFunction={()=>false} tituloDocumento={'Ventas'} nombreArchivo={'Ventas'}/>
			</Modal>
		</ModalContainer>
	);
};
