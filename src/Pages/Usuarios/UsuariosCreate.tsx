import { Form, FormField } from '../../components/Form/Form';
import { Button } from '../../components/Button/Button';
import { useFetch } from '../../Hooks/useFetch';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const UsuariosCreate = () => {
	const navigate = useNavigate();
	const [controlErrors, setControlErrors] = useState({});
	const { error, setBodyRequest } = useFetch({url:'https://coff-v-art-api.onrender.com/api/user', method: 'POST', headers: { 'Content-Type': 'application/json' } });

	function handleRegisterUser(e: any) {
		e.preventDefault();
		const name = e.target.nombre.value;
		const tel = e.target.telefono.value;
		const email = e.target.correo.value;
		const password = e.target.contrasena.value;
		const confirmPassword = e.target.confirmarContrasena.value;
		const rol = e.target.rol.value;

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
			setControlErrors({
				...controlErrors,
				contrasena: 'La contraseña es requerida',
			});
			return;
		} else if (confirmPassword === '') {
			setControlErrors({
				...controlErrors,
				confirmarContrasena: 'La confirmación de contraseña es requerida',
			});
			return;
		} else if (rol === '') {
			setControlErrors({ ...controlErrors, rol: 'El rol es requerido' });
			return;
		} else if (password !== confirmPassword) {
			setControlErrors({
				...controlErrors,
				contrasena: 'Las contraseñas no coinciden',
				confirmarContrasena: 'Las contraseñas no coinciden',
			});
			return;
		}

        const user = {
            name,
            tel,
            email,
            password,
            rol
        }
        setBodyRequest(user);

		if(!error) {
			Swal.fire({
				icon: 'success',
				title: 'Usuario creado correctamente',
				showConfirmButton: false,
			})
            setTimeout(()=>{
                navigate('/admin/usuarios')
            }, 500)
		}

		console.log(error)

        // console.log(error);

        // console.log(user);
        // console.log(data);

	}

	const usuariosFields: FormField[] = [
		{
			name: 'nombre',
			type: 'text',
			label: 'Nombre',
		},
		{
			name: 'telefono',
			type: 'text',
			label: 'Telefono',
		},
		{
			name: 'correo',
			type: 'text',
			label: 'Correo Electrónico',
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
				title='Crear Usuario'
				onSubmit={handleRegisterUser}
				button={<Button text={'Registrar Usuario'} onClick={() => null} />}
				errors={controlErrors}
			/>
		</>
	);
};
