import { useEffect } from "react";

const Modal = ({ isOpen, setIsOpen, children, title, modalWidth }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("blocked");
    } else {
      document.body.classList.remove("blocked");
    }
  }, [isOpen]);

  return (
    <div className={isOpen ? "modal active" : "modal"}>
      <div className="modal-bg-paranja" onClick={() => setIsOpen(false)}></div>
      <div className="modal-wrapper" style={{ width: modalWidth ? modalWidth : null }}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h2 className="modal-title">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
