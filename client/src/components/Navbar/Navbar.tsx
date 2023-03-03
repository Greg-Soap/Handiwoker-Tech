import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context/Context";
import "./Navbar.scss";
const Navbar: React.FC = () => {
  const { cartCount } = useContext(Context);

  return (
    <nav>
      <Link to="/">Handiwork</Link>
      <Link to="/cart">
        Cart <span>{cartCount}</span>
      </Link>
    </nav>
  );
};
export default Navbar;
