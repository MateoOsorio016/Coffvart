import { Form, FormField } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
import { useFetch } from '../../Hooks/useFetch';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Table } from '../../components/Table/Table';
import Swal from 'sweetalert2';

export const PedidosEdit = () => {

	const navigate = useNavigate()

	const { id } = useParams<{ id: string }>();

	const [controlErrors, setControlErrors] = useState({});
	const { data, error, setBodyRequest, setMethodState, setUrlState } = useFetch({ url: `https://coffevart.onrender.com/api/pedidos${id}`, method: 'GET', headers: { 'Content-Type': 'application/json' } })

	const pedidos = data.pedidos || data;

	console.log(pedidos)

	function handleRegisterShop(e: any) {
		e.preventDefault();
		const Nit = e.target.Nit.value;
		const Cliente = e.target.Cliente.value;
		const Cantidad = e.target.Cantidad.value;
		const Telefono = e.target.Telefono.value;
        const Estado= e.target.Estado.value
        const Categoria= e.target.Categoria.value

		let pedidos = {};

		if (Nit === '') {
			pedidos = {
				_id: id,
                Nit,
                Cliente,
                Cantidad,
                Telefono,
				Estado,
                Categoria,
			}
		} else if (Cliente === '') {
			setControlErrors({
				...controlErrors,
				Proveedor: 'El proveedor es requerido',
			});
			return;
		} else if (Cantidad === '') {
			pedidos = {
				_id: id,
				Nit,
                Cliente,
                Cantidad,
                Telefono,
				Estado,
                Categoria,
			}

		} else if (Telefono === '') {
			setControlErrors({ ...controlErrors, Telefono: 'El telefono es requerido' });
			return;

		} else {
			pedidos = {
				_id: id,
				Nit,
                Cliente,
                Cantidad,
                Telefono,
				Estado,
                Categoria,
			}

			setUrlState(`https://coffevart.onrender.com/api/pedidos`);
			setMethodState('PUT');
			setBodyRequest(pedidos);

			if (!error) {
				Swal.fire({
					icon: 'success',
					title: 'Éxito',
					text: 'El pedido se ha editado con éxito',
					showConfirmButton: false,
					timer: 1500,
					timerProgressBar: true,
				}).then(() => {
					navigate('/admin/compras');
				});
			}

			console.log(error);

			console.log(pedidos);
			console.log(data);

		}

	}


		const pedidosFields: FormField[] = [
			{
                name: 'Nit',
                type: 'number',
                label: 'Nit',
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
                    {value: 'Cafe en grano', label: 'Cafe expreso'},
                    {value: 'Cafe expreso', label: 'Cafe en grano'},
                ]
            },
            {
                name: 'Cantidad',
                type: 'number',
                label: 'Cantidad',
            },
            {
                name: 'Telefono',
                type: 'number',
                label: 'Telefono',
            },
            {
                name: 'Categoria',
                type: 'select',
                label: 'Categoria',
                options: [
                    {value: 'Grano', label: 'Grano'},
                    {value: 'Molido', label: 'Molido'},
                ]
            },
            {
                name: 'Estado',
                type: 'select',
                label: 'Estado',
                options: [
                    {value: 'pagado', label: 'Pagado'},
                    {value: 'pendiente', label: 'Pendiente'},
                ]   
            }
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
					fields={pedidosFields}
					title='Editar Pedido'
					onSubmit={handleRegisterShop}
					button={<Button text={'Editar Pedido'} onClick={() => null} />}
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
