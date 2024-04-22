import Menu from "./menu";
import CtrlPanel from "./ctrlPanel";
import Basket from "../basket";

const Navbar = () => {
  return (
    <header className="header">
      <div className="header-wrapper">
        <Menu />
        <CtrlPanel />
        <Basket />
      </div>
    </header>
  );
};

export default Navbar;
