import React from "react";
import ReactDOM from "react-dom";

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "#fff",
    paddingTop: "0px",
    borderRadius: "4px",
  },
  close: {
    position: "relative",
    top: "-90px",
    right: "-260px",
    cursor: "pointer",
  },
};

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div style={styles.overlay}>
      <div style={styles.content}>
        <button style={styles.close} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
