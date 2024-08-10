import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import "../styles/voting.css";
import { Link } from "react-router-dom";
import { ReadCandidate, ReadVotes } from "../utils/wagmiClient";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { abi, contractAddress } from "../utils/clients";

const Voting = () => {
  const [voteModalOpen, setVoteModalOpen] = useState(false);
  const [voteModalHeader, setVoteModalHeader] = useState("");
  const [voteModalBody, setVoteModalBody] = useState("");
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [registerModalHeader, setRegisterModalHeader] = useState("");
  const [registerModalBody, setRegisterModalBody] = useState("");
  const [presidents, setPresidents] = useState([]);
  const [vice, setVice] = useState([]);
  const [Pro, setPro] = useState([]);
  const [secretary, setSecretary] = useState([]);
  const [totalVoted, setTotalVoted] = useState(0);

  const { data } = ReadCandidate();
  const { data: votes } = ReadVotes();
  const {
    data: voteHash,
    error: voteError,
    isPending: isVotePending,
    writeContract: writeVoteContract,
  } = useWriteContract();
  const { isLoading: isVoteConfirming, isSuccess: isVoteConfirmed } =
    useWaitForTransactionReceipt({ hash: voteHash });

  const {
    data: registerHash,
    error: registerError,
    isPending: isRegisterPending,
    writeContract: writeRegisterContract,
  } = useWriteContract();
  const { isLoading: isRegisterConfirming, isSuccess: isRegisterConfirmed } =
    useWaitForTransactionReceipt({ hash: registerHash });

  useEffect(() => {
    if (data) {
      console.log(data);
      setPresidents(
        data.filter((candidate) => candidate.category === "SU President")
      );
      setVice(
        data.filter((candidate) => candidate.category === "SU Vice President")
      );
      setPro(data.filter((candidate) => candidate.category === "SU PRO"));
      setSecretary(
        data.filter((candidate) => candidate.category === "SU Secretary")
      );
    }
  }, [data]);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const selectedCandidates = [
      formData.get("president"),
      formData.get("vicePresident"),
      formData.get("pro"),
      formData.get("secretary"),
    ];

    writeVoteContract({
      address: contractAddress,
      abi,
      functionName: "vote",
      args: [selectedCandidates],
    });
  }

  useEffect(() => {
    if (isVoteConfirmed) {
      setVoteModalHeader("🎉 Vote Submitted Successfully! 🎉");
      setVoteModalBody(
        "Your vote has been recorded. Thank you for participating in the voting process!"
      );
      setVoteModalOpen(true);
    } else if (isVoteConfirming) {
      setVoteModalHeader("Waiting for confirmation...");
      setVoteModalBody("Please Wait");
      setVoteModalOpen(true);
    } else if (voteError) {
      setVoteModalHeader("😞 Vote Submission Failed 😞");
      setVoteModalBody(
        `Oops! Something went wrong while submitting your vote. ${voteError.shortMessage || "Please try again"}`
      );
      setVoteModalOpen(true);
    }
  }, [isVoteConfirmed, voteError, isVoteConfirming]);

  useEffect(() => {
    if (isRegisterConfirmed) {
      setRegisterModalHeader("🎉 Registration Successful! 🎉");
      setRegisterModalBody("You have been registered to vote. Thank you!");
      setRegisterModalOpen(true);
    } else if (isRegisterConfirming) {
      setRegisterModalHeader("Waiting for confirmation...");
      setRegisterModalBody("Please Wait");
      setRegisterModalOpen(true);
    } else if (registerError) {
      setRegisterModalHeader("😞 Registration Failed 😞");
      setRegisterModalBody(
        `Oops! Something went wrong while registering. ${registerError.shortMessage || "Please try again"}`
      );
      setRegisterModalOpen(true);
    }
  }, [isRegisterConfirmed, registerError, isRegisterConfirming]);

  const closeVoteModal = () => {
    setVoteModalOpen(false);
  };

  const closeRegisterModal = () => {
    setRegisterModalOpen(false);
  };

  const handleRegister = () => {
    writeRegisterContract({
      abi,
      address: contractAddress,
      functionName: "registerVoter",
    });
  };
  useEffect(() => {
    if (votes) {
      const categories = [
        "SU President",
        "SU Vice President",
        "SU PRO",
        "SU Secretary",
      ];

      const totalVotes = categories.reduce((total, category) => {
        const filteredVotes = votes.filter(
          (vote) => vote.category === category
        );
        return (
          total +
          filteredVotes.reduce((acc, cur) => {
            return acc + parseInt(cur.votes, 10);
          }, 0)
        );
      }, 0);

      setTotalVoted(totalVotes);
    }
  }, [votes]);

  // useEffect(() => {
  //   if (votes) {
  //     const filteredPresident = votes.filter(
  //       (president) => president.category === "SU President"
  //     );
  //     setTotalVoted(
  //       (prev) =>
  //         prev +
  //         filteredPresident.reduce((acc, cur) => acc + parseInt(cur.votes), 0)
  //     );

  //     const filteredVice = votes.filter(
  //       (vice) => vice.category === "SU Vice President"
  //     );
  //     setTotalVoted(
  //       (prev) =>
  //         prev + filteredVice.reduce((acc, cur) => acc + parseInt(cur.votes), 0)
  //     );
  //     const filteredPro = votes.filter((pro) => pro.category === "SU PRO");
  //     setTotalVoted(
  //       (prev) =>
  //         prev + filteredPro.reduce((acc, cur) => acc + parseInt(cur.votes), 0)
  //     );
  //     const filteredSecretary = votes.filter(
  //       (secretary) => secretary.category === "SU Secretary"
  //     );
  //     setTotalVoted(
  //       (prev) =>
  //         prev +
  //         filteredSecretary.reduce((acc, cur) => acc + parseInt(cur.votes), 0)
  //     );
  //   }
  // }, [votes]);

  return (
    <div className="voting container">
      <button
        className="register"
        onClick={handleRegister}
        disabled={isRegisterPending || isRegisterConfirming}
      >
        {isRegisterPending ? "Registering..." : "Register to vote"}
      </button>

      <h2>Unilorin Election</h2>
      <div className="top-vote">
        <div className="loading-container">
          <p>Voting in progress</p>
          <div className="loading-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        </div>
        <div className="left">
          <p>Registerd voters: 0</p>
          No. of votes cast: {totalVoted}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          SU president
          <select name="president" defaultValue={""} required>
            <option value="" disabled>
              Select Your SU president
            </option>
            {presidents.map((president) => (
              <option value={president.candidate} key={president.candidate}>
                {president.candidate}
              </option>
            ))}
          </select>
        </label>
        <label>
          SU vice president
          <select name="vicePresident" defaultValue={""} required>
            <option value="" disabled>
              Select Your SU vice president
            </option>
            {vice.map((vp) => (
              <option value={vp.candidate} key={vp.candidate}>
                {vp.candidate}
              </option>
            ))}
          </select>
        </label>
        <label>
          SU Pro
          <select name="pro" defaultValue={""} required>
            <option value="" disabled>
              Select Your SU Pro
            </option>
            {Pro.map((pro) => (
              <option value={pro.candidate} key={pro.candidate}>
                {pro.candidate}
              </option>
            ))}
          </select>
        </label>
        <label>
          SU Secretary
          <select name="secretary" defaultValue={""} required>
            <option value="" disabled>
              Select Your SU Secretary
            </option>
            {secretary.map((sec) => (
              <option value={sec.candidate} key={sec.candidate}>
                {sec.candidate}
              </option>
            ))}
          </select>
        </label>
        <div className="ctas">
          <button disabled={isVotePending} type="submit">
            {isVotePending ? "Confirming..." : "Vote"}
          </button>
          {voteHash && <div>Transaction Hash: {voteHash}</div>}
          {isVoteConfirming && <div>Waiting for confirmation...</div>}
          {isVoteConfirmed && <div>Transaction confirmed.</div>}

          <Link to={"/result"}>View result</Link>
        </div>
      </form>

      <Modal
        closeModal={closeVoteModal}
        isOpen={voteModalOpen}
        header={voteModalHeader}
        body={voteModalBody}
      />
      <Modal
        closeModal={closeRegisterModal}
        isOpen={registerModalOpen}
        header={registerModalHeader}
        body={registerModalBody}
      />
    </div>
  );
};

export default Voting;
