import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { RolesList } from "./Pages/Roles/RolesList";
import { RolesCreate } from "./Pages/Roles/RolesCreate";
import { Admin } from "./Admin/Admin";
import { PagosList } from "./Pages/Pagos/PagosList";
import { PagosCreate } from "./Pages/Pagos/PagosCreate";
import { PagosEdit } from "./Pages/Pagos/PagosEdit";
import { ContratosList } from "./Pages/Contratos/ContratosList";
import { ContratosCreate } from "./Pages/Contratos/ContratosCreate";
import { ContratosEdit } from "./Pages/Contratos/ContratosEdit";
import { EmpaquetadoList } from "./Pages/Empaquetado/EmpaquetadoList";
import { EmpaquetadoCreate } from "./Pages/Empaquetado/EmpaquetadoCreate";
import { EmpaquetadosEdit } from "./Pages/Empaquetado/EmpaquetadosEdit";
import { UsuariosList } from "./Pages/Usuarios/UsuariosList";
import { UsuariosCreate } from "./Pages/Usuarios/UsuariosCreate";
import { UsuariosEdit } from "./Pages/Usuarios/UsuariosEdit";
import { User } from "./User/User";
import { HomeUser } from "./Pages/Home/HomeUser";
import { ProductosList } from "./Pages/Productos/ProductosList";
import { ProductosCreate } from "./Pages/Productos/ProductosCreate";
import { ProductosEdit } from "./Pages/Productos/ProductosEdit";
import { InsumosList } from "./Pages/Insumos/InsumosList";
import { InsumosCreate } from "./Pages/Insumos/InsumosCreate";
import { InsumosEdit } from "./Pages/Insumos/InsumosEdit";
import { CategoriaList } from "./Pages/Categoria/CategoriaList";
import { CategoriaCreate } from "./Pages/Categoria/CategoriaCreate";
import { CategoriaEdit } from "./Pages/Categoria/CategoriaEdit";
import { ComprasList } from "./Pages/Compras/ComprasList";
import { ComprasCreate } from "./Pages/Compras/ComprasCreate";
import { ComprasEdit } from "./Pages/Compras/ComprasEdit";
import { About } from "./Pages/About/About";
import { MiContrato } from "./Pages/MiContrato/MiContrato";
import { ClientesCreate } from "./Pages/Clientes/ClientesCreate";
import { ClientesList } from "./Pages/Clientes/ClientesList";
import { ClientesEdit } from "./Pages/Clientes/ClientesEdit";
import { ProveedoresCreate } from "./Pages/Proveedores/ProveedoresCreate";
import { ProveedoresList } from "./Pages/Proveedores/ProveedoresList";
import {VentasList} from "./Pages/Ventas/VentasList";
import {VentasCreate } from "./Pages/Ventas/VentasCreate";
import {VentasEdit } from "./Pages/Ventas/VentasEdit";
import { DashboardAdmin } from "./Pages/DashboardAdmin/DashboardAdmin";
import { SimplePages } from "./Pages/SImplePages/SimplePages";
import { UserCart } from "./Pages/UserCart/UserCart";
import { ForgotPassword } from "./Pages/ForgotPassword/ForgotPassword";
import {PedidosList} from "./Pages/Pedidos/PedidosList";
import { PedidosCreate } from "./Pages/Pedidos/PedidosCreate";
import { PedidosEdit } from "./Pages/Pedidos/PedidosEdit";
import {ProveedoresEdit} from "./Pages/Proveedores/ProveedoresEdit";


export default function App() {
  return (
    <HashRouter basename="/">
      <div className="App">
        <Routes>
          <Route path="/" element={<User />}>
            <Route path="/" element={<HomeUser />} />
            <Route path="about" element={<About />} />
            <Route path="MiContrato" element={<MiContrato/>} />
          </Route>
          <Route path='/user/*' element={<SimplePages/>}>
            <Route path="cart" element={<UserCart/>}/>
            <Route path='forgot' element={<ForgotPassword/>}/>
          </Route>
          <Route path="/" element={<User />}>
            <Route path="/" element={<HomeUser />} />
          </Route>
          <Route path="/admin/*" element={<Admin />}>
            <Route path="" element={<DashboardAdmin/>} />
            <Route path="roles" element={<RolesList />} />
            <Route path="roles/create" element={<RolesCreate />} />
            <Route path="pagos" element={<PagosList />} />
            <Route path="pagos/create" element={<PagosCreate />} />
            <Route path="pagos/edit/:id" element={<PagosEdit />} />
            <Route path="contratos" element={<ContratosList />} />
            <Route path="contratos/create" element={<ContratosCreate />} />
            <Route path="contratos/edit/:id" element={<ContratosEdit />} />
            <Route path="empaquetados" element={<EmpaquetadoList />} />
            <Route path="empaquetados/create" element={<EmpaquetadoCreate />} />
            <Route
              path="empaquetados/edit/:id"
              element={<EmpaquetadosEdit />}
            />
            <Route path="usuarios" element={<UsuariosList />} />
            <Route path="usuarios/create" element={<UsuariosCreate />} />
            <Route path="usuarios/edit/:id" element={<UsuariosEdit />} />
            <Route path="compras" element={<ComprasList />} />
            <Route path="compras/create" element={<ComprasCreate />} />
            <Route path="compras/edit/:id" element={<ComprasEdit />} />
            <Route path="categoria" element={<CategoriaList />} />
            <Route path="categoria/create" element={<CategoriaCreate />} />
            <Route path="categoria/edit/:id" element={<CategoriaEdit />} />
            <Route path="insumos" element={<InsumosList />} />
            <Route path="insumos/create" element={<InsumosCreate />} />
            <Route path="insumos/edit/:id" element={<InsumosEdit />} />
            <Route path="productos" element={<ProductosList />} />
            <Route path="productos/create" element={<ProductosCreate />} />
            <Route path="productos/edit/:id" element={<ProductosEdit />} />
            <Route path="clientes" element={<ClientesList />} />
            <Route path="clientes/create" element={<ClientesCreate />} />
            <Route path="clientes/edit/:id" element={<ClientesEdit />} />
            <Route path ="proveedores" element={<ProveedoresList />} />
            <Route path ="proveedores/create" element={<ProveedoresCreate />} />
            <Route path ="proveedores/edit/:id" element={<ProveedoresEdit />} />
            <Route path="ventas" element={<VentasList />} />
            <Route path="ventas/create" element={<VentasCreate />} />
            <Route path="ventas/edit/:id" element={<VentasEdit/>} />
            <Route path="pedidos" element={<PedidosList/>}/>
            <Route path="pedidos/create" element={<PedidosCreate/>} />
            <Route path="pedidos/edit/:id" element={<PedidosEdit/>}/>
          </Route>
        </Routes>
      </div>
    </HashRouter>
  );
}
