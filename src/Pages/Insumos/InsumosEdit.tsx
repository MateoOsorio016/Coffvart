import { Form, FormField } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
import { useFetch } from '../../Hooks/useFetch';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const InsumosEdit = () => {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const [controlErrors, setControlErrors] = useState({});
	const { data, error, setBodyRequest, setMethodState, setUrlState } = useFetch({
		url: `https://coff-v-art-api.onrender.com/api/insumo/${id}`,
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	});

	const insumo = data.insumo || data;

	function handleRegisterInsumo(e: any) {
		e.preventDefault();
		const nombre = e.target.nombre.value;
		const costoSaco = e.target.costoSaco.value;
		const cantidad = e.target.cantidad.value;
		const categoria = e.target.categoria.value;
		const descripcion = e.target.descripcion.value;

		let insumo = {};

		if (nombre === '') {
			setControlErrors({ ...controlErrors, nombre: 'El nombre es requerido' });
			return;
		} else if (costoSaco === '') {
			setControlErrors({
				...controlErrors,
				costoSaco: 'El costo del saco es requerido',
			});
			return;
		 } else if (cantidad === '') {
			setControlErrors({ ...controlErrors, cantidad: 'La cantidad es requerida' });
			return;
		} else if (categoria === '') {
			insumo = {
				_id: id,
				nombre,
				costoSaco,
				cantidad,
				categoria,
				descripcion,
			};
		} else if (descripcion === '') {
			setControlErrors({ ...controlErrors, descripcion: 'El proveedor es requerido' });
			return;
		} else {
			insumo = {
				_id: id,
				nombre,
				costoSaco,
				cantidad,
				categoria,
				descripcion,
			};
		}

		setUrlState(`https://coff-v-art-api.onrender.com/api/insumo/`);
		setMethodState('PUT');
		setBodyRequest(insumo);

		Swal.fire({
			title: 'Confirmar',
			text: '¿Deseas editar el insumo?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Sí',
			cancelButtonText: 'No',
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire("Insumo editado con éxito!", "", "success");
				if (!error) {
					navigate('/admin/insumo');
				}
			}
		});
		console.log(error);
		console.log(insumo);
		console.log(data);
	}

	console.log(data?.insumo);

	const insumosFields: FormField[] = [
		{
			name: 'nombre',
			type: 'text',
			label: 'Nombre',
			value: insumo?.nombre,
		},
		{
			name: 'costoSaco',
			type: 'text',
			label: 'Costo Saco',
			value: insumo?.costoSaco,
		},
		{
			name: 'cantidad',
			type: 'text',
			label: 'Cantidad',
			value: insumo?.cantidad,
		},
		{
			name: 'categoria',
			type: 'select',
			label: 'Categoría',
			value: insumo?.categoria,
			options: [
				{ value: 'Café finca Pueblo Rico', label: 'Café finca Pueblo Rico' },
				{ value: 'Café finca Santa Rosa', label: 'Café finca Santa Rosa' },
			],
		},
		{
			name: 'descripcion',
			type: 'select',
			label: 'Proveedor',
			value: insumo?.descripcion,
			options: [
				{ value: 'Café finca Pueblo Rico', label: 'Café finca Pueblo Rico' },
				{ value: 'Café finca Santa Rosa', label: 'Café finca Santa Rosa' },
			],
		},
	];

	return (
		<>
			<Form
				fields={insumosFields}
				title='Editar Insumo'
				onSubmit={handleRegisterInsumo}
				button={<Button text={'Editar Insumo'} onClick={() => null} />}
				errors={controlErrors}
				editable={true}
			/>
		</>
	);
};
