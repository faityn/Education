import React from "react";

type ModalProps = {
  children: React.ReactNode;
};

const CustomModal: React.FC<ModalProps> = ({ children }) => {
  return (
    <div className="fixed inset-0  z-30 flex items-center justify-center bg-black bg-opacity-35 backdrop-blur-sm">
      <div className="flex w-[350px] flex-col ">
        {/* <button className="place-self-end text-xl text-white" onClick={onClose}>X</button> */}
        <div className="bg-white  text-center rounded-lg">{children}</div>
      </div>
    </div>
  );
};

export default CustomModal;
