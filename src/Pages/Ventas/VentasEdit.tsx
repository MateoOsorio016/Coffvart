import { Form, FormField } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
import { useFetch } from '../../Hooks/useFetch';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Table } from '../../components/Table/Table';

import Swal from 'sweetalert2';

export const VentasEdit = () => {

	const navigate = useNavigate()

	const { id } = useParams<{ id: string }>();

	const [controlErrors, setControlErrors] = useState({});
	const { data, error, setBodyRequest, setMethodState, setUrlState } = useFetch({ url: `https://coffevart.onrender.com/api/ventas${id}`, method: 'GET', headers: { 'Content-Type': 'application/json' } })

	const ventas = data.ventas || data;

	console.log(ventas)

	function handleRegisterShop(e: any) {
		e.preventDefault();
		const Factura = e.target.Factura.value;
		const Cliente = e.target.Cliente.value;
		const Producto = e.target.Producto.value;
		const Cantidad = e.target.Cantidad.value;

		let ventas = {};

		if (Factura === '') {
			ventas = {
				_id: id,
				Factura,
				Cliente,
				Producto,
				Cantidad
			}
		} else if (Cliente === '') {
			setControlErrors({
				...controlErrors,
				Cliente: 'La cantidad es requerida',
			});
			return;
		} else if (Producto === '') {
			ventas = {
				_id: id,
				Factura,
				Cliente,
				Producto,
				Cantidad
			}

		} else if (Factura === '') {
			setControlErrors({ ...controlErrors, Factura: 'La factura es requerida' });
			return;

		} else {
			ventas = {
				_id: id,
				Factura,
				Cliente,
				Producto,
				Cantidad
			}

			setUrlState(`https://coffevart.onrender.com/api/ventas`);
			setMethodState('PUT');
			setBodyRequest(ventas);

			if (!error) {
				Swal.fire({
					icon: 'success',
					title: 'Éxito',
					text: 'La compra se ha editado con éxito',
					showConfirmButton: false,
					timer: 1500,
					timerProgressBar: true,
				}).then(() => {
					navigate('/admin/compras');
				});
			}

			console.log(error);

			console.log(data);

		}

	}


		const ventasFields: FormField[] = [
			{
				name: 'Factura',
				type: 'text',
				label: 'Factura',
			},
			{
				name: 'Cliente',
				type: 'text',
				label: 'Cliente',
			},
			{
				name: 'Producto',
				type: 'select',
				label: 'Producto',
				options: [
					{ value: 'Cafe Amargo', label: 'Cafe Amargo' },
					{ value: 'Cafe Dulce', label: 'Cafe Dulce' },
				],
			},
			{
				name: 'Cantidad',
				type: 'number',
				label: 'Cantidad',
			
			},
			{
				name: 'Estado',
				type: 'select',
				label: 'Estado',
				options: [
					{ value: 'en proceso', label: 'En proceso' },
					{ value: 'Enviado', label: 'Enviado' },
					{ value: 'Entregado', label: 'Entregado' },
	
				],
			},

		];
		return (
			<>
			<div style={{
		position: 'relative', /* Cambiado a 'relative' para posicionar el botón dentro del flujo del formulario */
		width: '100%',
		marginTop: '2rem', /* Ajusta el margen superior según desees */
	}}>
		<div style={{
			position: 'absolute',
			top: '1rem',
			right: '1rem'
		}}>
			
		</div>
	</div>
				<Form
					fields={ventasFields}
					title='Editar Venta'
					onSubmit={handleRegisterShop}
					button={<Button text={'Editar Venta'} onClick={() => null} />}
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
				<><Button text='Editar Producto' onClick={()=> null}/>
					<Table
						columns={['id', 'Producto', 'Categoria' , 'Cantidad' ,'Subtotal', 'IVA ', 'Total']}
						data={[
							{
								id: 1,
								Producto: 'Café Oscuro Amargo 300 Gr',
								Categoria: 'Grano',
								Cantidad: '- 15 +',
								Subtotal: 5340,
								IVA: '19%',
								Total: 5890,
							},
							{
								
								id: 2,
								Producto: 'Café Oscuro Dulce 300 Gr',
								Categoria: 'Molido',
								Cantidad: '- 15 +',
								Subtotal: 5340,
								IVA: '19%',
								Total: 5890,
							}
						]}
						dbColumns={['id', 'Producto', 'Categoria' , 'Cantidad' ,'Subtotal', 'IVA ', 'Total']}
						deleteFunction={()=>null}
						editButton={false}
						actionsTableOptions={false}
						tituloDocumento=''
						nombreArchivo=''
					/>
				</>
			);
};
