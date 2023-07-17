import { Form, FormField } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
import { useFetch } from '../../Hooks/useFetch';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const EmpaquetadosEdit = () => {

	const navigate = useNavigate()

	const { id } = useParams<{ id: string }>();

	const [controlErrors, setControlErrors] = useState({});
	const { data, error, setBodyRequest, setMethodState, setUrlState } = useFetch({ url: `https://coff-v-art-api.onrender.com/api/empaquetado/${id}`, method: 'GET', headers: { 'Content-Type': 'application/json' } })

	const empaquetado = data.empaquetado || data;

	function handleRegisterEmpaquetado(e: any) {
		e.preventDefault();
		const insumo= e.target.insumo.value;
		const productoFinal= e.target.productoFinal.value;
		const cantidad= e.target.cantidad.value;
		//const fechaInicio= e.target.fechaInicio.value;
		const estado= e.target.estado.value;

		let empaquetado = {};

		if (insumo === '') {
			setControlErrors({ ...controlErrors, insumo: 'El insumo es requerido' });
			return;
		} else if (productoFinal === '') {
			setControlErrors({
				...controlErrors,
				productoFinal: 'El producto final es requerido',
			});
			return;
		} else if (cantidad === '') {
			setControlErrors({ ...controlErrors, cantidad: 'La cantidad es requerida' });
			return;
		}
			else {
                empaquetado = {
                    _id: id,
                    insumo,
			        productoFinal,
			        cantidad,
			        fechaInicio: new Date(),
			        estado
                }
			}
		

		setUrlState(`https://coff-v-art-api.onrender.com/api/empaquetado/`);
		setMethodState('PUT');
		setBodyRequest(empaquetado);

		if (!error) {
			Swal.fire({
				icon: 'success',
				title: 'Éxito',
				text: 'El empaquetado se ha editado con éxito',
				showConfirmButton: false,
				timer: 1500,
				timerProgressBar: true,
			}).then(() => {
				navigate('/admin/empaquetados')
			});
		}

		console.log(error);

		console.log(empaquetado);
		console.log(data);

	}

	console.log(data?.empaquetado)


	const empaquetadoFields: FormField[] = [
        {
            name: "insumo",
            type: "select",
            value: empaquetado?.insumo,
            label: "Insumo",
            options: [
                { value: 'cafeoscuro', label: 'Café oscuro' },
                { value: 'cafemolido', label: 'Café molido' },
            ],
        },
        {
            name: "productoFinal",
            type: "select",
            value: empaquetado?.productoFinal,
            label: "Producto Final",
            options: [
                { value: 'cafetostadooscuro250gr', label: 'Café tostado oscuro 250gr' },
                { value: 'cafetostadomolido500gr', label: 'Café tostado molido 500gr' },
            ],
        },
        {
            name: 'cantidad',
            type: 'number',
            value: empaquetado?.cantidad,
            label: 'cantidad',
        },
        //{
          //  name: 'fechaInicio',
          //  type: 'date',
          //  value: empaquetado?.fechaInicio,
          //  label: 'Fecha Inicio',
        //},
        {
            name: 'estado',
            type: 'select',
            value: empaquetado?.estado,
            label: 'Estado',
            options: [
                { value: 'EnProceso', label: 'En Proceso' },
                { value: 'Finalizado', label: 'Finalizado' },
			
            ]
		},
	];
	return (
		<>
			<Form
				fields={empaquetadoFields}
				title='Editar Empaquetado'
				onSubmit={handleRegisterEmpaquetado}
				button={<Button text={'Editar Empaquetado'} onClick={() => null} />}
				errors={controlErrors}
				editable={true}
			/>
		</>
	);
};

