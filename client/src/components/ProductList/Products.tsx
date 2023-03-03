import { useEffect, useState } from "react";
import { TProduct } from "../../types/main";
import Loader from "../Loader";
import ProductCard from "../ProductCard/Card";
import "./Products.scss";
const Products: React.FC = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = process.env.REACT_APP_PORT;
  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch(`${baseUrl}/api/products`);
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, [baseUrl]);
  if (loading) {
    return <Loader />;
  }
  return (
    <section className="products">
      <h2 className="title">Our Products</h2>
      <div className="wrapper">
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </section>
  );
};
export default Products;
