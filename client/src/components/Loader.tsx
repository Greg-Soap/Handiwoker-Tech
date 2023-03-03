import { InfinitySpin } from "react-loader-spinner";
import "../styles/main.scss";

// Loader component to display while fetching data
export default function Loader() {
  return (
    <div className="Loader">
      <InfinitySpin width="200" color="#1e2842" />
    </div>
  );
}
