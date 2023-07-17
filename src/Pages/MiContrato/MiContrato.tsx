import Contrato from"../../assets/contrato2.png";
import ContratoPago from"../../assets/pse.png";

import "./MiContrato.css";

export const MiContrato = () => {
  return (
    <>
      <div className="userPageContainer">
        <div className="contentMiContrato">
          <section className="rowMiContrato">
            <img src={Contrato} alt="" />
          </section>
          <section className="rowMiContrato">
            <a href="https://www.pse.com.co/persona/">
            <img src={ContratoPago} alt=""  /></a>
          </section>
        </div>
      </div>
    </>
  );
};
