import { useState } from 'react';
import { Form, FormField } from "../../components/Form/Form";
import { Button } from "../../components/Button/Button";
import Swal from 'sweetalert2';

export const ProveedoresCreate = () => {
  const [controlErrors, setControlErrors] = useState({});

  const fieldsFormRoles: FormField[] = [
    {
        name: 'Nit',
        type: 'number',
        label: 'Nit',
      },
      {
        name: 'Nombre',
        type: 'text',
        label: 'Nombre',
      },
      {
        name: 'Telefono',
        type: 'number',
        label: 'Telefono',
      },
      {
        name: 'Email',
        type: 'text',
        label: 'Email',
      },
      {
        name: 'Direccion',
        type: 'text',
        label: 'Direccion',
      },
      {
        name: 'Estado',
        type: 'select',
        label: 'Estado',
        options: [
          { value: 'Activo', label: 'Activo' },
          { value: 'Inactivo', label: 'Inactivo' },
        ],
      },
  ];

  function handleSubmit(e: any) {
    e.preventDefault();
    const nit = e.target.Nit.value
    const Nombre=e.target.Nombre.value
    const Telefono = e.target.Telefono.value
    const Email = e.target.Email.value
    const Direccion= e.target.Direccion.value
    const Estado= e.target.Estado.value

    if (nit === '') {
			setControlErrors({ ...controlErrors, Nit: 'El nit es requerido' });
			return;
		} else if (Nombre === '') {
			setControlErrors({
					...controlErrors,
					nombre: 'El nombre es requerido',
			});
			return;
		} else if (Telefono === '') {
			setControlErrors({ ...controlErrors, Telefono: 'El telefono es requerido' });
			return;
		} else if (Email === '') {
			setControlErrors({
					...controlErrors,
					Email: 'El email es requerido',
			});
			return;
		} else if (Direccion === '') {
			setControlErrors({
					...controlErrors,
					Direccion: 'La direccion es requerida',
			});
			return;
		} else if (Estado === '') {
			setControlErrors({ ...controlErrors, Estado: 'El estado es requerido' });
			return;
		}


		Swal.fire({
			title: 'Proveedor Creado con éxito',
			showDenyButton: true,
			denyButtonText: 'Cancelar',
			confirmButtonText: '¿Está seguro de crear este Proveedor?',
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire('Proveedor creado con éxito!', '', 'success').then(() => {
					window.location.href = '/#/admin/proveedores';
				});
			}
		});

  }

  return (
    <Form
      title="Crear Proveedor"
      fields={fieldsFormRoles}
      onSubmit={handleSubmit}
      button={<Button text="Crear Proveedor" onClick={()=>handleSubmit} />}
      errors={controlErrors}
    />
  );
};
