import { Form, FormField } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
import { useFetch } from '../../Hooks/useFetch';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

		} else if (Subtotal === '') {
			setControlErrors({ ...controlErrors, Subtotal: 'El total es requerido' });
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

			console.log(ventas);
			console.log(data);

		}

		console.log(data?.ventas)
	}


		const ventasFields: FormField[] = [
			{
				name: 'Factura',
				type: 'text',
				label: 'Factura',
				value: data?.Factura,
			},
			{
				name: 'Cliente',
				type: 'text',
				label: 'Cliente',
				value: data?.Fliente,
			},
			{
				name: 'Producto',
				type: 'text',
				label: 'Producto',
				value: data?.Producto,
			},
			{
				name: 'Cantidad',
				type: 'number',
				label: 'Cantidad',
				value: data?.Producto,
			},
		];
		return (
			<>
				<Form
					fields={ventasFields}
					title='Editar Ventas'
					onSubmit={handleRegisterShop}

					button={<Button text={'Editar Venta'} onClick={() => null} />}
					errors={controlErrors}
					editable={true}
				/>
			</>
		);
};
