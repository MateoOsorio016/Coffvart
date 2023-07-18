import { Form, FormField } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
import { useFetch } from '../../Hooks/useFetch';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Table } from '../../components/Table/Table';

export const VentasCreate = () => {
	const navigate = useNavigate();
	const [controlErrors, setControlErrors] = useState({});
	const { error, setBodyRequest } = useFetch({url:'https://coffevart.onrender.com/api/ventas', method: 'POST', headers: { 'Content-Type': 'application/json' } });

	function handleRegisterShop(e: any) {
		e.preventDefault();
		const Factura = e.target.Factura.value;
		const Cliente = e.target.Cliente.value;
		const Producto = e.target.Producto.value;
		const Subtotal = e.target.Subtotal.value;
        const IVA= e.target.IVA.value
        

		if (Factura === '') {
			setControlErrors({ ...controlErrors, Factura: 'El Factura es requerido' });
			return;
		} else if (Cliente === '') {
			setControlErrors({
				...controlErrors,
				Cliente: 'El cliente es requerido',
			});
			return;
		} else if (Producto === '') {
			setControlErrors({ ...controlErrors, Producto: 'El Producto es requerido' });
			return;
		} else if (Subtotal === '') {
			setControlErrors({
				...controlErrors,
				Subtotal: 'El Subtotal es requerido',
			});
			return;
		}

        Swal.fire({
			title: 'Confirmar',
			text: '¿Deseas crear la venta?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Sí',
			cancelButtonText: 'No',
		}).then((result) => {
			if (result.isConfirmed) {
				const ventas = {
					Factura,
                    Cliente,
					Producto,
					Subtotal,
					IVA
                    
				};
				Swal.fire("Venta creada con éxito!", "", "success");
				setBodyRequest(ventas); 
				if (!error) {
					navigate('/admin/ventas');
				}
			}
		});

		console.log(error)

        // console.log(error);

        // console.log(user);
        // console.log(data);

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
		  <Form
			fields={ventasFields}
			title='Crear Venta'
			onSubmit={handleRegisterShop}
			button={<Button text={'Registrar Venta'} onClick={() => null} />}
			errors={controlErrors}
			extraElements={<TableCreateCompra />}
		  />
	
		  <div style={{
			position: 'relative',
			width: '100%',
			marginTop: '2rem',
		  }}>
			<div style={{
			  position: 'absolute',
			  top: '1rem',
			  right: '1rem'
			}}>
			  <Button text='Agregar Producto' onClick={() => null} />
			</div>
		  </div>
		</>
	  );
	
	return (
		<>
			<Form
				fields={ventasFields}
				title='Crear Venta'
				onSubmit={handleRegisterShop}
				button={<Button text={'Registrar Venta'} onClick={() => null} />}
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
					columns={['id', 'Producto', 'Categoria' , 'Cantidad' ,'Subtotal', 'IVA ', 'Total']}
					data={[
						{
							id: 1,
							Producto: 'Café Oscuro Amargo 300 Gr',
                            Categoria: 'Grano',
							Cantidad: '- 15 +',
                            Subtotal: 5340,
                            IVA: "19%",
                            Total: 5890,
						},
						{
							
							id: 2,
							Producto: 'Café Oscuro Dulce 300 Gr',
                            Categoria: 'Molido',
							Cantidad: '- 15 +',
                            Subtotal: 5340,
                            IVA: "19%",
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
