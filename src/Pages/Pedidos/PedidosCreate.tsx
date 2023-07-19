import { Form, FormField } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
import { useFetch } from '../../Hooks/useFetch';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Table } from '../../components/Table/Table';

export const PedidosCreate = () => {
	const navigate = useNavigate();
	const [controlErrors, setControlErrors] = useState({});
	const { error, setBodyRequest } = useFetch({url:'https://coffevart.onrender.com/api/pedidos', method: 'POST', headers: { 'Content-Type': 'application/json' } });

	function handleRegisterShop(e: any) {
		e.preventDefault();
		const Nit = e.target.Nit.value;
		const Cliente = e.target.Cliente.value;
		const Cantidad = e.target.Cantidad.value;
		const Telefono = e.target.Telefono.value;
        const Estado= e.target.Estado.value
        const Categoria= e.target.Categoria.value

		if (Nit === '') {
			setControlErrors({ ...controlErrors, Nit: 'El Nit es requerido' });
			return;
		} else if (Cliente === '') {
			setControlErrors({
				...controlErrors,
				Cliente: 'El Cliente es requerido',
			});
			return;
		} else if (Telefono === '') {
			setControlErrors({ ...controlErrors, Telefono: 'El Telefono es requerido' });
			return;
		} else if (Cantidad === '' || Cantidad<=0) {
			setControlErrors({
				...controlErrors,
				Cantidad: 'El cantidad es requerida y debe ser mayor a 0',
			});
			return;
		} else if(Estado === '') {
            setControlErrors({
                ...controlErrors, Estado: 'El estado es requerido',
            });
        }else if(Categoria === '') {
            setControlErrors({
                ...controlErrors, Categoria: 'La categoria es requerido',
            });
        }

        Swal.fire({
			title: 'Confirmar',
			text: '¿Deseas crear el pedido?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Sí',
			cancelButtonText: 'No',
		}).then((result) => {
			if (result.isConfirmed) {
				const pedidos = {
					Nit,
                    Cliente,
					Telefono,
					Cantidad,
                    Estado,
					Categoria
                    
				};
                setBodyRequest(pedidos);
				Swal.fire("Pedido creado con éxito!", "", "success");
				setBodyRequest(pedidos); 
				if (!error) {
					navigate('/admin/pedidos');
				}
			}
		});

		console.log(error)

        // console.log(error);

        // console.log(user);
        // console.log(data);

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
			name: 'Telefono',
			type: 'number',
			label: 'Telefono',
		},
		{
			name: 'Categoria',
			type: 'select',
			label: 'Categoria',
			options: [
				{ value: 'Grano', label: 'Grano' },
				{ value: 'Molido', label: 'Molido' },
			],
		},
		{
			name: 'Estado',
			type: 'select',
			label: 'Estado',
			options: [
				{ value: 'pagado', label: 'Pagado' },
				{ value: 'pendiente', label: 'Pendiente' },
			],
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
				title='Crear Pedido'
				onSubmit={handleRegisterShop}
				button={<Button text={'Registrar Pedido'} onClick={() => null} />}
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
			<><Button text='Agregar Producto' onClick={()=> null}/>
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
                            IVA: 19,
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
