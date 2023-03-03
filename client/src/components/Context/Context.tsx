import { createContext, ReactNode, useEffect, useState } from "react";
import { TProduct } from "../../types/main";
type TCartItem = {
  _id: string;
  productId: TProduct;
  quantity: number;
};

interface IContext {
  cartItems: TCartItem[];
  cartCount: number | string;
  setCartItems: React.Dispatch<React.SetStateAction<TCartItem[]>>;
}
interface ICon {
  children?: ReactNode;
}
export const Context = createContext({} as IContext);

// A provider component that wraps the children and provides the state and toggle method to its children
export const ContextProvider: React.FC<ICon> = ({ children }) => {
  const baseUrl = process.env.REACT_APP_PORT;
  const [cartItems, setCartItems] = useState<TCartItem[]>([]);
  useEffect(() => {
    async function fetchCart() {
      const response = await fetch(`${baseUrl}/api/cart`);
      const data = await response.json();
      setCartItems(data);
    }
    fetchCart();
  }, [baseUrl]);
  const cartCount = cartItems.length > 0 ? cartItems.length : "";

  return (
    <Context.Provider
      value={{
        setCartItems,
        cartItems,
        cartCount,
      }}
    >
      {children}
    </Context.Provider>
  );
};
