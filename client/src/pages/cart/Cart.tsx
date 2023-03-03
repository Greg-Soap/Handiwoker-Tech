import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";
import { Context } from "../../components/Context/Context";
import { FormatNaira } from "../../utils/FormatCurrency";
import "./Cart.scss";

const Cart: React.FC = () => {
  const { cartItems, setCartItems } = useContext(Context);
  const baseUrl = process.env.REACT_APP_PORT;
  const total = cartItems.reduce(
    (acc, curr) => acc + curr.productId.price * curr.quantity,
    0
  );
  const cartTotal = FormatNaira(total);
  const handleRemoveFromCart = async (productId: string, name: string) => {
    try {
      await axios.delete(`${baseUrl}/api/cart/${productId}`);
      toast.success(`Removed ${name} From cart`);
      const updatedCarts = await axios.get(`${baseUrl}/api/cart`);
      setCartItems(updatedCarts.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 && <p>Your cart is empty.</p>}
      {cartItems.length > 0
        ? cartItems.map((item) => {
            const ItemPrice = item.productId.price * item.quantity;
            const formattedPrice = FormatNaira(ItemPrice);
            return (
              <div
                key={item.productId._id}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <img
                  src={item.productId.imageUrl}
                  alt={item.productId.name}
                  style={{ width: "150px", height: "150px" }}
                />
                <p>
                  {item.productId.name} x {item.quantity}
                </p>
                <p>{formattedPrice}</p>
                <button
                  onClick={() =>
                    handleRemoveFromCart(
                      item.productId._id,
                      item.productId.name
                    )
                  }
                >
                  Remove
                </button>
              </div>
            );
          })
        : null}
      {cartItems.length > 0 && <p>Total: {cartTotal}</p>}
    </div>
  );
};
export default Cart;
