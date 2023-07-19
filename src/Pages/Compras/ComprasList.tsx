import { useFetch } from "../../Hooks/useFetch";
import { Table } from "../../components/Table/Table";
import Swal from "sweetalert2";
import { useState } from "react";
import { ModalContainer, Modal } from "../../components/Modal/Modal";
import { createPortal } from "react-dom";

export const ComprasList = () => {
  // const {data, error, setBodyRequest, setMethodState} = useFetch({ url: 'https://coff-v-art-api.onrender.com/api/user'});
  const { data, error, setBodyRequest, setMethodState, setUrlState } = useFetch(
    { url: "http://localhost:3000/api/shop" }
  );
  function handleDelete(id: string) {
    Swal.fire({
      title: "Esta seguro de eliminar la compra?",
      showDenyButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        setUrlState(`http://localhost:3000/api/shop/${id}`);
        setMethodState("DELETE");
        setBodyRequest({ _id: id });
        setTimeout(() => {
          setUrlState("http://localhost:3000/api/shop");
          setMethodState("GET");
        }, 500);

        Swal.fire("Compra eliminada con éxito!", "", "success");
      }
      if (result.isDenied) {
        Swal.fire("Cancelado", "", "info");
      }
    });
  }
  interface Compra {
    id: number;
    Insumo: string;
    Cantidad: string;
    Costo: number;
    SubTotal: string;
    Iva: number;
    Total: String;
    Estado: string;
  }
  

  

  const dbcolumns = ["id", "Insumo", "Cantidad", "Costo", "SubTotal", "Iva", "Total", "Estado"];
  const columns = ["id", "Insumo", "Cantidad", "Costo", "SubTotal", "Iva", "Total", "Estado"];
  const compras: Compra[] = data.compras || data;
  console.log(data);

  const datoQuemado = 148000; // Valor que deseas agregar a la columna 'Total'
      
  const nuevaCompra: Compra = {
    id: 1,
    Insumo: 'Café en grano finca pueblo rico',
    Cantidad: '100 KG',
    Costo: datoQuemado,
    SubTotal: '248000',
    Iva: 8,
    Total: '3000000',
    Estado: 'Pendiente'
  };

  const existeRegistro = compras.some((pedido: Compra) => pedido.id === nuevaCompra.id);
      
      if (!existeRegistro) {
        compras.push(nuevaCompra); // Agregar el nuevo pedido solo si no existe previamente
      }

  const buttonsActions = [
    {
      text: "Ver detalle",
      onClick: () => handleShowModal(),
      fill: true,
    },
  ];
  const [showModal, setShowModal] = useState(false);
  function handleShowModal() {
    setShowModal(true);
  }
  return (
    <>
      {error && <p>Hubo un error</p>}
      <Table
        data={compras}
        columns={columns}
        dbColumns={dbcolumns}
        title="Compras"
        createLink="create"
        createText="Crear Compra"
        label="Buscar Compra"
        deleteFunction={handleDelete}
        tituloDocumento={"Compras"}
        nombreArchivo={"Compras"}
        buttonsActions={buttonsActions}
        editButton={false}
      />
      {showModal &&
        createPortal(
          <DetalleCompra showModal={setShowModal} />,
          document.getElementById("modal") as HTMLElement
        )}
    </>
  );
};
const DetalleCompra = ({ showModal }: any) => {
  const dbcolumns = ["id", "Insumo", "Cantidad", "Costo", "SubTotal", "Iva", "Total", "Estado"];
  const columns = ["id", "Insumo", "Cantidad", "Costo", "SubTotal", "Iva", "Total", "Estado"];
   const products = [
    {
      id: 1,
      Insumo: 'Café en grano finca pueblo rico',
      Cantidad: '100 KG',
      Costo: 148000,
      Total: '248000',
      Iva: 8,
      SubtTotalIva: '3000000',
      Estado: 'Pendiente'
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
