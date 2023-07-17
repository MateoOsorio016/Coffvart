import {Form, FormField} from "../../components/Form/Form"
import {Button} from "../../components/Button/Button"

export const ClientesEdit=()=>{
    const fieldsFormClientes : FormField[]=[
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
            options: 
            [
                { value: 'Activo', label: 'Activo' },
                { value: 'Inactivo', label: 'Inactivo' },
            ]
        } 

    ]
    return(
        <Form title="Editar Cliente" fields={fieldsFormClientes} onSubmit={e=>e.preventDefault} button={<Button text={"Editar Cliente"} onClick={()=> null}/>}/>
    )
}