import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ showModal, setShowModal, children }) => {
  useEffect(() => {
    const keyPress = (e) => {
      if (e.keyCode == 27) setShowModal(false);
    };
    window.addEventListener("keyup", keyPress);
    return () => {
      window.removeEventListener("keyup", keyPress);
    };
  }, []);

  return (
    <div>
      {showModal && (
        <div className="overlay">
          <div className="content">
            <AiOutlineClose onClick={() => setShowModal(false)} />
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
