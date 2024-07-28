import "../styles/modal.css";

const Modal = ({ closeModal, isOpen }) => {
  return (
    <div className={`modal-container ${isOpen ? "show" : ""}`}>
      <div className="modal">
        <h2>🎉 Vote Submitted Successfully! 🎉</h2>
        <p>
          Your vote has been recorded. Thank you for participating in the voting
          process!
        </p>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
