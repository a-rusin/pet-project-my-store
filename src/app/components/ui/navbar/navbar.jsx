import Menu from "./menu";
import CtrlPanel from "./ctrlPanel";

const Navbar = () => {
  return (
    <header className="header">
      <div className="header-wrapper">
        <Menu />
        <CtrlPanel />
      </div>
    </header>
  );
};

export default Navbar;
