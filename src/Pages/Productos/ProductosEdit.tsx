import { Form, FormField } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
import { useFetch } from '../../Hooks/useFetch';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const ProductosEdit = () => {

	const navigate = useNavigate()

	const { id } = useParams<{ id: string }>();

	const [controlErrors, setControlErrors] = useState({});
	const { data, error, setBodyRequest, setMethodState, setUrlState } = useFetch({ url: `https://coff-v-art-api.onrender.com/api/product/${id}`, method: 'GET', headers: { 'Content-Type': 'application/json' } })

	const product = data.product || data;

	function handleRegisterProduct(e: any) {
		e.preventDefault();
		const name = e.target.nombre.value;
		const valorU = e.target.valorU.value;
		const insumo = e.target.insumo.value;
		const stockMin = e.target.stockMin.value;
		const stockMax = e.target.stockMax.value;
		const descripcion = e.target.descripcion.value;


		let product = {};

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
			product = {
				_id: id,
				name,
				insumo,
				stockMin,
				stockMax,
                descripcion,
			}
        
        }else if (stockMin === '') {
			setControlErrors({ ...controlErrors, stockMin: 'El stock minimo es requerido' });
			return;
        }else if (stockMax === '') {
			setControlErrors({ ...controlErrors, stockMax: 'El stock máximo es requerido' });
			return;
        }else if (descripcion === '') {
			setControlErrors({ ...controlErrors, descripcion: 'La descripción es requerida' });
			return;
                    
		} else {
			product = {
				_id: id,
				name,
				insumo,
				stockMin,
				stockMax,
                descripcion,
			}
		}

		setUrlState(`https://coff-v-art-api.onrender.com/api/product/`);
		setMethodState('PUT');
		setBodyRequest(product); 

		Swal.fire({
			title: 'Confirmar',
			text: '¿Deseas editar el producto?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Sí',
			cancelButtonText: 'No',
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire("Producto editado con éxito!", "", "success");
				if (!error) {
					navigate('/admin/productos');
				}
			}
		});

		console.log(error);

		console.log(product);
		console.log(data);

	}

	console.log(data?.product)

	
		const productosFields: FormField[] = [
            {
                name: 'nombre',
                type: 'text',
                label: 'Nombre',
                value: product?.name,
            },
            {
                name: 'valorU',
                type: 'text',
                label: 'Valor Unitario',
                value: product?.valorU,
            },
            {
                name: 'insumo',
                type: 'select',
                label: 'Insumo',
                value: product?.insumo,
                options: [
                    { value: 'Café en grano', label: 'Café en grano' },
                    { value: 'Café en polvo', label: 'Café en polvo' },
                ],
            },
            {
                name: 'stockMin',
                type: 'text',
                label: 'Stock Minimo',
                value: product?.stockMin,
            },
            {
                name: 'stockMax',
                type: 'text',
                label: 'Stock Máximo',
                value: product?.stockMax,
            },
            {
                name: 'descripcion',
                type: 'text',
                label: 'Descripción',
                value: product?.descripcion,
            },
	];
	return (
		<>
			<Form
				fields={productosFields}
				title='Editar Producto'
				onSubmit={handleRegisterProduct}
				button={<Button text={'Editar Producto'} onClick={() => null} />}
				errors={controlErrors}
				editable={true}
			/>
		</>
	);
};
