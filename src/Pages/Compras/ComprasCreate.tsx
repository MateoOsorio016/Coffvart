import { Form, FormField } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
import { useFetch } from '../../Hooks/useFetch';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Table } from '../../components/Table/Table';

export const ComprasCreate = () => {
	const navigate = useNavigate();
	const [controlErrors, setControlErrors] = useState({});
	const { error, setBodyRequest } = useFetch({url:'http://localhost:3000/api/shop', method: 'POST', headers: { 'Content-Type': 'application/json' } });

	function handleRegisterShop(e: any) {
		e.preventDefault();
		const producto = e.target.producto.value;
		const cantidad = e.target.cantidad.value;
		const iva = e.target.iva.value;
		const total = e.target.total.value;

		if (producto === '') {
			setControlErrors({ ...controlErrors, producto: 'El producto es requerido' });
			return;
		} else if (cantidad === '') {
			setControlErrors({
				...controlErrors,
				cantidad: 'La cantidad es requerida',
			});
			return;
		} else if (iva === '') {
			setControlErrors({ ...controlErrors, iva: 'El iva es requerido' });
			return;
		} else if (total === '') {
			setControlErrors({
				...controlErrors,
				total: 'El total es requerido',
			});
			return;
		}

        Swal.fire({
			title: 'Confirmar',
			text: '¿Deseas crear la compra?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Sí',
			cancelButtonText: 'No',
		}).then((result) => {
			if (result.isConfirmed) {
				const compra = {
					producto,
					cantidad,
					iva,
					total,
				};
				Swal.fire("Compra creada con éxito!", "", "success");
				setBodyRequest(compra); 
				if (!error) {
					navigate('/admin/compras');
				}
			}
		});

		console.log(error)

        // console.log(error);

        // console.log(user);
        // console.log(data);

	}

	const comprasFields: FormField[] = [
		{
			name: 'producto',
			type: 'select',
			label: 'Producto',
			options: [
				{ value: 'Café oscuro', label: 'Café oscuro' },
				{ value: 'Café amaretto', label: 'Café amaretto' },
			],
		},
		{
			name: 'cantidad',
			type: 'number',
			label: 'Cantidad',
		},
		{
			name: 'iva',
			type: 'select',
			label: 'Iva',
			options: [
				{ value: '8%', label: '8%' },
				{ value: '18%', label: '19%' },
				{ value: 'Sin Iva', label: 'Sin Iva' },
			],
		},
		{
			name: 'total',
			type: 'text',
			label: 'Total',
		},
	];
	return (
		<>
			<Form
				fields={comprasFields}
				title='Crear Compra'
				onSubmit={handleRegisterShop}
				button={<Button text={'Registrar Compra'} onClick={() => null} />}
				errors={controlErrors}
				extraElements={<TableCreateCompra />}
			/>
		</>
	);
    }
	const TableCreateCompra = () => {
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