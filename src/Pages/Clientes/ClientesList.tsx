import {Table} from "../../components/Table/Table"
import Swal from 'sweetalert2';

export const ClientesList=()=>{
    const columns=['ID', 'NIT','Nombre', 'Telefono', 'Email', 'Direccion', 'Estado'];
    const dbcolumns = ['ID', 'NIT','Nombre', 'Telefono', 'Email', 'Direccion', 'Estado'];
    function handleDelete() {
        Swal.fire({
            title: 'Esta seguro de eliminar este cliente?',
            showDenyButton: true,
            confirmButtonText: 'Eliminar',
            denyButtonText: `Cancelar`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire('Cliente eliminado con éxito!', '', 'success')
            } if (result.isDenied) {
              Swal.fire('El cliente no ha sido eliminado', '', 'info')
            }
          })
      }

    const clientes=[
        {
            ID: 1,
            NIT:23-3,
            Nombre: 'Mateo', 
            Telefono: '123456789', 
            Email: 'efpyi@example.com', 
            Direccion: 'Calle 123', 
            Estado: 'Activo',
            actions: [
                {name: 'Editar', fill: true, action: ()=> window.location.href='/ClientesCreate'},
                { name: 'Delete', fill: false, action: () => console.log('Delete')}

            ]
        },
        {
            ID: 2,
            NIT: 1234-5,
            Nombre: 'Juan', 
            Telefono: '123456789', 
            Email: 'efpyi@example.com', 
            Direccion: 'Calle 123', 
            Estado: 'Activo',
            actions: [
                {name: 'Editar', fill: true, action: ()=> window.location.href='/clientes/create'},
                { name: 'Delete', fill: false, action: () => console.log('Delete')}
            ]
            }
       

    ]
    return (
        <>
          <Table data={clientes} columns={columns} dbColumns={dbcolumns} title='Clientes' createLink='create' createText='Crear Cliente' label='Buscar Cliente' 
          deleteFunction={handleDelete} tituloDocumento={'Clientes'} nombreArchivo={'Clientes'} />
        </>
      )
   
}