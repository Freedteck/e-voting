import { useReadContract, useWriteContract } from "wagmi";
import { abi, contractAddress } from "./clients";

function ReadCandidate() {
  const { data } = useReadContract({
    abi,
    address: contractAddress,
    functionName: "getAllCandidates",
  });

  return { data };
}

function ReadVotes() {
  const { data } = useReadContract({
    abi,
    address: contractAddress,
    functionName: "getAllVotes",
  });

  return { data };
}

function Register() {
  useWriteContract({
    abi,
    address: contractAddress,
    functionName: "registerVoter",
  });
}

export { ReadCandidate, ReadVotes, Register };
