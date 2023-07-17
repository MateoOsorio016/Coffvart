import { VictoryBar, VictoryChart, VictoryLabel } from "victory";
import { ProductCard } from "../../components/CardDash/ProductCard";
import ProductImage from "../../assets/product.jpg";

export const DashboardAdmin = () => {
  const data = [
    {
      mes: "enero",
      ventas: 1000,
    },
    { 
      mes: "febrero",
      ventas: 2000,
    },
    {
      mes: "marzo",
      ventas: 3000,
    },
    {
      mes: "abril",
      ventas: 4000,
    },
    {
      mes: "mayo",
      ventas: 5000,
    },
    {
      mes: "junio",
      ventas: 6000,
    },
  ];
  const productosHome = [
    {
      id: 1,
      name: "Burdeos Coffee",
      price: 1500000,
      title: "Total vendido",
      image: ProductImage,
      description: "Some",
      category: "Cafe",
    },
  ];
  const productos= [
    {
      id: 1,
      name: "Burdeos Coffee",
      price: 1500000,
      title: "Total vendido",
      image: ProductImage,
      description: "Some",
      category: "Cafe",
    },
  ];
  return (
    <>
    <div className="Carta">
      <div className="contentDashboard">
        <h2>Ventas</h2>
        <VictoryChart domainPadding={20}>
          <VictoryBar data={data} x="mes" y="ventas" labelComponent={<VictoryLabel />}/>
        </VictoryChart>
      </div>
      <div style={{
        display: 'flex'
      }}>
      <div className="ProductosContainer">
        <h2>Producto más vendido</h2>
        <div className="cardsProductHome">
          {productosHome?.map((product) => {
            return <ProductCard product={product} />;
          })}
          </div>
      </div>
      <div className="ProductosContainer">
      <h2>Producto menos vendido</h2>
      <div>
          <div className="cardsProductHome">
          {productos?.map((product) => {
            return <ProductCard product={product} />;
          })}
          </div>
      </div>
      </div>
      </div>
      </div>
    </>
  );
};
