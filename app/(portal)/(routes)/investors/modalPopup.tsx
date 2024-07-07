"use client";

interface ModalPopupProps {
  onClick: () => void;
  label: string;
}

const ModalPopup: React.FC<ModalPopupProps> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-3 transition hover:bg-neutral-100 bg-cyan-500 font-semibold"
    >
      {label}
    </div>
  );
};

export default ModalPopup;
