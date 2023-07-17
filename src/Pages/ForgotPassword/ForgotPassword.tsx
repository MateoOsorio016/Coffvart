import Swal from "sweetalert2";
import { Button } from "../../components/Button/Button";
import { Form } from "../../components/Form/Form";

export const ForgotPassword = () => {
  return (
    <>
      <Form
        title="Forgot your password?"
        fields={[{ name: "email", type: "email", label: "Email" }]}
        button={<Button text={"Send Code"} onClick={() => {
            Swal.fire({
                title: 'No se ha encontrado el Correo ingresado',
                icon: "error"
            })
        }} fill={false} />}
        onSubmit={() => console.log("hola")}
        cancelButton={false}
      />
    </>
  );
};
