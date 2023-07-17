import { useState, useEffect } from 'react';
import { Form, FormField } from "../../components/Form/Form";
import { Button } from '../../components/Button/Button';
import Swal from 'sweetalert2';

export const ClientesCreate = () => {
  const [formObject, setFormObject] = useState<FormField[]>([
    {
      name: "tipocliente",
      label: "Tipo de Cliente",
      type: "select",
      options: [
        { value: "persona", label: "Persona" },
        { value: "empresa", label: "Empresa" },
      ],
    },
  ]);
  const [titulo, setTitulo] = useState('Tipo de Cliente');
  const [NombreB, setNombreB] = useState('Seleccionar');
  const [buttonCreate, setButtonCreate] = useState(false);
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});
  const [controlErrors, setControlErrors] = useState<{ [key: string]: string }>({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  function handleCreate() {
    setIsFormSubmitted(true);
    const hasErrors = Object.keys(controlErrors).length > 0;

    if (hasErrors) {
      return;
    }

    Swal.fire({
      title: 'Cliente Creado con éxito',
      showDenyButton: true,
      denyButtonText: `Cancelar`,
      confirmButtonText: '¿Estás seguro de crear este Cliente?',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Cliente creado con éxito!', '', 'success');
        window.location.href = '/#/admin/clientes';
      }
    });
  }

  useEffect(() => {
    setIsFormSubmitted(true);
    validateForm();
  }, [formValues, formObject]);

  function validateForm() {
    const errors: { [key: string]: string } = {};
    formObject.forEach((field) => {
      if (!formValues[field.name] && isFormSubmitted) {
        errors[field.name] = `${field.label} es requerido`;
      }
    });
    setControlErrors(errors);
  }

  function handleSumbit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
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

    if (hasErrors) {
      setIsFormSubmitted(true);
      return;
    }

    if (formValues.tipocliente === "persona") {
      setButtonCreate(true);
      setTitulo('Crear Persona');
      setNombreB('Crear Persona');
      setFormObject([
        {
          name: "NIT",
          label: "NIT",
          type: "number",
        },
        {
          name: "name",
          label: "Nombre",
          type: "text",
        },
        {
          name: "apellido",
          label: "Apellido",
          type: "text",
        },
        {
          name: "email",
          label: "Email",
          type: "text",
        },
        {
          name: "telefono",
          label: "Teléfono",
          type: "text",
        },
        {
          name: "direccion",
          label: "Dirección",
          type: "text",
        },
        {
          name: "estado",
          label: "Estado",
          type: "select",
          options: [
            { value: "Activo", label: "Activo" },
            { value: "Inactivo", label: "Inactivo" },
          ],
        },
        
      ]);
    } else if (formValues.tipocliente === 'empresa') {
      setTitulo('Crear Empresa');
      setNombreB('Crear empresa');
      setButtonCreate(true);
      setFormObject([
        {
          name: "nit",
          label: "Nit",
          type: "text",
        },
        {
          name: "nombremepresa",
          label: "Empresa",
          type: "text",
        },
        {
          name: "representante",
          label: "Nombre Representante",
          type: "text",
        },
        {
          name: "tipodocumento",
          label: "Tipo documento",
          type: "select",
          options: [
            { value: "CC", label: "Cedula de ciudadanía" },
            { value: "CCE", label: "Cedula de extranjeria" },
          ],
        },
        {
          name: "documento",
          label: "Numero documento",
          type: "text",
        },
        {
          name: "email",
          label: "Email",
          type: "text",
        },
        {
          name: "telefono",
          label: "Teléfono",
          type: "text",
        },
        {
          name: "direccion",
          label: "Dirección",
          type: "text",
        },
        {
          name: "estado",
          label: "Estado",
          type: "select",
          options: [
            { value: "Activo", label: "Activo" },
            { value: "Inactivo", label: "Inactivo" },
          ],
        },
      ]);
    }
    setControlErrors({});
    validateForm();
    
  }

  function handleSelectChange() {
    // No hacer nada cuando se selecciona una opción
  }

  return (
    <Form
      title={titulo}
      fields={formObject}
      onSubmit={handleSumbit}
      button={buttonCreate ? (
        <Button text={NombreB} onClick={handleCreate} />
      ) : (
        <Button text={NombreB} onClick={handleSelectChange} />
      )}
      errors={controlErrors}
    />
  );
};
