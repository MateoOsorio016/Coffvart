import { Form, FormField } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
import { useFetch } from '../../Hooks/useFetch';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const ComprasEdit = () => {

	const navigate = useNavigate()

	const { id } = useParams<{ id: string }>();

	const [controlErrors, setControlErrors] = useState({});
	const { data, error, setBodyRequest, setMethodState, setUrlState } = useFetch({ url: `https://coff-v-art-api.onrender.com/api/shop/${id}`, method: 'GET', headers: { 'Content-Type': 'application/json' } })

	const shop = data.shop || data;

    console.log(shop)

	function handleRegisterShop(e: any) {
		e.preventDefault();
		const producto = e.target.producto.value;
		const cantidad = e.target.cantidad.value;
		const iva = e.target.iva.value;
		const total = e.target.total.value;

		let shop = {};

		if (producto === '') {
			shop = {
				_id: id,
				producto,
				cantidad: +cantidad,
				iva,
				total,
			}
		} else if (cantidad === '') {
			setControlErrors({
				...controlErrors,
				cantidad: 'La cantidad es requerida',
			});
			return;
		} else if (iva === '') {
			shop = {
				_id: id,
				producto,
				cantidad: +cantidad,
				iva,
				total,
			}
        
        }else if (total === '') {
			setControlErrors({ ...controlErrors, total: 'El total es requerido' });
			return;
                    
		} else {
			shop = {
				_id: id,
				producto,
				cantidad: +cantidad,
				iva,
				total,
			}
		}

		setUrlState(`http://localhost:3000/api/shop/`);
		setMethodState('PUT');
		setBodyRequest(shop);

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

		console.log(shop);
		console.log(data);

	}

	console.log(data?.shop)

	
		const comprasFields: FormField[] = [
            {
                name: 'producto',
                type: 'select',
                label: 'Producto',
                value: shop?.producto,
                options: [
                    { value: 'Café oscuro', label: 'Café oscuro' },
                    { value: 'Café amaretto', label: 'Café amaretto' },
                ],
            },
            {
                name: 'cantidad',
                type: 'number',
                label: 'Cantidad',
                value: shop?.cantidad,
            },
            {
                name: 'iva',
                type: 'select',
                label: 'Iva',
                value: shop?.iva,
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
                value: shop?.total,
            },
        ];
	return (
		<>
			<Form
				fields={comprasFields}
				title='Editar Compra'
				onSubmit={handleRegisterShop}
				button={<Button text={'Editar Compra'} onClick={() => null} />}
				errors={controlErrors}
				editable={true}
			/>
		</>
	);
};
