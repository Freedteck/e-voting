import "../styles/modal.css";

const Modal = ({ closeModal, isOpen, header, body }) => {
  return (
    <div className={`modal-container ${isOpen ? "show" : ""}`}>
      <div className="modal">
        <h2>{header}</h2>
        <p>{body}</p>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
//           Your vote has been recorded. Thank you for participating in the voting
// process!
// 🎉 Vote Submitted Successfully! 🎉<
