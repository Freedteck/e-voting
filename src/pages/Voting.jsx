import { useState } from "react";
import Modal from "../components/Modal";
import "../styles/voting.css";
import { Link } from "react-router-dom";

const Voting = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="voting container">
      <button className="register">Register to vote</button>
      <h2>Unilorin Election</h2>
      <form onSubmit={handleSubmit}>
        <label>
          SU president
          <select name="president" defaultValue={""}>
            <option value="" disabled>
              Select Your SU president
            </option>
            <option value="tinubu">Tinubu</option>
            <option value="buhari">Buhari</option>
            <option value="Atiku">Atiku</option>
          </select>
        </label>
        <label>
          SU vice president
          <select name="governor" defaultValue={""}>
            <option value="" disabled>
              Select Your SU vice president
            </option>
            <option value="tinubu">Fashola</option>
            <option value="buhari">Ambode</option>
            <option value="Atiku">Fayoshe</option>
          </select>
        </label>
        <label>
          SU Pro
          <select name="pro" defaultValue={""}>
            <option value="" disabled>
              Select Your SU Pro
            </option>
            <option value="tinubu">Sen. A</option>
            <option value="buhari">Sen. B</option>
            <option value="Atiku">Sen. C</option>
          </select>
        </label>
        <label>
          SU Secretary
          <select name="secretary" defaultValue={""}>
            <option value="" disabled>
              Select Your SU Secretary
            </option>
            <option value="tinubu">Sen. A</option>
            <option value="buhari">Sen. B</option>
            <option value="Atiku">Sen. C</option>
          </select>
        </label>
        <div className="ctas">
          <button>Vote</button>
          <Link to={"/result"}>View result</Link>
        </div>
      </form>

      {openModal && <Modal closeModal={closeModal} isOpen={openModal} />}
    </div>
  );
};

export default Voting;
