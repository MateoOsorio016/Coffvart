import { Form, FormField } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
import { useFetch } from '../../Hooks/useFetch';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const UsuariosEdit = () => {

	const navigate = useNavigate()

	const { id } = useParams<{ id: string }>();

	const [controlErrors, setControlErrors] = useState({});
	const { data, error, setBodyRequest, setMethodState, setUrlState } = useFetch({ url: `https://coff-v-art-api.onrender.com/api/user/${id}`, method: 'GET', headers: { 'Content-Type': 'application/json' } })

	const user = data.user || data;

	function handleRegisterUser(e: any) {
		e.preventDefault();
		const name = e.target.nombre.value;
		const tel = e.target.telefono.value;
		const email = e.target.correo.value;
		const password = e.target.contrasena.value;
		const confirmPassword = e.target.confirmarContrasena.value;
		const rol = e.target.rol.value;

		let user = {};

		if (name === '') {
			setControlErrors({ ...controlErrors, nombre: 'El nombre es requerido' });
			return;
		} else if (tel === '') {
			setControlErrors({
				...controlErrors,
				telefono: 'El telefono es requerido',
			});
			return;
		} else if (email === '') {
			setControlErrors({ ...controlErrors, correo: 'El correo es requerido' });
			return;
		} else if (password === '') {
			user = {
				_id: id,
				name,
				tel,
				email,
				rol
			}
		} else if (password.length > 0) {

			if (password !== confirmPassword) {
				setControlErrors({
					...controlErrors,
					contrasena: 'Las contraseñas no coinciden',
					confirmarContrasena: 'Las contraseñas no coinciden',
				});
				return;
			}

		} else if (rol === '') {
			user = {
				_id: id,
				name,
				tel,
				email,
				password
			}
		} else {
			user = {
				_id: id,
				name,
				tel,
				email,
				password,
				rol
			}
		}

		setUrlState(`https://coff-v-art-api.onrender.com/api/user/`);
		setMethodState('PUT');
		setBodyRequest(user);

		if (!error) {
			Swal.fire({
				title: 'Usuario editado',
				icon: 'success',
				showConfirmButton: false,
			})
			setTimeout(() => {
				navigate('/admin/usuarios')
			}, 1000);
		}

		console.log(error);

		console.log(user);
		console.log(data);

	}

	console.log(data?.user)


	const usuariosFields: FormField[] = [
		{
			name: 'nombre',
			type: 'text',
			label: 'Nombre',
			value: user?.name,
		},
		{
			name: 'telefono',
			type: 'text',
			label: 'Telefono',
			value: user?.tel,
		},
		{
			name: 'correo',
			type: 'text',
			label: 'Correo Electrónico',
			value: user?.email,
		},
		{
			name: 'contrasena',
			type: 'password',
			label: 'Contraseña',
		},
		{
			name: 'confirmarContrasena',
			type: 'password',
			label: 'Confirmar Contraseña',
		},
		{
			name: 'rol',
			type: 'select',
			label: 'Rol',
			value: user?.rol,
			options: [
				{ value: 'Administrador', label: 'Administrador' },
				{ value: 'usuario', label: 'usuario' },
			],
		},
	];
	return (
		<>
			<Form
				fields={usuariosFields}
				title='Editar Usuario'
				onSubmit={handleRegisterUser}
				button={<Button text={'Editar Usuario'} onClick={() => null} />}
				errors={controlErrors}
				editable={true}
			/>
		</>
	);
};
