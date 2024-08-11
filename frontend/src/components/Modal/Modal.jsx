import React from "react";
import "./modal.css";
import { Outlet } from "react-router-dom";

const Modal = ({ children, closeModal, width, height }) => {
  return (
    <div className="modal">
      <div
        className="backLock"
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
        className="modalWindow"
        style={{
          width: width,
          height: height,
          marginTop: (height / 2) * -1,
          marginLeft: (width / 2) * -1,
        }}
      >
        <span
          className="modalWindow-closeButton"
          onClick={() => {
            closeModal();
          }}
        >
          X
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
