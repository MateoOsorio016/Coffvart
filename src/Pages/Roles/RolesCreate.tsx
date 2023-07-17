import { Form, FormField } from "../../components/Form/Form";
import { Button } from "../../components/Button/Button";
import { Table } from "../../components/Table/Table";
import Swal from "sweetalert2";

export const RolesCreate = () => {
  const fieldsFormRoles: FormField[] = [
    {
      name: "Nombre del Rol",
      type: "text",
      label: "Nombre del Rol",
    },
    {
      name: "permisos",
      type: "select",
      label: "Permisos",
      options: [
        { value: "1", label: "Permiso 1" },
        { value: "2", label: "Permiso 2" },
        { value: "3", label: "Permiso 3" },
        { value: "4", label: "Permiso 4" },
      ],
    },
  ];
  return (
    <Form
      title="Crear Rol"
      fields={fieldsFormRoles}
      onSubmit={(e) => {
		Swal.fire({
			title: 'Rol creado',
			icon: 'success',
			showConfirmButton: false,
		})
	  }}
      button={<Button text={"Crear Rol"} onClick={() => null} />}
      extraElements={<TableCreateRoles />}
    />
  );
};

const TableCreateRoles = () => {
  // const [data, setData] = useState<any[]>([]);
  // const tableCreate: FormField[] = [
  //     {
  //         name: 'permisos',
  //         type: 'select',
  //         label: 'Permisos',
  //         options: [
  //             { value: '1', label: 'Permiso 1' },
  //             { value: '2', label: 'Permiso 2' },
  //             { value: '3', label: 'Permiso 3' },
  //             { value: '4', label: 'Permiso 4' },
  //         ]
  //     }
  // ]

  // function handleDelete(id: string) {

  //     const newData = data.filter((item: any) => item.id !== id);

  //     setData(newData);

  // }

  return (
    <>
      <Table
        columns={["#", "Permiso"]}
        data={[
          {
            id: 1,
            permisos: "Permiso 1",
          },
          {
            id: 2,
            permisos: "Permiso 2",
          },
        ]}
        dbColumns={["id", "permisos"]}
        deleteFunction={() => null}
        editButton={false}
        actionsTableOptions={false}
        tituloDocumento=""
        nombreArchivo=""
      />
    </>
  );
};
