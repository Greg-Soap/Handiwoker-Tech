import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context/Context";
import "./Navbar.scss";
const Navbar: React.FC = () => {
  const { cartCount } = useContext(Context);

  return (
    <nav className="navbar">
      <Link className="brand" to="/">
        Handiwoker
      </Link>
      <Link className="cart" to="/cart">
        <img
          src="https://img.icons8.com/material-rounded/256/shopping-cart.png"
          alt=""
        />
        {cartCount === "" ? null : <span>{cartCount}</span>}
      </Link>
    </nav>
  );
};
export default Navbar;
