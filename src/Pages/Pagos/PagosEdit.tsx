import { Form, FormField } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
import { useFetch } from '../../Hooks/useFetch';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const PagosEdit = () => {

	const navigate = useNavigate()

	const { id } = useParams<{ id: string }>();

	const [controlErrors, setControlErrors] = useState({});
	const { data, error, setBodyRequest, setMethodState, setUrlState } = useFetch({ url: `https://coff-v-art-api.onrender.com/api/pay/${id}`, method: 'GET', headers: { 'Content-Type': 'application/json' } })

	const pay = data.pay || data;

	function handleRegisterPay(e: any) {
		e.preventDefault();
		const numeroContrato= e.target.numeroContrato.value;
		const montoPagado= e.target.montoPagado.value;
		// const fechaPago= e.target.fechaPago.value;

		let pay = {};

		if (numeroContrato === '') {
			setControlErrors({ ...controlErrors, numeroContrato: 'El numero de contrato es requerido' });
			return;
		} else if (montoPagado === '') {
			setControlErrors({
				...controlErrors,
				montoPagado: 'El monto a pagar es requerido',
			});
			return;
		}
			else {
                pay = {
                    _id: id,
                    numeroContrato,
                    montoPagado,
                    fechaPago: new Date(),
                }
			}
		

		setUrlState(`https://coff-v-art-api.onrender.com/api/pay/`);
		setMethodState('PUT');
		setBodyRequest(pay);

		if (!error) {
			Swal.fire({
				icon: 'success',
				title: 'Éxito',
				text: 'El Pago se ha editado con éxito',
				showConfirmButton: false,
				timer: 1500,
				timerProgressBar: true,
			}).then(() => {
				navigate('/admin/pagos');
			});
		}

		console.log(error);

		console.log(pay);
		console.log(data);

	}

	console.log(data?.pay)


	const pagosFields: FormField[] = [
        {
            name: 'numeroContrato',
            type: 'number',
			label: 'numero de Contrato',
            value: pay?.numeroContrato,
        },
        {
            name: 'montoPagado',
            type: 'number',
			label: 'Monto a Pagar',
            value: pay?.montoPagado,
        },
        // {
        //     name: 'fechaPago',
        //     type: 'date',
		// 	label: 'Fecha de pago',
        //     value: pay?.fechaPago,
        // }
    ];
	return (
		<>
			<Form
				fields={pagosFields}
				title='Editar Pago'
				onSubmit={handleRegisterPay}
				button={<Button text={'Editar Pago'} onClick={() => null} />}
				errors={controlErrors}
				editable={true}
			/>
		</>
	);
};
