import { ModalContainer, Modal } from "../Modal/Modal";

import { Form, FormField } from "../Form/Form";

import { Button } from "../Button/Button";

import LoginImage from "../../assets/LoginImage.png";
import RegisterImage from "../../assets/RegisterImage.png"

export const Login = ({ showModal }: any) => {
  const loginForm: FormField[] = [
    {
      name: "email",
      type: "text",
      label: "Email",
    },
    {
      name: "password",
      type: "password",
      label: "Password",
    },
  ];
  return (
    <>
      <ModalContainer ShowModal={showModal}>
        <Modal showModal={showModal} className={"SubscribeModal"}>
          <div className="imageContainer">
            <img src={LoginImage} alt="" />
          </div>
          <div className="formContainer">
            <Form
              fields={loginForm}
              onSubmit={(e) => e.preventDefault()}
              button={
                <Button text={"Login"} onClick={() => null} fill={false} />
              }
              cancelButton={false}
              extraElements={<span>Forgot your password?</span>}
              title="Login"
            />
            <span>Don't have an account? Sign up now!</span>
          </div>
        </Modal>
      </ModalContainer>
    </>
  );
};

export const Register = ({ showModal }: any) => {
  const registerForm: FormField[] = [
    {
      name: "name",
      type: "text",
      label: "Name",
    },
    {
      name: "phone",
      type: "text",
      label: "Phone",
    },
    {
      name: "email",
      type: "text",
      label: "Email",
    },
    {
      name: "password",
      type: "password",
      label: "Password",
    },
    {
      name: "confirmPassword",
      type: "password",
      label: "Confirm Password",
    },
    {
      name: "birth",
      type: "date",
      label: "Birth Date",
    },
  ];
  return (
    <>
      <ModalContainer ShowModal={showModal}>
        <Modal showModal={showModal} className={"SubscribeModal"}>
          <div className="formContainer">
            <Form
              fields={registerForm}
              onSubmit={(e) => e.preventDefault()}
              button={
                <Button text={"Create an account"} onClick={() => null} fill={false} />
              }
              cancelButton={false}
              title="Register"
            />
            <span>Do you already have an account? Login now!</span>
          </div>
          <div className="imageContainer">
            <img src={RegisterImage} alt="" />
          </div>
        </Modal>
      </ModalContainer>
    </>
  );
};
