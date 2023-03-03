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
    <section className="Cart">
      <h2 className="title">Cart({cartItems.length})</h2>
      {cartItems.length === 0 && <p className="empty">Your cart is empty.</p>}
      <div className="wrapper">
        {cartItems.length > 0
          ? cartItems.map((item) => {
              const ItemPrice = item.productId.price * item.quantity;
              const formattedPrice = FormatNaira(ItemPrice);
              return (
                <div key={item.productId._id} className="item">
                  <img
                    src={item.productId.imageUrl}
                    alt={item.productId.name}
                  />
                  <p className="text">
                    {item.productId.name} x {item.quantity}
                  </p>
                  <p className="price">{formattedPrice}</p>
                  <button
                    className="remove"
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
        {cartItems.length > 0 && <p className="total">Total: {cartTotal}</p>}
      </div>
    </section>
  );
};
export default Cart;
