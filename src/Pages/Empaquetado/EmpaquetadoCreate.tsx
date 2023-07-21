import { Form, FormField } from "../../components/Form/Form";
import { Button } from "../../components/Button/Button";
import { useFetch } from '../../Hooks/useFetch';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Table } from '../../components/Table/Table';

export const EmpaquetadoCreate = () => {
    const navigate = useNavigate();
	const [controlErrors, setControlErrors] = useState({});
	const { error, setBodyRequest } = useFetch({url:'https://coff-v-art-api.onrender.com/api/empaquetado', method: 'POST', headers: { 'Content-Type': 'application/json' } });

	function handleRegisterEmpaquetado(e: any) {
		e.preventDefault();
		const insumo= e.target.insumo.value;
		const productoFinal= e.target.productoFinal.value;
		const cantidad= e.target.cantidad.value;
		// const fechaInicio= e.target.fechaInicio.value;
		const fechaCompromiso= e.target.fechaCompromiso.value;
		const estado= e.target.estado.value;

            
		if (insumo === '') {
			setControlErrors({ ...controlErrors, insumo: 'El insumo es requerido' });
			return;
		} else if (productoFinal === '') {
			setControlErrors({
				...controlErrors,
				productoFinal: 'El producto final es requerido',
			});
			return;
		} else if (cantidad === '') {
			setControlErrors({ ...controlErrors, cantidad: 'La cantidad es requerida' });
			return;
		}
		const empaquetado={
			insumo,
			productoFinal,
			cantidad,
			fechaInicio: new Date(),
			fechaCompromiso,
			estado
		};
        Swal.fire({
			title: 'Confirmar',
			text: '¿Deseas crear el insumo?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Sí',
			cancelButtonText: 'No',
		}).then((result) => {
			if (result.isConfirmed) {
		setBodyRequest(empaquetado);
        Swal.fire("Empaquetado creado con éxito!", "", "success");
		

		if(!error) {
			setTimeout(() => {
			navigate('/admin/empaquetados');
		}, 200);
    }
	}});
	}
    const empaquetadoFields: FormField[] = [
        {
            name: "insumo",
            type: "select",
            label: "Insumo",
            options: [
                { value: 'cafeoscuro', label: 'Café oscuro' },
                { value: 'cafemolido', label: 'Café molido' },
            ],
        },
        {
            name: "productoFinal",
            type: "select",
            label: "Producto Final",
            options: [
                { value: 'cafetostadooscuro250gr', label: 'Café tostado oscuro 250gr' },
                { value: 'cafetostadomolido500gr', label: 'Café tostado molido 500gr' },
            ],
        },
        {
            name: 'cantidad',
            type: 'number',
            label: 'cantidad',
        },
        // {
        //     name: 'fechaInicio',
        //     type: 'date',
        //     label: 'Fecha Inicio',
        // },
		{
         
		   name: 'fechaCompromiso',
           type: 'date',
           label: 'Fecha de Compromiso',
        
		},
        {
            name: 'estado',
            type: 'select',
            label: 'Estado',
            options: [
				{ value: 'Inicial', label: 'Inicial' },
                { value: 'EnProceso', label: 'En Proceso' },
                { value: 'Finalizado', label: 'Finalizado' },
            ],
        }
    ]

    return (
        <>
            <Form fields={empaquetadoFields}
            title='Crear Empaquetado'
            onSubmit={handleRegisterEmpaquetado}
            button={<Button text={'Registrar Empaquetado'} onClick={()=>null}/>} 
            errors={controlErrors}
            extraElements={<TableCreateEmpaquetado />}
            />
        </>
    )
}
const TableCreateEmpaquetado = () => {
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
		<><Button text='Agregar Producto' onClick={()=> null}/>
			<Table
				columns={['ID', 'Producto', 'Cantidad', 'Valor Unitario','Estado del producto']}
				data={[
					{
						id: 1,
						producto: 'Café Oscuro 500gr ',
						cantidad: '- 15 +',
						valorU: '15.000',
						estado: 'Inicial'
					},
					{
						id: 2,
						producto: 'Café Oscuro 250gr ',
						cantidad: '- 20 +',
						valorU: '25.000',
						estado:'Inicial'
					}
				]}
				dbColumns={['id', 'producto', 'cantidad', 'valorU','estado']}
				deleteFunction={()=>null}
				editButton={false}
				actionsTableOptions={false}
				tituloDocumento=''
				nombreArchivo=''
				showLogoutButton={false}
	
			/>
		</>
	);
};
