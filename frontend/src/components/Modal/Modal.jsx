import React from "react";
import "./modal.css";
import closeIcon from "../../assets/admin-icons/plus-circle.ico";

const Modal = ({ children, closeModal, width, height }) => {
  return (
    <div className="modal">
      <div
        className="back-lock"
        onClick={() => {
          closeModal();
        }}
      ></div>
      {/* u css go postavuvame na sredina so goren lev kjos
         marginTop: (height / 2) * -1, ke nu postavi negativna margina so e pola od visinata na modalot 
         so toa ke go postavi modalot na sredina po vertikala
         isto za marginLeft: (width / 2) * -1,
      */}
      <div
        className="modal-window"
        style={{
          width: width,
          height: height,
          marginTop: (height / 2) * -1,
          marginLeft: (width / 2) * -1,
        }}
      >
        <span
          className="modal-window-close-button"
          onClick={() => {
            closeModal();
          }}
        >
          <img src={closeIcon} style={{ width: "24px", height: "24px" }} />
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
