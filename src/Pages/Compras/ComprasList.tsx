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

  const dbcolumns = ["id", "producto", "cantidad", "iva", "total"];
  const columns = ["id", "Producto", "Cantidad", "Iva", "Total"];
  const shop = data.shops || data;
  console.log(data);

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
        data={shop}
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
  const { data } = useFetch({ url: "http://localhost:3000/api/shop" });
  const dbcolumns = ["id", "producto", "cantidad", "iva", "total"];
  const columns = ["id", "Producto", "Cantidad", "Iva", "Total"];
  const shop = data.shops || data;
  return (
    <ModalContainer ShowModal={showModal}>
      <Modal showModal={showModal} title="Compra">
        <Table
          data={shop}
          columns={columns}
          dbColumns={dbcolumns}
          title=""
          createLink=""
          createText=""
          label=""
          deleteFunction={() => false}
          tituloDocumento={"Compras"}
          nombreArchivo={"Compras"}
        />
      </Modal>
    </ModalContainer>
  );
};
