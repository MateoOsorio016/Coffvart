import React, { useState, useEffect } from 'react';
import { Form, FormField } from "../../components/Form/Form";
import { Button } from '../../components/Button/Button';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

export const ClientesCreate = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [formObject, setFormObject] = useState<FormField[]>([]);
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});
  const [controlErrors, setControlErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();

  function handleCreate() {
    const hasErrors = Object.keys(controlErrors).length > 0;

    if (hasErrors) {
      return;
    }

    if (selectedOption === "") {
      // Si no se ha seleccionado ninguna opción, mostramos un alert indicando que se debe seleccionar una opción
      Swal.fire({
        title: 'Debe seleccionar un tipo de cliente',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
    } else {
      // Mostrar SweetAlert para confirmar la acción de crear un cliente
      Swal.fire({
        title: '¿Estás seguro de crear este Cliente?',
        showDenyButton: true,
        denyButtonText: `Cancelar`,
        confirmButtonText: 'Crear',
      }).then((result) => {
        if (result.isConfirmed) {
          // Aquí deberíamos guardar los datos o enviar el formulario, si es necesario
          Swal.fire('Cliente creado con éxito!', '', 'success');
          navigate('/admin/clientes'); // Redirigir al usuario a la tabla después de crear el cliente
        } 
      });
    }
  }

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedValue = e.target.value;

    setSelectedOption(selectedValue);

    if (selectedValue === "persona") {
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
        },      ]);
    } else if (selectedValue === 'empresa') {
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
        },      ]);
    }

    setFormValues({
      ...formValues,
      tipocliente: selectedValue,
    });
  }

  useEffect(() => {
    const selectElement = document.getElementById('tipocliente') as HTMLSelectElement;
    selectElement.style.width = '100%';
    selectElement.style.padding = '10px';
    selectElement.style.fontSize = '16px';
    selectElement.style.border = '1px solid #ccc';
    selectElement.style.borderRadius = '5px';
    selectElement.style.outline = 'none';
  }, []);

  return (
    <div>
      <label htmlFor="tipocliente">Tipo de Cliente:</label>
      <select id="tipocliente" value={selectedOption} onChange={handleSelectChange}>
        <option value="">Seleccionar</option>
        <option value="persona">Persona</option>
        <option value="empresa">Empresa</option>
      </select>

      <Form
        title={selectedOption === "persona" ? "Crear Persona" : "Crear Empresa"}
        fields={formObject}
        onSubmit={handleCreate}
        button={<Button text="Crear" onClick={handleCreate} />}
        errors={controlErrors}
      />
    </div>
  );
};
