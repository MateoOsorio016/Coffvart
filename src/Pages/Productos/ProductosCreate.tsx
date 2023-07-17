import { Form, FormField } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
import { useFetch } from '../../Hooks/useFetch';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

export const ProductosCreate = () => {
	const navigate = useNavigate();
	const [controlErrors, setControlErrors] = useState({});
	const { error, setBodyRequest } = useFetch({url:'https://coff-v-art-api.onrender.com/api/product', method: 'POST', headers: { 'Content-Type': 'application/json' } });

	function handleRegisterProduct(e: any) {
		e.preventDefault();
		const name = e.target.nombre.value;
		const valorU = e.target.valorU.value;
		const insumo = e.target.insumo.value;
		const stockMin = e.target.stockMin.value;
		const stockMax = e.target.stockMax.value;
		const descripcion = e.target.descripcion.value;

		if (name === '') {
			setControlErrors({ ...controlErrors, nombre: 'El nombre es requerido' });
			return;
		} else if (valorU === '') {
			setControlErrors({
				...controlErrors,
				valorU: 'El valor unitario es requerido',
			});
			return;
		} else if (insumo === '') {
			setControlErrors({ ...controlErrors, insumo: 'El insumo es requerido' });
			return;
		} else if (stockMin === '') {
			setControlErrors({
				...controlErrors,
				stockMin: 'El stock minimo es requerido',
			});
			return;
		} else if (stockMax === '') {
			setControlErrors({
				...controlErrors,
				stockMax: 'El stock máximo es requerido',
			});
			return;
		} else if (descripcion === '') {
			setControlErrors({ ...controlErrors, descripcion: 'La decripción es requerida' });
			return;
		}

        Swal.fire({
			title: 'Confirmar',
			text: '¿Deseas crear el producto?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Sí',
			cancelButtonText: 'No',
		}).then((result) => {
			if (result.isConfirmed) {
				const product = {
					name,	
					valorU,
					insumo,
					stockMin,
					stockMax,
					descripcion
				}
				Swal.fire("Producto creado con éxito!", "", "success");
				setBodyRequest(product); 
				if (!error) {
					navigate('/admin/productos');
				}
			}
		});

        // console.log(error);

        // console.log(user);
        // console.log(data);

	}

	const productosFields: FormField[] = [
		{
			name: 'nombre',
			type: 'text',
			label: 'Nombre',
		},
		{
			name: 'valorU',
			type: 'text',
			label: 'Valor Unitario',
		},
		{
			name: 'insumo',
			type: 'select',
			label: 'Insumo',
			options: [
				{ value: 'Café en grano', label: 'Café en grano' },
				{ value: 'Café en polvo', label: 'Café en polvo' },
			],
		},
		{
			name: 'stockMin',
			type: 'text',
			label: 'Stock Minimo',
		},
		{
			name: 'stockMax',
			type: 'text',
			label: 'Stock Máximo',
		},
		{
			name: 'descripcion',
			type: 'text',
			label: 'Descripción',
		},
	];
	return (
		<>
			<Form
				fields={productosFields}
				title='Crear Producto'
				onSubmit={handleRegisterProduct}
				button={<Button text={'Registrar Producto'} onClick={() => null} />}
				errors={controlErrors}
			/>
		</>
	);
    }
