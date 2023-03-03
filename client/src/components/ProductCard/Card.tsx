import { TProduct } from "../../types/main";
import axios from "axios";
import { toast } from "react-toastify";
import "./Card.scss";
import { Context } from "../Context/Context";
import { useContext } from "react";
import { FormatNaira } from "../../utils/FormatCurrency";
type TProps = {
  product: TProduct;
};
const ProductCard: React.FC<TProps> = ({ product }) => {
  const baseUrl = process.env.REACT_APP_PORT;
  const { setCartItems } = useContext(Context);
  const handleAddToCart = async () => {
    try {
      const response = await axios.post(`${baseUrl}/api/cart/${product._id}`);
      toast.success(`Added ${product.name} to cart"`);
      const addedCartItems = response.data;
      setCartItems(addedCartItems);
    } catch (error) {
      console.log(error);
    }
  };
  const price = FormatNaira(product.price);

  return (
    <article
      key={product._id}
      style={{
        border: "1px solid black",
        padding: "16px",
        margin: "16px",
      }}
    >
      <h2>{product.name}</h2>
      <p>{product.desc}</p>
      <p>{price}</p>
      <img
        src={product.imageUrl}
        alt={product.name}
        style={{ width: "150px", height: "150px" }}
      />
      <button onClick={handleAddToCart}>Add to cart</button>
    </article>
  );
};
export default ProductCard;
