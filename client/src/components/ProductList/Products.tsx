import { useEffect, useState } from "react";
import { TProduct } from "../../types/main";
import ProductCard from "../ProductCard/Card";
import "./Products.scss";
const Products: React.FC = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const baseUrl = process.env.REACT_APP_PORT;
  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch(`${baseUrl}/api/products`);
      const data = await response.json();
      setProducts(data);
    }
    fetchProducts();
  }, [baseUrl]);

  return (
    <>
      {products.map((product) => (
        <ProductCard product={product} />
      ))}
    </>
  );
};
export default Products;
