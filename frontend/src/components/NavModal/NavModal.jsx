import React from "react";
import "./navModal.css";
import closeIcon from "../../assets/admin-icons/plus-circle.ico";

const Modal = ({ children, closeModal }) => {
  return (
    <div className="modal">
      <div
        className="back-lock"
        onClick={() => {
          closeModal();
        }}
      >
        <span
          className="modal-window-close-button"
          onClick={() => {
            closeModal();
          }}
        >
          <img src={closeIcon} style={{ width: "40px", height: "40px" }} />
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
