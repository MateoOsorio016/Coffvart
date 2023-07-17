import { Form, FormField } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
import { useFetch } from '../../Hooks/useFetch';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Table } from '../../components/Table/Table';

export const ContratosCreate = () => {
	const navigate = useNavigate();
	const [controlErrors, setControlErrors] = useState({});
	const {error, setBodyRequest } = useFetch({
		url: 'https://coff-v-art-api.onrender.com/api/contract',
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
	});

	function handleRegisterContract(e: any) {
		e.preventDefault();
		const nombreEmpresa = e.target.nombreEmpresa.value;
		const NIT = e.target.NIT.value;
		const direccion = e.target.direccion.value;
		const nombreRepresentante = e.target.nombreRepresentante.value;
		const correoRepresentante = e.target.correoRepresentante.value;
		const producto = e.target.producto.value;
		const comision = e.target.comision.value;
		const duracion = e.target.duracion.value;
		const cobro = e.target.cobro.value;
		//const fecha = e.target.fecha.value;
		const estado = e.target.estado.value;
		if (nombreEmpresa === '') {
			setControlErrors({
				...controlErrors,
				nombreEmpresa: 'El nombre de la empresa es requerido',
			});
			return;
		} else if (NIT === '') {
			setControlErrors({
				...controlErrors,
				NIT: 'El NIT es requerido',
			});
			return;
		} else if (direccion === '') {
			setControlErrors({
				...controlErrors,
				direccion: 'La dirección es requerida',
			});
			return;
		} else if (nombreRepresentante === '') {
			setControlErrors({
				...controlErrors,
				nombreRepresentante: 'El nombre del representante es requerido',
			});
			return;
		} else if (correoRepresentante === '') {
			setControlErrors({
				...controlErrors,
				correoRepresentante: 'El correo es requerido',
			});
			return;
		} else if (producto === '') {
			setControlErrors({
				...controlErrors,
				producto: 'El producto es requerido',
			});
			return;
		} else if (cobro === '') {
			setControlErrors({ ...controlErrors, cobro: 'El cobro es requerido' });
			return;
		}
		const contract = {
			nombreEmpresa,
			NIT,
			direccion,
			nombreRepresentante,
			correoRepresentante,
			producto,
			comision,
			duracion,
			cobro,
			//fecha,
			estado,
		};
		Swal.fire({
			title: 'Confirmar',
			text: '¿Deseas crear el contrato?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Sí',
			cancelButtonText: 'No',
		}).then((result) => {
			if (result.isConfirmed) {
			setBodyRequest(contract);
		Swal.fire("Contrato creado con éxito!", "", "success");
				 
				if (!error) {
					setTimeout(() => {
					navigate('/admin/contratos');
				}, 200);
				}
			}
		});
		
	}

	const contratosFields: FormField[] = [
		{
			name: 'nombreEmpresa',
			type: 'text',
			label: 'Nombre Empresa',
		},
		{
			name: 'NIT',
			type: 'text',
			label: 'NIT',
		},
		{
			name: 'direccion',
			type: 'text',
			label: 'Dirección',
		},
		{
			name: 'nombreRepresentante',
			type: 'text',
			label: 'Nombre de representante',
		},
		{
			name: 'correoRepresentante',
			type: 'text',
			label: 'Correo de representante',
		},
		{
			name: 'producto',
			type: 'select',
			label: 'Producto',
			options: [
				{ value: 'cafetostadooscuro250gr', label: 'Café tostado oscuro 250gr' },
				{ value: 'cafetostadomolido500gr', label: 'Café tostado molido 500gr' },
			],
		},
		{
			name: 'comision',
			type: 'select',
			label: 'Comisión',
			options: [
				{ value: '0%', label: '0%' },
				{ value: '10%', label: '10%' },
				{ value: '35%', label: '35%' },
			],
		},
		{
			name: 'duracion',
			type: 'select',
			label: 'Duración',
			options: [{ value: '1mes', label: '1 mes' }],
		},
		{
			name: 'cobro',
			type: 'select',
			label: 'Cobro',
			options: [
				{ value: 'quincenal', label: 'Quincenal' },
				{ value: 'mensual', label: 'Mensual' },
			],
		},
		//{
		//	name: 'fecha',
		//	type: 'date',
		//	label: 'Fecha de Contrato',
		//},
		{
			name: 'estado',
			type: 'select',
			label: 'Estado',
			options: [
				{ value: 'Activo', label: 'Activo' },
				{ value: 'Cancelado', label: 'Cancelado' },
			],
		},
	];

	return (
		<>
			<Form
				fields={contratosFields}
				title='Crear Contrato'
				onSubmit={handleRegisterContract}
				button={<Button text={'Registrar Contrato'} onClick={() => null} />}
				errors={controlErrors}
				extraElements={<TableCreateContrato />}
			/>
		</>
	);
}
const TableCreateContrato = () => {
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
				columns={['ID', 'Producto', 'Cantidad', 'Valor Unitario']}
				data={[
					{
						id: 1,
						producto: 'Café Oscuro Amargo 300 Gr',
						cantidad: '- 15 +',
						valorU: '15.000'
					},
					{
						id: 2,
						producto: 'Café Oscuro Dulce 300 Gr',
						cantidad: '- 20 +',
						valorU: '25.000'
					}
				]}
				dbColumns={['id', 'producto', 'cantidad', 'valorU']}
				deleteFunction={()=>null}
				editButton={false}
				actionsTableOptions={false}
				tituloDocumento=''
				nombreArchivo=''
			/>
		</>
	);
};

