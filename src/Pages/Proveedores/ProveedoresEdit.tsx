import React, { useEffect, useState } from 'react';
import { Form, FormField } from "../../components/Form/Form";
import { Button } from "../../components/Button/Button";
import Swal from 'sweetalert2';

export const ProveedoresEdit = () => {
  const [formObject, setFormObject] = useState<FormField[]>([]);
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});
  const [controlErrors, setControlErrors] = useState<{ [key: string]: string }>({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const fieldsFormRoles: FormField[] = [
    {
        name: 'Nit',
        type: 'text',
        label: 'Nit',
      },
      {
        name: 'Nombre',
        type: 'text',
        label: 'Nombre',
      },
      {
        name: 'Telefono',
        type: 'text',
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

  function validateForm() {
    const errors: { [key: string]: string } = {};

    fieldsFormRoles.forEach((field) => {
      if (!formValues[field.name]) {
        errors[field.name] = `${field.label} es requerido`;
      }
    });

    setControlErrors(errors);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();


    const form = e.target as HTMLFormElement;
    let hasErrors = false;
    const errors: { [key: string]: string } = {};
    const values: { [key: string]: string } = {};

    formObject.forEach((field) => {
      values[field.name] = form[field.name].value;

      if (!form[field.name].value) {
        errors[field.name] = `${field.label} es requerido`;
        hasErrors = true;
      }
    });

    setFormValues(values);
    setControlErrors(errors);

    if (!hasErrors) {
      Swal.fire({
        title: 'Proveedor Editado con éxito',
        showDenyButton: true,
        denyButtonText: 'Cancelar',
        confirmButtonText: '¿Está seguro de editar este Proveedor?',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Proveedor editado con éxito!', '', 'success').then(() => {
            window.location.href = '/#/admin/proveedores';
          });
        }
      });
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    if (!value) {
      setControlErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `${name} es requerido`,
      }));
    } else {
      setControlErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  }

  useEffect(() => {
    validateForm();
    setIsFormSubmitted(true);
  }, [formValues]);

  return (
    <Form
      title="Editar Proveedor"
      fields={fieldsFormRoles}
      onSubmit={handleSubmit}
      button={<Button text="Editar Proveedor" onClick={()=>handleSubmit} />}
      errors={controlErrors}
    />
  );
};
