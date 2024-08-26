import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";



const Modal= ({ isOpen, close, children }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
    } else {
      const timer = setTimeout(() => setShowModal(false), 300); // Match the duration of the fade-out transition
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) close();
  };

  return showModal
    ? ReactDOM.createPortal(
        <div
          onClick={handleOverlayClick}
          className={`fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full p-6 overflow-auto bg-black bg-opacity-75 transition-opacity duration-300 ease-in-out
             ${isOpen ? "opacity-100" : "opacity-0"}`}
        >
          {children}
        </div>,
        document.body
      )
    : null;
};

export default Modal;
