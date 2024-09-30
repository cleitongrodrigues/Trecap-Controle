import ReactDOM from "react-dom";

const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modalTeste">
      <div className="modalContent">
        {children}
        <button onClick={closeModal}>Fechar</button>
      </div>
    </div>,
    document.body // Renderiza no final do body
  );
};

export default Modal;
