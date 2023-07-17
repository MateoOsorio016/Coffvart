import {Table} from "../../components/Table/Table"
import Swal from 'sweetalert2';

export const ProveedoresList=()=>{
    const columns=['ID', 'Nit', 'Nombre', 'Telefono', 'Email', 'Direccion', 'Estado'];
    const dbcolumns = ['ID', 'Nit', 'Nombre', 'Telefono', 'Email', 'Direccion', 'Estado'];
    function handleDelete() {
        Swal.fire({
            title: 'Esta seguro de eliminar este proveedor?',
            showDenyButton: true,
            confirmButtonText: 'Eliminar',
            denyButtonText: `Cancelar`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire('Proveedor eliminado con éxito!', '', 'success')
            } if (result.isDenied) {
              Swal.fire('El proveedor no ha sido eliminado', '', 'info')
            }
          })
      }

      const proveedor=[
        {
            ID: 1,
            Nit: '123-56', 
            Nombre: 'Colcafe',
            Telefono: '6042918321', 
            Email: 'efpyi@example.com', 
            Direccion: 'Calle 123', 
            Estado: 'Activo',
            actions: [
                {name: 'Editar', fill: true, action: ()=> null},
                { name: 'Delete', fill: false, action: () => console.log('Delete')}

            ]
        },
        {
           
            ID: 2,
            Nit: '145-45', 
            Nombre: 'Nescafe',
            Telefono: '6042908521', 
            Email: 'efpyi@example.com', 
            Direccion: 'Calle 24C', 
            Estado: 'Inactivo',
            actions: [
                {name: 'Editar', fill: true, action: ()=> window.location.href='/proveedores/edit'},
                { name: 'Delete', fill: false, action: () => console.log('Delete')}
            ]
            }
       

    ]
    return (
        <>
          <Table data={proveedor} columns={columns} dbColumns={dbcolumns} title='Proveedores' createLink='create' createText='Crear Proveedor' label='Buscar Proveedor' 
          deleteFunction={handleDelete} tituloDocumento={'Proveedores'} nombreArchivo={'Proveedores'} />
        </>
      )
   
}