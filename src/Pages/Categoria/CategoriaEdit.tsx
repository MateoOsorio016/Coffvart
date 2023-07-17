import { Form, FormField } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
import { useFetch } from '../../Hooks/useFetch';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const CategoriaEdit = () => {

	const navigate = useNavigate()

	const { id } = useParams<{ id: string }>();

	const [controlErrors, setControlErrors] = useState({});
	const { data, error, setBodyRequest, setMethodState, setUrlState } = useFetch({ url: `https://coff-v-art-api.onrender.com/api/categoria/${id}`, method: 'GET', headers: { 'Content-Type': 'application/json' } })

	const category = data.category || data;

	function handleRegisterCategory(e: any) {
		e.preventDefault();
		const nombre = e.target.nombre.value;
		const descripcion = e.target.descripcion.value;


		let category = {};

		if (nombre === '') {
			setControlErrors({ ...controlErrors, nombre: 'El nombre es requerido' });
			return;
        }else if (descripcion === '') {
			setControlErrors({ ...controlErrors, descripcion: 'La decripción es requerida' });
            category = {
				_id: id,
				nombre,
                descripcion
			}
			return;
		}else {
			category = {
				_id: id,
				nombre,
                descripcion
			}
		}

		setUrlState(`https://coff-v-art-api.onrender.com/api/categoria/`);
		setMethodState('PUT');
		setBodyRequest(category);

		Swal.fire({
			title: 'Confirmar',
			text: '¿Deseas editar la categoría?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Sí',
			cancelButtonText: 'No',
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire("Categoría editada con éxito!", "", "success");
				if (!error) {
					navigate('/admin/categoria');
				}
			}
		});

		console.log(error);

		console.log(category);
		console.log(data);

	}

	console.log(data?.category)

	
    const categoriasFields: FormField[] = [
		{
			name: 'nombre',
			type: 'text',
			label: 'Nombre',
            value: category?.nombre,
		},
		{
			name: 'descripcion',
			type: 'text',
			label: 'Descripción',
            value: category?.descripcion
		},
	];
	return (
		<>
			<Form
				fields={categoriasFields}
				title='Editar Categoría'
				onSubmit={handleRegisterCategory}
				button={<Button text={'Editar Categoría'} onClick={() => null} />}
				errors={controlErrors}
				editable={true}
			/>
		</>
	);
};
